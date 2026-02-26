// Mobile Menu Toggle
const menuBtn = document.getElementById('menuBtn');
const navLinks = document.getElementById('navLinks');
if (menuBtn && navLinks) {
    menuBtn.onclick = () => {
        navLinks.classList.toggle('active');
        menuBtn.textContent = navLinks.classList.contains('active') ? '✕' : '☰';
    };
}

// Modal Logic
const modal = document.getElementById('ticketModal');
function openModal() { if(modal) modal.classList.add('active'); }
function closeModal() { if(modal) modal.classList.remove('active'); }

// Gallery Generation (Visual Echoes)
const galleryGrid = document.getElementById('galleryGrid');
const imageFiles = [
    'IMG_6073.webp','IMG_6074.webp','IMG_6082.webp','IMG_6086.webp','IMG_6089.webp',
    'IMG_6091.webp','IMG_6092.webp','IMG_6093.webp','IMG_6094.webp','IMG_6095.webp',
    'IMG_6096.webp','IMG_6097.webp','IMG_6105.webp','IMG_6108.webp','IMG_6111.webp'
];

if (galleryGrid) {
    // Shuffle and pick 6 images
    const shuffled = imageFiles.sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, 6);
    
    selected.forEach(filename => {
        const div = document.createElement('div');
        div.classList.add('gallery-item');
        const img = document.createElement('img');
        img.src = `images/${filename}`;
        img.alt = 'Visual Echo';
        img.loading = 'lazy';
        div.appendChild(img);
        galleryGrid.appendChild(div);
    });
}

// Marquee Duplicator (Ensures seamless loop)
window.addEventListener('DOMContentLoaded', () => {
    const marqueeContent = document.querySelector('.marquee-content');
    if (marqueeContent) {
        const originalHTML = marqueeContent.innerHTML;
        // Duplicate content to ensure it fills the screen width
        marqueeContent.innerHTML = originalHTML + originalHTML;
    }
});
