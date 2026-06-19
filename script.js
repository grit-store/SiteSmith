document.addEventListener('DOMContentLoaded', () => {
    // ----------------------------------------------------
    // DOM Elements
    // ----------------------------------------------------
    const navbar = document.getElementById('navbar');
    const menuToggle = document.getElementById('menu-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const selectPlanBtns = document.querySelectorAll('.btn-select-plan');
    const interestSelect = document.getElementById('interest');
    const contactForm = document.getElementById('contact-form');
    const formContainer = document.getElementById('form-container');
    const successState = document.getElementById('success-state');
    const btnResetForm = document.getElementById('btn-reset-form');
    const btnSubmit = document.getElementById('btn-submit');
    const formSpinner = document.getElementById('form-spinner');
    const btnSubmitText = btnSubmit.querySelector('.btn-text');

    // ----------------------------------------------------
    // Sticky Navbar & Active Section Tracking & Parallax
    // ----------------------------------------------------
    let lastKnownScrollY = 0;
    let scrollTicking = false;
    let isNavbarScrolled = false;
    const parallaxTarget = document.getElementById('parallax-target');

    function handleScrollEffects() {
        // Sticky Navbar
        const shouldScroll = lastKnownScrollY > 50;
        if (shouldScroll !== isNavbarScrolled) {
            isNavbarScrolled = shouldScroll;
            navbar.classList.toggle('scrolled', isNavbarScrolled);
        }

        // Parallax scroll effect (desktop only)
        if (parallaxTarget) {
            if (window.innerWidth > 1024) {
                if (lastKnownScrollY < window.innerHeight) {
                    parallaxTarget.style.transform = `translateY(${lastKnownScrollY * 0.15}px)`;
                }
            } else {
                if (parallaxTarget.style.transform !== '') {
                    parallaxTarget.style.transform = '';
                }
            }
        }

        scrollTicking = false;
    }

    window.addEventListener('scroll', () => {
        lastKnownScrollY = window.scrollY;
        if (!scrollTicking) {
            window.requestAnimationFrame(handleScrollEffects);
            scrollTicking = true;
        }
    }, { passive: true });

    // Intersection Observer for Active Nav Links
    const sectionObserverOptions = {
        root: null,
        rootMargin: '-30% 0px -60% 0px', // Trigger when section occupies the active middle portion of viewport
        threshold: 0
    };

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const sectionId = entry.target.getAttribute('id');
                navLinks.forEach(link => {
                    // Normalize comparison
                    const href = link.getAttribute('href');
                    if (href === `#${sectionId}`) {
                        link.classList.add('active');
                    } else {
                        link.classList.remove('active');
                    }
                });
            }
        });
    }, sectionObserverOptions);

    // Observe all main landing sections
    const sectionsToTrack = document.querySelectorAll('section[id]');
    sectionsToTrack.forEach(section => sectionObserver.observe(section));

    // ----------------------------------------------------
    // Mobile Hamburger Menu
    // ----------------------------------------------------
    const toggleMenu = () => {
        menuToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
        // Prevent body scrolling when menu is open
        document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
    };

    menuToggle.addEventListener('click', toggleMenu);

    // Close menu when a link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu.classList.contains('active')) {
                toggleMenu();
            }
        });
    });

    // ----------------------------------------------------
    // Scroll-Triggered Reveal Animations
    // ----------------------------------------------------
    const revealObserverOptions = {
        root: null,
        rootMargin: '0px 0px -10% 0px',
        threshold: 0.05
    };

    const revealObserver = new IntersectionObserver((entries) => {
        let delay = 0;
        // Filter and sort intersecting elements to reveal in order
        const intersecting = entries.filter(e => e.isIntersecting);
        
        intersecting.forEach(entry => {
            const el = entry.target;
            if (!el.classList.contains('active')) {
                const isStaggable = el.classList.contains('pricing-card') || 
                                    el.classList.contains('value-card') || 
                                    el.classList.contains('step') ||
                                    el.classList.contains('direct-item');
                
                if (isStaggable) {
                    el.style.transitionDelay = `${delay}ms`;
                    delay += 120; // 120ms stagger delay
                    
                    // Clear delay after initial transition completes so hover effects are instant
                    el.addEventListener('transitionend', function handler(e) {
                        if (e.propertyName === 'opacity' || e.propertyName === 'transform') {
                            el.style.transitionDelay = '';
                            el.removeEventListener('transitionend', handler);
                        }
                    });
                }
                
                el.classList.add('active');
                revealObserver.unobserve(el);
            }
        });
    }, revealObserverOptions);

    const revealElements = document.querySelectorAll('.scroll-reveal');
    revealElements.forEach(el => revealObserver.observe(el));

    // Explicitly reveal Hero elements on load
    const heroElements = document.querySelectorAll('.hero .fade-in');
    setTimeout(() => {
        heroElements.forEach((el, index) => {
            setTimeout(() => {
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
            }, index * 200); // Stagger element appearance
        });
    }, 100);

    // Initialize Hero elements inline styles for transitions
    heroElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    });

    // ----------------------------------------------------
    // Select Plan / Form Integration
    // ----------------------------------------------------
    selectPlanBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const planValue = e.currentTarget.getAttribute('data-plan');
            if (interestSelect && planValue) {
                interestSelect.value = planValue;
            }
            
            // Scroll to contact form smoothly
            const contactSection = document.getElementById('contact');
            if (contactSection) {
                contactSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // ----------------------------------------------------
    // Form Submission & Success State Mock
    // ----------------------------------------------------
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            // Simple validation check
            if (!contactForm.checkValidity()) {
                contactForm.reportValidity();
                return;
            }

            // Show submit spinner feedback
            btnSubmit.disabled = true;
            btnSubmitText.style.opacity = '0';
            formSpinner.style.display = 'block';

            // Simulate form submission latency (1.5 seconds)
            setTimeout(() => {
                // Reset loading state
                btnSubmit.disabled = false;
                btnSubmitText.style.opacity = '1';
                formSpinner.style.display = 'none';

                // Display success confirmation card
                formContainer.style.display = 'none';
                successState.style.display = 'flex';
                
                // Scroll success card into focus if needed
                successState.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }, 1500);
        });
    }

    if (btnResetForm) {
        btnResetForm.addEventListener('click', () => {
            // Reset fields
            contactForm.reset();
            
            // Switch display states back
            successState.style.display = 'none';
            formContainer.style.display = 'block';
        });
    }

    // Parallax scroll listener removed and merged into throttled scroll handler at the top of DOMContentLoaded

    // ----------------------------------------------------
    // Interactive Particle Background
    // ----------------------------------------------------
    const canvas = document.getElementById('bg-canvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let particles = [];
        const maxParticles = window.innerWidth < 768 ? 30 : 70;
        const connectionDist = 120;
        const mouse = { x: null, y: null, radius: 180 };

        // Handle resizing
        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        window.addEventListener('resize', resizeCanvas);
        resizeCanvas();

        // Track Mouse
        window.addEventListener('mousemove', (e) => {
            mouse.x = e.clientX;
            mouse.y = e.clientY;
        });

        window.addEventListener('mouseleave', () => {
            mouse.x = null;
            mouse.y = null;
        });

        // Particle class definition
        class Particle {
            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.vx = (Math.random() - 0.5) * 0.25;
                this.vy = (Math.random() - 0.5) * 0.25;
                this.radius = Math.random() * 1.5 + 1;
                // Assign a color theme (cyan or purple)
                this.color = Math.random() > 0.5 ? 'rgba(168, 85, 247, ' : 'rgba(6, 182, 212, ';
                this.alpha = Math.random() * 0.2 + 0.1;
            }

            update() {
                this.x += this.vx;
                this.y += this.vy;

                // Bounce at borders
                if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
                if (this.y < 0 || this.y > canvas.height) this.vy *= -1;

                // Mouse attraction/pull force
                if (mouse.x !== null && mouse.y !== null) {
                    const dx = mouse.x - this.x;
                    const dy = mouse.y - this.y;
                    const dist = Math.hypot(dx, dy);

                    if (dist < mouse.radius) {
                        const force = (mouse.radius - dist) / mouse.radius;
                        this.x += (dx / dist) * force * 0.5;
                        this.y += (dy / dist) * force * 0.5;
                    }
                }
            }

            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
                ctx.fillStyle = this.color + this.alpha + ')';
                ctx.fill();
            }
        }

        // Initialize particles
        const initParticles = () => {
            particles = [];
            for (let i = 0; i < maxParticles; i++) {
                particles.push(new Particle());
            }
        };
        initParticles();

        // Re-initialize particles if viewport changes significantly
        window.addEventListener('resize', () => {
            const desiredCount = window.innerWidth < 768 ? 30 : 70;
            if (particles.length !== desiredCount) {
                initParticles();
            }
        });

        // Draw connections between particles and to mouse
        const drawConnections = () => {
            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const dist = Math.hypot(dx, dy);

                    if (dist < connectionDist) {
                        const alpha = (1 - dist / connectionDist) * 0.07;
                        ctx.beginPath();
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.strokeStyle = `rgba(168, 85, 247, ${alpha})`;
                        ctx.lineWidth = 0.85;
                        ctx.stroke();
                    }
                }

                // Attraction visualization lines
                if (mouse.x !== null && mouse.y !== null) {
                    const dx = particles[i].x - mouse.x;
                    const dy = particles[i].y - mouse.y;
                    const dist = Math.hypot(dx, dy);

                    if (dist < mouse.radius) {
                        const alpha = (1 - dist / mouse.radius) * 0.12;
                        ctx.beginPath();
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(mouse.x, mouse.y);
                        ctx.strokeStyle = `rgba(6, 182, 212, ${alpha})`;
                        ctx.lineWidth = 0.85;
                        ctx.stroke();
                    }
                }
            }
        };

        // Animation Loop
        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            particles.forEach(p => {
                p.update();
                p.draw();
            });

            drawConnections();
            requestAnimationFrame(animate);
        };

        animate();
    }

    // ----------------------------------------------------
    // Magnetic Buttons & Elements Effect
    // ----------------------------------------------------
    const initMagneticButtons = () => {
        // Disable on touch devices since they don't have a cursor hover/magnetic interaction
        if (window.matchMedia("(pointer: coarse)").matches || 'ontouchstart' in window) return;

        const targets = document.querySelectorAll('.btn, .social-link, .logo, .nav-link');
        
        window.addEventListener('mousemove', (e) => {
            const mx = e.clientX;
            const my = e.clientY;
            
            targets.forEach(el => {
                const rect = el.getBoundingClientRect();
                
                // Early exit if element is off screen
                if (rect.bottom < 0 || rect.top > window.innerHeight) return;
                
                const cx = rect.left + rect.width / 2;
                const cy = rect.top + rect.height / 2;
                
                const dx = mx - cx;
                const dy = my - cy;
                const dist = Math.hypot(dx, dy);
                
                const isSmall = el.classList.contains('social-link') || el.classList.contains('nav-link');
                const radius = isSmall ? 55 : 95;
                
                if (dist < radius) {
                    // Activate magnetic snap class to disable transition latency
                    el.classList.add('magnetic-active');
                    
                    const strength = isSmall ? 0.45 : 0.35;
                    const tx = dx * strength;
                    const ty = dy * strength;
                    
                    el.style.transform = `translate3d(${tx}px, ${ty}px, 0)`;
                    
                    // Add subtle parallax offset inside the button contents
                    const innerText = el.querySelector('.btn-text') || el.querySelector('span');
                    if (innerText) {
                        const textStrength = isSmall ? 0.22 : 0.16;
                        innerText.style.transform = `translate3d(${dx * textStrength}px, ${dy * textStrength}px, 0)`;
                        innerText.style.display = 'inline-block'; // Ensure translate works
                    }
                } else {
                    // Smoothly ease back when cursor exits the zone
                    if (el.classList.contains('magnetic-active')) {
                        el.classList.remove('magnetic-active');
                        el.style.transform = '';
                        
                        const innerText = el.querySelector('.btn-text') || el.querySelector('span');
                        if (innerText) {
                            innerText.style.transform = '';
                        }
                    }
                }
            });
        });
    };

    // Initialize the magnetic effects
    initMagneticButtons();

    // ----------------------------------------------------
    // Smooth Momentum Scroll (Lerp-based scroll delay)
    // ----------------------------------------------------
    const initSmoothScroll = () => {
        // Disable on touch devices or small screens to preserve native touch momentum
        if ('ontouchstart' in window || window.innerWidth <= 1024) return;

        // Disable native smooth scroll to prevent collision with custom momentum scroll
        document.documentElement.style.scrollBehavior = 'auto';

        let targetY = window.scrollY;
        let currentY = window.scrollY;
        const ease = 0.08; // Proportional ease delay (lower = smoother/more lag)
        let isScrolling = false;

        // Custom mouse wheel listener
        window.addEventListener('wheel', (e) => {
            // Bypass if inside interactive inputs (like message textarea or plan interest select)
            if (e.target.closest('textarea') || e.target.closest('select') || e.target.closest('input')) return;

            e.preventDefault();
            
            // Adjust scroll target with proportional multiplier
            targetY += e.deltaY * 0.85;
            targetY = Math.max(0, Math.min(targetY, document.documentElement.scrollHeight - window.innerHeight));

            if (!isScrolling) {
                isScrolling = true;
                requestAnimationFrame(smoothUpdate);
            }
        }, { passive: false });

        // Physics update loop
        function smoothUpdate() {
            const diff = targetY - currentY;
            
            if (Math.abs(diff) > 0.25) {
                currentY += diff * ease;
                window.scrollTo(0, currentY);
                requestAnimationFrame(smoothUpdate);
            } else {
                currentY = targetY;
                window.scrollTo(0, currentY);
                isScrolling = false;
            }
        }

        // Sync coordinates when window scrolls externally (scrollbar drag / scroll keypress)
        window.addEventListener('scroll', () => {
            if (!isScrolling) {
                targetY = window.scrollY;
                currentY = window.scrollY;
            }
        });

        // Intercept hash anchors for smooth navigation scroll
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                const targetId = anchor.getAttribute('href');
                if (targetId === '#') return;
                
                try {
                    const targetEl = document.querySelector(targetId);
                    if (targetEl) {
                        e.preventDefault();
                        const navbarHeight = document.getElementById('navbar')?.offsetHeight || 70;
                        const targetPos = targetEl.getBoundingClientRect().top + window.scrollY - navbarHeight;
                        
                        targetY = targetPos;
                        if (!isScrolling) {
                            isScrolling = true;
                            requestAnimationFrame(smoothUpdate);
                        }
                    }
                } catch (err) {
                    // Fail-safe for invalid selectors
                    console.warn('Smooth scroll target query failed:', err);
                }
            });
        });
    };

    // Initialize the smooth scroll engine
    initSmoothScroll();
});
