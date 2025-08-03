// Modern Web Design - JavaScript Functionality
// Author: DigitalPro Team

// DOM Elements
const navbar = document.querySelector('.navbar');
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const contactForm = document.querySelector('.contact-form');

// Utility Functions
const utils = {
    // Throttle function for performance
    throttle: (func, limit) => {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        }
    },

    // Debounce function
    debounce: (func, wait) => {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },

    // Smooth scroll to element
    smoothScrollTo: (element) => {
        const targetPosition = element.offsetTop - navbar.offsetHeight;
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
    },

    // Check if element is in viewport
    isInViewport: (element) => {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }
};

// Navigation Controller
class NavigationController {
    constructor() {
        this.isMenuOpen = false;
        this.init();
    }

    init() {
        this.handleScroll();
        this.handleMobileMenu();
        this.handleNavLinks();
        this.handleActiveLink();
    }

    // Handle navbar scroll effect
    handleScroll() {
        const scrollHandler = utils.throttle(() => {
            if (window.scrollY > 100) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
            this.updateActiveLink();
        }, 100);

        window.addEventListener('scroll', scrollHandler);
    }

    // Handle mobile menu toggle
    handleMobileMenu() {
        navToggle.addEventListener('click', () => {
            this.toggleMobileMenu();
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!navbar.contains(e.target) && this.isMenuOpen) {
                this.closeMobileMenu();
            }
        });
    }

    toggleMobileMenu() {
        this.isMenuOpen = !this.isMenuOpen;
        navMenu.classList.toggle('active');
        
        // Animate hamburger menu
        const bars = navToggle.querySelectorAll('.bar');
        bars.forEach((bar, index) => {
            if (this.isMenuOpen) {
                if (index === 0) bar.style.transform = 'rotate(-45deg) translate(-5px, 6px)';
                if (index === 1) bar.style.opacity = '0';
                if (index === 2) bar.style.transform = 'rotate(45deg) translate(-5px, -6px)';
            } else {
                bar.style.transform = '';
                bar.style.opacity = '';
            }
        });
    }

    closeMobileMenu() {
        this.isMenuOpen = false;
        navMenu.classList.remove('active');
        
        // Reset hamburger menu
        const bars = navToggle.querySelectorAll('.bar');
        bars.forEach(bar => {
            bar.style.transform = '';
            bar.style.opacity = '';
        });
    }

    // Handle nav link clicks
    handleNavLinks() {
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    utils.smoothScrollTo(targetElement);
                    this.closeMobileMenu();
                }
            });
        });
    }

    // Update active link based on scroll position
    updateActiveLink() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPosition = window.scrollY + navbar.offsetHeight + 100;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            const correspondingLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => link.classList.remove('active'));
                if (correspondingLink) {
                    correspondingLink.classList.add('active');
                }
            }
        });
    }

    handleActiveLink() {
        // Add active link styles via CSS
        const style = document.createElement('style');
        style.textContent = `
            .nav-link.active {
                color: #4f46e5 !important;
            }
            .nav-link.active::after {
                width: 100% !important;
            }
        `;
        document.head.appendChild(style);
    }
}

// Animation Controller
class AnimationController {
    constructor() {
        this.observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        this.init();
    }

    init() {
        this.setupIntersectionObserver();
        this.animateCounters();
        this.addScrollAnimations();
    }

    setupIntersectionObserver() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                    
                    // Special animation for stats
                    if (entry.target.classList.contains('stat')) {
                        this.animateCounter(entry.target);
                    }
                }
            });
        }, this.observerOptions);

        // Observe elements for animation
        const animatedElements = document.querySelectorAll(
            '.service-card, .portfolio-item, .visual-card, .stat, .contact-item'
        );
        
        animatedElements.forEach(el => observer.observe(el));
    }

    animateCounter(statElement) {
        const numberElement = statElement.querySelector('h4');
        if (!numberElement) return;

        const finalNumber = parseInt(numberElement.textContent.replace(/\D/g, ''));
        const duration = 2000;
        const startTime = performance.now();

        const updateCounter = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            // Easing function
            const easeOutQuart = 1 - Math.pow(1 - progress, 4);
            const currentNumber = Math.floor(finalNumber * easeOutQuart);
            
            // Format number with original suffix
            const originalText = numberElement.textContent;
            const suffix = originalText.replace(/[\d\s]/g, '');
            numberElement.textContent = currentNumber + suffix;

            if (progress < 1) {
                requestAnimationFrame(updateCounter);
            }
        };

        requestAnimationFrame(updateCounter);
    }

    addScrollAnimations() {
        // Add CSS for scroll animations
        const style = document.createElement('style');
        style.textContent = `
            .service-card,
            .portfolio-item,
            .visual-card,
            .contact-item {
                opacity: 0;
                transform: translateY(30px);
                transition: all 0.6s ease;
            }
            
            .service-card.animate-in,
            .portfolio-item.animate-in,
            .visual-card.animate-in,
            .contact-item.animate-in {
                opacity: 1;
                transform: translateY(0);
            }
            
            .stat {
                opacity: 0;
                transform: scale(0.8);
                transition: all 0.6s ease;
            }
            
            .stat.animate-in {
                opacity: 1;
                transform: scale(1);
            }
        `;
        document.head.appendChild(style);
    }
}

