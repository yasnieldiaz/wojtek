/* =====================================================
   WOJTEK DENTAL CLINIC - PREMIUM JAVASCRIPT
   ===================================================== */

document.addEventListener('DOMContentLoaded', () => {
    // Initialize all modules
    Preloader.init();
    CustomCursor.init();
    Header.init();
    MobileMenu.init();
    SmoothScroll.init();
    CounterAnimation.init();
    ScrollAnimations.init();
    AppointmentForm.init();
    DoctorFilter.init();
    BackToTop.init();
    ParallaxEffects.init();
});

/* =====================================================
   PRELOADER
   ===================================================== */
const Preloader = {
    init() {
        const preloader = document.getElementById('preloader');
        if (!preloader) return;

        window.addEventListener('load', () => {
            setTimeout(() => {
                preloader.classList.add('loaded');
                document.body.classList.remove('no-scroll');

                // Trigger animations after preloader
                setTimeout(() => {
                    ScrollAnimations.triggerInitialAnimations();
                }, 300);
            }, 800);
        });

        // Fallback if load takes too long
        setTimeout(() => {
            preloader.classList.add('loaded');
            document.body.classList.remove('no-scroll');
        }, 3000);
    }
};

/* =====================================================
   CUSTOM CURSOR
   ===================================================== */
const CustomCursor = {
    dot: null,
    outline: null,
    mouseX: 0,
    mouseY: 0,
    outlineX: 0,
    outlineY: 0,

    init() {
        if (window.innerWidth <= 1024) return;

        this.dot = document.getElementById('cursorDot');
        this.outline = document.getElementById('cursorOutline');

        if (!this.dot || !this.outline) return;

        document.addEventListener('mousemove', (e) => this.onMouseMove(e));
        this.addHoverListeners();
        this.animate();
    },

    onMouseMove(e) {
        this.mouseX = e.clientX;
        this.mouseY = e.clientY;
        this.dot.style.left = `${e.clientX}px`;
        this.dot.style.top = `${e.clientY}px`;
    },

    animate() {
        this.outlineX += (this.mouseX - this.outlineX) * 0.15;
        this.outlineY += (this.mouseY - this.outlineY) * 0.15;

        this.outline.style.left = `${this.outlineX}px`;
        this.outline.style.top = `${this.outlineY}px`;

        requestAnimationFrame(() => this.animate());
    },

    addHoverListeners() {
        const hoverElements = document.querySelectorAll('a, button, .magnetic, input, textarea, select');

        hoverElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                this.outline.classList.add('hover');
            });
            el.addEventListener('mouseleave', () => {
                this.outline.classList.remove('hover');
            });
        });
    }
};

/* =====================================================
   HEADER
   ===================================================== */
const Header = {
    header: null,
    lastScroll: 0,

    init() {
        this.header = document.getElementById('header');
        if (!this.header) return;

        window.addEventListener('scroll', () => this.onScroll(), { passive: true });
        this.onScroll();
    },

    onScroll() {
        const currentScroll = window.pageYOffset;

        if (currentScroll > 50) {
            this.header.classList.add('scrolled');
        } else {
            this.header.classList.remove('scrolled');
        }

        this.lastScroll = currentScroll;
    }
};

/* =====================================================
   MOBILE MENU
   ===================================================== */
const MobileMenu = {
    toggle: null,
    nav: null,

    init() {
        this.toggle = document.getElementById('menuToggle');
        this.nav = document.getElementById('nav');

        if (!this.toggle || !this.nav) return;

        this.toggle.addEventListener('click', () => this.toggleMenu());

        // Close on link click
        const navLinks = this.nav.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => this.closeMenu());
        });

        // Close on outside click
        document.addEventListener('click', (e) => {
            if (!this.nav.contains(e.target) && !this.toggle.contains(e.target)) {
                this.closeMenu();
            }
        });
    },

    toggleMenu() {
        this.toggle.classList.toggle('active');
        this.nav.classList.toggle('active');
        document.body.classList.toggle('no-scroll');
    },

    closeMenu() {
        this.toggle.classList.remove('active');
        this.nav.classList.remove('active');
        document.body.classList.remove('no-scroll');
    }
};

/* =====================================================
   SMOOTH SCROLL
   ===================================================== */
const SmoothScroll = {
    init() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                const href = anchor.getAttribute('href');
                if (href === '#') return;

                const target = document.querySelector(href);
                if (target) {
                    e.preventDefault();
                    const headerHeight = document.querySelector('.header')?.offsetHeight || 90;
                    const targetPosition = target.offsetTop - headerHeight;

                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }
};

