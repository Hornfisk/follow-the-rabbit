// Mobile Menu Toggle
const menuBtn = document.getElementById('menuBtn');
const navLinks = document.getElementById('navLinks');
if (menuBtn && navLinks) {
    menuBtn.onclick = () => {
        const isOpen = navLinks.classList.toggle('active');
        menuBtn.textContent = isOpen ? '✕' : '☰';
        menuBtn.setAttribute('aria-expanded', isOpen);
    };

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
            menuBtn.textContent = '☰';
            menuBtn.setAttribute('aria-expanded', 'false');
        }
    });
}

// Gallery Generation (Visual Echoes)
const galleryGrid = document.getElementById('galleryGrid');
const imageFiles = [
    'IMG_6073.webp','IMG_6074.webp','IMG_6082.webp','IMG_6086.webp','IMG_6089.webp',
    'IMG_6091.webp','IMG_6092.webp','IMG_6093.webp','IMG_6094.webp','IMG_6095.webp',
    'IMG_6096.webp','IMG_6097.webp','IMG_6105.webp','IMG_6108.webp','IMG_6111.webp'
];

function shuffle(arr) {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

function makeGalleryItem(filename, alt) {
    const div = document.createElement('div');
    div.classList.add('gallery-item');
    const img = document.createElement('img');
    img.src = `images/${filename}`;
    img.alt = alt;
    img.loading = 'lazy';
    div.appendChild(img);
    return div;
}

if (galleryGrid) {
    const shuffled = shuffle(imageFiles);

    // Render original items
    shuffled.forEach((filename, i) => {
        galleryGrid.appendChild(makeGalleryItem(filename, `Event photo ${i + 1}`));
    });

    // Duplicate for seamless carousel loop
    shuffled.forEach(filename => {
        const item = makeGalleryItem(filename, '');
        item.setAttribute('aria-hidden', 'true');
        galleryGrid.appendChild(item);
    });
}

// Lineup Carousel Logic
const lineupGrid = document.getElementById('lineupGrid');
if (lineupGrid) {
    // 1. Get all current cards
    const cards = Array.from(lineupGrid.children);
    
    // 2. Separate into Booked and TBA
    const booked = [];
    const tba = [];

    cards.forEach(card => {
        const name = card.querySelector('.artist-name');
        // If name exists and is NOT "TBA", it's a confirmed artist
        if (name && name.textContent.trim() !== 'TBA') {
            booked.push(card);
        } else {
            tba.push(card);
        }
    });

    // 3. Clear grid and re-append: Booked artists first, then TBAs
    lineupGrid.innerHTML = '';
    
    // Append confirmed artists first (e.g., Arkitech)
    booked.forEach(card => lineupGrid.appendChild(card));
    
    // Append TBA cards after
    tba.forEach(card => lineupGrid.appendChild(card));

    // 4. Duplicate for seamless loop (Desktop)
    // We duplicate the sorted list so the order is preserved in the loop
    const allSortedCards = Array.from(lineupGrid.children);
    allSortedCards.forEach(card => {
        const clone = card.cloneNode(true);
        clone.setAttribute('aria-hidden', 'true');
        lineupGrid.appendChild(clone);
    });

    initLineupDrag(lineupGrid);
}

function initLineupDrag(lineupGrid) {
    const mq = window.matchMedia('(min-width: 768px)');
    if (!mq.matches) return;

    const lineupViewport = lineupGrid.parentElement;

    const rawSpeed = getComputedStyle(document.documentElement)
        .getPropertyValue('--gallery-speed').trim();
    const gallerySpeedSeconds = parseFloat(rawSpeed); // 70

    let offset = 0;
    let halfWidth = 0;
    let autoScrollSpeed = 0;
    let rafId = null;
    let autoScrollActive = true;

    let isDragging = false;
    let startX = 0;
    let lastX = 0;
    let totalDelta = 0;
    let hasDragged = false;

    let isCoasting = false;
    let velocity = 0;
    const FRICTION = 0.92;
    const VELOCITY_THRESHOLD = 0.5;
    const DRAG_THRESHOLD = 5;
    const SMOOTHING = 0.8;
    const RESUME_DELAY = 2000;
    let resumeTimer = null;

    // Defer measurement one frame so cloned cards are rendered
    requestAnimationFrame(() => {
        halfWidth = lineupGrid.scrollWidth / 2;
        autoScrollSpeed = halfWidth / (gallerySpeedSeconds * 60);
        startLoop();
    });

    function wrapOffset() {
        if (halfWidth <= 0) return;
        if (offset >= halfWidth) offset -= halfWidth;
        if (offset < 0) offset += halfWidth;
    }

    function tick() {
        if (!isDragging) {
            if (isCoasting) {
                offset -= velocity;
                velocity *= FRICTION;
                if (Math.abs(velocity) < VELOCITY_THRESHOLD) {
                    isCoasting = false;
                    velocity = 0;
                }
            } else if (autoScrollActive) {
                offset += autoScrollSpeed;
            }
        }
        wrapOffset();
        lineupGrid.style.transform = `translateX(${-offset}px)`;
        rafId = requestAnimationFrame(tick);
    }

    function startLoop() {
        if (rafId) return;
        rafId = requestAnimationFrame(tick);
    }

    function onPointerDown(e) {
        if (e.button !== 0 && e.pointerType === 'mouse') return;
        isDragging = true;
        isCoasting = false;
        velocity = 0;
        autoScrollActive = false;
        hasDragged = false;
        totalDelta = 0;
        startX = e.clientX;
        lastX = e.clientX;
        lineupViewport.setPointerCapture(e.pointerId);
        lineupViewport.classList.add('is-dragging');
        clearTimeout(resumeTimer);
    }

    function onPointerMove(e) {
        if (!isDragging) return;
        const delta = e.clientX - lastX;
        offset -= delta;
        velocity = delta * SMOOTHING;
        lastX = e.clientX;
        totalDelta += Math.abs(e.clientX - startX);
        if (totalDelta > DRAG_THRESHOLD) hasDragged = true;
        wrapOffset();
        lineupGrid.style.transform = `translateX(${-offset}px)`;
    }

    function onPointerUp(e) {
        if (!isDragging) return;
        isDragging = false;
        lineupViewport.classList.remove('is-dragging');
        if (Math.abs(velocity) > VELOCITY_THRESHOLD) isCoasting = true;
        resumeTimer = setTimeout(() => {
            autoScrollActive = true;
            isCoasting = false;
        }, RESUME_DELAY);
    }

    // Capture phase — fires before <a> links inside cards respond
    function onCapturingClick(e) {
        if (hasDragged) {
            e.preventDefault();
            e.stopPropagation();
            hasDragged = false;
        }
    }

    lineupViewport.addEventListener('pointerdown', onPointerDown);
    lineupViewport.addEventListener('pointermove', onPointerMove);
    lineupViewport.addEventListener('pointerup', onPointerUp);
    lineupViewport.addEventListener('pointercancel', onPointerUp);
    lineupViewport.addEventListener('click', onCapturingClick, true);

    // Recalculate on resize (e.g. orientation change on large tablets)
    const resizeObserver = new ResizeObserver(() => {
        const newHalf = lineupGrid.scrollWidth / 2;
        if (newHalf > 0) {
            halfWidth = newHalf;
            autoScrollSpeed = halfWidth / (gallerySpeedSeconds * 60);
        }
    });
    resizeObserver.observe(lineupViewport);
}

// Marquee Duplicator
window.addEventListener('DOMContentLoaded', () => {
    const marqueeContent = document.querySelector('.marquee-content');
    if (marqueeContent) {
        const originalHTML = marqueeContent.innerHTML;
        marqueeContent.innerHTML = originalHTML + originalHTML;
    }
});
