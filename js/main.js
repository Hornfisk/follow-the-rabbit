// Mobile Menu Toggle
const menuBtn = document.getElementById('menuBtn');
const navLinks = document.getElementById('navLinks');

if (menuBtn && navLinks) {
	menuBtn.addEventListener('click', () => {
		navLinks.classList.toggle('active');
		menuBtn.textContent = navLinks.classList.contains('active') ? '✕' : '☰';
	});

	document.querySelectorAll('.nav-links a').forEach(link => {
		link.addEventListener('click', () => {
			navLinks.classList.remove('active');
			menuBtn.textContent = '☰';
		});
	});
}

// Modal Logic
const modal = document.getElementById('ticketModal');

function openModal() { if (modal) modal.classList.add('active'); }
function closeModal() { if (modal) modal.classList.remove('active'); }

if (modal) {
	modal.addEventListener('click', (e) => {
		if (e.target === modal) closeModal();
	});
}

// Scroll reveal
const observerOptions = { threshold: 0.1 };
const observer = new IntersectionObserver((entries) => {
	entries.forEach(entry => {
		if (entry.isIntersecting) {
			entry.target.style.opacity = '1';
			entry.target.style.transform = 'translateY(0)';
		}
	});
}, observerOptions);

document.querySelectorAll('section').forEach((section) => {
	section.style.opacity = '0';
	section.style.transform = 'translateY(20px)';
	section.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
	observer.observe(section);
});

// Gallery generation (unchanged)
const galleryGrid = document.getElementById('galleryGrid');
const imageFiles = [
	'IMG_6073.webp','IMG_6074.webp','IMG_6082.webp','IMG_6086.webp','IMG_6089.webp',
	'IMG_6091.webp','IMG_6092.webp','IMG_6093.webp','IMG_6094.webp','IMG_6095.webp',
	'IMG_6096.webp','IMG_6097.webp','IMG_6105.webp','IMG_6108.webp','IMG_6111.webp',
];

function shuffleArray(array) {
	for (let i = array.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[array[i], array[j]] = [array[j], array[i]];
	}
}

if (galleryGrid) {
	shuffleArray(imageFiles);
	const selectedImages = imageFiles.slice(0, 6);
	selectedImages.forEach(filename => {
		const div = document.createElement('div');
		div.classList.add('gallery-item');
		const img = document.createElement('img');
		img.src = `images/${filename}`;
		img.alt = 'Visual Echo';
		div.appendChild(img);
		galleryGrid.appendChild(div);
	});
}

/* -------------------------
   Marquee: fixed-target-duration approach

   (function() {
    const marqueeContent = document.querySelector('.marquee-content');
    if (!marqueeContent) return;

    function debounce(fn, wait = 120) {
	let timeout;
	return function(...args) {
	    clearTimeout(timeout);
	    timeout = setTimeout(() => fn.apply(this, args), wait);
	};
    }

    function updateMarquee() {
	const totalWidth = marqueeContent.scrollWidth;
	if (!totalWidth) return;

	    // We expect exactly two identical blocks
	const blockWidth = totalWidth / 2;

	const style = getComputedStyle(document.documentElement);
	const pxPerSecRaw = style.getPropertyValue('--marquee-px-per-sec') || '900';
	const pxPerSec = parseFloat(pxPerSecRaw) || 900;

	    // Calculate duration in seconds, minimum 0.5s to avoid too fast
	const durationSec = Math.max(0.5, blockWidth / pxPerSec);

	document.documentElement.style.setProperty('--marquee-distance', `${blockWidth}px`);
	document.documentElement.style.setProperty('--marquee-duration', `${durationSec}s`);
    }

    const debouncedUpdate = debounce(updateMarquee, 120);

    if (document.fonts && document.fonts.ready) {
	document.fonts.ready.then(() => setTimeout(updateMarquee, 30)).catch(() => setTimeout(updateMarquee, 30));
    } else {
	window.addEventListener('load', () => setTimeout(updateMarquee, 30));
    }

    window.addEventListener('resize', debouncedUpdate);
    window.addEventListener('orientationchange', debouncedUpdate);
    document.addEventListener('DOMContentLoaded', () => setTimeout(updateMarquee, 30));
})();