/* =====================================================
   COUNTER ANIMATION
   ===================================================== */
const CounterAnimation = {
    counters: null,
    observed: new Set(),

    init() {
        this.counters = document.querySelectorAll('.counter');
        if (!this.counters.length) return;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !this.observed.has(entry.target)) {
                    this.observed.add(entry.target);
                    this.animateCounter(entry.target);
                }
            });
        }, { threshold: 0.5 });

        this.counters.forEach(counter => observer.observe(counter));
    },

    animateCounter(counter) {
        const target = parseFloat(counter.dataset.target);
        const duration = 2000;
        const startTime = performance.now();
        const isDecimal = target % 1 !== 0;

        const animate = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);

            // Easing function
            const easeOutQuart = 1 - Math.pow(1 - progress, 4);
            const current = target * easeOutQuart;

            if (isDecimal) {
                counter.textContent = current.toFixed(1);
            } else {
                counter.textContent = Math.floor(current).toLocaleString();
            }

            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        };

        requestAnimationFrame(animate);
    }
};

/* =====================================================
   SCROLL ANIMATIONS
   ===================================================== */
const ScrollAnimations = {
    elements: null,

    init() {
        this.elements = document.querySelectorAll('[data-aos]');
        if (!this.elements.length) return;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const delay = entry.target.dataset.aosDelay || 0;
                    setTimeout(() => {
                        entry.target.classList.add('aos-animate');
                    }, delay);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        this.elements.forEach(el => observer.observe(el));

        // Stat bars animation
        this.initStatBars();
    },

    triggerInitialAnimations() {
        // Trigger hero animations
        const heroElements = document.querySelectorAll('.hero [data-aos]');
        heroElements.forEach(el => {
            const delay = el.dataset.aosDelay || 0;
            setTimeout(() => {
                el.classList.add('aos-animate');
            }, delay);
        });
    },

    initStatBars() {
        const statBars = document.querySelectorAll('.stat-bar-fill');

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const fill = entry.target.dataset.fill;
                    entry.target.style.setProperty('--fill', `${fill}%`);
                    entry.target.classList.add('animated');
                }
            });
        }, { threshold: 0.5 });

        statBars.forEach(bar => observer.observe(bar));
    }
};

/* =====================================================
   APPOINTMENT FORM
   ===================================================== */
