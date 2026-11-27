/* VeloxVid — comportamento compartilhado do site (início, planos e 404).
   A versão do aplicativo e o link de download ficam em assets/release.js. */
(function () {
  'use strict';

  var API_URL = 'https://veloxvid-production.up.railway.app';
  var PLANS = {
    mensal:     { label: 'Mensal',     price: 'R$299/mês' },
    trimestral: { label: 'Trimestral', price: 'R$279/mês' },
    anual:      { label: 'Anual',      price: 'R$249/mês' }
  };

  function $(sel, root) { return (root || document).querySelector(sel); }
  function $all(sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); }

  // ─── Nav: fundo ao rolar ───────────────────────────────────
  var nav = $('#nav');
  if (nav && !nav.classList.contains('solid')) {
    var onScroll = function () { nav.classList.toggle('scrolled', window.scrollY > 20); };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  // ─── Nav: menu de celular ──────────────────────────────────
  var navLinks = $('#navLinks');
  var burger = $('#navHamburger');

  function setMobileMenu(open) {
    if (!navLinks || !burger) return;
    navLinks.classList.toggle('mobile-open', open);
    burger.classList.toggle('open', open);
    burger.setAttribute('aria-expanded', open ? 'true' : 'false');
    document.body.style.overflow = open ? 'hidden' : '';
  }
  if (burger) {
    burger.addEventListener('click', function () {
      setMobileMenu(!navLinks.classList.contains('mobile-open'));
    });
  }
  if (navLinks) {
    navLinks.addEventListener('click', function (e) {
      if (e.target.closest('a')) setMobileMenu(false);
    });
  }

  // ─── Hero: barras da narração ──────────────────────────────
  var wf = $('#waveform');
  if (wf) {
    [20,35,55,70,45,80,60,90,65,50,85,40,75,55,70,45,60,80,35,65,50,75,40,85,55,70,45,60,35,80].forEach(function (h, i) {
      var bar = document.createElement('div');
      bar.className = 'waveform-bar';
      bar.style.cssText = 'height:' + h + '%; --d:' + (0.8 + Math.random() * 0.8) + 's; --delay:' + (i * 0.04).toFixed(2) + 's';
      wf.appendChild(bar);
    });
  }

  // ─── Hero: a janela em três atos ───────────────────────────
  // Roteiro → Produção → Vídeo pronto, em laço. Só roda com a janela à vista
  // e a aba aberta; com "reduzir movimento" ligado, fica parada no ato 2.
  var heroWin = $('#heroActs');
  if (heroWin) {
    var actEls = $all('.hero-act', heroWin);
    var stepEls = $all('.hero-step', heroWin);
    var actName = $('#heroActName');
    var actVideo = $('video', heroWin);
    var ACT_MS = [4400, 5800, 6600];
    var reduceMotion = !!(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches);
    var currentAct = -1;
    var actTimer = null;
    var actsInView = false;

    // O vídeo é baixado inteiro e tocado da memória: o servidor não atende pedidos
    // parciais (Range), que o Safari exige para tocar direto do endereço.
    var actVideoAsked = false;
    var playActVideo = function () {
      if (!actVideo || currentAct !== 2 || reduceMotion || !actVideo.getAttribute('src')) return;
      try { actVideo.currentTime = 0; } catch (err) { /* ainda sem dados */ }
      var playing = actVideo.play();
      if (playing && playing.catch) playing.catch(function () {});
    };
    var loadActVideo = function () {
      if (!actVideo || actVideoAsked || !actVideo.dataset.src) return;
      actVideoAsked = true;
      var direct = function () { actVideo.src = actVideo.dataset.src; playActVideo(); };
      if (!window.fetch || !window.URL || !URL.createObjectURL) { direct(); return; }
      fetch(actVideo.dataset.src)
        .then(function (res) { if (!res.ok) throw new Error('vídeo'); return res.blob(); })
        .then(function (blob) { actVideo.src = URL.createObjectURL(blob); playActVideo(); })
        .catch(direct);
    };

    var showAct = function (i) {
      currentAct = i;
      actEls.forEach(function (el, k) {
        el.classList.remove('is-active');
        if (k === i) { void el.offsetWidth; el.classList.add('is-active'); }
      });
      stepEls.forEach(function (el, k) {
        el.classList.remove('is-active', 'is-done');
        el.style.setProperty('--dur', ACT_MS[k] + 'ms');
        el.setAttribute('aria-pressed', k === i ? 'true' : 'false');
        if (k < i) el.classList.add('is-done');
        if (k === i) { void el.offsetWidth; el.classList.add(reduceMotion ? 'is-done' : 'is-active'); }
      });
      if (actName && actEls[i]) actName.textContent = actEls[i].dataset.name || '';
      if (i >= 1) loadActVideo();
      if (actVideo) {
        if (i === 2) playActVideo(); else actVideo.pause();
      }
    };

    var scheduleAct = function () {
      clearTimeout(actTimer);
      if (reduceMotion || !actsInView || document.hidden) return;
      actTimer = setTimeout(function () {
        showAct((currentAct + 1) % actEls.length);
        scheduleAct();
      }, ACT_MS[currentAct]);
    };

    stepEls.forEach(function (el, k) {
      el.addEventListener('click', function () { showAct(k); scheduleAct(); });
    });

    showAct(reduceMotion ? 1 : 0);

    if ('IntersectionObserver' in window) {
      new IntersectionObserver(function (entries) {
        actsInView = entries[0].isIntersecting;
        if (actsInView) scheduleAct(); else { clearTimeout(actTimer); if (actVideo) actVideo.pause(); }
      }, { threshold: 0.25 }).observe(heroWin);
    } else {
      actsInView = true;
      scheduleAct();
    }
    document.addEventListener('visibilitychange', scheduleAct);
  }

  // ─── Entrada das seções ────────────────────────────────────
  var fadeEls = $all('.fade-up');
  if ('IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    fadeEls.forEach(function (el) { observer.observe(el); });
  } else {
    fadeEls.forEach(function (el) { el.classList.add('visible'); });
  }

  // ─── FAQ ───────────────────────────────────────────────────
  var faqItems = $all('.faq-item');
  faqItems.forEach(function (item) {
    var btn = $('.faq-q', item);
    var body = $('.faq-a', item);
    if (!btn || !body) return;
    btn.setAttribute('aria-expanded', 'false');
    btn.addEventListener('click', function () {
      var wasOpen = item.classList.contains('open');
      faqItems.forEach(function (other) {
        other.classList.remove('open');
        var b = $('.faq-a', other), q = $('.faq-q', other);
        if (b) b.style.maxHeight = '0';
        if (q) q.setAttribute('aria-expanded', 'false');
      });
      if (!wasOpen) {
        item.classList.add('open');
        body.style.maxHeight = body.scrollHeight + 'px';
        btn.setAttribute('aria-expanded', 'true');
      }
    });
  });

  // ─── Âncoras ───────────────────────────────────────────────
  document.addEventListener('click', function (e) {
    var a = e.target.closest('a[href^="#"]');
    if (!a) return;
    var id = a.getAttribute('href');
    if (id === '#') {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    var target = document.querySelector(id);
    if (!target) return;
    e.preventDefault();
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    history.replaceState(null, '', id);
  });

  // ─── Checkout ──────────────────────────────────────────────
  var activePlan = 'anual';
  var modal = null;
  var lastFocus = null;

  function buildModal() {
    var opts = Object.keys(PLANS).map(function (key) {
      return '<button type="button" class="plan-opt" data-plan="' + key + '">' +
        PLANS[key].label + '<small>' + PLANS[key].price + '</small></button>';
    }).join('');

    var el = document.createElement('div');
    el.className = 'modal-overlay';
    el.id = 'checkoutModal';
    el.innerHTML =
      '<div class="modal-box" role="dialog" aria-modal="true" aria-labelledby="checkoutTitle">' +
        '<button type="button" class="modal-close" aria-label="Fechar">✕</button>' +
        '<div class="modal-title" id="checkoutTitle">Criar conta</div>' +
        '<p class="modal-sub">Preencha para prosseguir com o pagamento</p>' +
        '<div class="plan-select" role="group" aria-label="Ciclo de cobrança">' + opts + '</div>' +
        '<div class="modal-alert modal-alert-error" id="checkoutError" role="alert"></div>' +
        '<form id="checkoutForm">' +
          '<div class="modal-form-group">' +
            '<label class="modal-label" for="ckNome">Nome completo</label>' +
            '<input class="modal-input" type="text" id="ckNome" placeholder="Seu nome" required autocomplete="name" />' +
          '</div>' +
          '<div class="modal-form-group">' +
            '<label class="modal-label" for="ckEmail">E-mail</label>' +
            '<input class="modal-input" type="email" id="ckEmail" placeholder="seu@email.com" required autocomplete="email" />' +
          '</div>' +
          '<div class="modal-form-group">' +
            '<label class="modal-label" for="ckSenha">Senha <span>(mínimo 6 caracteres)</span></label>' +
            '<input class="modal-input" type="password" id="ckSenha" placeholder="••••••••" required minlength="6" autocomplete="new-password" />' +
          '</div>' +
          '<button class="modal-btn" type="submit" id="checkoutBtn">Continuar para pagamento →</button>' +
        '</form>' +
        '<p class="modal-note">Os serviços de IA usados na produção são pagos à parte, direto a cada provedor. ' +
          'Ao continuar, você aceita os <a href="/termos" target="_blank" rel="noopener">Termos de Uso</a> e a ' +
          '<a href="/privacidade" target="_blank" rel="noopener">Política de Privacidade</a>.</p>' +
        '<div class="modal-footer">Já tem conta? <a href="/conta">Entrar →</a></div>' +
      '</div>';
    document.body.appendChild(el);

    el.addEventListener('click', function (e) {
      if (e.target === el || e.target.closest('.modal-close')) { closeCheckout(); return; }
      var opt = e.target.closest('.plan-opt');
      if (opt) selectPlan(opt.dataset.plan);
    });
    $('#checkoutForm', el).addEventListener('submit', doCheckout);
    return el;
  }

  function selectPlan(plan) {
    activePlan = PLANS[plan] ? plan : 'anual';
    if (!modal) return;
    $all('.plan-opt', modal).forEach(function (btn) {
      var on = btn.dataset.plan === activePlan;
      btn.classList.toggle('active', on);
      btn.setAttribute('aria-pressed', on ? 'true' : 'false');
    });
  }

  function openCheckout(plan) {
    if (!modal) modal = buildModal();
    lastFocus = document.activeElement;
    setMobileMenu(false);
    selectPlan(plan);
    $('#checkoutError', modal).classList.remove('show');
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
    var first = $('#ckNome', modal);
    if (first) first.focus();
  }

  function closeCheckout() {
    if (!modal) return;
    modal.classList.remove('open');
    document.body.style.overflow = '';
    if (lastFocus && lastFocus.focus) lastFocus.focus();
  }

  function showCheckoutError(html) {
    var errEl = $('#checkoutError', modal);
    errEl.innerHTML = html;
    errEl.classList.add('show');
  }

  function escapeHtml(text) {
    var d = document.createElement('div');
    d.textContent = text;
    return d.innerHTML;
  }

  async function doCheckout(e) {
    e.preventDefault();
    $('#checkoutError', modal).classList.remove('show');

    var btn = $('#checkoutBtn', modal);
    btn.disabled = true;
    btn.textContent = 'Processando...';

    var name     = $('#ckNome', modal).value.trim();
    var email    = $('#ckEmail', modal).value.trim();
    var password = $('#ckSenha', modal).value;

    try {
      var res = await fetch(API_URL + '/checkout/register-and-subscribe', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ name: name, email: email, password: password, plano: activePlan })
      });
      var data = await res.json();

      if (!res.ok) {
        var detail = typeof data.detail === 'string' ? data.detail : '';
        if (res.status === 400 && /assinatura ativ/i.test(detail)) {
          showCheckoutError('Este e-mail já tem assinatura ativa. <a href="/conta">Entrar →</a>');
        } else {
          showCheckoutError(escapeHtml(detail || 'Erro ao processar. Tente novamente.'));
        }
        return;
      }

      window.location.href = data.url;
    } catch (err) {
      showCheckoutError('Erro de conexão. Verifique sua internet e tente novamente.');
    } finally {
      btn.disabled = false;
      btn.textContent = 'Continuar para pagamento →';
    }
  }

  document.addEventListener('click', function (e) {
    var trigger = e.target.closest('[data-checkout]');
    if (!trigger) return;
    e.preventDefault();
    openCheckout(trigger.dataset.checkout);
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') { closeCheckout(); setMobileMenu(false); }
  });

  // Abre o cadastro quando a página chega com ?checkout=<plano> (usado pela área da conta).
  var autoPlan = new URLSearchParams(location.search).get('checkout');
  if (autoPlan) {
    history.replaceState({}, '', location.pathname + location.hash);
    requestAnimationFrame(function () { openCheckout(autoPlan); });
  }

  window.openCheckout = openCheckout;
  window.closeCheckout = closeCheckout;

  // ─── Sessão no menu ────────────────────────────────────────
  function clearToken() {
    localStorage.removeItem('vv_token');
    sessionStorage.removeItem('vv_token');
  }

  function navLogout() {
    var token = localStorage.getItem('vv_token') || sessionStorage.getItem('vv_token');
    if (token) {
      fetch(API_URL + '/auth/session', {
        method: 'DELETE',
        headers: { Authorization: 'Bearer ' + token }
      }).catch(function () {});
    }
    clearToken();
    location.reload();
  }
  window.navLogout = navLogout;

  var logoutLink = $('#navLogoutLink');
  if (logoutLink) {
    logoutLink.addEventListener('click', function (e) { e.preventDefault(); navLogout(); });
  }

  (async function initNavAuth() {
    var item = $('#navAuthItem');
    var token = localStorage.getItem('vv_token') || sessionStorage.getItem('vv_token');
    if (!item || !token) return;
    try {
      var res = await fetch(API_URL + '/auth/me', { headers: { Authorization: 'Bearer ' + token } });
      if (!res.ok) { clearToken(); return; }
      var user = await res.json();
      var displayName = user.name || user.email.split('@')[0];

      var link = document.createElement('a');
      link.href = '/conta';
      link.className = 'nav-user';
      var avatar = document.createElement('span');
      avatar.className = 'nav-user-avatar';
      avatar.textContent = displayName.charAt(0).toUpperCase();
      link.appendChild(avatar);
      link.appendChild(document.createTextNode(displayName));
      item.textContent = '';
      item.appendChild(link);

      // Quem já está logado não precisa de "Assinar agora"; ganha "Sair".
      var subItem = $('#navSubscribeItem');
      if (subItem) subItem.style.display = 'none';
      var logoutItem = $('#navLogoutItem');
      if (logoutItem) logoutItem.style.display = 'list-item';
    } catch (err) { /* silencioso: não bloqueia a página */ }
  })();
})();
