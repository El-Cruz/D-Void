/**
 * CRIMINIX PURE-VANILLA QR CODE GENERATOR
 * Generador nativo 100% autónomo (sin dependencias externas).
 * Estándar QR Modelo 2, Modo Byte, Corrección de Error Nivel M.
 */
(function (global) {
  'use strict';

  // Tablas del Campo de Galois GF(256)
  const exp = new Uint8Array(512);
  const log = new Uint8Array(256);
  let x = 1;
  for (let i = 0; i < 255; i++) {
    exp[i] = x;
    log[x] = i;
    x <<= 1;
    if (x & 256) x ^= 0x11d;
  }
  for (let i = 255; i < 512; i++) exp[i] = exp[i - 255];

  function mul(a, b) {
    return a === 0 || b === 0 ? 0 : exp[log[a] + log[b]];
  }

  function rsPoly(n) {
    let p = [1];
    for (let i = 0; i < n; i++) {
      let next = new Array(p.length + 1).fill(0);
      for (let j = 0; j < p.length; j++) {
        next[j] ^= mul(p[j], exp[i]);
        next[j + 1] ^= p[j];
      }
      p = next;
    }
    return p;
  }

  function generateQRCodeMatrix(text) {
    const bytes = new TextEncoder().encode(text);
    // Selección dinámica de versión según el largo de bytes
    let ver = 2;
    if (bytes.length > 28) ver = 3;
    if (bytes.length > 44) ver = 4;

    const verInfo = {
      2: { size: 25, dataBytes: 28, ecBytes: 16, align: [6, 18] },
      3: { size: 29, dataBytes: 44, ecBytes: 26, align: [6, 22] },
      4: { size: 33, dataBytes: 64, ecBytes: 36, align: [6, 26] }
    }[ver];

    const bits = [];
    function pushBits(val, len) {
      for (let i = len - 1; i >= 0; i--) bits.push((val >> i) & 1);
    }

    // Modo 0100 (Byte) + Longitud de caracteres + Bytes de carga
    pushBits(4, 4);
    pushBits(bytes.length, 8);
    for (let b of bytes) pushBits(b, 8);

    // Terminador de 4 ceros y alineación a byte
    const padLen = Math.min(4, verInfo.dataBytes * 8 - bits.length);
    pushBits(0, padLen);
    while (bits.length % 8 !== 0) bits.push(0);

    // Bytes de relleno alternados 0xEC / 0x11
    const pads = [0xEC, 0x11];
    let pIdx = 0;
    while (bits.length < verInfo.dataBytes * 8) {
      pushBits(pads[pIdx % 2], 8);
      pIdx++;
    }

    // Agrupación en bytes de datos
    const dataBytes = [];
    for (let i = 0; i < bits.length; i += 8) {
      let byteVal = 0;
      for (let j = 0; j < 8; j++) byteVal = (byteVal << 1) | bits[i + j];
      dataBytes.push(byteVal);
    }

    // Cálculo Reed-Solomon de comprobación de errores
    const poly = rsPoly(verInfo.ecBytes);
    const rem = new Array(verInfo.ecBytes).fill(0);
    for (let i = 0; i < dataBytes.length; i++) {
      const factor = dataBytes[i] ^ rem[0];
      rem.shift();
      rem.push(0);
      if (factor !== 0) {
        for (let j = 0; j < verInfo.ecBytes; j++) rem[j] ^= mul(poly[j + 1], factor);
      }
    }

    const allCodewords = dataBytes.concat(rem);
    const S = verInfo.size;
    const m = Array.from({ length: S }, () => Array(S).fill(null));
    const reserved = Array.from({ length: S }, () => Array(S).fill(false));

    function set(r, c, val, isRes = true) {
      m[r][c] = val;
      if (isRes) reserved[r][c] = true;
    }

    // 1. Patrones de Detección de Posición (Finders)
    function drawFinder(r0, c0) {
      for (let r = -1; r <= 7; r++) {
        for (let c = -1; c <= 7; c++) {
          const nr = r0 + r, nc = c0 + c;
          if (nr >= 0 && nr < S && nc >= 0 && nc < S) {
            if (r === -1 || r === 7 || c === -1 || c === 7) set(nr, nc, 0);
            else if (r === 0 || r === 6 || c === 0 || c === 6 || (r >= 2 && r <= 4 && c >= 2 && c <= 4)) set(nr, nc, 1);
            else set(nr, nc, 0);
          }
        }
      }
    }
    drawFinder(0, 0);
    drawFinder(0, S - 7);
    drawFinder(S - 7, 0);

    // 2. Patrones de Alineación
    if (verInfo.align) {
      const coords = verInfo.align;
      for (let r of coords) {
        for (let c of coords) {
          if (reserved[r][c]) continue;
          for (let dr = -2; dr <= 2; dr++) {
            for (let dc = -2; dc <= 2; dc++) {
              const isEdge = Math.abs(dr) === 2 || Math.abs(dc) === 2;
              const isCenter = dr === 0 && dc === 0;
              set(r + dr, c + dc, (isEdge || isCenter) ? 1 : 0);
            }
          }
        }
      }
    }

    // 3. Patrones de Temporización
    for (let i = 8; i < S - 8; i++) {
      if (!reserved[6][i]) set(6, i, i % 2 === 0 ? 1 : 0);
      if (!reserved[i][6]) set(i, 6, i % 2 === 0 ? 1 : 0);
    }

    // 4. Módulo Oscuro Permanente
    set(4 * ver + 9, 8, 1);

    // Reserva de Información de Formato
    for (let i = 0; i < 9; i++) {
      if (!reserved[8][i]) reserved[8][i] = true;
      if (!reserved[i][8]) reserved[i][8] = true;
    }
    for (let i = 0; i < 8; i++) {
      reserved[8][S - 1 - i] = true;
      reserved[S - 1 - i][8] = true;
    }

    // 5. Carga de Bloques de Datos en Zigzag
    const dataBits = [];
    for (let byte of allCodewords) {
      for (let i = 7; i >= 0; i--) dataBits.push((byte >> i) & 1);
    }

    let bitIdx = 0;
    let dir = -1; // Dirección ascendente
    for (let c = S - 1; c > 0; c -= 2) {
      if (c === 6) c--; // Salta la columna de sincronización vertical
      const rows = dir === -1
        ? Array.from({ length: S }, (_, i) => S - 1 - i)
        : Array.from({ length: S }, (_, i) => i);
      for (let r of rows) {
        for (let dc = 0; dc < 2; dc++) {
          const col = c - dc;
          if (!reserved[r][col]) {
            const b = bitIdx < dataBits.length ? dataBits[bitIdx++] : 0;
            // Máscara 0 estándar: (r + col) % 2 === 0
            const mask = (r + col) % 2 === 0;
            m[r][col] = mask ? b ^ 1 : b;
          }
        }
      }
      dir = -dir;
    }

    // 6. Información de Formato (Máscara 0, Nivel M -> 101010000010010)
    const formatBits = [1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0];
    for (let i = 0; i < 6; i++) m[8][i] = formatBits[i];
    m[8][7] = formatBits[6];
    m[8][8] = formatBits[7];
    m[7][8] = formatBits[8];
    for (let i = 9; i < 15; i++) m[14 - i][8] = formatBits[i];
    for (let i = 0; i < 7; i++) m[S - 1 - i][8] = formatBits[i];
    for (let i = 7; i < 15; i++) m[8][S - 15 + i] = formatBits[i];

    return { matrix: m, size: S };
  }

  /**
   * Genera el SVG completo del código QR forense
   * @param {string} text - Contenido o token de validación
   * @param {number} displaySize - Tamaño en píxeles (ancho y alto)
   * @param {string} darkColor - Color del módulo oscuro (#050505 o #D90429)
   * @param {string} lightColor - Color de fondo (#FFFFFF o transparente)
   */
  function generateQRCodeSVG(text, displaySize = 200, darkColor = '#050505', lightColor = '#FFFFFF') {
    const { matrix, size } = generateQRCodeMatrix(text);
    const border = 3;
    const totalDim = size + border * 2;

    let rects = '';
    for (let r = 0; r < size; r++) {
      for (let c = 0; c < size; c++) {
        if (matrix[r][c] === 1) {
          rects += `<rect x="${c + border}" y="${r + border}" width="1" height="1" fill="${darkColor}"/>`;
        }
      }
    }

    return `
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 ${totalDim} ${totalDim}"
        width="${displaySize}"
        height="${displaySize}"
        shape-rendering="crispEdges"
        role="img"
        aria-label="Código QR de verificación forense del expediente ${text}"
      >
        <rect width="${totalDim}" height="${totalDim}" fill="${lightColor}"/>
        <g id="QRMatrix">
          ${rects}
        </g>
      </svg>
    `.trim();
  }

  // Exportar a nivel global
  global.CriminixQR = {
    generateMatrix: generateQRCodeMatrix,
    generateSVG: generateQRCodeSVG
  };
})(typeof window !== 'undefined' ? window : globalThis);
