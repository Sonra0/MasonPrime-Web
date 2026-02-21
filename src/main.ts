import './style.css';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { createCrystalConstellation } from './heroes/crystalConstellation';
import { createSpaceNebula } from './heroes/spaceNebula';
import { createWireframeSphere } from './heroes/wireframeSphere';
import { initI18n } from './i18n';

gsap.registerPlugin(ScrollTrigger);

// --- Hero variant management ---
type HeroVariant = 1 | 2 | 3;
let currentCleanup: (() => void) | null = null;

function initHero(variant: HeroVariant) {
  const canvas = document.getElementById('hero-canvas') as HTMLCanvasElement;
  if (!canvas) return;

  // Cleanup previous scene
  if (currentCleanup) {
    currentCleanup();
    currentCleanup = null;
  }

  switch (variant) {
    case 1:
      currentCleanup = createCrystalConstellation(canvas);
      break;
    case 2:
      currentCleanup = createSpaceNebula(canvas);
      break;
    case 3:
      currentCleanup = createWireframeSphere(canvas);
      break;
  }
}

// Get variant from URL or default to 1
function getVariantFromURL(): HeroVariant {
  const params = new URLSearchParams(window.location.search);
  const v = parseInt(params.get('variant') || '1');
  return (v >= 1 && v <= 3 ? v : 1) as HeroVariant;
}

// --- Variant Switcher ---
function setupVariantSwitcher() {
  const buttons = document.querySelectorAll<HTMLButtonElement>('.variant-btn');
  const currentVariant = getVariantFromURL();

  buttons.forEach((btn) => {
    const v = parseInt(btn.dataset.variant || '1') as HeroVariant;
    btn.classList.toggle('active', v === currentVariant);

    btn.addEventListener('click', () => {
      buttons.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');

      // Update URL without reload
      const url = new URL(window.location.href);
      url.searchParams.set('variant', String(v));
      window.history.replaceState({}, '', url.toString());

      initHero(v);
    });
  });
}

// --- Navbar scroll behavior ---
function setupNavbar() {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;

  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
  });

  // Mobile toggle
  const toggle = document.querySelector('.nav-mobile-toggle');
  const mobileMenu = document.getElementById('mobile-menu');

  if (toggle && mobileMenu) {
    toggle.addEventListener('click', () => {
      toggle.classList.toggle('open');
      mobileMenu.classList.toggle('open');
      document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
    });

    // Close on link click
    mobileMenu.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        toggle.classList.remove('open');
        mobileMenu.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }
}

// --- GSAP Scroll Animations ---
function setupScrollAnimations() {
  // Variant switcher — hide when hero leaves viewport, show when it returns
  const variantSwitcher = document.getElementById('variant-switcher');
  if (variantSwitcher) {
    ScrollTrigger.create({
      trigger: '#hero',
      start: 'top top',
      end: 'center top',
      onLeave: () => gsap.to(variantSwitcher, { opacity: 0, y: 20, duration: 0.4, ease: 'expo.out', pointerEvents: 'none' }),
      onEnterBack: () => gsap.to(variantSwitcher, { opacity: 1, y: 0, duration: 0.4, ease: 'expo.out', pointerEvents: 'all' }),
    });
  }

  // Trust Numbers cards — cinematic stagger + count-up
  const trustCards = document.querySelectorAll<HTMLElement>('.trust-card');
  trustCards.forEach((card, i) => {
    const numberEl = card.querySelector('.trust-number') as HTMLElement;
    const targetValue = numberEl ? parseInt(numberEl.dataset.value || '0') : 0;

    gsap.to(card, {
      scrollTrigger: {
        trigger: card,
        start: 'top 85%',
        toggleActions: 'play none none none',
      },
      opacity: 1,
      y: 0,
      scale: 1,
      filter: 'blur(0px)',
      duration: 0.9,
      delay: i * 0.15,
      ease: 'expo.out',
      onStart: () => {
        card.classList.add('revealed');

        // Number count-up after card lands
        if (numberEl) {
          const counter = { val: 0 };
          gsap.to(counter, {
            val: targetValue,
            duration: 2,
            delay: 0.3,
            ease: 'power2.out',
            snap: { val: 1 },
            onUpdate: () => {
              numberEl.textContent = Math.floor(counter.val).toLocaleString();
            },
          });
        }
      },
    });
  });

  // Feature cards
  const featureCards = document.querySelectorAll('.feature-card');
  featureCards.forEach((card, i) => {
    gsap.to(card, {
      scrollTrigger: {
        trigger: card,
        start: 'top 85%',
        toggleActions: 'play none none none',
      },
      opacity: 1,
      y: 0,
      duration: 0.8,
      delay: i * 0.15,
      ease: 'expo.out',
      onStart: () => card.classList.add('revealed'),
    });
  });

  // Step cards
  const stepCards = document.querySelectorAll('.step-card');
  stepCards.forEach((card, i) => {
    gsap.to(card, {
      scrollTrigger: {
        trigger: card,
        start: 'top 85%',
        toggleActions: 'play none none none',
      },
      opacity: 1,
      y: 0,
      duration: 0.7,
      delay: i * 0.12,
      ease: 'expo.out',
      onStart: () => card.classList.add('revealed'),
    });
  });

  // Section headers
  document.querySelectorAll('.section-header').forEach((header) => {
    const tag = header.querySelector('.section-tag');
    const title = header.querySelector('.section-title');
    const desc = header.querySelector('.section-desc');

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: header,
        start: 'top 80%',
        toggleActions: 'play none none none',
      },
    });

    if (tag) {
      tl.fromTo(tag, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6, ease: 'expo.out' });
    }
    if (title) {
      tl.fromTo(title, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.7, ease: 'expo.out' }, '-=0.4');
    }
    if (desc) {
      tl.fromTo(desc, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6, ease: 'expo.out' }, '-=0.4');
    }
  });

  // Footer fade in
  gsap.fromTo(
    '#footer .footer-inner',
    { opacity: 0, y: 30 },
    {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: 'expo.out',
      scrollTrigger: {
        trigger: '#footer',
        start: 'top 90%',
        toggleActions: 'play none none none',
      },
    }
  );
}

// --- Smooth scroll for anchor links ---
function setupSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (!href || href === '#') return;

      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
}

// --- Button hover ripple effect ---
function setupButtonEffects() {
  document.querySelectorAll('.btn-primary').forEach((btn) => {
    btn.addEventListener('mouseenter', () => {
      gsap.fromTo(
        btn,
        { '--ripple-scale': 0 },
        { '--ripple-scale': 1, duration: 0.6, ease: 'expo.out' }
      );
    });
  });
}

// --- Init ---
document.addEventListener('DOMContentLoaded', () => {
  initI18n();

  setupVariantSwitcher();
  setupNavbar();
  setupSmoothScroll();
  setupButtonEffects();

  // Init hero
  initHero(getVariantFromURL());

  // Delay scroll animations slightly for page load
  requestAnimationFrame(() => {
    setupScrollAnimations();
  });

  // Refresh ScrollTrigger when language changes (layout shifts)
  document.querySelectorAll('#lang-toggle, #lang-toggle-mobile').forEach((btn) => {
    btn.addEventListener('click', () => {
      requestAnimationFrame(() => ScrollTrigger.refresh());
    });
  });
});
