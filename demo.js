/* ==========================================================================
   ISCON GATHIYA - IMMERSIVE MENU LOGIC & 3D WebGL ENGINE
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    
    // ----------------------------------------------------------------------
    // 1. DYNAMIC BACKGROUND FLOATING INGREDIENTS (PARALLAX)
    // ----------------------------------------------------------------------
    const parallaxContainer = document.getElementById('parallax-spices');
    
    // SVG structures for high-quality, lightweight floating spices
    const spiceSVGs = {
        chilli: `<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M75 10c-15 0-35 25-35 45 0 20 15 35 25 35s15-10 15-25c0-10-3-15-5-20s1-15 3-20 2-15-3-15z" fill="#ff4a4a"/><path d="M40 55c-10-5-25-10-30 0s5 20 15 20 15-10 15-20z" fill="#e02d2d"/><path d="M75 10c0-2-3-8-8-8s-8 3-5 10 3 5 3 5" stroke="#4caf50" stroke-width="6" stroke-linecap="round"/></svg>`,
        cardamom: `<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M50 15C30 30 20 50 20 65c0 15 15 25 30 25s30-10 30-25c0-15-10-35-30-50z" fill="#8bc34a"/><path d="M50 15v75M35 30c5 15 15 20 15 45M65 30c-5 15-15 20-15 45" stroke="#7cb342" stroke-width="3" stroke-linecap="round"/></svg>`,
        mint: `<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M50 90c0-25 35-40 35-65S55 10 50 30C45 10 15 10 15 25s35 40 35 65z" fill="#4caf50"/><path d="M50 30c0 20 0 45 0 60M32 45c10 5 18 2 18 10M68 45c-10 5-18 2-18 10" stroke="#388e3c" stroke-width="3" stroke-linecap="round"/></svg>`,
        coriander: `<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M50 85V45M50 45c10-10 25-10 25 0s-15 15-25 5M50 45C40 35 25 35 25 45s15 15 25 5M50 65c12 2 20-5 20-12s-10-10-20-3M50 65C38 67 30 60 30 53s10-10 20-3" stroke="#81c784" stroke-width="4" stroke-linecap="round"/><circle cx="75" cy="45" r="5" fill="#4caf50"/><circle cx="25" cy="45" r="5" fill="#4caf50"/><circle cx="70" cy="53" r="4" fill="#4caf50"/><circle cx="30" cy="53" r="4" fill="#4caf50"/></svg>`
    };
    
    const spicesConfig = [
        { type: 'chilli', size: 100, x: 5, y: 15, speed: 0.15, rotation: 45 },
        { type: 'cardamom', size: 70, x: 85, y: 25, speed: -0.1, rotation: -20 },
        { type: 'mint', size: 60, x: 12, y: 55, speed: 0.08, rotation: 15 },
        { type: 'coriander', size: 80, x: 80, y: 65, speed: 0.12, rotation: 70 },
        { type: 'cardamom', size: 55, x: 6, y: 80, speed: -0.05, rotation: 110 },
        { type: 'chilli', size: 90, x: 88, y: 88, speed: 0.18, rotation: -60 }
    ];
    
    const elements = [];
    
    // Inject floating elements into background
    spicesConfig.forEach((cfg) => {
        const div = document.createElement('div');
        div.className = 'floating-spice';
        div.style.width = `${cfg.size}px`;
        div.style.height = `${cfg.size}px`;
        div.style.left = `${cfg.x}%`;
        div.style.top = `${cfg.y}vh`;
        div.innerHTML = spiceSVGs[cfg.type];
        parallaxContainer.appendChild(div);
        
        elements.push({
            el: div,
            speed: cfg.speed,
            baseRot: cfg.rotation,
            yVal: (cfg.y * window.innerHeight) / 100
        });
    });
    
    // Update translation and rotation on scroll (Anti-Gravity organic floating feel)
    // Performance optimization: Throttle scroll event using requestAnimationFrame & passive listener
    let lastKnownScrollY = 0;
    let scrollTicking = false;
    let isNavbarScrolled = false;

    function handleScrollEffects() {
        // 1. Parallax spices background
        elements.forEach(item => {
            const yOffset = lastKnownScrollY * item.speed;
            const rotOffset = lastKnownScrollY * (item.speed * 0.05);
            item.el.style.transform = `translateY(${yOffset}px) rotate(${item.baseRot + rotOffset}deg)`;
        });

        // 2. Sticky navbar shrink state
        const shouldScroll = lastKnownScrollY > 40;
        if (shouldScroll !== isNavbarScrolled) {
            isNavbarScrolled = shouldScroll;
            navbar.classList.toggle('scrolled', isNavbarScrolled);
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

    // ----------------------------------------------------------------------
    // 2. STICKY NAVBAR MOBILE TOGGLE & SCROLL INDICATOR
    // ----------------------------------------------------------------------
    const navbar = document.getElementById('navbar');
    const menuToggle = document.getElementById('menu-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Mobile menu toggle
    const toggleMobileMenu = () => {
        menuToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
        document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
    };
    
    menuToggle.addEventListener('click', toggleMobileMenu);
    
    // Close nav on click
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu.classList.contains('active')) {
                toggleMobileMenu();
            }
        });
    });

    // Sticky nav scroll spy
    const menuSections = document.querySelectorAll('.menu-category-section');
    const scrollSpyOptions = {
        root: null,
        rootMargin: '-30% 0px -60% 0px',
        threshold: 0
    };
    
    const scrollSpyObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                navLinks.forEach(link => {
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    } else {
                        link.classList.remove('active');
                    }
                });
            }
        });
    }, scrollSpyOptions);
    
    menuSections.forEach(section => scrollSpyObserver.observe(section));

    // Scroll reveal sections
    const revealOptions = {
        root: null,
        rootMargin: '0px 0px -10% 0px',
        threshold: 0.05
    };
    
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                revealObserver.unobserve(entry.target);
            }
        });
    }, revealOptions);
    
    menuSections.forEach(section => revealObserver.observe(section));

    // ----------------------------------------------------------------------
    // 3. THREE.JS 3D WEBGL INTERACTIVE KULHAD TEA ENGINE
    // ----------------------------------------------------------------------
    const canvasContainer = document.getElementById('canvas-container');
    const loader = document.getElementById('canvas-loader');
    
    let scene, camera, renderer, cupGroup;
    let particles = [];
    let isDragging = false;
    let previousMouseX = 0;
    let targetRotationY = 0;
    let targetRotationX = 0;
    
    // Performance optimization: Render Three.js canvas only when visible in the viewport
    let isCanvasVisible = true;
    const canvasObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            isCanvasVisible = entry.isIntersecting;
        });
    }, { threshold: 0 });
    if (canvasContainer) {
        canvasObserver.observe(canvasContainer);
    }
    
    function initThree() {
        // Scene setup
        scene = new THREE.Scene();
        
        // Camera setup
        camera = new THREE.PerspectiveCamera(45, canvasContainer.clientWidth / canvasContainer.clientHeight, 0.1, 100);
        camera.position.set(0, 3, 6);
        
        // Renderer setup
        renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        renderer.setSize(canvasContainer.clientWidth, canvasContainer.clientHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.shadowMap.enabled = true;
        renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        
        // Append canvas
        canvasContainer.innerHTML = '';
        canvasContainer.appendChild(renderer.domElement);
        
        // --- Lightings ---
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
        scene.add(ambientLight);
        
        const mainLight = new THREE.DirectionalLight(0xffe2ab, 1.2); // Warm light
        mainLight.position.set(5, 8, 5);
        mainLight.castShadow = true;
        mainLight.shadow.mapSize.width = 1024;
        mainLight.shadow.mapSize.height = 1024;
        scene.add(mainLight);
        
        const rimLight = new THREE.DirectionalLight(0xc99643, 0.8); // Golden rim light
        rimLight.position.set(-5, 3, -5);
        scene.add(rimLight);
        
        // --- 3D Modeling (Programmatic Kulhad Clay Cup) ---
        cupGroup = new THREE.Group();
        
        // 1. Clay Cup (Kulhad) body
        // CylinderGeometry(radiusTop, radiusBottom, height, radialSegments)
        const cupGeom = new THREE.CylinderGeometry(1.3, 0.9, 2.2, 32, 1);
        
        // Create custom texture canvas for a speckled clay appearance
        const canvasTexture = document.createElement('canvas');
        canvasTexture.width = 256;
        canvasTexture.height = 256;
        const ctx = canvasTexture.getContext('2d');
        ctx.fillStyle = '#b76f3f'; // Terracotta clay color
        ctx.fillRect(0, 0, 256, 256);
        // Add random grains
        ctx.fillStyle = '#7a3e1a';
        for(let i = 0; i < 800; i++) {
            ctx.fillRect(Math.random()*256, Math.random()*256, 2, 2);
        }
        ctx.fillStyle = '#db9e78';
        for(let i = 0; i < 400; i++) {
            ctx.fillRect(Math.random()*256, Math.random()*256, 2, 2);
        }
        
        const texture = new THREE.CanvasTexture(canvasTexture);
        
        const clayMaterial = new THREE.MeshStandardMaterial({
            map: texture,
            roughness: 0.9, // Matte clay finish
            metalness: 0.05
        });
        
        const cupMesh = new THREE.Mesh(cupGeom, clayMaterial);
        cupMesh.castShadow = true;
        cupMesh.receiveShadow = true;
        cupGroup.add(cupMesh);
        
        // 2. Textured Ridges (Traditional Kulhad grooves)
        const ridgeGeom = new THREE.TorusGeometry(1.28, 0.05, 8, 32);
        const ridge1 = new THREE.Mesh(ridgeGeom, clayMaterial);
        ridge1.rotation.x = Math.PI / 2;
        ridge1.position.y = 0.5;
        cupGroup.add(ridge1);
        
        const ridge2 = ridge1.clone();
        ridge2.position.y = -0.3;
        cupGroup.add(ridge2);
        
        // 3. Hot Spiced Tea inside cup
        const teaGeom = new THREE.CylinderGeometry(1.24, 1.2, 0.1, 32);
        const teaMaterial = new THREE.MeshStandardMaterial({
            color: 0x54260a, // Rich milk tea color
            roughness: 0.15,
            metalness: 0.1
        });
        const teaMesh = new THREE.Mesh(teaGeom, teaMaterial);
        teaMesh.position.y = 1.0;
        cupGroup.add(teaMesh);
        
        // 4. Wooden coaster / saucer
        const coasterGeom = new THREE.CylinderGeometry(1.9, 1.8, 0.15, 32);
        const woodTextureCanvas = document.createElement('canvas');
        woodTextureCanvas.width = 128;
        woodTextureCanvas.height = 128;
        const woodCtx = woodTextureCanvas.getContext('2d');
        woodCtx.fillStyle = '#3a2312'; // Dark wood
        woodCtx.fillRect(0, 0, 128, 128);
        woodCtx.fillStyle = '#211207';
        for (let i = 0; i < 10; i++) {
            woodCtx.fillRect(0, Math.random() * 128, 128, Math.random() * 8 + 2);
        }
        
        const coasterMaterial = new THREE.MeshStandardMaterial({
            map: new THREE.CanvasTexture(woodTextureCanvas),
            roughness: 0.8,
            metalness: 0.1
        });
        const coasterMesh = new THREE.Mesh(coasterGeom, coasterMaterial);
        coasterMesh.position.y = -1.15;
        coasterMesh.receiveShadow = true;
        cupGroup.add(coasterMesh);
        
        // Position group
        cupGroup.position.y = -0.2;
        scene.add(cupGroup);
        
        // --- Steam Particle System ---
        const particleCount = 28;
        const particleGeom = new THREE.BufferGeometry();
        const positions = [];
        
        for (let i = 0; i < particleCount; i++) {
            positions.push(
                (Math.random() - 0.5) * 1.5, // X
                1.1 + Math.random() * 2,     // Y
                (Math.random() - 0.5) * 1.5  // Z
            );
            
            particles.push({
                x: positions[positions.length - 3],
                y: positions[positions.length - 2],
                z: positions[positions.length - 1],
                speedY: 0.015 + Math.random() * 0.015,
                speedX: (Math.random() - 0.5) * 0.005,
                speedZ: (Math.random() - 0.5) * 0.005,
                scale: 0.05 + Math.random() * 0.08,
                opacity: 0.3 + Math.random() * 0.4
            });
        }
        
        // Creating steam sprites programmatically using canvas texture
        const steamCanvas = document.createElement('canvas');
        steamCanvas.width = 64;
        steamCanvas.height = 64;
        const steamCtx = steamCanvas.getContext('2d');
        const gradient = steamCtx.createRadialGradient(32, 32, 0, 32, 32, 32);
        gradient.addColorStop(0, 'rgba(255, 255, 255, 0.4)');
        gradient.addColorStop(0.3, 'rgba(255, 245, 230, 0.18)');
        gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
        steamCtx.fillStyle = gradient;
        steamCtx.fillRect(0, 0, 64, 64);
        
        const steamTexture = new THREE.CanvasTexture(steamCanvas);
        
        // Individual steam particles meshes so they can scale and fade independently
        particles.forEach(p => {
            const meshMat = new THREE.SpriteMaterial({
                map: steamTexture,
                transparent: true,
                opacity: p.opacity,
                blending: THREE.AdditiveBlending
            });
            const sprite = new THREE.Sprite(meshMat);
            sprite.scale.set(p.scale, p.scale, 1);
            sprite.position.set(p.x, p.y, p.z);
            scene.add(sprite);
            p.sprite = sprite;
        });
        
        // Hide loader
        if (loader) loader.style.display = 'none';
        
        // Start rendering loops
        animate();
    }
    
    // WebGL animation frame
    function animate() {
        requestAnimationFrame(animate);
        
        // Performance optimization: Pause animations & rendering when offscreen
        if (!isCanvasVisible) return;
        
        // Gentle weightless auto-rotation
        if (!isDragging) {
            targetRotationY += 0.003;
            // Float effect
            cupGroup.position.y = -0.2 + Math.sin(Date.now() * 0.0015) * 0.08;
        }
        
        // Interpolate rotation values for smooth inertia response
        cupGroup.rotation.y += (targetRotationY - cupGroup.rotation.y) * 0.08;
        cupGroup.rotation.x += (targetRotationX - cupGroup.rotation.x) * 0.08;
        
        // Cap rotations
        targetRotationX = Math.max(-0.4, Math.min(0.4, targetRotationX));
        
        // Animate Steam particles
        particles.forEach(p => {
            p.y += p.speedY;
            p.x += p.speedX;
            p.z += p.speedZ;
            
            // Fading out opacity as it goes high
            const heightFactor = (p.y - 1.1) / 2.0;
            p.sprite.material.opacity = Math.max(0, p.opacity * (1.0 - heightFactor));
            p.sprite.scale.set(p.scale * (1.0 + heightFactor * 1.5), p.scale * (1.0 + heightFactor * 1.5), 1);
            
            p.sprite.position.set(p.x, p.y, p.z);
            
            // Reset particle once high enough
            if (p.y > 3.2) {
                p.y = 1.1;
                p.x = (Math.random() - 0.5) * 0.5;
                p.z = (Math.random() - 0.5) * 0.5;
                p.sprite.material.opacity = p.opacity;
            }
        });
        
        renderer.render(scene, camera);
    }
    
    // --- Mouse & Touch Events for WebGL Rotation ---
    function onMouseDown(e) {
        isDragging = true;
        previousMouseX = e.clientX || e.touches[0].clientX;
    }
    
    function onMouseMove(e) {
        if (!isDragging) return;
        
        const clientX = e.clientX || e.touches[0].clientX;
        const deltaX = clientX - previousMouseX;
        previousMouseX = clientX;
        
        targetRotationY += deltaX * 0.008;
        
        // Vertical tilt on movement
        const clientY = e.clientY || (e.touches && e.touches[0].clientY);
        if (clientY) {
            const rect = canvasContainer.getBoundingClientRect();
            const relativeY = (clientY - rect.top) / rect.height;
            targetRotationX = (relativeY - 0.5) * 0.7;
        }
    }
    
    function onMouseUp() {
        isDragging = false;
    }
    
    canvasContainer.addEventListener('mousedown', onMouseDown);
    canvasContainer.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
    
    canvasContainer.addEventListener('touchstart', onMouseDown, { passive: true });
    canvasContainer.addEventListener('touchmove', onMouseMove, { passive: true });
    window.addEventListener('touchend', onMouseUp);
    
    // Handle container resize
    window.addEventListener('resize', () => {
        if (!camera || !renderer) return;
        camera.aspect = canvasContainer.clientWidth / canvasContainer.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(canvasContainer.clientWidth, canvasContainer.clientHeight);
    });
    
    // Initialize WebGL
    try {
        initThree();
    } catch(e) {
        console.error("Three.js initialization error, falling back.", e);
        if (loader) loader.innerHTML = "<p>WebGL not supported in this environment.</p>";
    }

    // ----------------------------------------------------------------------
    // 4. ITEM CARDS 3D POP-OUT & INTERACTIVE GLOW EFFECTS
    // ----------------------------------------------------------------------
    const cards = document.querySelectorAll('.menu-item-card');
    
    cards.forEach(card => {
        // Track cursor coordinates inside the card for dynamic glowing effect
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
            
            // 3D Tilt calculation
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const tiltX = (centerY - y) / 12; // tilt angle
            const tiltY = (x - centerX) / 12;
            
            card.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(1.02, 1.02, 1.02)`;
        });
        
        // Reset transformations when cursor leaves the card
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
        });
    });

    // ----------------------------------------------------------------------
    // 5. SEARCH & FILTER CORE LOGIC
    // ----------------------------------------------------------------------
    const searchInput = document.getElementById('menu-search');
    const clearSearchBtn = document.getElementById('clear-search');
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    let activeFilter = 'all';
    let searchQuery = '';
    
    function filterMenuItems() {
        const query = searchQuery.toLowerCase().trim();
        let activeSections = new Set();
        
        cards.forEach(card => {
            const name = card.getAttribute('data-name').toLowerCase();
            const desc = card.querySelector('.description').textContent.toLowerCase();
            const tags = card.getAttribute('data-tags').split(' ');
            const spice = card.getAttribute('data-spice');
            
            const matchesSearch = name.includes(query) || desc.includes(query);
            
            let matchesFilter = false;
            if (activeFilter === 'all') {
                matchesFilter = true;
            } else if (activeFilter === 'spicy' && spice === 'spicy') {
                matchesFilter = true;
            } else if (activeFilter === 'sweet' && tags.includes('sweet')) {
                matchesFilter = true;
            } else if (activeFilter === 'beverage' && tags.includes('beverage')) {
                matchesFilter = true;
            } else if (activeFilter === 'groundnut' && tags.includes('groundnut')) {
                matchesFilter = true;
            }
            
            if (matchesSearch && matchesFilter) {
                card.style.display = 'flex';
                // Track which section contains visible items
                const section = card.closest('.menu-category-section');
                if (section) activeSections.add(section.id);
            } else {
                card.style.display = 'none';
            }
        });
        
        // Hide entire empty sections, show populated ones
        menuSections.forEach(section => {
            if (activeSections.has(section.id)) {
                section.style.display = 'block';
            } else {
                section.style.display = 'none';
            }
        });
    }
    
    // Search trigger
    searchInput.addEventListener('input', (e) => {
        searchQuery = e.target.value;
        if (searchQuery.length > 0) {
            clearSearchBtn.style.display = 'block';
        } else {
            clearSearchBtn.style.display = 'none';
        }
        filterMenuItems();
    });
    
    // Clear search
    clearSearchBtn.addEventListener('click', () => {
        searchInput.value = '';
        searchQuery = '';
        clearSearchBtn.style.display = 'none';
        filterMenuItems();
    });
    
    // Filter tags triggers
    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            activeFilter = btn.getAttribute('data-filter');
            filterMenuItems();
        });
    });

    // ----------------------------------------------------------------------
    // 6. CART DRAWER & "MY PLATE" CALCULATOR LOGIC
    // ----------------------------------------------------------------------
    const plateDrawer = document.getElementById('plate-drawer');
    const drawerToggle = document.getElementById('drawer-toggle');
    const navPlateBtn = document.getElementById('nav-plate-btn');
    const emptyPlateState = document.getElementById('empty-plate-state');
    const plateItemsList = document.getElementById('plate-items-list');
    
    // Dynamic Badges
    const plateCountBadge = document.getElementById('plate-count');
    const drawerItemsCount = document.getElementById('drawer-items-count');
    const drawerTotalPrice = document.getElementById('drawer-total-price');
    
    // Pricing elements
    const billSubtotal = document.getElementById('bill-subtotal');
    const billGst = document.getElementById('bill-gst');
    const billGrandTotal = document.getElementById('bill-grand-total');
    
    // Actions
    const btnClearPlate = document.getElementById('btn-clear-plate');
    const btnOrderSimulation = document.getElementById('btn-order-simulation');
    
    // Cart State
    let cart = [];
    
    // Toggle Drawer Open/Close
    const toggleDrawer = () => {
        plateDrawer.classList.toggle('open');
    };
    
    drawerToggle.addEventListener('click', toggleDrawer);
    navPlateBtn.addEventListener('click', (e) => {
        e.preventDefault();
        plateDrawer.classList.add('open');
        // Scroll drawer into view on mobile
        plateDrawer.scrollIntoView({ behavior: 'smooth' });
    });
    
    // Sync Card visual states with current cart contents
    function syncCardStates() {
        cards.forEach(card => {
            const itemId = card.getAttribute('data-id');
            const cartItem = cart.find(item => item.id === itemId);
            
            if (cartItem) {
                card.classList.add('on-plate');
                const btn = card.querySelector('.add-to-plate-btn');
                if (btn) {
                    btn.innerHTML = `<span>On Plate (${cartItem.qty})</span> <i class="fa-solid fa-check"></i>`;
                }
            } else {
                card.classList.remove('on-plate');
                const btn = card.querySelector('.add-to-plate-btn');
                if (btn) {
                    btn.innerHTML = `<span>Add to Plate</span> <i class="fa-solid fa-plus"></i>`;
                }
            }
        });
    }
    
    // Update total displays
    function updateCartTotals() {
        let totalItems = 0;
        let subtotal = 0;
        let hasMRP = false;
        
        cart.forEach(item => {
            totalItems += item.qty;
            if (item.price === 'MRP') {
                hasMRP = true;
            } else {
                subtotal += item.price * item.qty;
            }
        });
        
        const gst = Math.round(subtotal * 0.05); // 5% GST
        const grandTotal = subtotal + gst;
        
        // Badges update
        plateCountBadge.textContent = totalItems;
        plateCountBadge.style.transform = 'scale(1.2)';
        setTimeout(() => plateCountBadge.style.transform = 'scale(1)', 200);
        
        drawerItemsCount.textContent = `${totalItems} item${totalItems !== 1 ? 's' : ''} selected`;
        drawerTotalPrice.textContent = `Total: ₹${grandTotal}${hasMRP ? ' + MRP' : ''}`;
        
        // Full summary panel update
        billSubtotal.textContent = `₹${subtotal}`;
        billGst.textContent = `₹${gst}`;
        billGrandTotal.textContent = `₹${grandTotal}`;
        
        // Toggle empty cart screen
        if (cart.length === 0) {
            emptyPlateState.style.display = 'flex';
            btnClearPlate.disabled = true;
            btnOrderSimulation.disabled = true;
        } else {
            emptyPlateState.style.display = 'none';
            btnClearPlate.disabled = false;
            btnOrderSimulation.disabled = false;
        }
        
        renderCartItems();
        syncCardStates();
    }
    
    // Render list rows in drawer
    function renderCartItems() {
        // Clear all elements except the empty state
        const items = plateItemsList.querySelectorAll('.plate-item');
        items.forEach(el => el.remove());
        
        cart.forEach(item => {
            const row = document.createElement('div');
            row.className = 'plate-item';
            row.setAttribute('data-id', item.id);
            
            const priceDisplay = item.price === 'MRP' ? 'MRP' : `₹${item.price}`;
            
            row.innerHTML = `
                <div class="item-details">
                    <span class="name">${item.name}</span>
                    <span class="sub-price">${priceDisplay} each</span>
                </div>
                <div class="quantity-controls">
                    <button class="qty-btn dec-qty" aria-label="Decrease quantity"><i class="fa-solid fa-minus"></i></button>
                    <span class="qty-value">${item.qty}</span>
                    <button class="qty-btn inc-qty" aria-label="Increase quantity"><i class="fa-solid fa-plus"></i></button>
                    <button class="remove-item-btn" aria-label="Remove item"><i class="fa-solid fa-trash"></i></button>
                </div>
            `;
            
            // Add listeners inside cart row
            row.querySelector('.dec-qty').addEventListener('click', () => updateItemQty(item.id, -1));
            row.querySelector('.inc-qty').addEventListener('click', () => updateItemQty(item.id, 1));
            row.querySelector('.remove-item-btn').addEventListener('click', () => removeFromCart(item.id));
            
            plateItemsList.appendChild(row);
        });
    }
    
    // Add item to cart
    function addToCart(id, name, price) {
        const existing = cart.find(item => item.id === id);
        
        if (existing) {
            existing.qty += 1;
        } else {
            cart.push({
                id: id,
                name: name,
                price: price === 'MRP' ? 'MRP' : parseInt(price),
                qty: 1
            });
        }
        
        showToast(`<i class="fa-solid fa-plus-circle"></i> Added <strong>${name}</strong> to your plate!`);
        updateCartTotals();
    }
    
    // Adjust quantities
    function updateItemQty(id, change) {
        const item = cart.find(item => item.id === id);
        if (!item) return;
        
        item.qty += change;
        
        if (item.qty <= 0) {
            removeFromCart(id);
        } else {
            updateCartTotals();
        }
    }
    
    // Remove individual card
    function removeFromCart(id) {
        const index = cart.findIndex(item => item.id === id);
        if (index === -1) return;
        
        const name = cart[index].name;
        cart.splice(index, 1);
        
        showToast(`<i class="fa-solid fa-trash-can"></i> Removed <strong>${name}</strong> from your plate.`, 'info');
        updateCartTotals();
    }
    
    // Clear plate completely
    btnClearPlate.addEventListener('click', () => {
        if (cart.length === 0) return;
        cart = [];
        showToast(`<i class="fa-solid fa-trash-can"></i> Plate cleared successfully.`);
        updateCartTotals();
    });
    
    // Wire button clicks on items
    cards.forEach(card => {
        const btn = card.querySelector('.add-to-plate-btn');
        if (!btn) return;
        
        const id = card.getAttribute('data-id');
        const name = card.getAttribute('data-name');
        const price = card.getAttribute('data-price');
        
        // Tap card body or press add button
        btn.addEventListener('click', (e) => {
            e.stopPropagation(); // Avoid double triggers
            addToCart(id, name, price);
        });
        
        card.addEventListener('click', () => {
            addToCart(id, name, price);
        });
    });

    // ----------------------------------------------------------------------
    // 7. TOAST NOTIFICATION SYSTEM
    // ----------------------------------------------------------------------
    const toastContainer = document.getElementById('toast-container');
    
    function showToast(message, type = 'success') {
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        
        toast.innerHTML = `
            <span>${message}</span>
            <button class="toast-close"><i class="fa-solid fa-xmark"></i></button>
        `;
        
        toastContainer.appendChild(toast);
        
        // Close event
        toast.querySelector('.toast-close').addEventListener('click', () => {
            toast.remove();
        });
        
        // Auto remove
        setTimeout(() => {
            toast.style.animation = 'slideInToast 0.4s reverse forwards';
            setTimeout(() => toast.remove(), 400);
        }, 3500);
    }
    
    // Confirm Order Mock Submission
    btnOrderSimulation.addEventListener('click', () => {
        if (cart.length === 0) return;
        
        btnOrderSimulation.disabled = true;
        btnOrderSimulation.innerHTML = `<i class="fa-solid fa-circle-notch fa-spin"></i> Processing...`;
        
        setTimeout(() => {
            showToast(`<i class="fa-solid fa-circle-check" style="color:#00e676"></i> <strong>Concept Confirmed!</strong> This simulates passing your plate order to the kitchen.`, 'success');
            btnOrderSimulation.disabled = false;
            btnOrderSimulation.innerHTML = `Confirm Order Concept`;
            
            // Clear plate and close drawer
            cart = [];
            updateCartTotals();
            setTimeout(() => {
                plateDrawer.classList.remove('open');
            }, 1000);
        }, 1200);
    });
});
