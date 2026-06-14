/* ── MATRIX RAIN ── */
(function () {
  const canvas = document.getElementById('matrix-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const chars = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホ01アBCDEFGHIJK><[]{}|/\\';
  let cols, drops;

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    cols = Math.floor(canvas.width / 18);
    drops = Array(cols).fill(1);
  }

  function draw() {
    ctx.fillStyle = 'rgba(2,4,8,0.07)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.font = '13px JetBrains Mono, monospace';

    for (let i = 0; i < drops.length; i++) {
      const ch = chars[Math.floor(Math.random() * chars.length)];
      const bright = Math.random() > 0.92;
      ctx.fillStyle = bright ? '#ffffff' : (Math.random() > 0.5 ? '#00d4ff' : '#00ff9d');
      ctx.fillText(ch, i * 18, drops[i] * 18);
      if (drops[i] * 18 > canvas.height && Math.random() > 0.975) drops[i] = 0;
      drops[i]++;
    }
  }

  resize();
  window.addEventListener('resize', resize);
  setInterval(draw, 50);
})();

/* ── TERMINAL TYPING ANIMATION ── */
(function () {
  const el = document.querySelector('.hero-eyebrow .type-text');
  if (!el) return;
  const text = el.dataset.text || '';
  el.textContent = '';
  let i = 0;

  function type() {
    if (i < text.length) {
      el.textContent += text[i++];
      setTimeout(type, 55 + Math.random() * 40);
    }
  }
  setTimeout(type, 600);
})();

/* ── SCROLL REVEAL ── */
const observer = new IntersectionObserver(
  entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); }),
  { threshold: 0.1 }
);
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

/* ── NAV ACTIVE HIGHLIGHT ── */
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(s => {
    if (window.scrollY >= s.offsetTop - 120) current = s.id;
  });
  navLinks.forEach(a => {
    a.style.color = a.getAttribute('href') === `#${current}` ? 'var(--accent)' : '';
  });
}, { passive: true });
