// === SCRIPT.JS — El Reinicio Biológico ===

// 1. COUNTDOWN TIMER (15 minutos)
const cEL = document.getElementById('countdown');
if (cEL) {
  const endTime = Number(sessionStorage.getItem('zxTimer15m')) || Date.now() + 15 * 60000;
  sessionStorage.setItem('zxTimer15m', endTime);
  const timer = setInterval(() => {
    const diff = endTime - Date.now();
    if (diff <= 0) { clearInterval(timer); if(cEL) cEL.textContent = "OFERTA EXPIRADA"; return; }
    const m = Math.floor(diff / 60000);
    const s = Math.floor((diff % 60000) / 1000);
    if(cEL) cEL.textContent = `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  }, 1000);
}

// 2. INTERSECTION OBSERVER — Animaciones Fade-In
const animItems = document.querySelectorAll('.section-animate');
if (animItems.length) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  animItems.forEach(el => observer.observe(el));
}

// 3. CONTADOR DE ESTADÍSTICAS ANIMADO (IntersectionObserver)
const statNums = document.querySelectorAll('.stat-num[data-val]');
if (statNums.length) {
  const countUp = (el) => {
    const target = parseInt(el.getAttribute('data-val'), 10);
    const duration = 1500;
    const start = Date.now();
    const step = () => {
      const elapsed = Date.now() - start;
      const progress = Math.min(elapsed / duration, 1);
      // Easing out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.floor(eased * target).toLocaleString('es-ES');
      if (progress < 1) requestAnimationFrame(step);
      else el.textContent = target.toLocaleString('es-ES');
    };
    requestAnimationFrame(step);
  };

  const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        countUp(entry.target);
        statsObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });
  statNums.forEach(el => statsObserver.observe(el));
}

// 4. MOBILE STICKY CTA BAR
const heroSection = document.querySelector('.hero');
const stickyCTA = document.getElementById('mobile-sticky');
if (heroSection && stickyCTA && window.innerWidth < 1024) {
  const heroObs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) {
        stickyCTA.classList.add('visible');
      } else {
        stickyCTA.classList.remove('visible');
      }
    });
  }, { threshold: 0.1 });
  heroObs.observe(heroSection);
}

// 5. META PIXEL: AddToCart en todos los botones CTA
document.querySelectorAll('.cta-action').forEach(btn => {
  btn.addEventListener('click', () => {
    if (typeof fbq === 'function') fbq('track', 'AddToCart');
  });
});

// 6. MODALES LEGALES
document.querySelectorAll('.footer-btn[data-modal]').forEach(btn => {
  btn.addEventListener('click', (e) => {
    e.preventDefault();
    const modal = document.getElementById(btn.getAttribute('data-modal'));
    if (modal) { modal.classList.add('visible'); document.body.style.overflow = 'hidden'; }
  });
});

document.querySelectorAll('.close-modal').forEach(closeBtn => {
  closeBtn.addEventListener('click', () => {
    const modal = closeBtn.closest('.modal');
    if (modal) { modal.classList.remove('visible'); document.body.style.overflow = ''; }
  });
});

document.querySelectorAll('.modal').forEach(modal => {
  modal.addEventListener('click', (e) => {
    if (e.target === modal || e.target.classList.contains('modal-wrapper')) {
      modal.classList.remove('visible');
      document.body.style.overflow = '';
    }
  });
});

// 7. SMOOTH SCROLL para links internos
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', (e) => {
    const target = document.querySelector(link.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});
