// Mobile Menu
const menuBtn = document.getElementById('menuBtn');
const navLinks = document.getElementById('navLinks');
if (menuBtn) {
    menuBtn.onclick = () => navLinks.classList.toggle('active');
}

// Modal
const modal = document.getElementById('ticketModal');
function openModal() { modal.classList.add('active'); }
function closeModal() { modal.classList.remove('active'); }

// Gallery
const galleryGrid = document.getElementById('galleryGrid');
const images = ['IMG_6073.webp','IMG_6074.webp','IMG_6082.webp','IMG_6086.webp','IMG_6089.webp','IMG_6091.webp','IMG_6092.webp','IMG_6093.webp','IMG_6094.webp','IMG_6095.webp','IMG_6096.webp','IMG_6097.webp','IMG_6105.webp','IMG_6108.webp','IMG_6111.webp'];

if (galleryGrid) {
    images.sort(() => Math.random() - 0.5).slice(0, 6).forEach(imgName => {
        const item = document.createElement('div');
        item.className = 'gallery-item';
        item.innerHTML = `<img src="images/${imgName}" alt="Rave">`;
        galleryGrid.appendChild(item);
    });
}

// Marquee Duplicator (Ensures seamless loop regardless of text length)
const marqueeContent = document.querySelector('.marquee-content');
if (marqueeContent) {
    const content = marqueeContent.innerHTML;
    marqueeContent.innerHTML = content + content + content + content;
}
