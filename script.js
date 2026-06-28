(() => {
  const props = Object.assign({
    motionStyle: 'Cinematic',
    gradeStyle: 'Teal & Orange',
    showMetricBadges: true
  }, window.HexafilmConfig || {});

  const initHexafilm = () => {
    const reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const motion = props.motionStyle || 'Cinematic';
    const animate = !reduce && motion !== 'Off';
    const subtle = motion === 'Subtle';

    // --- comparison check / cross marks ---
    document.querySelectorAll('[data-yes]').forEach(s => {
      s.style.cssText = 'display:inline-flex;align-items:center;justify-content:center;width:22px;height:22px;border-radius:50%;background:rgba(47,211,192,.15);color:#2FD3C0;font-size:13px;font-weight:700;margin-right:10px;vertical-align:middle';
      s.textContent = '\u2713';
    });
    document.querySelectorAll('[data-no]').forEach(s => {
      s.style.cssText = 'display:inline-flex;align-items:center;justify-content:center;width:22px;height:22px;border-radius:50%;background:rgba(107,114,128,.18);color:#6B7280;font-size:12px;font-weight:700;margin-right:10px;vertical-align:middle';
      s.textContent = '\u2715';
    });

    // --- grade restyle ---
    const grade = props.gradeStyle || 'Teal & Orange';
    const grades = {
      'Warm Ember': 'radial-gradient(120% 90% at 75% 12%,rgba(245,147,61,.55),transparent 55%),radial-gradient(130% 120% at 8% 95%,rgba(224,123,34,.32),transparent 58%),linear-gradient(135deg,#1a120b,#120d0a 55%,#1c130c)',
      'Cool Teal': 'radial-gradient(120% 90% at 75% 12%,rgba(47,211,192,.5),transparent 55%),radial-gradient(130% 120% at 8% 95%,rgba(20,110,108,.32),transparent 58%),linear-gradient(135deg,#0c1719,#0b1213 55%,#0e1a1a)'
    };
    if (grades[grade]) {
      document.querySelectorAll('[data-grade]').forEach(el => { el.style.background = grades[grade]; });
    }

    // --- metric badges toggle ---
    if (props.showMetricBadges === false) {
      document.querySelectorAll('[data-metric-badge]').forEach(el => { el.style.display = 'none'; });
    }

    // --- aperture open animation ---
    if (animate) {
      document.querySelectorAll('[data-aperture]').forEach(el => {
        el.style.transformOrigin = 'center';
        el.style.animation = 'hxAperture 1.05s cubic-bezier(.16,1,.3,1) both';
      });
      document.querySelectorAll('[data-float]').forEach((el, i) => {
        if (!subtle) el.style.animation = `hxFloat ${4 + i * 0.7}s ease-in-out ${i * 0.3}s infinite`;
      });
      document.querySelectorAll('[data-pulse]').forEach(el => {
        if (!subtle) el.style.animation = 'hxPulse 2.6s ease-out infinite';
      });
    }

    // --- scroll reveal (scroll/rAF based; IntersectionObserver is unreliable in some embeds) ---
    const items = Array.prototype.slice.call(document.querySelectorAll('[data-reveal]'));
    const reveal = (el) => {
      if (el._shown) return;
      el._shown = true;
      const d = parseFloat(el.getAttribute('data-delay') || '0');
      el.style.transitionDelay = d + 'ms';
      el.style.opacity = '1';
      el.style.transform = 'none';
    };
    if (!animate) {
      items.forEach(reveal);
    } else {
      items.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(26px)';
        el.style.transition = 'opacity .7s cubic-bezier(.16,1,.3,1), transform .7s cubic-bezier(.16,1,.3,1)';
      });
      let ticking = false;
      const check = () => {
        ticking = false;
        const vh = window.innerHeight || document.documentElement.clientHeight;
        items.forEach(el => {
          if (el._shown) return;
          const r = el.getBoundingClientRect();
          if (r.top < vh * 0.88 && r.bottom > -40) reveal(el);
        });
      };
      const onScroll = () => { if (!ticking) { ticking = true; requestAnimationFrame(check); } };
      window.addEventListener('scroll', onScroll, { passive: true });
      window.addEventListener('resize', onScroll);
      requestAnimationFrame(check);
      // safety: never leave content hidden
      setTimeout(() => items.forEach(reveal), 2200);
    }

    // --- FAQ accordion ---
    document.querySelectorAll('[data-faq-q]').forEach(btn => {
      btn.addEventListener('click', () => {
        const item = btn.closest('[data-faq]');
        const ans = item.querySelector('[data-faq-a]');
        const icon = btn.querySelector('[data-faq-icon]');
        const open = item.getAttribute('data-open') === '1';
        if (open) {
          ans.style.maxHeight = '0px';
          ans.style.opacity = '0';
          item.setAttribute('data-open', '0');
          item.style.borderColor = '#232730';
          if (icon) icon.style.transform = 'rotate(0deg)';
          btn.setAttribute('aria-expanded', 'false');
        } else {
          ans.style.maxHeight = ans.scrollHeight + 'px';
          ans.style.opacity = '1';
          item.setAttribute('data-open', '1');
          item.style.borderColor = 'rgba(245,147,61,.4)';
          if (icon) icon.style.transform = 'rotate(45deg)';
          btn.setAttribute('aria-expanded', 'true');
        }
      });
    });

    // --- responsive nav ---
    const links = document.querySelector('[data-nav-links]');
    const burger = document.querySelector('[data-nav-burger]');
    const menu = document.querySelector('[data-nav-menu]');
    let menuOpen = false;
    const applyNav = () => {
      const mobile = window.innerWidth < 1120;
      if (mobile) {
        if (links) links.style.display = 'none';
        if (burger) burger.style.display = 'inline-flex';
      } else {
        if (links) links.style.display = 'flex';
        if (burger) burger.style.display = 'none';
        if (menu) menu.style.display = 'none';
        menuOpen = false;
      }
    };
    if (burger && menu) {
      burger.addEventListener('click', () => {
        menuOpen = !menuOpen;
        menu.style.display = menuOpen ? 'flex' : 'none';
      });
      menu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
        menuOpen = false; menu.style.display = 'none';
      }));
    }
    window.addEventListener('resize', applyNav);
    applyNav();

    // --- smooth scroll w/ sticky offset ---
    document.querySelectorAll('a[href^="#"]').forEach(a => {
      a.addEventListener('click', (e) => {
        const id = a.getAttribute('href');
        if (id && id.length > 1) {
          const t = document.querySelector(id);
          if (t) {
            e.preventDefault();
            const y = t.getBoundingClientRect().top + window.pageYOffset - 78;
            window.scrollTo({ top: y, behavior: animate ? 'smooth' : 'auto' });
          }
        }
      });
    });
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initHexafilm, { once: true });
  } else {
    initHexafilm();
  }
})();
