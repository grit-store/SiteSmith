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
    // Sticky Navbar & Active Section Tracking
    // ----------------------------------------------------
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

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
        rootMargin: '0px 0px -10% 0px', // Trigger slightly before element enters view
        threshold: 0.1
    };

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                revealObserver.unobserve(entry.target); // Reveal only once
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

    // ----------------------------------------------------
    // Parallax Scroll Effect for Laptop Mockup
    // ----------------------------------------------------
    const parallaxTarget = document.getElementById('parallax-target');
    if (parallaxTarget) {
        window.addEventListener('scroll', () => {
            if (window.innerWidth > 1024) {
                const scrollY = window.scrollY;
                if (scrollY < window.innerHeight) {
                    parallaxTarget.style.transform = `translateY(${scrollY * 0.15}px)`;
                }
            } else {
                parallaxTarget.style.transform = ''; // Reset on mobile
            }
        });
    }
});
