/* ═══════════════════════════════════════════════════════════
   ELOK — Script principal
   ═══════════════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {

  /* ── Nav scroll effect ─────────────────────────────────── */
  const nav = document.querySelector('.nav');
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 40);
  }, { passive: true });

  /* ── Mobile burger menu ────────────────────────────────── */
  const burger = document.querySelector('.nav__burger');
  const links  = document.querySelector('.nav__links');

  burger?.addEventListener('click', () => {
    const expanded = burger.getAttribute('aria-expanded') === 'true';
    burger.setAttribute('aria-expanded', String(!expanded));
    links.classList.toggle('open', !expanded);

    const spans = burger.querySelectorAll('span');
    if (!expanded) {
      spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
      spans[1].style.opacity   = '0';
      spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
    } else {
      spans.forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
    }
  });

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

  /* ── Reveal on scroll ──────────────────────────────────── */
  const style = document.createElement('style');
  style.textContent = '.reveal { opacity: 0; transform: translateY(24px); transition: opacity .5s ease, transform .5s ease; } .reveal.visible { opacity: 1; transform: none; }';
  document.head.appendChild(style);

  const revealTargets = document.querySelectorAll(
    '.stat-card, .pack-card, .service-card, .about__text, .about__img-wrap, .contact__info, .contact__form, .pricing__note, .reassurance__list'
  );

  revealTargets.forEach((el, i) => {
    el.classList.add('reveal');
    el.style.transitionDelay = `${i * 0.04}s`;
  });

  const observer = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        observer.unobserve(e.target);
      }
    });
  }, { threshold: 0.1 });

  revealTargets.forEach(el => observer.observe(el));

  /* ── Contact form feedback ─────────────────────────────── */
  const form = document.querySelector('.contact__form');
  form?.addEventListener('submit', e => {
    e.preventDefault();
    const btn = form.querySelector('[type="submit"]');
    const orig = btn.textContent;
    btn.textContent = 'Demande envoyée ✓';
    btn.disabled = true;
    btn.style.background = '#2d9a5c';
    btn.style.borderColor = '#2d9a5c';
    setTimeout(() => {
      btn.textContent = orig;
      btn.disabled = false;
      btn.style.background = '';
      btn.style.borderColor = '';
      form.reset();
    }, 3500);
  });

});
