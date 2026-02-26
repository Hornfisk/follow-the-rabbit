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

    // Restart animation to apply new duration immediately
    marqueeContent.style.animation = 'none';
    // Force reflow
    void marqueeContent.offsetWidth;
    marqueeContent.style.animation = '';
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
