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

    // Duplicate for seamless carousel loop (desktop only — hidden on mobile via CSS)
    shuffled.forEach(filename => {
        const item = makeGalleryItem(filename, '');
        item.setAttribute('aria-hidden', 'true');
        galleryGrid.appendChild(item);
    });
}

// Marquee Duplicator (Ensures seamless loop)
window.addEventListener('DOMContentLoaded', () => {
    const marqueeContent = document.querySelector('.marquee-content');
    if (marqueeContent) {
        const originalHTML = marqueeContent.innerHTML;
        marqueeContent.innerHTML = originalHTML + originalHTML;
    }
});