// Form Controller
class FormController {
    constructor() {
        if (contactForm) {
            this.init();
        }
    }

    init() {
        this.handleFormSubmission();
        this.addFormValidation();
    }

    handleFormSubmission() {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            this.submitForm();
        });
    }

    addFormValidation() {
        const inputs = contactForm.querySelectorAll('input, textarea');
        
        inputs.forEach(input => {
            input.addEventListener('blur', () => {
                this.validateField(input);
            });
            
            input.addEventListener('input', () => {
                this.clearFieldError(input);
            });
        });
    }

    validateField(field) {
        const value = field.value.trim();
        let isValid = true;
        let errorMessage = '';

        // Remove existing error
        this.clearFieldError(field);

        if (field.hasAttribute('required') && !value) {
            isValid = false;
            errorMessage = 'এই ফিল্ডটি আবশ্যক';
        } else if (field.type === 'email' && value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                isValid = false;
                errorMessage = 'সঠিক ইমেইল ঠিকানা লিখুন';
            }
        }

        if (!isValid) {
            this.showFieldError(field, errorMessage);
        }

        return isValid;
    }

    showFieldError(field, message) {
        field.style.borderColor = '#ef4444';
        
        const errorElement = document.createElement('span');
        errorElement.className = 'field-error';
        errorElement.textContent = message;
        errorElement.style.cssText = `
            color: #ef4444;
            font-size: 0.875rem;
            margin-top: 0.25rem;
            display: block;
        `;
        
        field.parentNode.appendChild(errorElement);
    }

    clearFieldError(field) {
        field.style.borderColor = '';
        const errorElement = field.parentNode.querySelector('.field-error');
        if (errorElement) {
            errorElement.remove();
        }
    }

    async submitForm() {
        const formData = new FormData(contactForm);
        const inputs = contactForm.querySelectorAll('input, textarea');
        let allValid = true;

        // Validate all fields
        inputs.forEach(input => {
            if (!this.validateField(input)) {
                allValid = false;
            }
        });

        if (!allValid) {
            this.showNotification('অনুগ্রহ করে সব ফিল্ড সঠিকভাবে পূরণ করুন', 'error');
            return;
        }

        // Show loading state
        const submitButton = contactForm.querySelector('button[type="submit"]');
        const originalText = submitButton.innerHTML;
        submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> পাঠানো হচ্ছে...';
        submitButton.disabled = true;

        try {
            // Simulate form submission (replace with actual endpoint)
            await new Promise(resolve => setTimeout(resolve, 2000));
            
            this.showNotification('আপনার বার্তা সফলভাবে পাঠানো হয়েছে!', 'success');
            contactForm.reset();
        } catch (error) {
            this.showNotification('দুঃখিত, কোনো সমস্যা হয়েছে। আবার চেষ্টা করুন।', 'error');
        } finally {
            submitButton.innerHTML = originalText;
            submitButton.disabled = false;
        }
    }

    showNotification(message, type) {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 1rem 1.5rem;
            border-radius: 8px;
            color: white;
            font-weight: 500;
            z-index: 10000;
            transform: translateX(100%);
            transition: transform 0.3s ease;
            ${type === 'success' ? 'background: #10b981;' : 'background: #ef4444;'}
        `;

        document.body.appendChild(notification);

        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);

        // Remove after 5 seconds
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 5000);
    }
}

// Performance Optimization
class PerformanceOptimizer {
    constructor() {
        this.init();
    }

    init() {
        this.lazyLoadImages();
        this.preloadCriticalResources();
    }

    lazyLoadImages() {
        const images = document.querySelectorAll('img[data-src]');
        
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    imageObserver.unobserve(img);
                }
            });
        });

        images.forEach(img => imageObserver.observe(img));
    }

    preloadCriticalResources() {
        // Preload important fonts
        const fontPreloads = [
            'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap'
        ];

        fontPreloads.forEach(href => {
            const link = document.createElement('link');
            link.rel = 'preload';
            link.as = 'style';
            link.href = href;
            document.head.appendChild(link);
        });
    }
}

// Initialize all controllers when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize all components
    new NavigationController();
    new AnimationController();
    new FormController();
    new PerformanceOptimizer();

    // Add loading animation
    document.body.classList.add('loaded');
    
    // Console message for developers
    console.log('%c🚀 DigitalPro Website Loaded Successfully! %c', 
                'background: linear-gradient(45deg, #4f46e5, #7c3aed); color: white; padding: 8px 16px; border-radius: 8px; font-weight: bold;', 
                'background: transparent;');
});

// Handle page visibility change for performance
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        // Pause animations when tab is not visible
        document.body.classList.add('paused');
    } else {
        // Resume animations when tab becomes visible
        document.body.classList.remove('paused');
    }
});

// Add smooth loading transition
const loadingStyle = document.createElement('style');
loadingStyle.textContent = `
    body {
        opacity: 0;
        transition: opacity 0.3s ease;
    }
    
    body.loaded {
        opacity: 1;
    }
    
    body.paused * {
        animation-play-state: paused !important;
    }
`;
document.head.appendChild(loadingStyle);
