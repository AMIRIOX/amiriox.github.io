/* ============================================
   NEWSPEPPER THEME - Dark Mode Toggle
   ============================================ */

(function() {
  'use strict';
  
  const STORAGE_KEY = 'newspepper-theme';
  const DARK_MODE_CLASS = 'dark-mode';
  
  // Initialize theme
  function initTheme() {
    const savedTheme = localStorage.getItem(STORAGE_KEY);
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
      document.body.classList.add(DARK_MODE_CLASS);
    }
  }
  
  // Toggle theme
  function toggleTheme() {
    document.body.classList.toggle(DARK_MODE_CLASS);
    const isDark = document.body.classList.contains(DARK_MODE_CLASS);
    localStorage.setItem(STORAGE_KEY, isDark ? 'dark' : 'light');
    
    // Optional: Add transition effect
    document.body.style.transition = 'background-color 0.3s ease, color 0.3s ease';
    setTimeout(() => {
      document.body.style.transition = '';
    }, 300);
  }
  
  // Wait for DOM to load
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
  
  function init() {
    // Initialize theme immediately to prevent flash
    initTheme();
    
    // Setup toggle button
    const toggleButton = document.querySelector('.theme-toggle');
    if (toggleButton) {
      toggleButton.addEventListener('click', toggleTheme);
    }
    
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
})();
