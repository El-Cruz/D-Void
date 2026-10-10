/* Scroll nativo: llegada, red carpet y afterlife comparten un stage. */
(() => {
  'use strict';
  const page = document.querySelector('#dvoid-hollywood');
  const scene = page?.querySelector('[data-scroll-scene="premiere"]');
  if (!scene || scene.dataset.motionInitialized) return;
  scene.dataset.motionInitialized = 'true';
  const stage = scene.querySelector('.oh-scene-stage');
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
  const desktopScene = matchMedia('(min-width: 960px)');
  const clean = scene.querySelector('.oh-world-clean');
  const undead = scene.querySelector('.oh-world-undead');
  const undeadImage = undead.querySelector('img');
  let undeadReady = false;
  let prepared = false;
  let visible = false;
  let frame = 0;
  const clamp = value => Math.max(0, Math.min(1, value));
  const ramp = (value, start, end) => {
    const t = clamp((value - start) / (end - start));
    return t * t * (3 - 2 * t);
  };

  function renderScene() {
    frame = 0;
    // Texto ampliado: liberar el stage si ya no cabe en la pantalla.
    const oversized = stage.offsetHeight > window.innerHeight + 1;
    scene.classList.toggle('is-oversized', oversized);
    const bounds = scene.getBoundingClientRect();
    const distance = Math.max(1, bounds.height - stage.offsetHeight);
    const progress = oversized ? 0 : clamp(-bounds.top / distance);
    const reduced = reducedMotion.matches;
    const desktop = desktopScene.matches;
    const push = ramp(progress, .12, .82);
    // Exposiciones ligadas a posición: nunca se inicia/reinicia una línea de tiempo.
    let exposure = progress < .5 ? .72 * ramp(progress, .35, .46)
      : progress < .65 ? .72 - .58 * ramp(progress, .5, .58)
      : .14 + .86 * ramp(progress, .65, .8);
    if (reduced) exposure = ramp(progress, .45, .8);
    if (!undeadReady) exposure = 0;
    const pulse = center => Math.max(0, 1 - Math.abs(progress - center) / .025);
    const flash = reduced || !undeadReady ? 0 : (desktop ? Math.max(pulse(.445), pulse(.735)) * .055 : pulse(.735) * .035);
    const values = {
      '--oh-camera-scale': reduced ? 1 : 1 + push * (desktop ? .065 : .025),
      '--oh-camera-y': `${reduced ? 0 : -push * (desktop ? 10 : 3)}px`,
      '--oh-title-opacity': 1 - ramp(progress, .2, .43),
      '--oh-title-y': `${reduced ? 0 : -ramp(progress, .2, .5) * (desktop ? 34 : 12)}px`,
      '--oh-undead': exposure,
      '--oh-light': ramp(progress, .3, .82) * .7,
      '--oh-haze': .04 + ramp(progress, .28, .7) * (desktop ? .2 : .09),
      '--oh-haze-x': `${reduced ? 0 : push * (desktop ? 18 : 3)}px`,
      '--oh-flash': flash,
      '--oh-reveal': ramp(progress, .72, .87),
      '--oh-reveal-y': `${reduced ? 0 : (1 - ramp(progress, .72, .87)) * (desktop ? 24 : 8)}px`,
      '--oh-cue': 1 - ramp(progress, 0, .1),
      '--oh-exit': ramp(progress, .91, 1) * .6
    };
    for (const [name, value] of Object.entries(values)) stage.style.setProperty(name, value);
    scene.dataset.heroState = exposure >= .999 ? 'undead' : exposure > 0 ? 'transitioning' : 'clean';
    clean.setAttribute('aria-hidden', String(exposure >= .5));
    undead.setAttribute('aria-hidden', String(exposure < .5));
  }

  function requestFrame() {
    if (!frame && !document.hidden) frame = requestAnimationFrame(renderScene);
  }
  function syncListeners() {
    if (visible && !document.hidden) {
      window.addEventListener('scroll', requestFrame, { passive: true });
      window.addEventListener('resize', requestFrame, { passive: true });
    } else {
      window.removeEventListener('scroll', requestFrame);
      window.removeEventListener('resize', requestFrame);
      cancelAnimationFrame(frame);
      frame = 0;
    }
  }
  function prepareUndead() {
    if (prepared) return;
    prepared = true;
    undeadImage.loading = 'eager';
    undeadImage.decode().then(() => { undeadReady = true; requestFrame(); }).catch(() => {});
  }
  scene.classList.add('has-scroll');
  new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting;
    syncListeners();
    if (visible) prepareUndead();
    requestFrame();
  }).observe(scene);
  reducedMotion.addEventListener('change', requestFrame);
  desktopScene.addEventListener('change', requestFrame);
  document.addEventListener('visibilitychange', () => { syncListeners(); requestFrame(); });
  window.addEventListener('pageshow', () => { syncListeners(); requestFrame(); });
  window.addEventListener('pagehide', () => {
    window.removeEventListener('scroll', requestFrame);
    window.removeEventListener('resize', requestFrame);
    cancelAnimationFrame(frame);
    frame = 0;
  });
  requestFrame();

  // Dresscode conserva el reveal de 4.8; su futura escena usará este mismo scheduler.
  const dresscode = page.querySelector('#oh-dresscode');
  const easeEnter = getComputedStyle(page).getPropertyValue('--oh-ease-enter').trim();
  let dresscodeAnimations = [];
  const dresscodeObserver = new IntersectionObserver(([entry]) => {
    if (!entry.isIntersecting) return;
    dresscodeObserver.disconnect();
    dresscode.dataset.revealed = 'true';
    dresscode.querySelector('img').loading = 'eager';
    if (document.hidden || reducedMotion.matches) return;
    const desktop = desktopScene.matches;
    dresscodeAnimations = [dresscode.querySelector('.oh-dress-portrait'), dresscode.querySelector('.oh-dress-copy')].map((element, i) => element.animate([
      { opacity: i === 0 ? .75 : .85, transform: `translateY(${desktop ? (i === 0 ? 4 : 2) : 0}px)` },
      { opacity: 1, transform: 'translateY(0)' }
    ], { duration: i === 0 ? (desktop ? 800 : 600) : (desktop ? 600 : 500), delay: i === 0 ? 0 : (desktop ? 220 : 140), easing: easeEnter, fill: 'backwards' }));
    Promise.all(dresscodeAnimations.map(animation => animation.finished)).then(settleDresscode).catch(() => {});
  }, { threshold: 0, rootMargin: '0px 0px -10% 0px' });
  dresscodeObserver.observe(dresscode.querySelector('.oh-dress-portrait'));
  function settleDresscode() {
    dresscodeAnimations.forEach(animation => animation.cancel());
    dresscodeAnimations = [];
  }
  dresscode.addEventListener('focusin', settleDresscode);
  reducedMotion.addEventListener('change', () => { if (reducedMotion.matches) settleDresscode(); });
  document.addEventListener('visibilitychange', () => { if (document.hidden) settleDresscode(); });
})();

