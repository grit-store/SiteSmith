document.addEventListener('DOMContentLoaded', () => {
    // ----------------------------------------------------
    // DOM Elements
    // ----------------------------------------------------
    const navbar = document.querySelector('header');
    const menuToggle = document.getElementById('menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const selectPlanBtns = document.querySelectorAll('.btn-select-plan');
    const interestSelect = document.getElementById('interest');
    const contactForm = document.getElementById('contact-form');
    const formContainer = document.getElementById('form-container');
    const successState = document.getElementById('success-state');
    const btnResetForm = document.getElementById('btn-reset-form');
    const btnSubmit = document.getElementById('btn-submit');
    const formSpinner = document.getElementById('form-spinner');
    const btnSubmitText = document.getElementById('btn-submit-text');

    // ----------------------------------------------------
    // Initialize Lenis Smooth Scroll
    // ----------------------------------------------------
    const lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        direction: 'vertical',
        gestureDirection: 'vertical',
        smooth: true,
        mouseMultiplier: 1.0,
        smoothTouch: false
    });

    function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // ----------------------------------------------------
    // Sticky Navbar & Active Section Tracking
    // ----------------------------------------------------
    let lastKnownScrollY = 0;
    let scrollTicking = false;
    let isNavbarScrolled = false;

    function handleScrollEffects() {
        // Sticky Navbar
        const shouldScroll = lastKnownScrollY > 50;
        if (shouldScroll !== isNavbarScrolled) {
            isNavbarScrolled = shouldScroll;
            if (isNavbarScrolled) {
                navbar.classList.add('bg-surface-dim/95', 'shadow-md');
                navbar.classList.remove('bg-surface-glass');
            } else {
                navbar.classList.add('bg-surface-glass');
                navbar.classList.remove('bg-surface-dim/95', 'shadow-md');
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

    // Active Section Tracking using IntersectionObserver
    const sectionObserverOptions = {
        root: null,
        rootMargin: '-30% 0px -60% 0px',
        threshold: 0
    };

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const sectionId = entry.target.getAttribute('id');
                navLinks.forEach(link => {
                    const href = link.getAttribute('href');
                    if (href === `#${sectionId}`) {
                        link.classList.add('text-primary');
                        link.classList.remove('text-on-surface-variant');
                    } else {
                        link.classList.add('text-on-surface-variant');
                        link.classList.remove('text-primary');
                    }
                });
            }
        });
    }, sectionObserverOptions);

    const sectionsToTrack = document.querySelectorAll('section[id]');
    sectionsToTrack.forEach(section => sectionObserver.observe(section));

    // ----------------------------------------------------
    // Mobile Hamburger Menu
    // ----------------------------------------------------
    const toggleMenu = () => {
        const isOpen = mobileMenu.classList.contains('translate-x-0');
        const menuIcon = menuToggle.querySelector('.material-symbols-outlined');
        
        if (isOpen) {
            mobileMenu.classList.remove('translate-x-0');
            mobileMenu.classList.add('translate-x-full');
            menuIcon.textContent = 'menu';
            document.body.style.overflow = '';
        } else {
            mobileMenu.classList.remove('translate-x-full');
            mobileMenu.classList.add('translate-x-0');
            menuIcon.textContent = 'close';
            document.body.style.overflow = 'hidden';
        }
    };

    if (menuToggle && mobileMenu) {
        menuToggle.addEventListener('click', toggleMenu);
        
        // Close menu when a link inside it is clicked
        const mobileLinks = mobileMenu.querySelectorAll('a');
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                toggleMenu();
            });
        });
    }

    // ----------------------------------------------------
    // Scroll-Triggered Reveal & Typewriter Animations
    // ----------------------------------------------------
    function runTypewriter(element) {
        const text = element.getAttribute('data-text');
        if (!text) return;

        // Clear any active timeout to prevent overlap
        if (element.typewriterTimeout) {
            clearTimeout(element.typewriterTimeout);
        }

        element.style.opacity = '1';
        
        let charIndex = 0;
        const speed = 40; // typing speed in ms

        // Clear contents and create structural spans
        element.innerHTML = '';
        const typedSpan = document.createElement('span');
        const cursorSpan = document.createElement('span');
        const untypedSpan = document.createElement('span');

        // Style the spans
        typedSpan.className = 'text-current';
        
        // Custom inline cursor style
        cursorSpan.className = 'inline-block w-[2px] h-[1.15em] bg-primary align-middle animate-cursor-blink';
        cursorSpan.style.marginLeft = '2px';
        cursorSpan.style.backgroundColor = '#C9A96E';

        untypedSpan.style.visibility = 'hidden';
        untypedSpan.textContent = text;

        element.appendChild(typedSpan);
        element.appendChild(cursorSpan);
        element.appendChild(untypedSpan);

        function type() {
            if (charIndex <= text.length) {
                typedSpan.textContent = text.substring(0, charIndex);
                untypedSpan.textContent = text.substring(charIndex);
                charIndex++;
                element.typewriterTimeout = setTimeout(type, speed);
            } else {
                // Fade out cursor after completion
                element.typewriterTimeout = setTimeout(() => {
                    cursorSpan.style.transition = 'opacity 0.5s ease';
                    cursorSpan.style.opacity = '0';
                    element.typewriterTimeout = setTimeout(() => cursorSpan.remove(), 500);
                }, 1000);
            }
        }
        type();
    }

    const revealObserverOptions = {
        root: null,
        rootMargin: '0px 0px -10% 0px',
        threshold: 0.05
    };

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('reveal-active');
                
                // Handle typewriter effects
                if (entry.target.classList.contains('typewriter-target')) {
                     if (!entry.target.classList.contains('is-typed')) {
                         entry.target.classList.add('is-typed');
                         runTypewriter(entry.target);
                     }
                }
                // Handle nested typewriter elements
                const nestedTypewriters = entry.target.querySelectorAll('.typewriter-target');
                nestedTypewriters.forEach(nested => {
                     if (!nested.classList.contains('is-typed')) {
                         nested.classList.add('is-typed');
                         runTypewriter(nested);
                     }
                });
            } else {
                // Reset when scrolled out of view to animate again later
                entry.target.classList.remove('reveal-active');
                
                if (entry.target.classList.contains('typewriter-target')) {
                    entry.target.classList.remove('is-typed');
                    if (entry.target.typewriterTimeout) {
                        clearTimeout(entry.target.typewriterTimeout);
                    }
                    entry.target.innerHTML = '';
                    entry.target.style.opacity = '0';
                }
                const nestedTypewriters = entry.target.querySelectorAll('.typewriter-target');
                nestedTypewriters.forEach(nested => {
                    nested.classList.remove('is-typed');
                    if (nested.typewriterTimeout) {
                        clearTimeout(nested.typewriterTimeout);
                    }
                    nested.innerHTML = '';
                    nested.style.opacity = '0';
                });
            }
        });
    }, revealObserverOptions);

    const revealElements = document.querySelectorAll('.scroll-trigger, .typewriter-target');
    revealElements.forEach(el => revealObserver.observe(el));

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
                const navbarHeight = navbar.offsetHeight || 80;
                lenis.scrollTo(contactSection, { offset: -navbarHeight });
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
                const navbarHeight = navbar.offsetHeight || 80;
                lenis.scrollTo(successState, { offset: -navbarHeight });
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

    // ----------------------------------------------------
    // Interactive Particle Background
    // ----------------------------------------------------
    const canvas = document.getElementById('bg-canvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let particles = [];
        const maxParticles = window.innerWidth < 768 ? 20 : 40;
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
                // Coordinated colors: Champagne Gold (#C9A96E) & warm amber tones
                this.color = Math.random() > 0.5 ? 'rgba(201, 169, 110, ' : 'rgba(223, 192, 138, ';
                this.alpha = Math.random() * 0.12 + 0.05;
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
            const desiredCount = window.innerWidth < 768 ? 20 : 40;
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
                        const alpha = (1 - dist / connectionDist) * 0.03;
                        ctx.beginPath();
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.strokeStyle = `rgba(201, 169, 110, ${alpha})`;
                        ctx.lineWidth = 0.8;
                        ctx.stroke();
                    }
                }

                // Attraction lines to cursor
                if (mouse.x !== null && mouse.y !== null) {
                    const dx = particles[i].x - mouse.x;
                    const dy = particles[i].y - mouse.y;
                    const dist = Math.hypot(dx, dy);

                    if (dist < mouse.radius) {
                        const alpha = (1 - dist / mouse.radius) * 0.05;
                        ctx.beginPath();
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(mouse.x, mouse.y);
                        ctx.strokeStyle = `rgba(201, 169, 110, ${alpha})`;
                        ctx.lineWidth = 0.8;
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
        if (window.matchMedia("(pointer: coarse)").matches || 'ontouchstart' in window) return;

        const targets = Array.from(document.querySelectorAll('button, a.nav-link, .logo')).filter(el => {
            return !el.closest('header') && !el.closest('#mobile-menu');
        });
        
        window.addEventListener('mousemove', (e) => {
            const mx = e.clientX;
            const my = e.clientY;
            
            targets.forEach(el => {
                const rect = el.getBoundingClientRect();
                if (rect.bottom < 0 || rect.top > window.innerHeight) return;
                
                const cx = rect.left + rect.width / 2;
                const cy = rect.top + rect.height / 2;
                
                const dx = mx - cx;
                const dy = my - cy;
                const dist = Math.hypot(dx, dy);
                
                const isNavOrLogo = el.classList.contains('nav-link') || el.classList.contains('logo');
                const radius = isNavOrLogo ? 60 : 100;
                
                if (dist < radius) {
                    el.classList.add('magnetic-active');
                    const strength = isNavOrLogo ? 0.35 : 0.25;
                    const tx = dx * strength;
                    const ty = dy * strength;
                    
                    el.style.transform = `translate3d(${tx}px, ${ty}px, 0)`;
                } else {
                    if (el.classList.contains('magnetic-active')) {
                        el.classList.remove('magnetic-active');
                        el.style.transform = '';
                    }
                }
            });
        });
    };

    initMagneticButtons();

    // ----------------------------------------------------
    // Smooth Anchor Scroll (Lenis Eased Navigation)
    // ----------------------------------------------------
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            try {
                const targetEl = document.querySelector(targetId);
                if (targetEl) {
                    e.preventDefault();
                    const navbarHeight = navbar.offsetHeight || 80;
                    lenis.scrollTo(targetEl, { offset: -navbarHeight });
                }
            } catch (err) {
                console.warn('Smooth scroll target query failed:', err);
            }
        });
    });
});
