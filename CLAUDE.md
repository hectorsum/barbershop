# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Fernando Barber & Tattoo** is a client-side single-page application (SPA) for a barbershop/tattoo artist portfolio and booking interface. Built with React 18 via Babel Standalone with no build step required—just open `index.html` in a browser.

## Tech Stack & How It Works

- **React 18.3.1** (UMD via CDN, development build)
- **Babel Standalone** for JSX transpilation in the browser
- **Pure CSS** (no preprocessor) with CSS custom properties for theming
- **Client-side routing** with React state (no backend router needed)
- **localStorage** for persistent state (user session, current page, UI tweaks)

**Key difference from typical React projects**: No build step, no npm, no bundler. The browser transpiles JSX on load. This means:
- Script load order matters (see `index.html` for sequence)
- Global scope pollution is possible but avoided via JSX module scope
- Hot reload requires manual browser refresh

## File Structure

### Entry Point
- **index.html** — Loads React, Babel, CSS, and all JSX files in order. Contains the root `<div id="root">` and the main App component that handles routing and state.

### Components
- **components.jsx** — Reusable UI building blocks: `Nav`, `Footer`, `LogoIcon`, form inputs, buttons, layout grids. All components accept props for navigation and user state.

### Pages (each is a top-level React component)
- **page-home.jsx** — Hero carousel, testimonials, service preview grid
- **page-about.jsx** — Bio, philosophy, gallery
- **page-haircuts.jsx** — Services, gallery, booking/contact info
- **page-tattoos.jsx** — Portfolio, styles, booking/contact info
- **page-contact.jsx** — Contact form, location, hours
- **page-auth.jsx** — Sign-in / sign-up (mode prop switches between them)
- **page-dashboard.jsx** — User profile, appointment history, loyalty points (stub/demo)

### Theming & Customization
- **shared.css** — Global styles, CSS variable definitions (colors, fonts, spacing), utility classes
- **tweaks-panel.jsx** — Edit mode UI (right-side panel) + postMessage protocol for embedding. Allows live tweaking of accent color, font style, social feed visibility. The `/*EDITMODE-BEGIN...EDITMODE-END*/` markers in `index.html` denote values synced with tweaks.

## How to Develop

### Running Locally
```bash
# Option 1: Python simple HTTP server
python3 -m http.server 8000

# Option 2: Node http-server (if installed)
npx http-server

# Option 3: Using VS Code Live Server extension (Alt+L, Alt+O)
```
Then open `http://localhost:8000` in your browser.

### Making Changes
1. **Edit .jsx or .css files** directly—Babel transpiles JSX in real-time
2. **Refresh browser** to see changes (no hot reload)
3. **Check console** for errors (JSX syntax issues will show in browser console, not terminal)

### Common Tasks

**Add a new page:**
1. Create `page-newname.jsx` with a React component
2. Add `<script type="text/babel" src="page-newname.jsx"></script>` to `index.html` *before* the App script
3. Add a route case in `App`'s `renderPage()` switch statement
4. Add nav link in `components.jsx` Nav component if needed

**Update colors/spacing:**
- Edit CSS variables in `shared.css` `:root` block
- All components derive from these variables (e.g., `background: var(--bg)`)
- Tweak values in `tweaks-panel.jsx` to test live

**Add a form input:**
- Define the control in `tweaks-panel.jsx` (has `TweakColor`, `TweakToggle`, `TweakSlider`, `TweakRadio`, etc. as reference)
- For real forms, create a new component in `components.jsx` (e.g., `ContactForm`)

### State & localStorage
- **Page routing**: `localStorage.setItem('fb_page', pageName)` in `App.navigate()`
- **User session**: `localStorage.setItem('fb_user', JSON.stringify(user))` on sign-in
- **Theme tweaks**: Posted to parent frame via `window.parent.postMessage()`

Clearing storage: Open DevTools console and run `localStorage.clear()`.

## Design System & Styling

### Color Palette
- **Dark theme**: espresso (#0E0E0E), dark-brown, mid-brown, warm-tan
- **Accents**: gold (#DDB340), gold-light, accent-red (blood orange)
- **Neutrals**: parchment, cream, white

### Typography
- **Display**: Bebas Neue (uppercase headings)
- **Body**: DM Sans (UI, nav, copy)
- **Serif**: Lora (for elegance, quotes, testimonials)

### Patterns
- **Dark text on dark bg** — use `var(--text)` (parchment) and `var(--text-muted)` for hierarchy
- **Borders**: Use `var(--border)` (subtle white) or `var(--border-gold)` for accent dividers
- **Spacing**: No hardcoded values—define in CSS and reference via BEM or semantic class names
- **Grain texture**: Applied as `body::before` overlay (subtle SVG noise, opacity 0.04)

### Responsive
- Mobile-first media queries in shared.css (mostly flex layout, no breakpoints defined yet)
- Navigation collapses dropdown to hamburger menu on small screens (see `Nav` component)

## Edit Mode & postMessage Protocol

The app supports embedding in design tools (e.g., Figma plugins, design editors) via a postMessage protocol:
- **Sender to app**: `{ type: '__activate_edit_mode' }` → shows tweaks panel
- **App to parent**: `{ type: '__edit_mode_available' }` on load, `{ type: '__edit_mode_set_keys', edits: { ... } }` when tweaks change
- **Closing**: `{ type: '__deactivate_edit_mode' }` or user clicks panel close button

The tweaks are stored in `TWEAK_DEFAULTS` (wrapped in `/*EDITMODE-BEGIN...EDITMODE-END*/` markers) so external tools can parse and sync them.

## Testing & Debugging

### Browser Console
- Errors in JSX parsing show immediately
- State issues: inspect `localStorage` and log component renders with `console.log()`

### Simulating User State
Open DevTools console and run:
```javascript
localStorage.setItem('fb_user', JSON.stringify({
  name: 'Test User',
  username: 'testuser',
  email: 'test@example.com',
  joinDate: 'May 2026',
  points: 100,
  tier: 'Oro'
}));
localStorage.setItem('fb_page', 'dashboard');
location.reload();
```

### Inspecting State
```javascript
// View current page
localStorage.getItem('fb_page');

// View user session
JSON.parse(localStorage.getItem('fb_user'));

// Clear all
localStorage.clear();
```

## Notes for Future Work

- **No backend yet**: All routes and state are client-side. Auth is a stub (redirects to dashboard on sign-in).
- **Image assets**: Only `fernando-barber.png` (hero image) and two placeholder images in `/uploads/` are present. Portfolio images need to be added.
- **Accessibility**: Forms lack proper labels and ARIA attributes. Add `htmlFor`, `aria-label`, `role` as needed.
- **Performance**: React dev build is used (not optimized). Switch to production build CDN links before deployment.
- **Mobile**: Responsive layout exists but untested on real devices. Test nav collapse, form inputs on phone.
