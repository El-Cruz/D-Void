/**
 * CRIMINIX INTERACTIVE ENGINE · D-VOID (07 DE NOVIEMBRE 2026)
 * Lógica pura Vanilla JS a 60fps
 * - Escáner biométrico con instrucción exacta "Desbloquear su Expediente"
 * - Selector de evidencias forenses y bando de sospechoso
 * - Generación de pase digital / ficha policial clasificada con código QR gráfico
 */
(function () {
  'use strict';

  // 1. Elementos del DOM
  const scannerBtn = document.getElementById('scanner-trigger');
  const scannerStatus = document.getElementById('scanner-status');
  const scannerFlash = document.getElementById('scanner-flash');
  const terminalHero = document.getElementById('terminal-hero');
  const heightScales = document.querySelectorAll('.mugshot-height-scale');
  const dossierSection = document.getElementById('dossier-section');
  const terminalHeader = document.querySelector('.terminal-header');
  const cctvClock = document.getElementById('cctv-clock');

  // Formulario y Ficha Policial
  const suspectForm = document.getElementById('suspect-form');
  const formContainer = document.getElementById('form-container');
  const classifiedPass = document.getElementById('classified-dossier-pass');
  const pricingGrid = document.getElementById('pricing-grid');
  const selectedTicketDisplay = document.getElementById('selected-ticket-display');
  const selectedCategoryDisplay = document.getElementById('selected-category-display');
  const facultadSelect = document.getElementById('field-facultad');
  const passFacultad = document.getElementById('pass-facultad');
  const mugshotCards = document.querySelectorAll('.mugshot-card');
  const qrTarget = document.getElementById('pass-qr-render');
  const btnShareWhatsApp = document.getElementById('btn-share-whatsapp');
  const btnResetDossier = document.getElementById('btn-reset-dossier');

  // Variables de Estado
  let currentSelectedTicket = 'Promo Amigos ($60 / 5 pax)';
  if (pricingGrid) {
    const initialSelectedCard = pricingGrid.querySelector('.evidence-card.selected[data-ticket]');
    if (initialSelectedCard) {
      currentSelectedTicket = initialSelectedCard.getAttribute('data-ticket') || currentSelectedTicket;
    }
  }
  let currentFaction = 'SEGURIDAD';
  const REQUIRED_HOLD_MS = 2000;
  let scanTimer = null;
  let isHolding = false;
  let isUnlocked = false;

  // Textos del Escáner (Instrucción Exacta Requerida)
  const TEXT_DEFAULT = '[ MANTENER PRESIONADO PARA DESBLOQUEAR SU EXPEDIENTE ]';
  const TEXT_SCANNING = '[ ESCANEANDO HUELLA BIOMÉTRICA... ]';
  const TEXT_GRANTED = '/// HUELLA AUTORIZADA // EXPEDIENTE DESBLOQUEADO ///';
  const TEXT_ERROR = '[ ERROR: LECTURA INTERRUMPIDA - REINTENTAR ]';

  /* ==========================================================================
     1. RELOJ CCTV EN TIEMPO REAL
     ========================================================================== */
  function updateCCTVClock() {
    if (!cctvClock) return;
    const now = new Date();
    const pad = (n) => String(n).padStart(2, '0');
    const timeStr = `${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`;
    cctvClock.textContent = `2026-11-07 ${timeStr} UTC-5 // CAM-07`;
  }
  setInterval(updateCCTVClock, 1000);
  updateCCTVClock();

  /* ==========================================================================
     2. ESCÁNER BIOMÉTRICO (GANCHO VALIDADO)
     ========================================================================== */
  function triggerHaptic(pattern) {
    if (typeof navigator !== 'undefined' && 'vibrate' in navigator) {
      try {
        navigator.vibrate(pattern);
      } catch (err) {
        // Vibración no soportada o bloqueada por política de usuario
      }
    }
  }

  function startScan(e) {
    if (isUnlocked || isHolding) return;
    if (e && e.type === 'touchstart') e.preventDefault();

    isHolding = true;
    scannerBtn.classList.add('scanning');
    scannerStatus.textContent = TEXT_SCANNING;
    scannerStatus.className = 'scanner-instruction scanning-text';

    triggerHaptic([40, 60, 40]);
    scanTimer = setTimeout(grantAccess, REQUIRED_HOLD_MS);
  }

  function cancelScan() {
    if (isUnlocked || !isHolding) return;

    isHolding = false;
    clearTimeout(scanTimer);
    scanTimer = null;

    scannerBtn.classList.remove('scanning');
    scannerStatus.textContent = TEXT_ERROR;
    scannerStatus.className = 'scanner-instruction error-text';
    triggerHaptic(80);

    setTimeout(() => {
      if (!isHolding && !isUnlocked) {
        scannerStatus.textContent = TEXT_DEFAULT;
        scannerStatus.className = 'scanner-instruction';
      }
    }, 1100);
  }

  function grantAccess() {
    isUnlocked = true;
    isHolding = false;
    clearTimeout(scanTimer);
    scanTimer = null;

    scannerBtn.classList.remove('scanning');
    scannerBtn.classList.add('granted');
    scannerStatus.textContent = TEXT_GRANTED;
    scannerStatus.className = 'scanner-instruction granted-text';

    triggerHaptic([60, 30, 100, 30, 150]);

    // Flash rojo de pantalla estroboscópico
    if (scannerFlash) {
      scannerFlash.classList.add('flash-active');
    }

    // Desvanecimiento suave del hero y ajuste de cintas policiales
    setTimeout(() => {
      terminalHero.classList.add('fade-out');
      if (terminalHeader) {
        terminalHeader.style.opacity = '0';
        terminalHeader.style.pointerEvents = 'none';
      }
      if (heightScales.length) heightScales.forEach(el => el.style.opacity = '0.08');

    }, 280);

    // Revelar el dossier forense y activar scroll nativo
    setTimeout(() => {
      document.body.classList.add('dossier-unlocked');
      terminalHero.style.display = 'none';
      dossierSection.style.display = 'block';
      window.scrollTo({ top: 0, behavior: 'instant' });
    }, 720);
  }

  // Event Listeners del Escáner (Pointer Events de alta precisión + fallback táctil/ratón/teclado)
  if (scannerBtn) {
    if ('PointerEvent' in window) {
      scannerBtn.addEventListener('pointerdown', (e) => {
        try { scannerBtn.setPointerCapture(e.pointerId); } catch (_) {}
        startScan(e);
      });
      scannerBtn.addEventListener('pointerup', cancelScan);
      scannerBtn.addEventListener('pointercancel', cancelScan);
    } else {
      scannerBtn.addEventListener('mousedown', startScan);
      window.addEventListener('mouseup', cancelScan);
      scannerBtn.addEventListener('mouseleave', cancelScan);

      scannerBtn.addEventListener('touchstart', startScan, { passive: false });
      window.addEventListener('touchend', cancelScan);
      window.addEventListener('touchcancel', cancelScan);
    }

    scannerBtn.addEventListener('keydown', (e) => {
      if ((e.key === ' ' || e.key === 'Enter') && !e.repeat) {
        e.preventDefault();
        startScan();
      }
    });
    window.addEventListener('keyup', (e) => {
      if (e.key === ' ' || e.key === 'Enter') cancelScan();
    });
  }

  /* ==========================================================================
     3. SELECCIÓN DE TARJETAS DE EVIDENCIA (TARIFAS FORENSES)
     ========================================================================== */
  if (pricingGrid) {
    const evidenceCards = pricingGrid.querySelectorAll('.evidence-card:not(.is-soldout)');
    evidenceCards.forEach((card) => {
      card.addEventListener('click', () => {
        evidenceCards.forEach((c) => {
          c.classList.remove('selected');
          c.setAttribute('aria-checked', 'false');
        });
        card.classList.add('selected');
        card.setAttribute('aria-checked', 'true');
        currentSelectedTicket = card.getAttribute('data-ticket') || 'Promo Amigos ($60 / 5 pax)';

        if (selectedTicketDisplay) {
          selectedTicketDisplay.textContent = currentSelectedTicket.toUpperCase();
        }
        triggerHaptic(25);
      });

      card.addEventListener('keydown', (e) => {
        if (e.key === ' ' || e.key === 'Enter') {
          e.preventDefault();
          card.click();
        }
      });
    });
  }

  /* ==========================================================================
     4. SELECCIÓN DE BANDO DE SOSPECHOSO (DRESS CODE)
     ========================================================================== */
  mugshotCards.forEach((card) => {
    card.addEventListener('click', () => {
      mugshotCards.forEach((c) => c.classList.remove('active-faction'));
      card.classList.add('active-faction');
      const faction = card.getAttribute('data-faction') || 'SEGURIDAD';
      currentFaction = faction;

      if (selectedCategoryDisplay) {
        selectedCategoryDisplay.textContent = `BANDO SELECCIONADO: ${faction}`;
      }
      triggerHaptic(20);
    });

    card.addEventListener('keydown', (e) => {
      if (e.key === ' ' || e.key === 'Enter') {
        e.preventDefault();
        card.click();
      }
    });
  });

  /* ==========================================================================
     5. ENVÍO DEL FORMULARIO Y GENERACIÓN DE FICHA POLICIAL CLASIFICADA
     ========================================================================== */
  if (suspectForm) {
    suspectForm.addEventListener('submit', function (e) {
      e.preventDefault();

      const nombreInput = document.getElementById('field-nombre');
      const apellidoInput = document.getElementById('field-apellido');
      const cedulaInput = document.getElementById('field-cedula');
      const telefonoInput = document.getElementById('field-telefono');

      const nombre = (nombreInput ? nombreInput.value : '').trim();
      const apellido = (apellidoInput ? apellidoInput.value : '').trim();
      const cedula = (cedulaInput ? cedulaInput.value : '').trim();
      const telefono = (telefonoInput ? telefonoInput.value : '').trim();
      const facultad = (facultadSelect && facultadSelect.selectedIndex > 0
        ? facultadSelect.options[facultadSelect.selectedIndex].text
        : (facultadSelect ? facultadSelect.value : '')).trim();

      if (!nombre || !apellido || !cedula || !telefono || !facultadSelect || !facultadSelect.value) {
        alert('ADVERTENCIA FORENSE: TODOS LOS CAMPOS DE LA COARTADA Y LA FACULTAD SON OBLIGATORIOS.');
        return;
      }

      // Validación simple de cédula (10 dígitos)
      const cleanCedula = cedula.replace(/\D/g, '');
      if (cleanCedula.length < 9) {
        alert('POR FAVOR INGRESA UN DOCUMENTO O CÉDULA VÁLIDA.');
        return;
      }

      // Generar Folio Único y Hash Criptográfico
      const randomId = Math.floor(1000 + Math.random() * 9000);
      const caseFolio = `#CRIM-0711-${randomId}`;
      const verificationToken = `DVOID-CRIMINIX-2026-${randomId}-${cleanCedula}`;
      const hashStr = `SHA-256: ${Math.random().toString(16).substring(2, 10)}${Math.random().toString(16).substring(2, 10).toUpperCase()}`;

      // Inyectar datos en la Ficha Policial
      const nombreCompleto = `${nombre} ${apellido}`.toUpperCase();
      document.getElementById('pass-nombre').textContent = nombreCompleto;
      document.getElementById('pass-cedula').textContent = cleanCedula;
      document.getElementById('pass-telefono').textContent = telefono;
      if (passFacultad) {
        passFacultad.textContent = facultad.toUpperCase();
      }
      document.getElementById('pass-categoria').textContent = currentFaction.toUpperCase();
      document.getElementById('pass-ticket').textContent = currentSelectedTicket.toUpperCase();
      document.getElementById('pass-folio').textContent = caseFolio;
      document.getElementById('pass-hash').textContent = `${hashStr} · COARTADA VERIFICADA`;

      // Renderizar el Código QR Gráfico Procedural
      if (qrTarget && typeof window.CriminixQR !== 'undefined') {
        const qrContent = `https://dvoid.club/criminix?folio=CRIM-${randomId}&id=${cleanCedula}&bando=${encodeURIComponent(currentFaction)}&facultad=${encodeURIComponent(facultad)}`;
        const qrSvg = window.CriminixQR.generateSVG(qrContent, 175, '#050505', '#FFFFFF');
        qrTarget.innerHTML = qrSvg;
      }

      // Configurar enlace de compartir en WhatsApp
      if (btnShareWhatsApp) {
        const shareMsg = encodeURIComponent(
          `🔒 EXPEDIENTE CRIMINIX ASEGURADO 🔒\n\n` +
          `Sospechoso: ${nombreCompleto}\n` +
          `Facultad: ${facultad}\n` +
          `Bando: ${currentFaction}\n` +
          `Folio Oficial: ${caseFolio}\n` +
          `Entrada: ${currentSelectedTicket}\n` +
          `Acceso: AUTORIZADO (+18)\n` +
          `Fecha: Sábado 07 de Noviembre 2026\n` +
          `D-VOID Club · 20H00\n\n` +
          `"Nadie es tan inocente como parece. ¿De qué lado estás?"\n` +
          `Desbloquea tu expediente aquí: https://dvoid.club/criminix`
        );
        btnShareWhatsApp.href = `https://api.whatsapp.com/send?text=${shareMsg}`;
      }

      // Ocultar el formulario y revelar la Ficha Policial Clasificada
      formContainer.style.display = 'none';
      classifiedPass.style.display = 'block';

      triggerHaptic([80, 50, 120]);

      // Scroll suave hacia la ficha policial
      classifiedPass.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  }

    // Botón para Registrar Otro Sospechoso
  if (btnResetDossier) {
    btnResetDossier.addEventListener('click', () => {
      if (suspectForm) suspectForm.reset();
      classifiedPass.style.display = 'none';
      formContainer.style.display = 'block';
      formContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  }

  /* ==========================================================================
     6. SOPORTE DE PREVISUALIZACIÓN DE ESTADOS (?preview=dossier / ?preview=pass)
     ========================================================================== */
  try {
    const urlParams = new URLSearchParams(window.location.search);
    const previewMode = urlParams.get('preview');

    if (previewMode === 'dossier') {
      if (terminalHero) terminalHero.style.display = 'none';
      if (terminalHeader) terminalHeader.style.opacity = '0';
      if (heightScales.length) heightScales.forEach(el => el.style.opacity = '0.08');
      if (dossierSection) dossierSection.style.display = 'block';
      document.body.classList.add('dossier-unlocked');
    } else if (previewMode === 'pass') {
      if (terminalHero) terminalHero.style.display = 'none';
      if (terminalHeader) terminalHeader.style.opacity = '0';
      if (heightScales.length) heightScales.forEach(el => el.style.opacity = '0.08');
      if (dossierSection) dossierSection.style.display = 'block';
      document.body.classList.add('dossier-unlocked');

      // Ocultar bloques anteriores para enfocar la ficha policial
      document.querySelectorAll('.dossier-header-bar, .case-evidence-banner, .lineup-feature-box, .warning-banner, .mugshot-grid, .evidence-grid, .timeline-grid, .section-label').forEach(el => {
        el.style.display = 'none';
      });

      if (formContainer) formContainer.style.display = 'none';
      if (classifiedPass) classifiedPass.style.display = 'block';

      document.getElementById('pass-nombre').textContent = 'CARLOS ANDRADE';
      document.getElementById('pass-cedula').textContent = '1723456789';
      document.getElementById('pass-telefono').textContent = '0991234567';
      if (passFacultad) passFacultad.textContent = 'JURISPRUDENCIA · PUCE';
      document.getElementById('pass-categoria').textContent = 'MÉDICOS';
      document.getElementById('pass-ticket').textContent = 'PROMO AMIGOS ($60 / 5 PAX)';
      document.getElementById('pass-folio').textContent = '#CRIM-0711-4092';
      document.getElementById('pass-hash').textContent = 'SHA-256: 9E4F281B94C0A... · COARTADA VERIFICADA';

      if (qrTarget && typeof window.CriminixQR !== 'undefined') {
        const qrContent = 'https://dvoid.club/criminix?folio=CRIM-4092&id=1723456789&bando=MEDICOS';
        qrTarget.innerHTML = window.CriminixQR.generateSVG(qrContent, 175, '#050505', '#FFFFFF');
      }
    }
  } catch (e) {
    // Modo de navegación estándar
  }
})();
