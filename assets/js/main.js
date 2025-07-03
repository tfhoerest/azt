(function() {
    'use strict';
    
    // Theme toggle functionality - Updated for segmented control
    const themeToggleSegmented = document.getElementById('theme-toggle');
    const html = document.documentElement;
    
    // Check for saved theme preference or default to 'dark' to match current design
    const currentTheme = localStorage.getItem('theme') || 'dark';
    html.setAttribute('data-theme', currentTheme);
    
    // Set initial active state
    if (themeToggleSegmented) {
        themeToggleSegmented.querySelectorAll('.theme-option').forEach(option => {
            option.classList.toggle('active', option.dataset.theme === currentTheme);
        });
        
        themeToggleSegmented.addEventListener('click', function(e) {
            if (e.target.closest('.theme-option')) {
                const clickedOption = e.target.closest('.theme-option');
                const newTheme = clickedOption.dataset.theme;
                
                // Update active states
                themeToggleSegmented.querySelectorAll('.theme-option').forEach(option => {
                    option.classList.remove('active');
                });
                clickedOption.classList.add('active');
                
                // Apply theme
                html.setAttribute('data-theme', newTheme);
                localStorage.setItem('theme', newTheme);
            }
        });
    }

    // Side panel menu functionality
    const menuToggle = document.getElementById('menu-toggle');
    const sidePanel = document.getElementById('side-panel');
    const overlay = document.getElementById('overlay');
    const backArrow = document.getElementById('back-arrow');
    const body = document.body;

    function openMenu() {
        if (sidePanel && overlay) {
            sidePanel.classList.add('open');
            overlay.classList.add('show');
            body.classList.add('menu-open');
        }
    }

    function closeMenu() {
        if (sidePanel && overlay) {
            sidePanel.classList.remove('open');
            overlay.classList.remove('show');
            body.classList.remove('menu-open');
            
            // Clear the search input when closing
            const searchInput = document.getElementById('search-input');
            if (searchInput) {
                searchInput.value = '';
            }
        }
    }

    // Toggle menu when button is clicked
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            if (sidePanel && sidePanel.classList.contains('open')) {
                closeMenu();
            } else {
                openMenu();
            }
        });
    }

    // Close menu when overlay is clicked
    if (overlay) {
        overlay.addEventListener('click', closeMenu);
    }

    // Close menu when back arrow is clicked
    if (backArrow) {
        backArrow.addEventListener('click', closeMenu);
    }

    // Close menu when pressing Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && sidePanel && sidePanel.classList.contains('open')) {
            closeMenu();
        }
    });

    // Close menu when clicking a navigation link (for better UX)
    const panelNavLinks = document.querySelectorAll('.panel-nav a');
    panelNavLinks.forEach(link => {
        link.addEventListener('click', closeMenu);
    });

    // Basic search functionality
    const searchInput = document.getElementById('search-input');
    if (searchInput) {
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                const query = searchInput.value.trim();
                if (query) {
                    // Get the base URL from the current page
                    const baseUrl = document.querySelector('meta[name="base-url"]')?.content || '';
                    window.location.href = `${baseUrl}/search?q=${encodeURIComponent(query)}`;
                }
            }
        });
    }
})();
