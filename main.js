/* ═══════════════════════════════════════════════════════════
   EXTRAS — Script principal
   ═══════════════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {

  /* ── Nav scroll effect ─────────────────────────────────── */
  const nav = document.querySelector('.nav');
  const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 40);
  window.addEventListener('scroll', onScroll, { passive: true });

  /* ── Mobile burger menu ────────────────────────────────── */
  const burger = document.querySelector('.nav__burger');
  const links  = document.querySelector('.nav__links');

  burger?.addEventListener('click', () => {
    const expanded = burger.getAttribute('aria-expanded') === 'true';
    burger.setAttribute('aria-expanded', !expanded);
    links.classList.toggle('open', !expanded);
    // Animate burger
    const spans = burger.querySelectorAll('span');
    if (!expanded) {
      spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
      spans[1].style.opacity   = '0';
      spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
    } else {
      spans.forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
    }
  });

  // Close menu on link click
  links?.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      links.classList.remove('open');
      burger.setAttribute('aria-expanded', 'false');
      burger.querySelectorAll('span').forEach(s => {
        s.style.transform = '';
        s.style.opacity   = '';
      });
    });
  });

  /* ── Smooth reveal on scroll (Intersection Observer) ───── */
  const revealEls = document.querySelectorAll(
    '.hero__card, .stat, .project-card, .service-card, .about__img-wrap, .about__text, .contact__info, .contact__form'
  );

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  revealEls.forEach((el, i) => {
    el.style.opacity    = '0';
    el.style.transform  = 'translateY(28px)';
    el.style.transition = `opacity .55s ease ${i * 0.05}s, transform .55s ease ${i * 0.05}s`;
    observer.observe(el);
  });

  document.head.insertAdjacentHTML('beforeend', `
    <style>
      .visible { opacity: 1 !important; transform: translateY(0) !important; }
    </style>
  `);

  /* ── Contact form (basic) ──────────────────────────────── */
  const form = document.querySelector('.contact__form');
  form?.addEventListener('submit', e => {
    e.preventDefault();
    const btn = form.querySelector('[type="submit"]');
    btn.textContent = 'Message envoyé ✓';
    btn.disabled = true;
    btn.style.background = '#00b894';
    setTimeout(() => {
      btn.textContent = 'Envoyer le message →';
      btn.disabled = false;
      btn.style.background = '';
      form.reset();
    }, 3500);
  });

});
