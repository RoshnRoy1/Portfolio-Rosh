/* ── Custom Cursor ───────────────────────────────────────────────────── */
const cursorDot  = document.getElementById('cursorDot');
const cursorRing = document.getElementById('cursorRing');
let mx = -200, my = -200;
let rx = -200, ry = -200;

document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });

(function trackCursor() {
  rx += (mx - rx) * 0.13;
  ry += (my - ry) * 0.13;
  cursorDot.style.left  = mx + 'px';
  cursorDot.style.top   = my + 'px';
  cursorRing.style.left = rx + 'px';
  cursorRing.style.top  = ry + 'px';
  requestAnimationFrame(trackCursor);
})();

document.querySelectorAll('a, button, .project-card, .about-card, .contact-item, .social-link').forEach(el => {
  el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
  el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
});

/* ── Scroll Progress ─────────────────────────────────────────────────── */
const progressBar = document.getElementById('scrollProgress');
function updateProgress() {
  const pct = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
  progressBar.style.width = Math.min(pct, 100) + '%';
}
window.addEventListener('scroll', updateProgress, { passive: true });

/* ── Nav: add .scrolled class ─────────────────────────────────────────── */
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 60);
}, { passive: true });

/* ── Hamburger Menu ──────────────────────────────────────────────────── */
const hamburger  = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  mobileMenu.classList.toggle('open');
});
document.querySelectorAll('.mobile-link').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    mobileMenu.classList.remove('open');
  });
});

/* ── Particle Canvas ─────────────────────────────────────────────────── */
(function initParticles() {
  const canvas = document.getElementById('bg-canvas');
  const ctx    = canvas.getContext('2d');
  let W, H, particles;

  function resize() {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }

  function makeParticles() {
    const count = Math.min(Math.floor((W * H) / 18000), 90);
    particles = Array.from({ length: count }, () => ({
      x:  Math.random() * W,
      y:  Math.random() * H,
      r:  Math.random() * 1.4 + 0.3,
      vx: (Math.random() - 0.5) * 0.28,
      vy: (Math.random() - 0.5) * 0.28,
      a:  Math.random() * 0.45 + 0.1,
    }));
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);

    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];
      p.x += p.vx;
      p.y += p.vy;
      if (p.x < 0) p.x = W;
      if (p.x > W) p.x = 0;
      if (p.y < 0) p.y = H;
      if (p.y > H) p.y = 0;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(108,99,255,${p.a})`;
      ctx.fill();

      for (let j = i + 1; j < particles.length; j++) {
        const q   = particles[j];
        const dx  = p.x - q.x;
        const dy  = p.y - q.y;
        const d2  = dx * dx + dy * dy;
        if (d2 < 14400) { // 120² — connection distance
          const alpha = 0.07 * (1 - Math.sqrt(d2) / 120);
          ctx.beginPath();
          ctx.strokeStyle = `rgba(108,99,255,${alpha})`;
          ctx.lineWidth = 0.6;
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(q.x, q.y);
          ctx.stroke();
        }
      }
    }
    requestAnimationFrame(draw);
  }

  window.addEventListener('resize', () => { resize(); makeParticles(); });
  resize();
  makeParticles();
  draw();
})();

/* ── GSAP Animations ─────────────────────────────────────────────────── */
gsap.registerPlugin(ScrollTrigger);

// Hero entrance sequence
const heroTl = gsap.timeline({ delay: 0.15 });
heroTl
  .from('.hero-greeting',    { y: 24, opacity: 0, duration: 0.55, ease: 'power3.out' })
  .from('.hero-name',        { y: 44, opacity: 0, duration: 0.75, ease: 'power3.out' }, '-=0.25')
  .from('.hero-role',        { y: 22, opacity: 0, duration: 0.55, ease: 'power3.out' }, '-=0.4')
  .from('.hero-bio',         { y: 20, opacity: 0, duration: 0.55, ease: 'power3.out' }, '-=0.4')
  .from('.hero-actions',     { y: 20, opacity: 0, duration: 0.55, ease: 'power3.out' }, '-=0.38')
  .from('.hero-socials',     { y: 18, opacity: 0, duration: 0.5,  ease: 'power3.out' }, '-=0.35')
  .from('.hero-image-wrapper', { scale: 0.78, opacity: 0, duration: 1.1, ease: 'back.out(1.4)' }, '-=0.9')
  .from('.hero-scroll-hint', { opacity: 0, duration: 0.6 }, '-=0.2');

// Section headers on scroll
gsap.utils.toArray('.section-label').forEach(el => {
  gsap.from(el, {
    scrollTrigger: { trigger: el, start: 'top 88%' },
    y: 20, opacity: 0, duration: 0.55, ease: 'power3.out',
  });
});
gsap.utils.toArray('.section-title').forEach(el => {
  gsap.from(el, {
    scrollTrigger: { trigger: el, start: 'top 88%' },
    y: 30, opacity: 0, duration: 0.65, ease: 'power3.out',
  });
});

// About image
gsap.from('.about-image-wrapper', {
  scrollTrigger: { trigger: '.about-grid', start: 'top 78%' },
  x: -50, opacity: 0, duration: 0.9, ease: 'power3.out',
});

// About cards
gsap.from('.about-card', {
  scrollTrigger: { trigger: '.about-cards', start: 'top 82%' },
  y: 28, opacity: 0, duration: 0.6, stagger: 0.15, ease: 'power3.out',
});

// About bio
gsap.from('.about-bio', {
  scrollTrigger: { trigger: '.about-bio', start: 'top 88%' },
  y: 20, opacity: 0, duration: 0.65, ease: 'power3.out',
});

// Skill columns
gsap.from('.skills-col', {
  scrollTrigger: { trigger: '.skills-grid', start: 'top 80%' },
  y: 35, opacity: 0, duration: 0.7, stagger: 0.2, ease: 'power3.out',
});

// Animate skill bars when each column enters view
document.querySelectorAll('.skills-col').forEach(col => {
  ScrollTrigger.create({
    trigger: col,
    start: 'top 78%',
    onEnter() {
      col.querySelectorAll('.skill-fill').forEach(fill => {
        fill.style.width = fill.dataset.width + '%';
      });
    },
  });
});

// Project cards
gsap.from('.project-card', {
  scrollTrigger: { trigger: '.projects-grid', start: 'top 82%' },
  y: 50, opacity: 0, duration: 0.7, stagger: 0.15, ease: 'power3.out',
});

// Contact
gsap.from('.contact-container', {
  scrollTrigger: { trigger: '.contact-container', start: 'top 82%' },
  y: 40, opacity: 0, duration: 0.8, ease: 'power3.out',
});

/* ── Typed.js ────────────────────────────────────────────────────────── */
new Typed('#typed', {
  strings: [
    'Full-Stack AI Developer',
    'AI &amp; ML Researcher',
    'Explainable AI Engineer',
    'React &amp; Python Developer',
    'MSc AI @ Heriot-Watt',
  ],
  typeSpeed:  60,
  backSpeed:  38,
  backDelay:  2000,
  loop:       true,
  cursorChar: '|',
});

/* ── Vanilla Tilt (3D card effect) ─────────────────────────────────── */
if (typeof VanillaTilt !== 'undefined') {
  VanillaTilt.init(document.querySelectorAll('[data-tilt]'), {
    max:       8,
    speed:     400,
    glare:     true,
    'max-glare': 0.12,
  });
}
