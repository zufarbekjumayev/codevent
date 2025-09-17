// Main JavaScript file for CODEVENT website

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initLoadingScreen();
    initMobileMenu();
    initFrameResize();
    initSmoothScrolling();
    initIntersectionObserver();
    initParallaxEffects();
    initFloatingElements();
});

// Loading Screen
function initLoadingScreen() {
    const loadingScreen = document.getElementById('loadingScreen');
    
    if (loadingScreen) {
        // Simulate loading time
        setTimeout(() => {
            loadingScreen.style.opacity = '0';
            loadingScreen.style.transform = 'scale(1.1)';
            
            setTimeout(() => {
                loadingScreen.style.display = 'none';
                document.body.style.overflow = 'auto';
            }, 500);
        }, 2000);
        
        // Disable scrolling during loading
        document.body.style.overflow = 'hidden';
    }
}

// Mobile Menu
function initMobileMenu() {
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    
    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            const isHidden = mobileMenu.classList.contains('hidden');
            
            if (isHidden) {
                mobileMenu.classList.remove('hidden');
                mobileMenu.classList.add('mobile-menu-enter');
                animateMenuIcon(mobileMenuBtn, true);
            } else {
                mobileMenu.classList.add('hidden');
                mobileMenu.classList.remove('mobile-menu-enter');
                animateMenuIcon(mobileMenuBtn, false);
            }
        });
        
        // Close menu when clicking on links
        const mobileLinks = mobileMenu.querySelectorAll('a');
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');
                mobileMenu.classList.remove('mobile-menu-enter');
                animateMenuIcon(mobileMenuBtn, false);
            });
        });
    }
}

// Animate mobile menu icon
function animateMenuIcon(button, isOpen) {
    const spans = button.querySelectorAll('span');
    
    if (isOpen) {
        spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
    } else {
        spans[0].style.transform = 'rotate(0) translate(0, 0)';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'rotate(0) translate(0, 0)';
    }
}

// Frame resize functionality
function initFrameResize() {
    const header = document.getElementById('header');
    const frame = document.getElementById('frame');
    
    if (header && frame) {
        const resizeFrame = () => {
            const headerHeight = header.offsetHeight;
            frame.style.height = `calc(100vh - ${headerHeight}px)`;
        };
        
        // Initial resize
        resizeFrame();
        
        // Resize on window resize
        window.addEventListener('resize', resizeFrame);
        
        // Resize when header height changes
        const resizeObserver = new ResizeObserver(resizeFrame);
        resizeObserver.observe(header);
    }
}

// Smooth scrolling for anchor links
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            
            if (target) {
                const headerHeight = document.getElementById('header')?.offsetHeight || 0;
                const targetPosition = target.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Intersection Observer for animations
function initIntersectionObserver() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Start animations
                entry.target.style.animationPlayState = 'running';
                entry.target.classList.add('animate-in');
                
                // Add stagger effect for multiple elements
                const siblings = entry.target.parentNode.querySelectorAll('[class*="animate-"]');
                siblings.forEach((sibling, index) => {
                    setTimeout(() => {
                        sibling.style.animationPlayState = 'running';
                        sibling.classList.add('animate-in');
                    }, index * 100);
                });
            }
        });
    }, observerOptions);
    
    // Observe all animated elements
    document.querySelectorAll('[class*="animate-"]').forEach(el => {
        el.style.animationPlayState = 'paused';
        observer.observe(el);
    });
}

// Parallax effects
function initParallaxEffects() {
    const parallaxElements = document.querySelectorAll('[data-parallax]');
    
    if (parallaxElements.length > 0) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            
            parallaxElements.forEach(element => {
                const speed = parseFloat(element.dataset.parallax) || 0.5;
                const yPos = -(scrolled * speed);
                element.style.transform = `translateY(${yPos}px)`;
            });
        });
    }
}

// Floating elements animation
function initFloatingElements() {
    const floatingElements = document.querySelectorAll('.animate-float');
    
    floatingElements.forEach((element, index) => {
        // Add random delay to make floating more natural
        const delay = Math.random() * 2;
        element.style.animationDelay = `${delay}s`;
        
        // Add random duration variation
        const duration = 6 + Math.random() * 4;
        element.style.animationDuration = `${duration}s`;
    });
}

// Utility functions
const Utils = {
    // Throttle function for performance
    throttle: (func, wait) => {
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
    
    // Debounce function for performance
    debounce: (func, wait, immediate) => {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                timeout = null;
                if (!immediate) func(...args);
            };
            const callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) func(...args);
        };
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
    },
    
    // Random number generator
    random: (min, max) => Math.floor(Math.random() * (max - min + 1)) + min,
    
    // Format number with commas
    formatNumber: (num) => num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
    
    // Get CSS custom property value
    getCSSVar: (property) => getComputedStyle(document.documentElement).getPropertyValue(property),
    
    // Set CSS custom property value
    setCSSVar: (property, value) => document.documentElement.style.setProperty(property, value)
};

// Custom events
const CustomEvents = {
    // Trigger custom event
    trigger: (eventName, data = {}) => {
        const event = new CustomEvent(eventName, { detail: data });
        document.dispatchEvent(event);
    },
    
    // Listen for custom event
    on: (eventName, callback) => {
        document.addEventListener(eventName, callback);
    },
    
    // Remove event listener
    off: (eventName, callback) => {
        document.removeEventListener(eventName, callback);
    }
};

// Performance monitoring
const Performance = {
    // Measure function execution time
    measure: (func, name = 'Function') => {
        return function(...args) {
            const start = performance.now();
            const result = func.apply(this, args);
            const end = performance.now();
            console.log(`${name} took ${end - start} milliseconds`);
            return result;
        };
    },
    
    // Log page load time
    logLoadTime: () => {
        window.addEventListener('load', () => {
            const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
            console.log(`Page loaded in ${loadTime}ms`);
        });
    }
};

// Initialize performance monitoring
Performance.logLoadTime();

// Export functions for global use
window.CODEVENT = {
    Utils,
    CustomEvents,
    Performance,
    initLoadingScreen,
    initMobileMenu,
    initFrameResize,
    initSmoothScrolling,
    initIntersectionObserver,
    initParallaxEffects,
    initFloatingElements
};

// Console welcome message
console.log(`
   █████████   ██████  ██████  ███████ ██    ██ ███████ ███    ██ ████████ 
  ██    ████ ██    ██ ██   ██ ██      ██    ██ ██      ████   ██    ██    
  ██      ██ ██    ██ ██   ██ █████   ██    ██ █████   ██ ██  ██    ██    
  ██      ██ ██    ██ ██   ██ ██       ██  ██  ██      ██  ██ ██    ██    
   ██████████  ██████  ██████  ███████   ████   ███████ ██   ████    ██    
                                                                          
  🚀 Welcome to CODEVENT - Advanced Learning Platform
  💻 Built with modern web technologies
  🎨 Designed for the future of education
  
  Version: 2.0.0
  Developer: CODEVENT Team
`);