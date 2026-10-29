import { readFileSync } from 'node:fs';
import { runInNewContext } from 'node:vm';
import { test } from 'node:test';
import assert from 'node:assert/strict';

const html = readFileSync(new URL('../Resources/events/2026-11-19-greek-odyssey/index.html', import.meta.url), 'utf8');
const start = html.indexOf('      // Soporte de Gestos');
const source = html.slice(start, html.indexOf('      /* ===', start));

function book() {
  const travelBook = new EventTarget();
  const pages = [];
  runInNewContext(source, { travelBook, stepPage: direction => pages.push(direction) });
  function touch(type, x, y, count = 1) {
    const event = new Event(type, { cancelable: true });
    const points = Array.from({ length: count }, (_, identifier) => ({ clientX: x, clientY: y, identifier }));
    event.touches = type === 'touchend' || type === 'touchcancel' ? [] : points;
    event.changedTouches = points;
    travelBook.dispatchEvent(event);
    assert.equal(event.defaultPrevented, false, 'Native touch handling must remain available');
  }
  return { touch, pages };
}

test('vertical intent stays vertical even when the finger later drifts sideways', () => {
  const { touch, pages } = book();
  touch('touchstart', 200, 200);
  touch('touchmove', 195, 230);
  touch('touchmove', 80, 240);
  touch('touchend', 80, 240);
  assert.deepEqual(pages, []);
});

test('horizontal swipes turn one page in each direction', () => {
  const { touch, pages } = book();
  touch('touchstart', 200, 200);
  touch('touchmove', 100, 210);
  touch('touchend', 100, 210);
  touch('touchstart', 100, 200);
  touch('touchmove', 200, 210);
  touch('touchend', 200, 210);
  assert.deepEqual(pages, [1, -1]);
});

test('short and diagonal gestures do not turn pages', () => {
  const { touch, pages } = book();
  for (const [x, y] of [[170, 202], [100, 300]]) {
    touch('touchstart', 200, 200);
    touch('touchmove', x, y);
    touch('touchend', x, y);
  }
  assert.deepEqual(pages, []);
});

test('cancelled and multi-touch gestures cannot turn a page', () => {
  const { touch, pages } = book();
  touch('touchstart', 200, 200);
  touch('touchcancel', 190, 200);
  touch('touchend', 80, 200);
  touch('touchstart', 200, 200);
  touch('touchstart', 200, 200, 2);
  touch('touchmove', 100, 200);
  touch('touchend', 100, 200);
  assert.deepEqual(pages, []);
});
