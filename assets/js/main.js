/**
 * Lakshya Welfare Society — Main Application Script
 * Handles navigation, mobile drawer, scroll interactions, active links,
 * and centralized configuration binding.
 */

document.addEventListener('DOMContentLoaded', () => {
  initNavigation();
  initHeaderScroll();
  initCopyActions();
  bindConfigData();
});

/**
 * Mobile Navigation Drawer & Keyboard Accessibility
 */
function initNavigation() {
  const menuToggle = document.getElementById('menuToggle');
  const navDrawer = document.getElementById('mobileNavDrawer');
  const drawerBackdrop = document.getElementById('drawerBackdrop');
  const drawerClose = document.getElementById('drawerClose');

  if (!menuToggle || !navDrawer || !drawerBackdrop) return;

  function openDrawer() {
    navDrawer.classList.add('open');
    drawerBackdrop.classList.add('open');
    menuToggle.setAttribute('aria-expanded', 'true');
    navDrawer.setAttribute('aria-hidden', 'false');
    drawerBackdrop.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    
    // Focus first link in drawer
    const firstLink = navDrawer.querySelector('a, button');
    if (firstLink) firstLink.focus();
  }

  function closeDrawer() {
    navDrawer.classList.remove('open');
    drawerBackdrop.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', 'false');
    navDrawer.setAttribute('aria-hidden', 'true');
    drawerBackdrop.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    menuToggle.focus();
  }

  menuToggle.addEventListener('click', () => {
    const isOpen = navDrawer.classList.contains('open');
    isOpen ? closeDrawer() : openDrawer();
  });

  if (drawerClose) {
    drawerClose.addEventListener('click', closeDrawer);
  }

  drawerBackdrop.addEventListener('click', closeDrawer);

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navDrawer.classList.contains('open')) {
      closeDrawer();
    }
  });

  // Close drawer when a link inside it is clicked
  const drawerLinks = navDrawer.querySelectorAll('.drawer-nav-link');
  drawerLinks.forEach(link => {
    link.addEventListener('click', closeDrawer);
  });
}

/**
 * Header Scroll Elevation Effect
 */
function initHeaderScroll() {
  const header = document.querySelector('.site-header');
  if (!header) return;

  function checkScroll() {
    if (window.scrollY > 20) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', checkScroll, { passive: true });
  checkScroll();
}

/**
 * Copy to Clipboard Functionality (for UPI ID & Bank details)
 */
function initCopyActions() {
  const copyButtons = document.querySelectorAll('[data-copy-target]');
  
  copyButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const targetText = btn.getAttribute('data-copy-target');
      if (!targetText) return;

      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(targetText).then(() => {
          showCopyFeedback(btn, 'Copied to clipboard!');
        }).catch(() => {
          fallbackCopyText(targetText, btn);
        });
      } else {
        fallbackCopyText(targetText, btn);
      }
    });
  });
}

function fallbackCopyText(text, btn) {
  const textarea = document.createElement('textarea');
  textarea.value = text;
  textarea.style.position = 'fixed';
  textarea.style.opacity = '0';
  document.body.appendChild(textarea);
  textarea.select();
  try {
    document.execCommand('copy');
    showCopyFeedback(btn, 'Copied!');
  } catch (err) {
    showCopyFeedback(btn, 'Press Ctrl+C to copy');
  }
  document.body.removeChild(textarea);
}

function showCopyFeedback(btn, message) {
  const originalHtml = btn.innerHTML;
  btn.innerHTML = `
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width:14px;height:14px;display:inline-block;vertical-align:middle;">
      <polyline points="20 6 9 17 4 12"></polyline>
    </svg>
    <span>${message}</span>
  `;
  btn.classList.add('copied');
  
  setTimeout(() => {
    btn.innerHTML = originalHtml;
    btn.classList.remove('copied');
  }, 2200);
}

/**
 * Centralized Configuration Data Binding
 */
function bindConfigData() {
  if (typeof LAKSHYA_CONFIG === 'undefined') return;

  // Update elements with data-bind attribute
  document.querySelectorAll('[data-bind]').forEach(el => {
    const keyPath = el.getAttribute('data-bind');
    const value = getNestedValue(LAKSHYA_CONFIG, keyPath);
    if (value !== undefined) {
      if (el.tagName === 'A' && el.getAttribute('href') === '#') {
        el.href = value;
      } else {
        el.textContent = value;
      }
    }
  });
}

function getNestedValue(obj, path) {
  return path.split('.').reduce((acc, part) => acc && acc[part], obj);
}
