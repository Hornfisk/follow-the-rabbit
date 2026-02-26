// Mobile Menu Toggle
const menuBtn = document.getElementById('menuBtn');
const navLinks = document.getElementById('navLinks');
if (menuBtn) {
    menuBtn.onclick = () => navLinks.classList.toggle('active');
}

// Modal Logic
const modal = document.getElementById('ticketModal');
function openModal() { if(modal) modal.classList.add('active'); }
function closeModal() { if(modal) modal.classList.remove('active'); }

// Gallery Generation
const galleryGrid = document.getElementById('galleryGrid');
const images = ['IMG_6073.webp','IMG_6074.webp','IMG_6082.webp','IMG_6086.webp','IMG_6089.webp','IMG_6091.webp','IMG_6092.webp','IMG_6093.webp','IMG_6094.webp','IMG_6095.webp','IMG_6096.webp','IMG_6097.webp','IMG_6105.webp','IMG_6108.webp','IMG_6111.webp'];

if (galleryGrid) {
    // Shuffle and pick 6
    images.sort(() => Math.random() - 0.5).slice(0, 6).forEach(imgName => {
        const item = document.createElement('div');
        item.className = 'gallery-item';
        item.innerHTML = `<img src="images/${imgName}" alt="Rave">`;
        galleryGrid.appendChild(item);
    });
}

// Simple Marquee Fix: Ensure we have enough content to loop
window.addEventListener('DOMContentLoaded', () => {
    const marqueeContent = document.querySelector('.marquee-content');
    if (marqueeContent) {
        // If the text is short, we clone it to ensure it fills the screen
        const originalHTML = marqueeContent.innerHTML;
        marqueeContent.innerHTML = originalHTML + originalHTML;
    }
});
