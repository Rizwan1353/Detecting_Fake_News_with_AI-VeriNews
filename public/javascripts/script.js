/**
 * FOUNDERZ BLOG REPLICA - JAVASCRIPT
 * Dynamic Sticky Navbar with Logo Transformation
 * 
 * Features:
 * - Detects scroll position
 * - Changes navbar logo from "iFoundrz" to "F" when scrolled
 * - Reverts back to full name when at top
 * - Smooth transitions and animations
 */

document.addEventListener('DOMContentLoaded', function() {
    const navbar = document.querySelector('.navbar');
    const scrollThreshold = 100; // Pixels to scroll before triggering change

    /**
     * Handle scroll event
     * Adds 'scrolled' class to navbar when user scrolls past threshold
     */
    window.addEventListener('scroll', function() {
        if (window.scrollY > scrollThreshold) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    /**
     * Smooth scroll behavior for navigation links
     */
    const navLinks = document.querySelectorAll('a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#' && document.querySelector(href)) {
                e.preventDefault();
                const target = document.querySelector(href);
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    /**
     * Add click handlers to CTA buttons
     */
    const ctaButtons = document.querySelectorAll('.cta-btn, .read-more');
    ctaButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            if (this.getAttribute('href') === '#') {
                e.preventDefault();
                console.log('Button clicked - Feature coming soon');
            }
        });
    });

    /**
     * Add hover effect to featured cards
     */
    const featuredCards = document.querySelectorAll('.featured-card');
    featuredCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
        });
    });

    /**
     * Intersection Observer for fade-in animations on scroll
     */
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe article sections for fade-in
    const sections = document.querySelectorAll('.article-section, .featured-card');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });

    /**
     * Log scroll position for debugging (optional)
     */
    window.addEventListener('scroll', function() {
        // Uncomment for debugging:
        // console.log('Scroll position:', window.scrollY);
    });
});

/**
 * Utility: Debounce function for performance optimization
 */
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

/**
 * Utility: Throttle function for scroll events
 */
function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}
