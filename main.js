/* ============================================================
   AARAV PHOTOGRAPHY — main.js
   ============================================================ */

'use strict';

// ---- Header scroll effect ----
const header = document.getElementById('site-header');
window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 20);
}, { passive: true });

// ---- Photo grid filter ----
const filterBtns = document.querySelectorAll('.filter-btn');
const gridItems  = document.querySelectorAll('.grid-item');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    const filter = btn.dataset.filter;

    // Update active state
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    // Show/hide items with fade
    gridItems.forEach(item => {
      const cat = item.dataset.category;
      if (filter === 'all' || cat === filter) {
        item.classList.remove('hidden');
        item.style.animation = 'fadeIn 0.4s ease forwards';
      } else {
        item.classList.add('hidden');
      }
    });
  });
});

// Category cards also trigger filters
document.querySelectorAll('.cat-card').forEach(card => {
  card.addEventListener('click', (e) => {
    const target = card.dataset.filterTarget;
    const matchingBtn = document.querySelector(`[data-filter="${target}"]`);
    if (matchingBtn) matchingBtn.click();
  });
});

// ---- Lightbox ----
const lightbox   = document.getElementById('lightbox');
const backdrop   = document.getElementById('lightbox-backdrop');
const lbImg      = document.getElementById('lightbox-img');
const lbTitle    = document.getElementById('lightbox-title');
const lbCat      = document.getElementById('lightbox-cat');
const lbClose    = document.getElementById('lightbox-close');
const lbPrev     = document.getElementById('lightbox-prev');
const lbNext     = document.getElementById('lightbox-next');

let currentIndex = 0;
let visibleItems = [];

function getVisibleItems() {
  return Array.from(gridItems).filter(item => !item.classList.contains('hidden'));
}

function openLightbox(index) {
  visibleItems = getVisibleItems();
  currentIndex = index;
  showImage(currentIndex);
  lightbox.removeAttribute('hidden');
  backdrop.removeAttribute('hidden');
  document.body.style.overflow = 'hidden';

  // Small delay so CSS transition fires
  requestAnimationFrame(() => {
    lightbox.style.opacity = '1';
    backdrop.style.opacity = '1';
  });
}

function closeLightbox() {
  lightbox.setAttribute('hidden', '');
  backdrop.setAttribute('hidden', '');
  document.body.style.overflow = '';
}

function showImage(index) {
  const item = visibleItems[index];
  if (!item) return;
  const img   = item.querySelector('img');
  const title = item.querySelector('.caption-title').textContent;
  const cat   = item.querySelector('.caption-cat').textContent;

  lbImg.style.opacity = '0';
  lbImg.src = img.src;
  lbImg.alt = img.alt;
  lbTitle.textContent = title;
  lbCat.textContent   = cat;

  lbImg.onload = () => {
    lbImg.style.opacity = '1';
  };
  // If already cached, trigger manually
  if (lbImg.complete) lbImg.style.opacity = '1';
}

// Open lightbox on grid item click
gridItems.forEach((item, i) => {
  item.addEventListener('click', () => {
    visibleItems = getVisibleItems();
    const visibleIndex = visibleItems.indexOf(item);
    openLightbox(visibleIndex);
  });
});

lbClose.addEventListener('click', closeLightbox);
backdrop.addEventListener('click', closeLightbox);

lbPrev.addEventListener('click', () => {
  currentIndex = (currentIndex - 1 + visibleItems.length) % visibleItems.length;
  showImage(currentIndex);
});

lbNext.addEventListener('click', () => {
  currentIndex = (currentIndex + 1) % visibleItems.length;
  showImage(currentIndex);
});

// Keyboard navigation
document.addEventListener('keydown', (e) => {
  if (lightbox.hasAttribute('hidden')) return;
  if (e.key === 'Escape') closeLightbox();
  if (e.key === 'ArrowLeft') lbPrev.click();
  if (e.key === 'ArrowRight') lbNext.click();
});

// ---- Contact form (demo) ----
const form = document.getElementById('contact-form');
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const btn = document.getElementById('form-submit-btn');
  btn.textContent = 'Message Sent';
  btn.style.background = '#a0b896';
  btn.disabled = true;
  setTimeout(() => {
    btn.textContent = 'Send Message';
    btn.style.background = '';
    btn.disabled = false;
    form.reset();
  }, 3500);
});

// ---- Subtle scroll-reveal for grid items ----
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.08 });

gridItems.forEach((item, i) => {
  item.style.opacity = '0';
  item.style.transform = 'translateY(22px)';
  item.style.transition = `opacity 0.6s ease ${i * 0.07}s, transform 0.6s ease ${i * 0.07}s`;
  revealObserver.observe(item);
});

// Also observe category cards
document.querySelectorAll('.cat-card').forEach((card, i) => {
  card.style.opacity = '0';
  card.style.transform = 'translateY(16px)';
  card.style.transition = `opacity 0.55s ease ${i * 0.1}s, transform 0.55s ease ${i * 0.1}s`;
  revealObserver.observe(card);
});
