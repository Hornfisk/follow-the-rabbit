// Mobile Menu Toggle
const menuBtn = document.getElementById('menuBtn');
const navLinks = document.getElementById('navLinks');

menuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    menuBtn.textContent = navLinks.classList.contains('active') ? '✕' : '☰';
});

// Close menu when clicking a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        menuBtn.textContent = '☰';
    });
});

// Modal Logic
const modal = document.getElementById('ticketModal');

function openModal() {
    modal.classList.add('active');
}

function closeModal() {
    modal.classList.remove('active');
}

// Close modal on outside click
modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        closeModal();
    }
});

// Add subtle scroll reveal effect
const observerOptions = {
    threshold: 0.1,
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Apply to sections
document.querySelectorAll('section').forEach((section) => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(20px)';
    section.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    observer.observe(section);
});

// Dynamic Gallery Images
const galleryGrid = document.getElementById('galleryGrid');

// List of .webp images in /images excluding the rabbit logo
const imageFiles = [
    'IMG_6073.webp',
    'IMG_6074.webp',
    'IMG_6082.webp',
    'IMG_6086.webp',
    'IMG_6089.webp',
    'IMG_6091.webp',
    'IMG_6092.webp',
    'IMG_6093.webp',
    'IMG_6094.webp',
    'IMG_6095.webp',
    'IMG_6096.webp',
    'IMG_6097.webp',
    'IMG_6105.webp',
    'IMG_6108.webp',
    'IMG_6111.webp',
];

// Function to shuffle array
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

// Shuffle and pick a subset (e.g., 6 images)
shuffleArray(imageFiles);
const selectedImages = imageFiles.slice(0, 6);

// Create gallery items
selectedImages.forEach((filename) => {
    const div = document.createElement('div');
    div.classList.add('gallery-item');
    const img = document.createElement('img');
    img.src = `images/${filename}`;
    img.alt = 'Visual Echo';
    div.appendChild(img);
    galleryGrid.appendChild(div);
});
function openModal() {
    modal.classList.add('active');
    // Reset button text immediately on tap
    const buyButton = document.querySelector('#tickets button.btn-primary');
    if (buyButton) {
        buyButton.textContent = 'Buy Tickets';
    }
}
