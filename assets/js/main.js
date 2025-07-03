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

    // Scroll-responsive masthead functionality
    const masthead = document.getElementById('masthead');
    let lastScrollY = window.scrollY;
    let isScrolling = false;
    
    function handleScroll() {
        const currentScrollY = window.scrollY;
        const scrollThreshold = 100; // Pixels to scroll before shrinking
        
        if (currentScrollY > scrollThreshold) {
            masthead.classList.add('shrunk');
        } else {
            masthead.classList.remove('shrunk');
        }
        
        lastScrollY = currentScrollY;
        isScrolling = false;
    }
    
    // Optimized scroll event with requestAnimationFrame
    function onScroll() {
        if (!isScrolling) {
            requestAnimationFrame(handleScroll);
            isScrolling = true;
        }
    }
    
    // Add scroll event listener
    window.addEventListener('scroll', onScroll, { passive: true });

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
            
            // Focus trap for accessibility
            const firstFocusableElement = sidePanel.querySelector('button, a, input, select, textarea, [tabindex]:not([tabindex="-1"])');
            if (firstFocusableElement) {
                firstFocusableElement.focus();
            }
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
            
            // Return focus to menu toggle button
            if (menuToggle) {
                menuToggle.focus();
            }
        }
    }

    // Toggle menu when button is clicked
    if (menuToggle) {
        menuToggle.addEventListener('click', function(e) {
            e.preventDefault();
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
        backArrow.addEventListener('click', function(e) {
            e.preventDefault();
            closeMenu();
        });
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

    // Handle focus trap in side panel
    if (sidePanel) {
        sidePanel.addEventListener('keydown', function(e) {
            if (e.key === 'Tab' && sidePanel.classList.contains('open')) {
                const focusableElements = sidePanel.querySelectorAll(
                    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
                );
                const firstFocusable = focusableElements[0];
                const lastFocusable = focusableElements[focusableElements.length - 1];
                
                if (e.shiftKey) {
                    if (document.activeElement === firstFocusable) {
                        lastFocusable.focus();
                        e.preventDefault();
                    }
                } else {
                    if (document.activeElement === lastFocusable) {
                        firstFocusable.focus();
                        e.preventDefault();
                    }
                }
            }
        });
    }

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

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerHeight = masthead.offsetHeight;
                const targetPosition = target.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Initialize masthead state on page load
    handleScroll();
    
    // Handle resize events
    let resizeTimer;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function() {
            // Close menu on resize to prevent layout issues
            if (sidePanel && sidePanel.classList.contains('open')) {
                closeMenu();
            }
        }, 250);
    });

})();
