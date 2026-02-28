/* ============================================
   NEWSPEPPER THEME - Dark Mode & Background Toggle
   ============================================ */

(function() {
  'use strict';
  
  const STORAGE_KEY = 'newspepper-theme';
  const BG_STORAGE_KEY = 'newspepper-bg';
  const DARK_MODE_CLASS = 'dark-mode';
  const TRANSPARENT_CLASS = 'transparent-mode';
  
  // Initialize theme
  function initTheme() {
    const savedTheme = localStorage.getItem(STORAGE_KEY);
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
      document.body.classList.add(DARK_MODE_CLASS);
    }
  }

  // Initialize background mode
  function initBgMode() {
    if (localStorage.getItem(BG_STORAGE_KEY) === 'on') {
      document.body.classList.add(TRANSPARENT_CLASS);
    }
  }
  
  // Toggle theme
  function toggleTheme() {
    document.body.classList.toggle(DARK_MODE_CLASS);
    const isDark = document.body.classList.contains(DARK_MODE_CLASS);
    localStorage.setItem(STORAGE_KEY, isDark ? 'dark' : 'light');
    
    document.body.style.transition = 'background-color 0.3s ease, color 0.3s ease';
    setTimeout(() => { document.body.style.transition = ''; }, 300);
  }

  // Toggle background transparency
  function toggleBg() {
    document.body.classList.toggle(TRANSPARENT_CLASS);
    const isOn = document.body.classList.contains(TRANSPARENT_CLASS);
    localStorage.setItem(BG_STORAGE_KEY, isOn ? 'on' : 'off');
  }
  
  // Wait for DOM to load
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
  
  function init() {
    initTheme();
    initBgMode();
    
    const toggleButton = document.querySelector('.theme-toggle');
    if (toggleButton) toggleButton.addEventListener('click', toggleTheme);

    const bgButton = document.querySelector('.bg-toggle');
    if (bgButton) bgButton.addEventListener('click', toggleBg);
    
    // Listen for system theme changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
      if (!localStorage.getItem(STORAGE_KEY)) {
        if (e.matches) {
          document.body.classList.add(DARK_MODE_CLASS);
        } else {
          document.body.classList.remove(DARK_MODE_CLASS);
        }
      }
    });
  }
  
  // Add smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href !== '#' && href !== '') {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      }
    });
  });
  
  console.log('📰 Newspepper Theme loaded - Classic newspaper meets modern web');
  
  // Inject anchor links into headings
  document.querySelectorAll('.post-content h2, .post-content h3, .post-content h4').forEach(heading => {
    if (heading.id) {
      const anchor = document.createElement('a');
      anchor.href = '#' + heading.id;
      anchor.className = 'anchor';
      anchor.textContent = '§';
      anchor.setAttribute('aria-hidden', 'true');
      heading.appendChild(anchor);
    }
  });

  // Wrap images with alt text in <figure><figcaption>
  document.querySelectorAll('.post-content img[alt]').forEach(img => {
    const alt = img.getAttribute('alt').trim();
    if (!alt || img.parentElement.tagName === 'FIGURE') return;
    const figure = document.createElement('figure');
    img.parentElement.insertBefore(figure, img);
    figure.appendChild(img);
    const caption = document.createElement('figcaption');
    caption.textContent = alt;
    figure.appendChild(caption);
  });
})();