const AppointmentForm = {
    form: null,

    init() {
        this.form = document.getElementById('appointmentForm');
        if (!this.form) return;

        this.form.addEventListener('submit', (e) => this.handleSubmit(e));

        // Input animations
        this.initInputAnimations();
    },

    initInputAnimations() {
        const inputs = this.form.querySelectorAll('input, select, textarea');

        inputs.forEach(input => {
            input.addEventListener('focus', () => {
                input.parentElement.classList.add('focused');
            });

            input.addEventListener('blur', () => {
                if (!input.value) {
                    input.parentElement.classList.remove('focused');
                }
            });
        });
    },

    async handleSubmit(e) {
        e.preventDefault();

        const formData = new FormData(this.form);
        const data = Object.fromEntries(formData.entries());

        // Validation
        if (!this.validateForm(data)) return;

        const submitBtn = this.form.querySelector('button[type="submit"]');
        const originalContent = submitBtn.innerHTML;

        // Loading state
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> <span>Enviando...</span>';
        submitBtn.disabled = true;

        try {
            const response = await fetch('/api/appointment', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });

            const result = await response.json();

            if (result.success) {
                this.showNotification(result.message, 'success');
                this.form.reset();
            } else {
                this.showNotification('Error al enviar el formulario', 'error');
            }
        } catch (error) {
            this.showNotification('Error de conexión. Inténtalo de nuevo.', 'error');
        }

        submitBtn.innerHTML = originalContent;
        submitBtn.disabled = false;
    },

    validateForm(data) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const phoneRegex = /^[0-9+\s-]{9,}$/;

        if (!data.nombre || data.nombre.length < 2) {
            this.showNotification('Por favor, introduce tu nombre', 'error');
            return false;
        }

        if (!phoneRegex.test(data.telefono)) {
            this.showNotification('Por favor, introduce un teléfono válido', 'error');
            return false;
        }

        if (!emailRegex.test(data.email)) {
            this.showNotification('Por favor, introduce un email válido', 'error');
            return false;
        }

        if (!data.tratamiento) {
            this.showNotification('Por favor, selecciona un tratamiento', 'error');
            return false;
        }

        if (!data.privacidad) {
            this.showNotification('Debes aceptar la política de privacidad', 'error');
            return false;
        }

        return true;
    },

    showNotification(message, type) {
        // Remove existing notifications
        document.querySelectorAll('.notification').forEach(n => n.remove());

        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i>
                <span>${message}</span>
            </div>
            <button class="notification-close"><i class="fas fa-times"></i></button>
        `;

        // Styles
        Object.assign(notification.style, {
            position: 'fixed',
            top: '100px',
            right: '20px',
            padding: '16px 20px',
            background: type === 'success' ? '#10b981' : '#ef4444',
            color: 'white',
            borderRadius: '12px',
            boxShadow: '0 10px 40px rgba(0,0,0,0.2)',
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
            zIndex: '99999',
            animation: 'slideInRight 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55)',
            maxWidth: '400px'
        });

        // Add animation keyframes
        if (!document.querySelector('#notification-styles')) {
            const style = document.createElement('style');
            style.id = 'notification-styles';
            style.textContent = `
                @keyframes slideInRight {
                    from { transform: translateX(100%); opacity: 0; }
                    to { transform: translateX(0); opacity: 1; }
                }
                @keyframes slideOutRight {
                    from { transform: translateX(0); opacity: 1; }
                    to { transform: translateX(100%); opacity: 0; }
                }
                .notification-content {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                }
                .notification-close {
                    background: none;
                    border: none;
                    color: white;
                    cursor: pointer;
                    padding: 4px;
                    opacity: 0.8;
                    transition: opacity 0.2s;
                }
                .notification-close:hover {
                    opacity: 1;
                }
            `;
            document.head.appendChild(style);
        }

        document.body.appendChild(notification);

        // Close button
        notification.querySelector('.notification-close').addEventListener('click', () => {
            notification.style.animation = 'slideOutRight 0.3s ease forwards';
            setTimeout(() => notification.remove(), 300);
        });

        // Auto remove
        setTimeout(() => {
            if (notification.parentElement) {
                notification.style.animation = 'slideOutRight 0.3s ease forwards';
                setTimeout(() => notification.remove(), 300);
            }
        }, 5000);
    }
};

/* =====================================================
   DOCTOR FILTER
   ===================================================== */
const DoctorFilter = {
    buttons: null,
    cards: null,
    noResults: null,

    init() {
        this.buttons = document.querySelectorAll('.filter-btn');
        this.cards = document.querySelectorAll('.doctor-card');
        this.noResults = document.getElementById('noResults');

        if (!this.buttons.length || !this.cards.length) return;

        this.buttons.forEach(btn => {
            btn.addEventListener('click', () => this.filterDoctors(btn));
        });
    },

    filterDoctors(activeBtn) {
        // Update active button
        this.buttons.forEach(btn => btn.classList.remove('active'));
        activeBtn.classList.add('active');

        const filter = activeBtn.dataset.filter;
        let visibleCount = 0;

        this.cards.forEach((card, index) => {
            const category = card.dataset.category;

            if (filter === 'all' || category === filter) {
                card.style.display = 'grid';
                card.style.animation = `fadeIn 0.5s ease ${index * 0.1}s forwards`;
                visibleCount++;
            } else {
                card.style.display = 'none';
            }
        });

        // Show/hide no results
        if (this.noResults) {
            this.noResults.style.display = visibleCount === 0 ? 'block' : 'none';
        }
    }
};

/* =====================================================
   BACK TO TOP
   ===================================================== */
const BackToTop = {
    button: null,

    init() {
        this.button = document.getElementById('backToTop');
        if (!this.button) return;

        window.addEventListener('scroll', () => this.toggleVisibility(), { passive: true });
        this.button.addEventListener('click', () => this.scrollToTop());
    },

    toggleVisibility() {
        if (window.pageYOffset > 500) {
            this.button.classList.add('visible');
        } else {
            this.button.classList.remove('visible');
        }
    },

    scrollToTop() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }
};

/* =====================================================
   PARALLAX EFFECTS
   ===================================================== */
const ParallaxEffects = {
    elements: null,

    init() {
        this.elements = document.querySelectorAll('.floating-card');
        if (!this.elements.length || window.innerWidth <= 768) return;

        window.addEventListener('scroll', () => this.onScroll(), { passive: true });
    },

    onScroll() {
        const scrollY = window.pageYOffset;

        this.elements.forEach((el, index) => {
            const speed = 0.05 + (index * 0.02);
            const y = scrollY * speed;
            el.style.transform = `translateY(${-y}px)`;
        });
    }
};

/* =====================================================
   MAGNETIC BUTTONS (Optional Enhancement)
   ===================================================== */
const MagneticButtons = {
    init() {
        if (window.innerWidth <= 1024) return;

        const buttons = document.querySelectorAll('.magnetic');

        buttons.forEach(btn => {
            btn.addEventListener('mousemove', (e) => {
                const rect = btn.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;

                btn.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
            });

            btn.addEventListener('mouseleave', () => {
                btn.style.transform = 'translate(0, 0)';
            });
        });
    }
};

// Initialize magnetic buttons
document.addEventListener('DOMContentLoaded', () => {
    MagneticButtons.init();
});

/* =====================================================
   PARTICLES BACKGROUND (Hero Section)
   ===================================================== */
const ParticlesBackground = {
    init() {
        const container = document.getElementById('particles');
        if (!container) return;

        for (let i = 0; i < 50; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';

            const size = Math.random() * 10 + 5;
            const x = Math.random() * 100;
            const y = Math.random() * 100;
            const duration = Math.random() * 20 + 10;
            const delay = Math.random() * 5;

            Object.assign(particle.style, {
                position: 'absolute',
                width: `${size}px`,
                height: `${size}px`,
                left: `${x}%`,
                top: `${y}%`,
                background: `rgba(99, 102, 241, ${Math.random() * 0.3 + 0.1})`,
                borderRadius: '50%',
                animation: `particleFloat ${duration}s ease-in-out ${delay}s infinite`
            });

            container.appendChild(particle);
        }

        // Add particle animation
        const style = document.createElement('style');
        style.textContent = `
            @keyframes particleFloat {
                0%, 100% {
                    transform: translate(0, 0) scale(1);
                    opacity: 0.5;
                }
                50% {
                    transform: translate(${Math.random() * 100 - 50}px, ${Math.random() * 100 - 50}px) scale(1.2);
                    opacity: 0.8;
                }
            }
        `;
        document.head.appendChild(style);
    }
};

document.addEventListener('DOMContentLoaded', () => {
    ParticlesBackground.init();
});

/* =====================================================
   FORM INPUT RIPPLE EFFECT
   ===================================================== */
document.querySelectorAll('.input-wrapper input, .input-wrapper select, .input-wrapper textarea').forEach(input => {
    input.addEventListener('focus', function() {
        this.parentElement.classList.add('focused');
    });

    input.addEventListener('blur', function() {
        if (!this.value) {
            this.parentElement.classList.remove('focused');
        }
    });
});

/* =====================================================
   LAZY LOAD IMAGES (If needed)
   ===================================================== */
const LazyLoad = {
    init() {
        const images = document.querySelectorAll('img[data-src]');
        if (!images.length) return;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    observer.unobserve(img);
                }
            });
        }, {
            rootMargin: '50px'
        });

        images.forEach(img => observer.observe(img));
    }
};

document.addEventListener('DOMContentLoaded', () => {
    LazyLoad.init();
});

/* =====================================================
   LANGUAGE SELECTOR WITH SMOOTH TRANSITIONS
   ===================================================== */
const LanguageSelector = {
    overlay: null,

    init() {
        const langToggle = document.getElementById('langToggle');
        const langSelector = document.querySelector('.language-selector');

        if (!langToggle || !langSelector) return;

        // Create transition overlay
        this.createOverlay();

        // Toggle dropdown
        langToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            langSelector.classList.toggle('active');
        });

        // Close on outside click
        document.addEventListener('click', (e) => {
            if (!langSelector.contains(e.target)) {
                langSelector.classList.remove('active');
            }
        });

        // Handle language selection with smooth transition
        const langOptions = document.querySelectorAll('.lang-option');
        langOptions.forEach(option => {
            option.addEventListener('click', (e) => {
                e.preventDefault();
                const href = option.getAttribute('href');
                const currentLang = document.querySelector('.current-lang');
                const newLang = option.dataset.lang;

                // Check if same language
                if (option.classList.contains('active')) {
                    langSelector.classList.remove('active');
                    return;
                }

                // Update visual state
                langOptions.forEach(opt => opt.classList.remove('active'));
                option.classList.add('active');

                if (currentLang) {
                    currentLang.textContent = newLang.toUpperCase();
                }

                langSelector.classList.remove('active');

                // Trigger smooth page transition
                this.transitionToPage(href);
            });
        });

        // Handle initial page load animation
        this.handlePageLoad();
    },

    createOverlay() {
        // Check if overlay already exists
        if (document.getElementById('pageTransitionOverlay')) return;

        this.overlay = document.createElement('div');
        this.overlay.id = 'pageTransitionOverlay';
        this.overlay.className = 'page-transition-overlay';
        this.overlay.innerHTML = `
            <div class="transition-content">
                <div class="transition-loader">
                    <i class="fas fa-tooth"></i>
                </div>
                <span class="transition-text"></span>
            </div>
        `;
        document.body.appendChild(this.overlay);

        // Add styles
        this.addTransitionStyles();
    },

    addTransitionStyles() {
        if (document.getElementById('page-transition-styles')) return;

        const style = document.createElement('style');
        style.id = 'page-transition-styles';
        style.textContent = `
            .page-transition-overlay {
                position: fixed;
                inset: 0;
                z-index: 999999;
                display: flex;
                align-items: center;
                justify-content: center;
                background: linear-gradient(135deg, #0c1445 0%, #1a1a2e 100%);
                opacity: 0;
                visibility: hidden;
                transition: opacity 0.4s ease, visibility 0.4s ease;
            }

            .page-transition-overlay.active {
                opacity: 1;
                visibility: visible;
            }

            .transition-content {
                text-align: center;
                color: white;
                transform: scale(0.9);
                opacity: 0;
                transition: transform 0.4s ease 0.1s, opacity 0.4s ease 0.1s;
            }

            .page-transition-overlay.active .transition-content {
                transform: scale(1);
                opacity: 1;
            }

            .transition-loader {
                font-size: 4rem;
                margin-bottom: 20px;
                animation: toothSpin 1s ease-in-out infinite;
            }

            .transition-loader i {
                background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
                background-clip: text;
            }

            .transition-text {
                display: block;
                font-size: 1.25rem;
                font-weight: 600;
                letter-spacing: 2px;
                opacity: 0.9;
            }

            @keyframes toothSpin {
                0% { transform: rotate(0deg) scale(1); }
                25% { transform: rotate(10deg) scale(1.1); }
                50% { transform: rotate(0deg) scale(1); }
                75% { transform: rotate(-10deg) scale(1.1); }
                100% { transform: rotate(0deg) scale(1); }
            }

            /* Page content transition */
            .page-content-wrapper {
                transition: opacity 0.3s ease, transform 0.3s ease;
            }

            .page-content-wrapper.fade-out {
                opacity: 0;
                transform: translateY(-10px);
            }

            .page-content-wrapper.fade-in {
                animation: pageContentFadeIn 0.5s ease forwards;
            }

            @keyframes pageContentFadeIn {
                from {
                    opacity: 0;
                    transform: translateY(20px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }

            /* Smooth element transitions on language change */
            body.lang-transitioning * {
                transition: color 0.3s ease, background-color 0.3s ease !important;
            }
        `;
        document.head.appendChild(style);
    },

    transitionToPage(href) {
        const langTexts = {
            es: 'Cambiando idioma...',
            pl: 'Zmiana języka...',
            uk: 'Зміна мови...',
            en: 'Changing language...'
        };

        // Get target language from href
        const urlParams = new URLSearchParams(href.split('?')[1]);
        const targetLang = urlParams.get('lang') || 'es';

        // Update transition text
        const transitionText = this.overlay.querySelector('.transition-text');
        if (transitionText) {
            transitionText.textContent = langTexts[targetLang] || langTexts.es;
        }

        // Start transition
        document.body.classList.add('lang-transitioning');

        // Fade out current content
        const mainContent = document.querySelector('main') || document.body;
        mainContent.style.opacity = '0';
        mainContent.style.transform = 'translateY(-10px)';
        mainContent.style.transition = 'opacity 0.3s ease, transform 0.3s ease';

        // Show overlay after content fades
        setTimeout(() => {
            this.overlay.classList.add('active');

            // Navigate after overlay is visible
            setTimeout(() => {
                window.location.href = href;
            }, 400);
        }, 200);
    },

    handlePageLoad() {
        // Check if coming from language change
        const sessionFlag = sessionStorage.getItem('langTransition');

        if (sessionFlag) {
            sessionStorage.removeItem('langTransition');

            // Show overlay briefly then fade out
            this.overlay.classList.add('active');

            setTimeout(() => {
                this.overlay.classList.remove('active');

                // Animate content in
                const mainContent = document.querySelector('main') || document.body;
                mainContent.classList.add('fade-in');

                setTimeout(() => {
                    mainContent.classList.remove('fade-in');
                    document.body.classList.remove('lang-transitioning');
                }, 500);
            }, 300);
        }

        // Set flag for next navigation
        document.querySelectorAll('.lang-option').forEach(option => {
            option.addEventListener('click', () => {
                sessionStorage.setItem('langTransition', 'true');
            });
        });
    }
};

document.addEventListener('DOMContentLoaded', () => {
    LanguageSelector.init();
});
