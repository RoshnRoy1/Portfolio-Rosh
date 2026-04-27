# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Static personal portfolio site — no build step, no bundler, no package manager. Open `index.html` directly in a browser or serve it with any static file server (e.g. `npx serve .` or VS Code Live Server).

## File Structure

- **`index.html`** — single page, all sections in order: cursor elements → scroll progress → canvas → nav → hero → about → skills → projects → contact → footer → CDN `<script>` tags at bottom.
- **`style.css`** — all styles including responsive breakpoints (1024px, 768px, 480px). `mediaqueries.css` exists but is intentionally empty (a stub kept for compatibility).
- **`script.js`** — all interactivity.
- **`assets/`** — images (`prof-pic.png`, `Roshan Resume.pdf`) and project screenshots.

## Key Architecture

### CSS Design System
All design tokens are CSS custom properties on `:root`:
```css
--bg: #070710;  --surface: #0f0f1a;
--accent: #6c63ff;  --accent-2: #00d4ff;   /* purple + cyan */
--card: rgba(255,255,255,0.04);  --card-border: rgba(255,255,255,0.08);
--text: #e2e8f0;  --text-muted: #64748b;
--font-body: 'Inter';  --font-display: 'Space Grotesk';
--nav-h: 70px;  --radius: 16px;  --t: 0.3s;
```
Utility classes: `.glass-card`, `.gradient-text`, `.btn-primary`, `.btn-secondary`, `.section-label`, `.section-title`, `.accent`.

### JavaScript Modules (all in script.js, IIFEs)
1. **Custom cursor** — `#cursorDot` snaps to mouse; `#cursorRing` lags via lerp (factor 0.13). Hidden on touch devices via CSS `pointer: coarse`.
2. **Scroll progress** — `#scrollProgress` bar width = `scrollY / (scrollHeight - innerHeight) * 100%`.
3. **Nav** — gains `.scrolled` class when `scrollY > 60`.
4. **Particle canvas** — `#bg-canvas`, capped at 90 particles, O(n²) connection lines within 120px, colour `rgba(108,99,255,α)`.
5. **GSAP + ScrollTrigger** — hero entrance timeline; scroll-driven fade-in for section labels, about cards, skill columns, project cards, contact block.
6. **Skill bars** — driven by `data-width` attribute on `.skill-fill` elements; animated to that width on `ScrollTrigger` `onEnter`.
7. **Typed.js** — cycles role strings in `#typed`.
8. **VanillaTilt** — applied to all `[data-tilt]` elements (project cards).

### CDN Dependencies (bottom of index.html)
- GSAP 3.12.2 + ScrollTrigger plugin
- Typed.js 2.1.0
- VanillaTilt 1.8.1

## Content Sections

### Projects Grid
Three `.project-card` elements inside `.projects-grid`. Each card structure:
```html
<div class="project-card glass-card" data-tilt>
  <div class="project-img"><img src="..." alt="..." /></div>
  <div class="project-info">
    <span class="project-badge">Badge Text</span>
    <h3 class="project-title">Title</h3>
    <p class="project-desc">Description</p>
    <div class="project-overlay">
      <a href="..." class="btn-primary">GitHub</a>
      <a href="..." class="btn-secondary">Live Demo</a>
    </div>
    <div class="project-tags">
      <span class="tag">Tag</span>
    </div>
  </div>
</div>
```

### Skills
Two `.skills-col` columns. Each skill item:
```html
<div class="skill-item">
  <div class="skill-header"><span>Skill</span><span>XX%</span></div>
  <div class="skill-bar"><div class="skill-fill" data-width="XX"></div></div>
</div>
```
The `data-width` value drives the animated bar width via JS on scroll.

### Owner Identity
Roshan Roy Varghese — Full-Stack AI Developer, MSc AI student at Heriot-Watt University, Edinburgh. Contact: roshanroyvarghese1@gmail.com.
