(function () {
      const canvas = document.getElementById('pg-waveform');
      if (!canvas) return;
      const ctx = canvas.getContext('2d', { alpha: true });
      if (!ctx) return;

      const AMBER = '#C98A2B';
      const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
      let width = 0;
      let height = 0;
      let dpr = 1;
      let rafId = null;
      let isVisible = true;

      function resize() {
        const rect = canvas.getBoundingClientRect();
        dpr = Math.min(window.devicePixelRatio || 1, 2);
        width = Math.max(1, Math.floor(rect.width));
        height = Math.max(1, Math.floor(rect.height));
        canvas.width = width * dpr;
        canvas.height = height * dpr;
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      }

      function renderFrame(time) {
        const t = time * 0.0018;
        ctx.clearRect(0, 0, width, height);

        const midX = width * 0.5;
        const midY = height * 0.5;
        const barStep = width < 480 ? 6 : 7;
        const barWidth = 2;
        const halfCount = Math.floor(midX / barStep);

        ctx.fillStyle = AMBER;
        ctx.strokeStyle = AMBER;

        // 1. Barras simétricas de ecualizador paramétrico desde el eje central
        for (let i = 0; i < halfCount; i++) {
          const norm = i / halfCount; // 0 en el centro -> 1 en los extremos
          const envelope = Math.pow(1 - norm, 1.35); // Mayor energía en el eje axial central

          const waveA = Math.sin(i * 0.32 - t * 2.4);
          const waveB = Math.cos(i * 0.19 + t * 1.6);
          const waveC = Math.sin(i * 0.75 - t * 3.8) * 0.35;
          const signal = Math.abs(waveA * 0.55 + waveB * 0.45 + waveC);

          const halfBarH = Math.max(1.5, signal * envelope * (height * 0.44));
          const yTop = midY - halfBarH;
          const barH = halfBarH * 2;

          const xRight = midX + i * barStep;
          const xLeft = midX - (i + 1) * barStep;

          ctx.fillRect(xRight, yTop, barWidth, barH);
          if (i > 0) {
            ctx.fillRect(xLeft, yTop, barWidth, barH);
          }
        }

        // 2. Onda portadora de osciloscopio horizontal continua
        ctx.lineWidth = 1;
        ctx.beginPath();
        const stepX = 4;
        for (let x = 0; x <= width; x += stepX) {
          const dist = Math.abs(x - midX) / midX;
          const atten = Math.max(0, 1 - dist * dist);
          const y =
            midY +
            Math.sin((x - midX) * 0.045 - t * 3.2) *
              Math.cos((x - midX) * 0.018 + t * 1.4) *
              (height * 0.32) *
              atten;
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();

        if (!reduceMotion.matches && isVisible) {
          rafId = window.requestAnimationFrame(renderFrame);
        }
      }

      function start() {
        if (rafId !== null) return;
        rafId = window.requestAnimationFrame(renderFrame);
      }

      function stop() {
        if (rafId !== null) {
          window.cancelAnimationFrame(rafId);
          rafId = null;
        }
      }

      resize();
      window.addEventListener('resize', resize, { passive: true });

      if ('IntersectionObserver' in window) {
        const io = new IntersectionObserver(
          function (entries) {
            isVisible = entries[0] ? entries[0].isIntersecting : true;
            if (isVisible && !reduceMotion.matches) start();
            else stop();
          },
          { threshold: 0.05 }
        );
        io.observe(canvas);
      }

      if (reduceMotion.matches) {
        renderFrame(1200);
      } else {
        start();
      }
    })();

    /* ── COUNTDOWN REGRESIVO DINÁMICO (12.NOV.2026 · 20H00 GMT-5) ── */
    (function () {
      const targetTime = new Date('2026-11-12T20:00:00-05:00').getTime();
      const elDays = document.getElementById('cd-days');
      const elHours = document.getElementById('cd-hours');
      const elMins = document.getElementById('cd-mins');
      const elSecs = document.getElementById('cd-secs');

      if (!elDays || !elHours || !elMins || !elSecs) return;

      const lastValues = { days: '', hours: '', mins: '', secs: '' };

      function updateDigit(el, val, key) {
        if (lastValues[key] !== val) {
          lastValues[key] = val;
          el.style.opacity = '0.35';
          el.style.transform = 'translateY(-2px)';
          setTimeout(function () {
            el.textContent = val;
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
          }, 90);
        }
      }

      function updateCountdown() {
        const now = Date.now();
        const diff = targetTime - now;

        if (diff <= 0) {
          elDays.textContent = '00';
          elHours.textContent = '00';
          elMins.textContent = '00';
          elSecs.textContent = '00';
          return;
        }

        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const secs = Math.floor((diff % (1000 * 60)) / 1000);

        const dStr = String(days).padStart(2, '0');
        const hStr = String(hours).padStart(2, '0');
        const mStr = String(mins).padStart(2, '0');
        const sStr = String(secs).padStart(2, '0');

        updateDigit(elDays, dStr, 'days');
        updateDigit(elHours, hStr, 'hours');
        updateDigit(elMins, mStr, 'mins');
        updateDigit(elSecs, sStr, 'secs');
      }

      updateCountdown();
      setInterval(updateCountdown, 1000);
    })();

    /* ── SELECTOR INTERACTIVO DE TIERS, QR PROCEDIMENTAL SVG & CHECKOUT ("COUNTDOWN PASS") ── */
    (function () {
      const tierCards = Array.from(document.querySelectorAll('.tier-card'));
      const tierInput = document.getElementById('ticket-tier-input');
      const priceInput = document.getElementById('ticket-price-input');
      const tierLabelInput = document.getElementById('ticket-tier-label-input');
      const tierDisplay = document.getElementById('selected-tier-display');

      function selectTier(selectedCard) {
        tierCards.forEach(function (card) {
          const active = card === selectedCard;
          card.classList.toggle('is-selected', active);
          card.setAttribute('aria-checked', active ? 'true' : 'false');
          const statusEl = card.querySelector('.tier-card__status');
          if (statusEl) {
            statusEl.textContent = active ? '[ SELECCIONADO ]' : '[ SELECCIONAR ]';
          }
        });

        const id = selectedCard.getAttribute('data-tier-id') || 'ETAPA_01';
        const label = selectedCard.getAttribute('data-tier-label') || 'ETAPA 01 · CUPOS INICIALES';
        const price = selectedCard.getAttribute('data-tier-price') || '$10';

        if (tierInput) tierInput.value = id;
        if (priceInput) priceInput.value = price;
        if (tierLabelInput) tierLabelInput.value = label;
        if (tierDisplay) {
          tierDisplay.textContent = label + ' — ' + price + ' USD';
        }
      }

      tierCards.forEach(function (card, index) {
        card.addEventListener('click', function () {
          selectTier(card);
        });

        card.addEventListener('keydown', function (e) {
          if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
            e.preventDefault();
            const next = tierCards[(index + 1) % tierCards.length];
            next.focus();
            selectTier(next);
          } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
            e.preventDefault();
            const prev = tierCards[(index - 1 + tierCards.length) % tierCards.length];
            prev.focus();
            selectTier(prev);
          }
        });
      });

      /* Motor de QR Vectorial Procedimental SVG (Estándar 25x25 con <rect> en #F4F4F0 sobre #080808) */
      function generateProceduralQrSvg(payloadStr) {
        const N = 25;
        const grid = Array.from({ length: N }, function () {
          return Array(N).fill(false);
        });

        function setFinder(r0, c0) {
          for (let r = 0; r < 7; r++) {
            for (let c = 0; c < 7; c++) {
              if (
                r === 0 ||
                r === 6 ||
                c === 0 ||
                c === 6 ||
                (r >= 2 && r <= 4 && c >= 2 && c <= 4)
              ) {
                grid[r0 + r][c0 + c] = true;
              }
            }
          }
        }

        // 3 Patrones Finder en las esquinas
        setFinder(0, 0);
        setFinder(0, N - 7);
        setFinder(N - 7, 0);

        // Patrón de alineación (16..20, centro 18,18)
        for (let ar = 16; ar <= 20; ar++) {
          for (let ac = 16; ac <= 20; ac++) {
            if (
              ar === 16 ||
              ar === 20 ||
              ac === 16 ||
              ac === 20 ||
              (ar === 18 && ac === 18)
            ) {
              grid[ar][ac] = true;
            }
          }
        }

        // Pistas de sincronización (Timing patterns)
        for (let i = 8; i < N - 8; i++) {
          grid[6][i] = i % 2 === 0;
          grid[i][6] = i % 2 === 0;
        }

        // Módulo activo estándar
        grid[N - 8][8] = true;

        function isProtected(r, c) {
          if (r <= 7 && c <= 7) return true;
          if (r <= 7 && c >= N - 8) return true;
          if (r >= N - 8 && c <= 7) return true;
          if (r === 6 || c === 6) return true;
          if (r >= 16 && r <= 20 && c >= 16 && c <= 20) return true;
          if (r === N - 8 && c === 8) return true;
          return false;
        }

        // Semilla determinista derivada del payload del asistente
        let h = 2166136261;
        for (let k = 0; k < payloadStr.length; k++) {
          h ^= payloadStr.charCodeAt(k);
          h = Math.imul(h, 16777619);
        }
        let seed = Math.abs(h | 0) || 73915;

        function nextRand() {
          seed = (Math.imul(seed, 1664525) + 1013904223) | 0;
          return (seed >>> 0) / 4294967296;
        }

        const Q = 2; // Quiet zone
        const totalDim = N + Q * 2;
        let rectsMarkup = '';

        for (let r = 0; r < N; r++) {
          for (let c = 0; c < N; c++) {
            let active = grid[r][c];
            if (!isProtected(r, c)) {
              active = nextRand() > 0.5;
            }
            if (active) {
              rectsMarkup +=
                '<rect x="' +
                (c + Q) +
                '" y="' +
                (r + Q) +
                '" width="1" height="1" fill="#F4F4F0"/>';
            }
          }
        }

        return (
          '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ' +
          totalDim +
          ' ' +
          totalDim +
          '" width="100%" height="100%" shape-rendering="crispEdges" role="img" aria-label="Código QR Countdown Pass ' +
          payloadStr.replace(/"/g, '') +
          '">' +
          '<rect width="' +
          totalDim +
          '" height="' +
          totalDim +
          '" fill="#080808"/>' +
          '<g>' +
          rectsMarkup +
          '</g>' +
          '</svg>'
        );
      }

      const qrMount = document.getElementById('pass-qr-svg-mount');
      if (qrMount) {
        qrMount.innerHTML = generateProceduralQrSvg('#PG-042/100|D-VOID|COUNTDOWN');
      }

      const form = document.getElementById('countdown-booking-form');
      if (!form) return;

      const fields = {
        fullname: {
          input: document.getElementById('input-fullname'),
          group: document.getElementById('group-fullname'),
          error: document.getElementById('error-fullname'),
          touched: false,
          validate: function (val) {
            const clean = val.trim().replace(/\s+/g, ' ');
            if (!clean) return 'INGRESA TU NOMBRE.';
            if (clean.length < 2) {
              return 'EL NOMBRE DEBE TENER AL MENOS 2 CARACTERES.';
            }
            return '';
          }
        },
        lastname: {
          input: document.getElementById('input-lastname'),
          group: document.getElementById('group-lastname'),
          error: document.getElementById('error-lastname'),
          touched: false,
          validate: function (val) {
            const clean = val.trim().replace(/\s+/g, ' ');
            const firstClean = fields.fullname.input
              ? fields.fullname.input.value.trim().replace(/\s+/g, ' ')
              : '';
            if (!clean && firstClean.split(' ').length >= 2) {
              return '';
            }
            if (!clean) return 'INGRESA TU APELLIDO.';
            if (clean.length < 2) {
              return 'EL APELLIDO DEBE TENER AL MENOS 2 CARACTERES.';
            }
            return '';
          }
        },
        phone: {
          input: document.getElementById('input-phone'),
          group: document.getElementById('group-phone'),
          error: document.getElementById('error-phone'),
          touched: false,
          validate: function (val) {
            const clean = val.trim();
            if (!clean) return 'INGRESA TU NÚMERO DE CELULAR / WHATSAPP.';
            const digits = clean.replace(/\D/g, '');
            if (!/^[+\d\s()-]{8,20}$/.test(clean) || digits.length < 9 || digits.length > 15) {
              return 'FORMATO INVÁLIDO. INGRESA ENTRE 9 Y 15 DÍGITOS.';
            }
            return '';
          }
        },
        email: {
          input: document.getElementById('input-email'),
          group: document.getElementById('group-email'),
          error: document.getElementById('error-email'),
          touched: false,
          validate: function (val) {
            const clean = val.trim();
            if (!clean) return 'INGRESA TU CORREO ELECTRÓNICO.';
            if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(clean)) {
              return 'FORMATO DE CORREO ELECTRÓNICO INVÁLIDO.';
            }
            return '';
          }
        }
      };

      function evaluateField(key, forceShow) {
        const f = fields[key];
        if (!f || !f.input) return true;
        const msg = f.validate(f.input.value);
        const showError = Boolean(msg) && (f.touched || forceShow);

        f.group.classList.toggle('has-error', showError);
        f.group.classList.toggle('is-valid', !msg && f.input.value.trim().length > 0);
        f.input.setAttribute('aria-invalid', showError ? 'true' : 'false');
        f.error.textContent = showError ? '[ ERROR // ' + msg + ' ]' : '';
        return !msg;
      }

      Object.keys(fields).forEach(function (key) {
        const f = fields[key];
        if (!f.input) return;

        f.input.addEventListener('input', function () {
          evaluateField(key, false);
        });

        f.input.addEventListener('blur', function () {
          f.touched = true;
          evaluateField(key, true);
        });
      });

      const captureArea = document.getElementById('checkout-capture-area');
      const passContainer = document.getElementById('countdownPassContainer');
      const guestsInput = document.getElementById('input-guests');

      const passHolderName = document.getElementById('pass-holder-name');
      const passSerialNumber = document.getElementById('pass-serial-number');
      const passSerialHash = document.getElementById('pass-serial-hash');
      const passTierName = document.getElementById('pass-tier-name');
      const passTierPrice = document.getElementById('pass-tier-price');
      const passHolderPhone = document.getElementById('pass-holder-phone');
      const passHolderEmail = document.getElementById('pass-holder-email');
      const passAccessCounter = document.getElementById('pass-access-counter');
      const passQrCaption = document.getElementById('pass-qr-caption');
      const btnPrintPass = document.getElementById('btn-print-pass');
      const btnShareWhatsapp = document.getElementById('btn-share-whatsapp');
      const btnNewRegistration = document.getElementById('btn-new-registration');

      form.addEventListener('submit', function (e) {
        e.preventDefault();

        let allValid = true;
        let firstInvalid = null;

        Object.keys(fields).forEach(function (key) {
          fields[key].touched = true;
          const ok = evaluateField(key, true);
          if (!ok && allValid) {
            allValid = false;
            firstInvalid = fields[key].input;
          }
        });

        if (!allValid) {
          if (firstInvalid) firstInvalid.focus();
          return;
        }

        // Lectura dinámica de los datos ingresados y campos ocultos
        const firstName = fields.fullname.input.value.trim().replace(/\s+/g, ' ');
        const lastName = fields.lastname.input.value.trim().replace(/\s+/g, ' ');
        const fullHolderName = (firstName + (lastName ? ' ' + lastName : '')).toUpperCase();
        const phoneVal = fields.phone.input.value.trim();
        const emailVal = fields.email.input.value.trim().toUpperCase();
        const guestsCount = guestsInput ? parseInt(guestsInput.value, 10) || 0 : 0;

        const tierId = tierInput ? tierInput.value : 'ETAPA_01';
        const tierLabel = tierLabelInput ? tierLabelInput.value : 'ETAPA 01 · CUPOS INICIALES';
        const tierPrice = priceInput ? priceInput.value : '$10';

        // Serial único procedimental (#PG-0XX/100 + timestamp/hash)
        const slotNumber = String(Math.floor(1 + Math.random() * 99)).padStart(3, '0');
        const serialFormatted = '#PG-' + slotNumber + '/100';
        const tsHash =
          'TS-' +
          Date.now().toString(36).slice(-4).toUpperCase() +
          '-' +
          Math.random().toString(36).substring(2, 5).toUpperCase();

        // Actualizar DOM del Countdown Pass
        if (passHolderName) passHolderName.textContent = fullHolderName;
        if (passSerialNumber) passSerialNumber.textContent = serialFormatted;
        if (passSerialHash) passSerialHash.textContent = tsHash;
        if (passTierName) passTierName.textContent = tierLabel;
        if (passTierPrice) passTierPrice.textContent = tierPrice + ' USD';
        if (passHolderPhone) passHolderPhone.textContent = phoneVal;
        if (passHolderEmail) passHolderEmail.textContent = emailVal;

        if (passAccessCounter) {
          const guestWord = guestsCount === 1 ? 'ACOMPAÑANTE' : 'ACOMPAÑANTES';
          passAccessCounter.textContent =
            'ACCESO VÁLIDO PARA: TITULAR + ' + guestsCount + ' ' + guestWord;
        }

        const qrPayload =
          serialFormatted +
          '|' +
          tsHash +
          '|' +
          fullHolderName +
          '|' +
          tierId +
          '|' +
          tierPrice +
          '|+' +
          guestsCount;

        if (qrMount) {
          qrMount.innerHTML = generateProceduralQrSvg(qrPayload);
        }
        if (passQrCaption) {
          passQrCaption.textContent =
            'SERIAL: ' + serialFormatted + ' // REF: ' + tsHash + ' // D-VOID QUITO';
        }

        // Actualizar enlace de compartir en WhatsApp con datos del pase
        if (btnShareWhatsapp) {
          const waText =
            '¡Estoy dentro! Ya tengo mi COUNTDOWN PASS (' +
            serialFormatted +
            ') para DJ PADRE GUILHERME — PRE-PARTY en D-VOID Quito (12.NOV.2026 · 20H00 - 04H00). ' +
            '9 DAYS TO GO — THE COUNTDOWN STARTS HERE. Camino a Padre Guilherme Ecuador 2026 (21 NOV).';
          btnShareWhatsapp.href = 'https://wa.me/?text=' + encodeURIComponent(waText);
        }

        // Transición suave: colapsar área de captura y desplegar #countdownPassContainer
        if (captureArea) {
          captureArea.classList.add('is-collapsed');
        }

        if (passContainer) {
          passContainer.style.display = 'flex';
          void passContainer.offsetWidth;
          passContainer.classList.add('is-deployed');
          setTimeout(function () {
            passContainer.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }, 120);
        }

        // Persistencia en localStorage
        try {
          const passRecord = {
            fullName: fullHolderName,
            phone: phoneVal,
            email: emailVal,
            tier: tierId,
            tierLabel: tierLabel,
            price: tierPrice,
            guests: guestsCount,
            serial: serialFormatted,
            timestamp: tsHash
          };
          localStorage.setItem('dvoid_pg_pass', JSON.stringify(passRecord));
        } catch (err) {
          console.warn('No se pudo guardar la reserva en localStorage:', err);
        }
      });

      function restorePassFromStorage() {
        try {
          const stored = localStorage.getItem('dvoid_pg_pass');
          if (!stored) return;
          const data = JSON.parse(stored);
          if (!data || !data.fullName || !data.serial) return;

          if (passHolderName) passHolderName.textContent = data.fullName;
          if (passSerialNumber) passSerialNumber.textContent = data.serial;
          if (passSerialHash) passSerialHash.textContent = data.timestamp || 'TS-RESTORED';
          if (passTierName) passTierName.textContent = data.tierLabel || data.tier || 'ETAPA 01';
          if (passTierPrice) passTierPrice.textContent = (data.price || '$10') + ' USD';
          if (passHolderPhone) passHolderPhone.textContent = data.phone || '';
          if (passHolderEmail) passHolderEmail.textContent = data.email || '';

          const gCount = parseInt(data.guests, 10) || 0;
          if (passAccessCounter) {
            const guestWord = gCount === 1 ? 'ACOMPAÑANTE' : 'ACOMPAÑANTES';
            passAccessCounter.textContent =
              'ACCESO VÁLIDO PARA: TITULAR + ' + gCount + ' ' + guestWord;
          }

          const qrPayload =
            data.serial +
            '|' +
            (data.timestamp || 'TS-RESTORED') +
            '|' +
            data.fullName +
            '|' +
            data.tier +
            '|' +
            data.price +
            '|+' +
            gCount;

          if (qrMount) {
            qrMount.innerHTML = generateProceduralQrSvg(qrPayload);
          }
          if (passQrCaption) {
            passQrCaption.textContent =
              'SERIAL: ' + data.serial + ' // REF: ' + (data.timestamp || 'RESTORED') + ' // D-VOID QUITO';
          }

          if (btnShareWhatsapp) {
            const waText =
              '¡Estoy dentro! Ya tengo mi COUNTDOWN PASS (' +
              data.serial +
              ') para DJ PADRE GUILHERME — PRE-PARTY en D-VOID Quito (12.NOV.2026 · 20H00 - 04H00). ' +
              '9 DAYS TO GO — THE COUNTDOWN STARTS HERE. Camino a Padre Guilherme Ecuador 2026 (21 NOV).';
            btnShareWhatsapp.href = 'https://wa.me/?text=' + encodeURIComponent(waText);
          }

          if (captureArea) {
            captureArea.classList.add('is-collapsed');
          }
          if (passContainer) {
            passContainer.style.display = 'flex';
            passContainer.classList.add('is-deployed');
          }
        } catch (err) {
          console.warn('Error restaurando el pase desde localStorage:', err);
        }
      }

      restorePassFromStorage();

      if (btnPrintPass) {
        btnPrintPass.addEventListener('click', function () {
          window.print();
        });
      }

      if (btnNewRegistration) {
        btnNewRegistration.addEventListener('click', function () {
          try {
            localStorage.removeItem('dvoid_pg_pass');
          } catch (err) {}
          if (passContainer) {
            passContainer.classList.remove('is-deployed');
            passContainer.style.display = 'none';
          }
          if (captureArea) {
            captureArea.classList.remove('is-collapsed');
            form.reset();
            Object.keys(fields).forEach(function (key) {
              fields[key].touched = false;
              fields[key].group.classList.remove('has-error', 'is-valid');
              fields[key].error.textContent = '';
            });
            captureArea.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        });
      }
    })();
