/* ================================================
   main.js — Pedro Henrique Portfólio
   ================================================ */

// ── CURSOR CUSTOMIZADO ──────────────────────────
const cur  = document.getElementById('cur');
const ring = document.getElementById('cur-ring');
let mx = 0, my = 0, rx = 0, ry = 0;

document.addEventListener('mousemove', e => {
  mx = e.clientX; my = e.clientY;
  cur.style.left = mx + 'px';
  cur.style.top  = my + 'px';
});

// Anel flutuante com lag suave
(function loop() {
  rx += (mx - rx) * 0.1;
  ry += (my - ry) * 0.1;
  ring.style.left = rx + 'px';
  ring.style.top  = ry + 'px';
  requestAnimationFrame(loop);
})();

// Cursor cresce ao hover em links e botões
document.querySelectorAll('a, button').forEach(el => {
  el.addEventListener('mouseenter', () => {
    ring.style.width   = '56px';
    ring.style.height  = '56px';
    ring.style.opacity = '.15';
  });
  el.addEventListener('mouseleave', () => {
    ring.style.width   = '36px';
    ring.style.height  = '36px';
    ring.style.opacity = '.35';
  });
});

// ── SCROLL REVEAL ───────────────────────────────
const observer = new IntersectionObserver(entries => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('vis'), i * 80);
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// ── EFEITO DE DIGITAÇÃO (hero tag) ──────────────
const tag = document.getElementById('htag');

if (tag) {
  const fullText = tag.textContent;
  tag.textContent = '';
  tag.style.opacity = '1';
  tag.style.animation = 'none';

  let i = 0;
  const typeInterval = setInterval(() => {
    tag.textContent = fullText.slice(0, ++i);
    if (i >= fullText.length) clearInterval(typeInterval);
  }, 38);
}

// ── FORMULÁRIO DE CONTATO ───────────────────────
function sendEmail() {
  const nome  = document.getElementById('ct-nome').value.trim();
  const email = document.getElementById('ct-email').value.trim();
  const msg   = document.getElementById('ct-msg').value.trim();
  const fb    = document.getElementById('ct-feedback');

  // Validação
  if (!nome || !email || !msg) {
    fb.style.color   = 'var(--neon3)';
    fb.textContent   = '> preencha todos os campos antes de enviar.';
    return;
  }

  // Monta e abre mailto
  const subject = encodeURIComponent('Contato via Portfólio — ' + nome);
  const body    = encodeURIComponent('Nome: ' + nome + '\nE-mail: ' + email + '\n\n' + msg);

  window.location.href = 'mailto:ph.melo20031974@gmail.com?subject=' + subject + '&body=' + body;

  fb.style.color = 'var(--neon)';
  fb.textContent = '> abrindo seu cliente de e-mail... ✓';
}
