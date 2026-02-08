// ===========================
// Portfolio Loane — Anime.js Animations
// ===========================

document.addEventListener('DOMContentLoaded', () => {

    // ===========================
    // Hero — cinematic entrance timeline
    // ===========================

    const heroTimeline = anime.timeline({
        easing: 'easeOutExpo',
        duration: 1400,
    });

    // Label slide in
    heroTimeline.add({
        targets: '.hero-label.anim',
        translateY: [80, 0],
        rotate: [1, 0],
        opacity: [0, 1],
        duration: 1000,
    }, 300);

    // Name — each line staggers in
    heroTimeline.add({
        targets: '.hero-name .line',
        translateY: [120, 0],
        rotate: [2, 0],
        opacity: [0, 1],
        duration: 1600,
        delay: anime.stagger(180),
    }, 500);

    // Hero image — fade + scale
    heroTimeline.add({
        targets: '.hero-image',
        opacity: [0, 1],
        scale: [0.9, 1],
        translateY: ['-45%', '-50%'],
        duration: 1800,
        easing: 'easeOutQuart',
    }, 800);

    // Quote — slide from left with border reveal
    heroTimeline.add({
        targets: '.hero-quote',
        translateY: [60, 0],
        opacity: [0, 1],
        duration: 1200,
    }, 1200);

    // Divider — width grows
    heroTimeline.add({
        targets: '.hero-divider',
        scaleX: [0, 1],
        opacity: [0, 1],
        duration: 1000,
        easing: 'easeInOutQuart',
    }, 1400);

    // CTA button
    heroTimeline.add({
        targets: '.hero-bottom-left',
        translateY: [40, 0],
        opacity: [0, 1],
        duration: 1000,
    }, 1600);

    // Decorative line (hero::after via a class trick isn't possible,
    // but the CSS pseudo-element animates on its own)

    // ===========================
    // Scroll-triggered reveals — anime.js
    // ===========================

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;

                // Stagger parent — animate children
                if (el.classList.contains('stagger-parent')) {
                    const children = el.querySelectorAll('.reveal');
                    anime({
                        targets: children,
                        translateY: [60, 0],
                        opacity: [0, 1],
                        duration: 1200,
                        easing: 'easeOutExpo',
                        delay: anime.stagger(200),
                    });
                } else {
                    anime({
                        targets: el,
                        translateY: [60, 0],
                        opacity: [0, 1],
                        duration: 1200,
                        easing: 'easeOutExpo',
                    });
                }

                revealObserver.unobserve(el);
            }
        });
    }, {
        threshold: 0.08,
        rootMargin: '0px 0px -80px 0px'
    });

    document.querySelectorAll('.stagger-parent').forEach(el => revealObserver.observe(el));
    document.querySelectorAll('.reveal').forEach(el => {
        if (!el.closest('.stagger-parent')) {
            revealObserver.observe(el);
        }
    });

    // ===========================
    // Work cards — dramatic stagger reveal
    // ===========================

    const worksGrid = document.querySelector('.works-grid');
    if (worksGrid) {
        const cardObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    anime({
                        targets: '.work-card',
                        translateY: [80, 0],
                        opacity: [0, 1],
                        duration: 1400,
                        easing: 'easeOutExpo',
                        delay: anime.stagger(250, { start: 200 }),
                    });
                    cardObserver.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.05,
            rootMargin: '0px 0px -50px 0px'
        });

        cardObserver.observe(worksGrid);
    }

    // ===========================
    // Field columns — stagger entrance
    // ===========================

    const fieldsGrid = document.querySelector('.fields-grid');
    if (fieldsGrid) {
        const fieldObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    anime({
                        targets: '.field-col',
                        translateY: [50, 0],
                        opacity: [0, 1],
                        duration: 1000,
                        easing: 'easeOutExpo',
                        delay: anime.stagger(150, { start: 100 }),
                    });
                    fieldObserver.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
        });

        fieldObserver.observe(fieldsGrid);
    }

    // ===========================
    // Contact section — entrance
    // ===========================

    const contactSection = document.querySelector('.contact-layout');
    if (contactSection) {
        const contactObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    anime.timeline({ easing: 'easeOutExpo' })
                        .add({
                            targets: '.contact .section-label',
                            translateY: [30, 0],
                            opacity: [0, 1],
                            duration: 800,
                        })
                        .add({
                            targets: '.contact-title',
                            translateY: [60, 0],
                            opacity: [0, 1],
                            duration: 1200,
                        }, '-=600')
                        .add({
                            targets: '.contact-text',
                            translateY: [40, 0],
                            opacity: [0, 1],
                            duration: 1000,
                        }, '-=800')
                        .add({
                            targets: '.contact-email',
                            translateY: [30, 0],
                            opacity: [0, 1],
                            duration: 1000,
                        }, '-=600')
                        .add({
                            targets: '.contact-socials .social-link',
                            translateY: [20, 0],
                            opacity: [0, 1],
                            duration: 800,
                            delay: anime.stagger(100),
                        }, '-=600');

                    contactObserver.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.15,
        });

        contactObserver.observe(contactSection);
    }

    // ===========================
    // Parallax effect — hero elements on scroll
    // ===========================

    const heroImage = document.querySelector('.hero-image');
    const heroName = document.querySelector('.hero-name');
    let ticking = false;

    if (heroImage || heroName) {
        window.addEventListener('scroll', () => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    const scrollY = window.scrollY;
                    const heroHeight = window.innerHeight;

                    if (scrollY < heroHeight) {
                        const progress = scrollY / heroHeight;

                        if (heroImage) {
                            heroImage.style.transform = `translateY(calc(-50% + ${scrollY * 0.25}px))`;
                        }

                        if (heroName) {
                            heroName.style.transform = `translateY(${scrollY * 0.08}px)`;
                            heroName.style.opacity = 1 - progress * 0.6;
                        }
                    }

                    ticking = false;
                });

                ticking = true;
            }
        }, { passive: true });
    }

    // ===========================
    // Fields overlay — hover to reveal
    // ===========================

    const fieldCols = document.querySelectorAll('.field-col');
    const fieldOverlays = document.querySelectorAll('.field-overlay');
    const aboutSection = document.querySelector('.about');
    const aboutFields = document.querySelector('.about-fields');

    function setOverlayHeight() {
        if (!aboutSection || !aboutFields) return;

        const sectionTop = aboutSection.getBoundingClientRect().top + window.scrollY;
        const fieldsTop = aboutFields.getBoundingClientRect().top + window.scrollY;
        const height = fieldsTop - sectionTop;

        fieldOverlays.forEach(o => {
            o.style.height = height + 'px';
            o.style.bottom = 'auto';
        });
    }

    setOverlayHeight();
    window.addEventListener('resize', setOverlayHeight);

    fieldCols.forEach(col => {
        col.addEventListener('mouseenter', () => {
            setOverlayHeight();
            const index = col.dataset.field;
            fieldOverlays.forEach(o => o.classList.remove('active'));
            const overlay = document.querySelector(`.field-overlay[data-overlay="${index}"]`);
            if (overlay) {
                overlay.classList.add('active');
                // Animate overlay content
                anime({
                    targets: overlay.querySelectorAll('.field-overlay-text > *, .field-img-placeholder'),
                    translateY: [30, 0],
                    opacity: [0, 1],
                    duration: 600,
                    easing: 'easeOutQuart',
                    delay: anime.stagger(80),
                });
            }
        });
    });

    if (fieldsGrid) {
        fieldsGrid.addEventListener('mouseleave', () => {
            fieldOverlays.forEach(o => o.classList.remove('active'));
        });
    }

    // ===========================
    // Mobile menu toggle
    // ===========================

    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (navToggle && navLinks) {
        navToggle.addEventListener('click', () => {
            const isOpen = navLinks.classList.contains('open');
            navLinks.classList.toggle('open');
            navToggle.classList.toggle('active');

            if (!isOpen) {
                // Animate nav links in
                anime({
                    targets: '.nav-links a',
                    translateY: [40, 0],
                    opacity: [0, 1],
                    duration: 600,
                    easing: 'easeOutExpo',
                    delay: anime.stagger(80, { start: 200 }),
                });
            }
        });

        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('open');
                navToggle.classList.remove('active');
            });
        });
    }

    // ===========================
    // Navbar — hide on scroll down, show on scroll up
    // ===========================

    const navbar = document.querySelector('.navbar');
    let lastScrollY = window.scrollY;
    const scrollThreshold = 100;

    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;

        if (currentScrollY > scrollThreshold && currentScrollY > lastScrollY) {
            navbar.classList.add('navbar--hidden');
        } else {
            navbar.classList.remove('navbar--hidden');
        }

        lastScrollY = currentScrollY;
    }, { passive: true });

    // ===========================
    // Smooth scroll with offset
    // ===========================

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === '#') return;

            e.preventDefault();
            const target = document.querySelector(href);

            if (target) {
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.scrollY - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ===========================
    // Magnetic effect on interactive elements
    // ===========================

    const magneticElements = document.querySelectorAll('.cta-arrow, .social-link, .work-card-arrow');

    magneticElements.forEach(el => {
        el.addEventListener('mousemove', (e) => {
            const rect = el.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;

            anime({
                targets: el,
                translateX: x * 0.3,
                translateY: y * 0.3,
                duration: 400,
                easing: 'easeOutQuart',
            });
        });

        el.addEventListener('mouseleave', () => {
            anime({
                targets: el,
                translateX: 0,
                translateY: 0,
                duration: 600,
                easing: 'easeOutExpo',
            });
        });
    });

    // ===========================
    // Work page animations (if on a travail page)
    // ===========================

    const workHero = document.querySelector('.work-hero');
    if (workHero) {
        anime.timeline({ easing: 'easeOutExpo' })
            .add({
                targets: '.work-hero-top',
                translateY: [40, 0],
                opacity: [0, 1],
                duration: 1000,
            }, 400)
            .add({
                targets: '.work-hero-index',
                translateY: [30, 0],
                opacity: [0, 1],
                duration: 800,
            }, 600)
            .add({
                targets: '.work-hero-title',
                translateY: [100, 0],
                opacity: [0, 1],
                duration: 1400,
            }, 700)
            .add({
                targets: '.work-hero-subtitle',
                translateY: [40, 0],
                opacity: [0, 1],
                duration: 1000,
            }, 1100);

        // Work content reveal
        const workContent = document.querySelector('.work-content');
        if (workContent) {
            const workContentObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        anime.timeline({ easing: 'easeOutExpo' })
                            .add({
                                targets: '.work-info-item',
                                translateY: [30, 0],
                                opacity: [0, 1],
                                duration: 800,
                                delay: anime.stagger(120),
                            })
                            .add({
                                targets: '.work-description p',
                                translateY: [40, 0],
                                opacity: [0, 1],
                                duration: 1000,
                                delay: anime.stagger(150),
                            }, '-=400')
                            .add({
                                targets: '.work-image-placeholder',
                                translateY: [60, 0],
                                opacity: [0, 1],
                                scale: [0.95, 1],
                                duration: 1200,
                            }, '-=600');

                        workContentObserver.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.1 });

            workContentObserver.observe(workContent);
        }
    }

});
