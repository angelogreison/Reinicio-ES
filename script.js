// === SCRIPT.JS — El Reinicio Biológico — Optimizado para PageSpeed ===

// 1. CARGA DIFERIDA DE SCRIPTS EXTERNOS (Meta Pixel, Hotmart, etc.)
let scriptsLoaded = false;
const loadExternalScripts = () => {
    if (scriptsLoaded) return;
    scriptsLoaded = true;
    console.log("Cargando scripts externos...");

    // Meta Pixel (Diferido)
    !function(f,b,e,v,n,t,s)
    {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
    n.callMethod.apply(n,arguments):n.queue.push(arguments)};
    if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
    n.queue=[];t=b.createElement(e);t.async=!0;
    t.src=v;s=b.getElementsByTagName(e)[0];
    s.parentNode.insertBefore(t,s)}(window, document,'script',
    'https://connect.facebook.net/en_US/fbevents.js');
    fbq('init', '1377433624081067');
    fbq('track', 'PageView');

    // Hotmart / Otros si fueran necesarios
};

// Disparar tras interacción o 3.5s
['touchstart', 'scroll', 'mouseover', 'keydown'].forEach(evt => 
    window.addEventListener(evt, loadExternalScripts, { once: true, passive: true })
);
setTimeout(loadExternalScripts, 3500);

// 2. ANIMACIONES Y OBSERVERS
const isMobile = window.innerWidth < 768;
const animItems = document.querySelectorAll('.fade-up, .section-animate');

if (isMobile) {
    // En Mobile: Forzamos visibilidad inmediata para ahorrar CPU
    animItems.forEach(el => el.classList.add('visible', 'in-view'));
} else {
    // En Desktop: Mantenemos animaciones suaves
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible', 'in-view');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    animItems.forEach(el => observer.observe(el));
}

// 3. ESTADÍSTICAS ANIMADAS
const statNums = document.querySelectorAll('.stat-num[data-target]');
if (statNums.length) {
    const countUp = (el) => {
        const target = parseInt(el.getAttribute('data-target'), 10);
        const duration = 1500;
        const start = Date.now();
        const step = () => {
            const elapsed = Date.now() - start;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            el.textContent = Math.floor(eased * target).toLocaleString('es-ES');
            if (progress < 1) requestAnimationFrame(step);
            else el.textContent = target.toLocaleString('es-ES');
        };
        if (!isMobile) requestAnimationFrame(step);
        else el.textContent = target.toLocaleString('es-ES'); // Salto inmediato en mobile
    };

    if (!isMobile) {
        const statsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    countUp(entry.target);
                    statsObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        statNums.forEach(el => statsObserver.observe(el));
    } else {
        statNums.forEach(el => countUp(el));
    }
}

// 4. CTA CLICKS — Asegurar carga de Píxel y Redirección
document.querySelectorAll('a[href*="hotmart.com"]').forEach(btn => {
    btn.addEventListener('click', (e) => {
        // Si el usuario hace clic antes del timeout/scroll, forzamos carga
        if (!scriptsLoaded) loadExternalScripts();
        
        // Tracking AddToCart
        if (typeof fbq === 'function') {
            fbq('track', 'AddToCart', {
                value: 12,
                currency: 'PAB',
                content_name: 'Reinicio Biológico'
            });
        }
    });
});

// 5. STICKY MOBILE CTA
const heroSection = document.querySelector('.hero');
const stickyCTA = document.getElementById('sticky-mobile');
if (heroSection && stickyCTA && isMobile) {
    const heroObs = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) stickyCTA.classList.add('visible');
            else stickyCTA.classList.remove('visible');
        });
    }, { threshold: 0.1 });
    heroObs.observe(heroSection);
}

// 6. MODALES LEGALES
const openModal = (id) => {
    const modal = document.getElementById(id);
    if (modal) {
        modal.style.display = 'flex';
        document.body.classList.add('modal-active');
    }
};

document.querySelectorAll('[data-modal]').forEach(trigger => {
    trigger.addEventListener('click', (e) => {
        e.preventDefault();
        openModal(trigger.getAttribute('data-modal'));
    });
});

window.closeModal = () => {
    document.querySelectorAll('.modal-overlay, .modal').forEach(m => {
        m.style.display = 'none';
        m.classList.remove('visible');
    });
    document.body.classList.remove('modal-active');
};
