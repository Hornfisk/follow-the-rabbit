# CLAUDE.md — Follow the Rabbit

Project context for Claude Code. Safe for public repos — contains no credentials, keys, or private data.

---

## Project Overview

Single-page static event website for **Follow the Rabbit**, a Techno / Tech-House / Trance rave.
- **Stack:** Vanilla HTML, CSS, JavaScript — no frameworks, no build step
- **Live site:** public-facing, hosted as a static site
- **Event:** April 10, 2026 · Mango's Nightclub, Benalmádena, Spain
- **Organizers:** Sonido Sessions & Project Insana

---

## File Structure

```
index.html          — single page, all sections
css/style.css       — all styles (versioned with ?v=X.X query string)
js/main.js          — all JS (versioned with ?v=X.X query string)
images/             — WebP photos + SVG icons (EXIF stripped)
robots.txt
sitemap.xml
.htaccess           — security headers + CSP
```

---

## CSS Architecture

**CSS custom properties** defined in `:root` (colours, transitions, font stacks).

**Key z-index layers:**
| z-index | Element |
|---|---|
| -2 | `.bg-gradient` (radial purple→black) |
| -1 | `.grid-overlay` (faint 50px grid) |
| 500 | `#crt` (noise overlay — `::before` only, no scan lines) |
| 501 | `.gallery-item`, `.artist-card` (raised above noise so images stay clean) |
| 1000 | `header`, `#lightbox` |
| 1001 | `.rabbit-icon` |

**Noise overlay (`#crt`):** Pure CSS SVG `feTurbulence` grain on `::before`. No scan lines. Animated on desktop (`0.4s steps(1)`), paused + simplified (`numOctaves=1`) on mobile via `@media (max-width: 768px)`. `prefers-reduced-motion` respected.

**Glitch effect:** Triggered by JS on `.logo` and `.rabbit-icon` elements (not on `#crt`). CSS classes `.logo.glitch` / `.rabbit-icon.glitch` — the rabbit keyframe has `translateX(-50%)` baked in to preserve its centering. Fires every 10–22s after an initial 3–10s delay.

**Gallery:** Mobile = native scroll snap. Desktop (`min-width: 768px`) = CSS `animation: scroll-left` auto-scroll, paused on hover. JS `requestAnimationFrame` drag carousel for the lineup section.

---

## JS Patterns

- No dependencies — vanilla ES5-compatible JS in one file (`js/main.js`)
- Gallery images injected dynamically from a `const images = [...]` array; duplicates appended for seamless desktop loop, marked `aria-hidden="true"`
- Lightbox: event-delegated click on `#galleryGrid`, keyboard nav (`←` `→` `Esc`), `hidden` attribute toggled
- Mobile nav: `aria-expanded` toggled on hamburger button
- Glitch: `setTimeout` loop, `animationend` listener cleans up class

---

## SEO

All implemented — do not duplicate:
- Title, meta description include date + location
- Full Open Graph + Twitter Card tags
- JSON-LD `MusicEvent` schema in `<head>` (CSP-safe — data block, not executed)
- Canonical URL tag
- `robots.txt` + `sitemap.xml` present

> **Pending design task:** a 1200×630px social poster image would improve OG/Twitter card previews. When ready, update `og:image` and `twitter:image` in `<head>`.

---

## Conventions & Decisions

- **No framework, no build step** — keep it that way; the simplicity is intentional
- **Images:** WebP only; EXIF must be stripped before committing any new photos
- **Version query strings** (`?v=X.X`) on CSS/JS links — bump manually on significant changes to bust browser cache
- **CSP** in both `index.html` and `.htaccess` — keep them in sync if either changes
- **`<script type="application/ld+json">`** is exempt from `script-src` CSP — no unsafe-inline needed
- Gallery item filenames are generic (`IMG_6073.webp` etc.) — renaming for SEO is a known deferred task
- The `.webp_original` files in `images/` are local backups — already gitignored or should be
