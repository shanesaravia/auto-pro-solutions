/* ============================================================
   AUTO PRO SOLUTIONS — JAVASCRIPT
   ============================================================ */

// Nav scroll effect
const navWrapper = document.getElementById('top')?.closest('header') || document.querySelector('.nav-wrapper');
window.addEventListener('scroll', () => {
  if (window.scrollY > 40) {
    navWrapper.classList.add('scrolled');
  } else {
    navWrapper.classList.remove('scrolled');
  }
}, { passive: true });

// Mobile hamburger
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');

hamburger?.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  navLinks.classList.toggle('open');
  document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : '';
});

// Close mobile nav on link click
navLinks?.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    navLinks.classList.remove('open');
    document.body.style.overflow = '';
  });
});

// Scroll-triggered animations
const animatedEls = document.querySelectorAll('[data-animate]');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in-view');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

animatedEls.forEach(el => observer.observe(el));

// Contact form — mailto fallback (no backend needed)
const form = document.getElementById('contact-form');
form?.addEventListener('submit', (e) => {
  e.preventDefault();

  const name    = form.name.value.trim();
  const phone   = form.phone.value.trim();
  const email   = form.email.value.trim();
  const vehicle = form.vehicle.value.trim();
  const message = form.message.value.trim();

  if (!name || !email || !message) {
    shakeMissing(form);
    return;
  }

  const subject = encodeURIComponent(`Service Request from ${name}`);
  const body = encodeURIComponent(
    `Name: ${name}\nPhone: ${phone || 'N/A'}\nEmail: ${email}\nVehicle: ${vehicle || 'N/A'}\n\nMessage:\n${message}`
  );

  window.location.href = `mailto:autoprosolutions@hotmail.com?subject=${subject}&body=${body}`;

  const btn = form.querySelector('.form-submit');
  btn.textContent = '✓ Opening email client…';
  btn.style.background = '#22c55e';
  setTimeout(() => {
    btn.textContent = 'Send Message';
    btn.style.background = '';
  }, 4000);
});

function shakeMissing(form) {
  ['name', 'email', 'message'].forEach(field => {
    const input = form[field];
    if (!input.value.trim()) {
      input.style.borderColor = '#ef4444';
      input.style.boxShadow = '0 0 0 3px rgba(239,68,68,0.15)';
      setTimeout(() => {
        input.style.borderColor = '';
        input.style.boxShadow = '';
      }, 2500);
    }
  });
}

// Smooth active nav highlight on scroll
const sections = document.querySelectorAll('section[id]');
const navItems = document.querySelectorAll('.nav-link');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.id;
      navItems.forEach(link => {
        link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
      });
    }
  });
}, { threshold: 0.4 });

sections.forEach(s => sectionObserver.observe(s));
