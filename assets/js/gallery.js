/**
 * Lakshya Welfare Society — Gallery & Accessible Lightbox System
 * Provides category filtering and a WCAG-compliant modal lightbox.
 */

document.addEventListener('DOMContentLoaded', () => {
  initGalleryFilters();
  initLightbox();
});

/**
 * Filter gallery items by category
 */
function initGalleryFilters() {
  const filterBtns = document.querySelectorAll('.gallery-filter-btn');
  const galleryItems = document.querySelectorAll('.gallery-item');

  if (!filterBtns.length || !galleryItems.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const filter = btn.getAttribute('data-filter');

      // Update active button state
      filterBtns.forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-pressed', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-pressed', 'true');

      // Filter cards
      galleryItems.forEach(item => {
        const itemCategory = item.getAttribute('data-category');
        if (filter === 'all' || itemCategory === filter) {
          item.style.display = 'flex';
          setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
          }, 20);
        } else {
          item.style.opacity = '0';
          item.style.transform = 'translateY(10px)';
          setTimeout(() => {
            item.style.display = 'none';
          }, 200);
        }
      });
    });
  });
}

/**
 * Accessible Lightbox Modal
 */
function initLightbox() {
  const modal = document.getElementById('lightboxModal');
  if (!modal) return;

  const stageImg = document.getElementById('lightboxImg');
  const titleEl = document.getElementById('lightboxTitle');
  const captionEl = document.getElementById('lightboxCaption');
  const metaEl = document.getElementById('lightboxMeta');
  const closeBtn = document.getElementById('lightboxClose');
  const prevBtn = document.getElementById('lightboxPrev');
  const nextBtn = document.getElementById('lightboxNext');

  let activeIndex = 0;
  let triggerElement = null;
  const items = Array.from(document.querySelectorAll('.gallery-item'));

  if (!items.length) return;

  function getVisibleItems() {
    return items.filter(item => item.style.display !== 'none');
  }

  function openLightbox(index, trigger) {
    const visibleItems = getVisibleItems();
    if (index < 0 || index >= visibleItems.length) return;

    activeIndex = index;
    triggerElement = trigger;
    const currentItem = visibleItems[activeIndex];

    updateLightboxContent(currentItem, visibleItems.length);

    modal.classList.add('active');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';

    closeBtn.focus();
  }

  function updateLightboxContent(item, totalCount) {
    const imgEl = item.querySelector('.gallery-image-box img');
    const title = item.querySelector('.gallery-item-title')?.textContent || '';
    const desc = item.querySelector('.gallery-item-desc')?.textContent || '';
    const date = item.querySelector('.gallery-item-meta span')?.textContent || '';

    if (stageImg && imgEl) {
      stageImg.src = imgEl.src;
      stageImg.alt = imgEl.alt || title;
    }

    if (titleEl) titleEl.textContent = title;
    if (captionEl) captionEl.textContent = desc;
    if (metaEl) {
      metaEl.textContent = `${date} • Image ${activeIndex + 1} of ${totalCount}`;
    }
  }

  function closeLightbox() {
    modal.classList.remove('active');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';

    if (triggerElement) {
      triggerElement.focus();
      triggerElement = null;
    }
  }

  function showNext() {
    const visibleItems = getVisibleItems();
    activeIndex = (activeIndex + 1) % visibleItems.length;
    updateLightboxContent(visibleItems[activeIndex], visibleItems.length);
  }

  function showPrev() {
    const visibleItems = getVisibleItems();
    activeIndex = (activeIndex - 1 + visibleItems.length) % visibleItems.length;
    updateLightboxContent(visibleItems[activeIndex], visibleItems.length);
  }

  // Attach click to gallery items
  items.forEach((item) => {
    const trigger = item.querySelector('.gallery-overlay-btn') || item;
    
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      const visibleItems = getVisibleItems();
      const idx = visibleItems.indexOf(item);
      if (idx !== -1) {
        openLightbox(idx, trigger);
      }
    });

    // Keyboard support on card
    item.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        const visibleItems = getVisibleItems();
        const idx = visibleItems.indexOf(item);
        if (idx !== -1) {
          openLightbox(idx, trigger);
        }
      }
    });
  });

  // Controls listeners
  if (closeBtn) closeBtn.addEventListener('click', closeLightbox);
  if (nextBtn) nextBtn.addEventListener('click', showNext);
  if (prevBtn) prevBtn.addEventListener('click', showPrev);

  // Click outside content to close
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeLightbox();
    }
  });

  // Keyboard navigation inside lightbox
  document.addEventListener('keydown', (e) => {
    if (!modal.classList.contains('active')) return;

    if (e.key === 'Escape') {
      closeLightbox();
    } else if (e.key === 'ArrowRight') {
      showNext();
    } else if (e.key === 'ArrowLeft') {
      showPrev();
    }
  });
}
