'use strict';

/* -------------------------------------------------------------------------
   1. NAVBAR SCROLL – add .scrolled when scrollY > 60
   ------------------------------------------------------------------------- */
const navbar = document.getElementById('navbar');

function handleNavbarScroll() {
  if (window.scrollY > 60) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
}

window.addEventListener('scroll', handleNavbarScroll, { passive: true });
handleNavbarScroll();


/* -------------------------------------------------------------------------
   2. HAMBURGER MENU
   ------------------------------------------------------------------------- */
const navToggle = document.getElementById('navToggle');
const navMenu   = document.getElementById('navMenu');

navToggle.addEventListener('click', function () {
  const isOpen = navMenu.classList.contains('active');
  navMenu.classList.toggle('active');
  navToggle.classList.toggle('active');
  navToggle.setAttribute('aria-expanded', String(!isOpen));
  navToggle.setAttribute('aria-label', isOpen ? 'Otevrit menu' : 'Zavrit menu');
  document.body.style.overflow = isOpen ? '' : 'hidden';
});

navMenu.querySelectorAll('a').forEach(function (link) {
  link.addEventListener('click', function () {
    if (navMenu.classList.contains('active')) {
      navMenu.classList.remove('active');
      navToggle.classList.remove('active');
      navToggle.setAttribute('aria-expanded', 'false');
      navToggle.setAttribute('aria-label', 'Otevrit menu');
      document.body.style.overflow = '';
    }
  });
});


/* -------------------------------------------------------------------------
   3. MOBILE DROPDOWN
   ------------------------------------------------------------------------- */
document.querySelectorAll('.nav-dropdown-toggle').forEach(function (toggle) {
  toggle.addEventListener('click', function (e) {
    if (window.innerWidth < 768) {
      e.preventDefault();
      const parentItem = this.closest('.nav-item');
      const isOpen = parentItem.classList.contains('open');
      document.querySelectorAll('.nav-item.open').forEach(function (item) {
        item.classList.remove('open');
      });
      if (!isOpen) { parentItem.classList.add('open'); }
      toggle.setAttribute('aria-expanded', String(!isOpen));
    }
  });
});

document.addEventListener('click', function (e) {
  if (!e.target.closest('.nav-item')) {
    document.querySelectorAll('.nav-item.open').forEach(function (item) {
      item.classList.remove('open');
    });
  }
});


/* -------------------------------------------------------------------------
   4. COUNTDOWN TIMER – 25. 4. 2026 9:00 CEST
   ------------------------------------------------------------------------- */
const countdownTarget = new Date('2026-04-25T09:00:00+02:00');
const cdDays    = document.getElementById('cd-days');
const cdHours   = document.getElementById('cd-hours');
const cdMinutes = document.getElementById('cd-minutes');
const cdSeconds = document.getElementById('cd-seconds');
const cdExpired = document.getElementById('countdown-expired');
const cdEl      = document.getElementById('countdown');

function pad(n) { return String(n).padStart(2, '0'); }

function updateCountdown() {
  if (!cdEl) return;
  const now  = new Date();
  const diff = countdownTarget - now;
  if (diff <= 0) {
    cdEl.style.display      = 'none';
    cdExpired.style.display = 'block';
    return;
  }
  const totalSeconds = Math.floor(diff / 1000);
  const days    = Math.floor(totalSeconds / 86400);
  const hours   = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  cdDays.textContent    = days;
  cdHours.textContent   = pad(hours);
  cdMinutes.textContent = pad(minutes);
  cdSeconds.textContent = pad(seconds);
}

if (cdEl) {
  updateCountdown();
  setInterval(updateCountdown, 1000);
}


/* -------------------------------------------------------------------------
   5. INTERSECTION OBSERVER – reveal on scroll
   ------------------------------------------------------------------------- */
const revealObserver = new IntersectionObserver(
  function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
);

document.querySelectorAll('.reveal').forEach(function (el) {
  revealObserver.observe(el);
});


/* -------------------------------------------------------------------------
   6. ABOUT SECTION – canvas sparkles animation
   ------------------------------------------------------------------------- */
(function () {
  const canvas = document.getElementById('about-sparkles');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  const COUNT = 55;
  let dots = [];
  let raf;

  function resize() {
    canvas.width  = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
  }

  function randomDot() {
    return {
      x:     Math.random() * canvas.width,
      y:     Math.random() * canvas.height,
      r:     Math.random() * 2.5 + 0.8,
      alpha: Math.random() * 0.5 + 0.4,
      dx:    (Math.random() - 0.5) * 0.9,
      dy:    (Math.random() - 0.5) * 0.9,
      da:    (Math.random() - 0.5) * 0.012,
    };
  }

  function init() {
    resize();
    dots = Array.from({ length: COUNT }, randomDot);
  }

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    dots.forEach(function (d) {
      d.x += d.dx;
      d.y += d.dy;
      d.alpha += d.da;
      if (d.alpha <= 0.12 || d.alpha >= 0.68) d.da *= -1;
      if (d.x < 0) d.x = canvas.width;
      if (d.x > canvas.width) d.x = 0;
      if (d.y < 0) d.y = canvas.height;
      if (d.y > canvas.height) d.y = 0;
      ctx.beginPath();
      ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(212, 170, 60, ' + d.alpha + ')';
      ctx.fill();
    });
    raf = requestAnimationFrame(draw);
  }

  // Only animate while section is visible
  const section = canvas.closest('section');
  const observer = new IntersectionObserver(function (entries) {
    if (entries[0].isIntersecting) {
      if (!raf) draw();
    } else {
      cancelAnimationFrame(raf);
      raf = null;
    }
  }, { threshold: 0 });

  init();
  observer.observe(section);
  window.addEventListener('resize', function () {
    resize();
    dots = Array.from({ length: COUNT }, randomDot);
  }, { passive: true });
}());


/* -------------------------------------------------------------------------
   7. SMOOTH SCROLL – anchor links with navbar offset
   ------------------------------------------------------------------------- */
document.querySelectorAll('a[href^=#]').forEach(function (anchor) {
  anchor.addEventListener('click', function (e) {
    const targetId = this.getAttribute('href');
    if (targetId === '#') return;
    const targetEl = document.querySelector(targetId);
    if (!targetEl) return;
    e.preventDefault();
    const navbarHeight = navbar.offsetHeight + 16;
    const targetY = targetEl.getBoundingClientRect().top + window.scrollY - navbarHeight;
    window.scrollTo({ top: targetY, behavior: 'smooth' });
  });
});


/* -------------------------------------------------------------------------
   8. SPEAKER MODAL – handled via inline script in program.html
   ------------------------------------------------------------------------- */