/* Fases 4.6–4.7: formulario y ticket demo independientes de la intro. */
(() => {
  'use strict';
  const page = document.querySelector('#dvoid-hollywood');
  const section = page?.querySelector('#oh-reservation');
  const form = section?.querySelector('.oh-reservation-form');
  if (!form || form.dataset.reservationInitialized) return;
  form.dataset.reservationInitialized = 'true';
  const fields = form.querySelector('fieldset');
  const firstName = form.elements.namedItem('firstName');
  const lastName = form.elements.namedItem('lastName');
  const phone = form.elements.namedItem('phone');
  const accompanied = form.elements.namedItem('accompanied');
  const guests = form.elements.namedItem('guests');
  const guestsField = section.querySelector('#oh-guests-field');
  const feedback = form.querySelector('.oh-form-status');
  const summary = form.querySelector('.oh-form-errors');
  const inputs = [firstName, lastName, phone, guests];
  let reservation = null;
  let demoSequence = 0;
  const confirmation = page.querySelector('#oh-confirmation');
  const ticketSummary = confirmation.querySelector('#oh-ticket-summary');
  const ticket = confirmation.querySelector('.oh-ticket');
  const reducedTicketMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  function renderTicket(payload, result, moveFocus) {
    // TODO GHL: mapear status verificado aquí; reservar data-ticket-qr para qrValue real.
    // No interpretar demo-preview como confirmación de servidor.
    const additionalGuests = payload.accompanied ? payload.guests : 0;
    confirmation.querySelector('#oh-ticket-name').textContent = `${payload.firstName} ${payload.lastName}`;
    confirmation.querySelector('#oh-ticket-guests').textContent = String(additionalGuests);
    confirmation.querySelector('#oh-ticket-party-size').textContent = String(1 + additionalGuests);
    confirmation.querySelector('#oh-ticket-code').textContent = result.reservationId;
    ticket.dataset.status = result.status;
    confirmation.classList.remove('is-printing');
    confirmation.hidden = false;
    // Reiniciar solo la secuencia finita al emitir una nueva preview.
    void ticket.offsetWidth;
    if (!reducedTicketMotion.matches) confirmation.classList.add('is-printing');
    if (moveFocus) {
      ticketSummary.focus({ preventScroll: true });
      ticketSummary.scrollIntoView({ behavior: 'instant', block: 'start' });
    }
  }

  reducedTicketMotion.addEventListener('change', () => {
    if (reducedTicketMotion.matches) {
      confirmation.classList.remove('is-printing');
      section.classList.remove('is-box-revealed');
    }
  });
  form.addEventListener('focusin', () => section.classList.remove('is-box-revealed'));
  section.addEventListener('animationend', event => {
    if (event.animationName === 'oh-box-light') section.classList.remove('is-box-revealed');
  });

  function clearTicket() {
    confirmation.hidden = true;
    confirmation.classList.remove('is-printing');
  }

  confirmation.querySelector('.oh-ticket-edit').addEventListener('click', () => {
    clearTicket();
    reservation = null;
    setState('idle');
    firstName.focus();
  });
  confirmation.querySelector('.oh-ticket-code').addEventListener('animationend', event => {
    if (event.animationName === 'oh-ticket-details') confirmation.classList.remove('is-printing');
  });

  const cleanText = value => value.normalize('NFC').replace(/[\u0000-\u001f\u007f-\u009f]/g, '').trim().replace(/\s+/gu, ' ');
  const cleanPhone = value => value.normalize('NFKC').trim().replace(/[\s().-]/g, '').replace(/^00/, '+');

  function errorFor(input) {
    const value = cleanText(input.value);
    if (input === firstName || input === lastName) {
      if (!value) return input === firstName ? 'Escribe tu nombre.' : 'Escribe tu apellido.';
      if (input === firstName && Array.from(value).length < 2) return 'Escribe al menos 2 caracteres para tu nombre.';
      if (value.length > 80) return 'Usa hasta 80 caracteres.';
      if (!/\p{L}/u.test(value) || /[<>]/.test(value)) return input === firstName ? 'Revisa tu nombre.' : 'Revisa tu apellido.';
    }
    if (input === phone) {
      if (!value) return 'Escribe tu número de teléfono.';
      if (!/^\+?[\d\s().-]+$/.test(value.normalize('NFKC')) || !/^\+?\d{7,15}$/.test(cleanPhone(value))) return 'Escribe un número de teléfono válido.';
    }
    if (input === guests && accompanied.checked && (!/^\d+$/.test(input.value) || !Number.isInteger(Number(input.value)) || Number(input.value) < 1 || Number(input.value) > 10)) return 'Elige entre 1 y 10 acompañantes para esta demo.';
    return '';
  }

  function showError(input, message) {
    input.setAttribute('aria-invalid', String(Boolean(message)));
    const error = page.querySelector(`#${input.id}-error`);
    error.textContent = message;
    error.hidden = !message;
  }

  function updateSummary() {
    const list = summary.querySelector('ul');
    list.replaceChildren();
    inputs.filter(input => input.getAttribute('aria-invalid') === 'true').forEach(input => {
      const item = document.createElement('li');
      const link = document.createElement('a');
      link.href = `#${input.id}`;
      link.textContent = page.querySelector(`#${input.id}-error`).textContent;
      item.append(link);
      list.append(item);
    });
    summary.hidden = !list.children.length;
  }

  function setState(state, message = '') {
    form.dataset.state = state;
    feedback.textContent = message;
    form.setAttribute('aria-busy', String(state === 'submitting'));
  }

  // TODO GHL: sustituir solo este adaptador cuando exista contrato confirmado.
  // Recibe { firstName, lastName, phone, accompanied, guests }; guests EXCLUYE al titular.
  // Añadir endpoint, consentimiento, validación servidor, errores e idempotencia en esa fase.
  // El resultado demo permite solo una preview personalizada, sin reserva real ni QR.
  async function submitReservation(payload) {
    void payload;
    if (!reducedTicketMotion.matches) await new Promise(resolve => window.setTimeout(resolve, 180));
    return {
      mode: 'demo',
      reservationId: `DVOID-DEMO-${(++demoSequence).toString(36).toUpperCase().padStart(4, '0')}`,
      status: 'demo-preview',
      qrValue: null
    };
  }

  function editReservation(event) {
    if (!inputs.includes(event.target) && event.target !== accompanied) return;
    reservation = null;
    clearTicket();
    setState('idle');
    if (event.target === accompanied) {
      guestsField.hidden = !accompanied.checked;
      guests.disabled = !accompanied.checked;
      guests.value = accompanied.checked ? '1' : '0';
      showError(guests, '');
    } else if (event.target.getAttribute('aria-invalid') === 'true') {
      showError(event.target, errorFor(event.target));
    }
    if (!summary.hidden) updateSummary();
  }

  form.addEventListener('input', editReservation);
  form.addEventListener('focusout', event => {
    if (inputs.includes(event.target) && !event.target.disabled) {
      showError(event.target, errorFor(event.target));
      if (!summary.hidden) updateSummary();
    }
  });
  summary.addEventListener('click', event => {
    const link = event.target.closest('a');
    if (!link) return;
    event.preventDefault();
    page.querySelector(link.hash).focus();
  });
  form.addEventListener('submit', async event => {
    event.preventDefault();
    if (form.dataset.state === 'submitting') return;
    clearTicket();
    setState('validating');
    inputs.forEach(input => showError(input, errorFor(input)));
    updateSummary();
    if (!summary.hidden) {
      reservation = null;
      setState('error', 'Revisa los campos indicados. Tus datos siguen aquí.');
      summary.focus();
      return;
    }
    reservation = {
      firstName: cleanText(firstName.value),
      lastName: cleanText(lastName.value),
      phone: cleanPhone(phone.value),
      accompanied: accompanied.checked,
      guests: accompanied.checked ? Number(guests.value) : 0
    };
    firstName.value = reservation.firstName;
    lastName.value = reservation.lastName;
    phone.value = reservation.phone;
    setState('ready');
    const submittedFromForm = form.contains(document.activeElement);
    fields.disabled = true;
    setState('submitting', 'Preparando la vista previa…');
    try {
      const result = await submitReservation(reservation);
      if (result.mode !== 'demo' || result.status !== 'demo-preview') throw new Error('Unexpected reservation mode');
      setState('demo-success', 'Ticket demo preparado. No se han enviado datos y tu reserva no está confirmada.');
      const moveFocus = submittedFromForm && (form.contains(document.activeElement) || document.activeElement === document.body);
      renderTicket(reservation, result, moveFocus);
    } catch {
      setState('error', 'No pudimos preparar la vista previa. Tus datos siguen aquí; vuelve a intentarlo.');
      feedback.focus();
    } finally {
      fields.disabled = false;
    }
  });
  // El HTML permanece deshabilitado sin JS: nunca hace un POST nativo con datos personales.
  form.noValidate = true;
  fields.disabled = false;

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => {
      if (!entries.some(entry => entry.isIntersecting)) return;
      if (!form.contains(document.activeElement) && !reducedTicketMotion.matches) section.classList.add('is-box-revealed');
      observer.disconnect();
    }, { rootMargin: '0px 0px -8% 0px' });
    observer.observe(section.querySelector('.oh-box-scene'));
  }
})();
