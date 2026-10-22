/* ============================================
   script.js — Interactive Navigation & Features
   ============================================ */

(function () {
  'use strict';

  // ─── DOM REFERENCES ─────────────────────────────
  const navbar      = document.getElementById('navbar');
  const navLinks    = document.getElementById('navLinks');
  const navToggle   = document.getElementById('navToggle');
  const contactForm = document.getElementById('contactForm');
  const formSuccess = document.getElementById('formSuccess');

  const allNavAnchors = navLinks.querySelectorAll('a');
  const sections      = document.querySelectorAll('section[id]');

  // ─── 1. NAVBAR SCROLL EFFECT ────────────────────
  // Adds/removes the "scrolled" class to change the navbar
  // background, shadow and padding when the user scrolls.
  function handleNavbarScroll() {
    if (window.scrollY > 60) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', handleNavbarScroll, { passive: true });

  // ─── 2. ACTIVE SECTION HIGHLIGHTING ─────────────
  // Uses scroll position to determine which section is
  // currently in view and highlights the corresponding
  // nav link with the "active" class.
  function highlightActiveLink() {
    const scrollPos = window.scrollY + 200; // offset for navbar height

    sections.forEach(function (section) {
      const top    = section.offsetTop;
      const bottom = top + section.offsetHeight;
      const id     = section.getAttribute('id');

      if (scrollPos >= top && scrollPos < bottom) {
        allNavAnchors.forEach(function (a) {
          a.classList.remove('active');
          if (a.getAttribute('href') === '#' + id) {
            a.classList.add('active');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', highlightActiveLink, { passive: true });

  // ─── 3. HAMBURGER MENU TOGGLE ───────────────────
  navToggle.addEventListener('click', function () {
    navToggle.classList.toggle('open');
    navLinks.classList.toggle('open');
  });

  // Close the mobile menu when a nav link is clicked
  allNavAnchors.forEach(function (link) {
    link.addEventListener('click', function () {
      navToggle.classList.remove('open');
      navLinks.classList.remove('open');
    });
  });

  // ─── 4. SMOOTH SCROLL FOR NAV LINKS ─────────────
  // Although html { scroll-behavior: smooth } handles this
  // in modern browsers, we add JS smooth scrolling as a
  // fallback and to close the mobile menu simultaneously.
  allNavAnchors.forEach(function (link) {
    link.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href && href.startsWith('#')) {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          const offsetTop = target.offsetTop - 70; // navbar height offset
          window.scrollTo({ top: offsetTop, behavior: 'smooth' });
        }
      }
    });
  });

  // Also enable smooth scroll for footer links and hero buttons
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href && href.length > 1) {
        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          const offsetTop = target.offsetTop - 70;
          window.scrollTo({ top: offsetTop, behavior: 'smooth' });
        }
      }
    });
  });

  // ─── 5. CONTACT FORM VALIDATION ─────────────────
  function validateEmail(email) {
    // Simple but effective email regex
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  contactForm.addEventListener('submit', function (e) {
    e.preventDefault();

    let isValid = true;

    // Name validation
    const nameGroup = document.getElementById('nameGroup');
    const nameInput = document.getElementById('name');
    if (nameInput.value.trim().length < 2) {
      nameGroup.classList.add('error');
      isValid = false;
    } else {
      nameGroup.classList.remove('error');
    }

    // Email validation
    const emailGroup = document.getElementById('emailGroup');
    const emailInput = document.getElementById('email');
    if (!validateEmail(emailInput.value.trim())) {
      emailGroup.classList.add('error');
      isValid = false;
    } else {
      emailGroup.classList.remove('error');
    }

    // Message validation
    const messageGroup = document.getElementById('messageGroup');
    const messageInput = document.getElementById('message');
    if (messageInput.value.trim().length < 5) {
      messageGroup.classList.add('error');
      isValid = false;
    } else {
      messageGroup.classList.remove('error');
    }

    // If all valid → show success message
    if (isValid) {
      contactForm.style.display = 'none';
      formSuccess.classList.add('show');
    }
  });

  // Clear individual field errors on input
  ['name', 'email', 'message'].forEach(function (id) {
    var input = document.getElementById(id);
    input.addEventListener('input', function () {
      this.closest('.form-group').classList.remove('error');
    });
  });

  // ─── 6. SCROLL-REVEAL (Intersection Observer) ───
  // Elements with the .reveal class fade in and slide
  // up when they enter the viewport.
  var revealElements = document.querySelectorAll('.reveal');

  if ('IntersectionObserver' in window) {
    var revealObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            revealObserver.unobserve(entry.target); // animate once
          }
        });
      },
      { threshold: 0.15 }
    );

    revealElements.forEach(function (el) {
      revealObserver.observe(el);
    });
  } else {
    // Fallback: show everything immediately
    revealElements.forEach(function (el) {
      el.classList.add('visible');
    });
  }

  // ─── 7. INITIAL CALLS ──────────────────────────
  handleNavbarScroll();
  highlightActiveLink();

})();
