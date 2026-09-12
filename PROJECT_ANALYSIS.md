# Comprehensive Repository Analysis & System Documentation
**Project:** Ubuntu 20.04 Web Desktop Portfolio  
**Technology Stack:** Next.js (React 18), Tailwind CSS, jQuery, react-draggable, react-ga4, EmailJS  

---

## 1. Executive Summary

This repository is a fully interactive, web-based simulation of the **Ubuntu 20.04 LTS Desktop (Linux)** operating system built as a personal portfolio website. Instead of presenting a conventional static resume page, the portfolio presents visitors with an authentic GNOME/Yaru desktop environment featuring:
- A draggable, resizable windowing system with maximize/minimize/close window controls.
- An interactive launcher dock (Sidebar) with favorite apps and running indicators.
- A full-screen application drawer ("Show Applications") with real-time search and frequency tracking.
- Interactive system applications including a simulated Linux Terminal, an Expression-parsing Calculator, a Gedit-styled Email Contact form, a Wallpaper settings app, a simulated Chrome browser, and external embeds for VS Code, Spotify, and Todoist.
- Full desktop state simulation including bootloader animation, lock screen, shutdown/power-on cycle, right-click context menus, and a system tray with volume and display brightness controls.
- Client-side persistence using `localStorage` for theme preferences, brightness, sound levels, open folder states, and app frequencies.

---

## 2. Complete File-by-File Directory & Inventory

Below is an exhaustive breakdown of every non-generated directory and file in the codebase:

```
d:\Projects\Manish\
├── .env.example                                 # Template for optional Google Analytics & EmailJS variables
├── .gitattributes                               # Git line-ending and attribute configurations
├── .gitignore                                   # Standard Next.js/Node ignore rules (.next, .env, node_modules, etc.)
├── apps.config.js                               # Central registry declaring all desktop & dock applications
├── LICENSE                                      # MIT License
├── package.json                                 # NPM dependencies, scripts, engines, and project metadata
├── package-lock.json                            # Exact package dependency lockfile
├── postcss.config.js                            # PostCSS configuration for Tailwind CSS and Autoprefixer
├── README.md                                    # Project description, setup steps, and EmailJS guide
├── tailwind.config.js                           # Custom Ubuntu color definitions and JIT configuration
├── yarn.lock                                    # Yarn package dependency lockfile
│
├── .github/
│   ├── FUNDING.yml                              # GitHub sponsor links (BuyMeACoffee)
│   └── workflows/
│       └── gh-deploy.yml                        # GitHub Actions automated CI/CD for GitHub Pages export
│
├── .vscode/
│   └── settings.json                            # VS Code workspace settings
│
├── pages/
│   ├── _app.js                                  # Next.js custom App wrapper; imports global Tailwind & index.css
│   ├── _document.js                             # Custom Document head structure; imports Google Font 'Ubuntu'
│   └── index.js                                 # Main application entry point; initializes GA & renders <Ubuntu />
│
├── components/
│   ├── ubuntu.js                                # Master OS coordinator: manages boot, lock, shutdown, and wallpaper
│   │
│   ├── apps/
│   │   ├── calc.js                              # Math terminal calculator powered by expr-eval parser
│   │   ├── chrome.js                            # Web browser simulation with navigation bar and iframe loader
│   │   ├── gedit.js                             # Ubuntu text editor UI wired to EmailJS contact form with bot trap
│   │   ├── github_profile.js                    # Responsive in-portfolio GitHub Dark theme profile and repo showcase
│   │   ├── image_viewer.js                      # Photos desktop gallery app & high-fidelity image inspection lightbox
│   │   ├── manish_portfolio.js                  # Core portfolio app: About Me, Education, Skills, Projects, Resume
│   │   ├── settings.js                          # Background wallpaper selector with live preview and save
│   │   ├── spotify.js                           # Embedded Spotify web player iframe
│   │   ├── terminal.js                          # Simulated bash shell with mock filesystem and command parser
│   │   ├── trash.js                             # Humorous recycle bin holding mock tech files with empty action
│   │   └── vscode.js                            # Embedded GitHub1s/VS Code web editor iframe
│   │
│   ├── base/
│   │   ├── side_bar_app.js                      # Individual dock icon component with active/open indicator dots
│   │   ├── ubuntu_app.js                        # Desktop shortcut icon component with selection highlight
│   │   └── window.js                            # Draggable, resizable OS window container with control buttons
│   │
│   ├── context menus/
│   │   ├── default.js                           # Custom browser-wide context menu (copy, paste, inspect mock)
│   │   └── desktop-menu.js                      # Desktop right-click menu (New Folder, Change Background, Terminal)
│   │
│   ├── screen/
│   │   ├── all-applications.js                  # Full-screen app drawer grid with search & frequent apps tab
│   │   ├── booting_screen.js                    # Ubuntu startup loading spinner with power-on button
│   │   ├── desktop.js                           # Desktop manager: window stack, focus, minimization, folder creation
│   │   ├── lock_screen.js                       # Ubuntu lock screen with time, date, blur effect, and unlock triggers
│   │   ├── navbar.js                            # Top OS status bar containing Activities, Clock, and Status Tray
│   │   └── side_bar.js                          # Ubuntu launcher dock container positioned on left screen edge
│   │
│   ├── SEO/
│   │   └── Meta.js                              # Meta tags, OpenGraph, Twitter cards, and favicon links
│   │
│   └── util components/
│       ├── background-image.js                  # Desktop wallpaper background renderer
│       ├── clock.js                             # Live digital clock formatted for navbar and lock screen
│       ├── small_arrow.js                       # Reusable SVG arrow indicator for context menus and dropdowns
│       ├── status.js                            # Network, volume, and battery icons rendered in top-right navbar
│       └── status_card.js                       # Pop-out control center: brightness filter, sound, lock & power
│
├── public/
│   ├── robots.txt                               # Search engine crawling rules
│   ├── files/
│   │   └── Manish-Kumar-Resume.pdf              # Static PDF resume document
│   ├── images/
│   │   ├── logos/                               # Favicons, avatars, brand marks, and search icons
│   │   ├── memes/                               # Humorous graphics (used-sudo-command.webp)
│   │   └── wallpapers/                          # 8 Ubuntu wallpapers (wall-1.webp through wall-8.webp)
│   └── themes/
│       ├── filetypes/                           # File type icons for PHP, JS, and ZIP
│       └── Yaru/                                # Ubuntu 20.04 Yaru theme SVGs (apps, window controls, status icons)
│
└── styles/
    └── index.css                                # Ubuntu font config, custom range sliders, animations, resize cursors
```

---

## 3. Architecture & Core Subsystems

```
                     ┌───────────────────────────────────────┐
                     │            pages/index.js             │
                     │  (ReactGA Init Guard, Meta, Ubuntu)   │
                     └──────────────────┬────────────────────┘
                                        │
                                        ▼
                     ┌───────────────────────────────────────┐
                     │         components/ubuntu.js          │
                     │  (Booting, LockScreen, Shutdown State)│
                     └──────┬───────────┬───────────┬────────┘
            ┌───────────────┘           │           └────────────────┐
            ▼                           ▼                            ▼
   ┌─────────────────┐         ┌─────────────────┐          ┌─────────────────┐
   │  BootingScreen  │         │   LockScreen    │          │     Navbar      │
   │ (Startup anim,  │         │ (Clock, date,   │          │ (Clock, Status, │
   │  Power On btn)  │         │  blur backdrop) │          │  Control Center)│
   └─────────────────┘         └─────────────────┘          └────────┬────────┘
                                                                     │
                                        ┌────────────────────────────┘
                                        ▼
                     ┌───────────────────────────────────────┐
                     │     components/screen/desktop.js      │
                     │   (Window Stack, Apps, Context Menus) │
                     └──────┬───────────┬───────────┬────────┘
            ┌───────────────┘           │           └────────────────┐
            ▼                           ▼                            ▼
   ┌─────────────────┐         ┌─────────────────┐          ┌─────────────────┐
   │     SideBar     │         │  Window Base    │          │ AllApplications │
   │ (Dock launcher, │         │ (Draggable,     │          │ (App Drawer &   │
   │  pinned apps)   │         │  Resize, Min)   │          │  Live Search)   │
   └─────────────────┘         └────────┬────────┘          └─────────────────┘
                                        │
                                        ▼
                            ┌──────────────────────────┐
                            │    Mounted Application   │
                            │(Terminal, About Manish,  │
                            │ Chrome, Settings, etc.)  │
                            └──────────────────────────┘
```

### 3.1 State Hierarchy & Boot Sequence
1. **Entry Point (`pages/index.js`)**:
   - Reads `process.env.NEXT_PUBLIC_TRACKING_ID`.
   - Safely executes `ReactGA.initialize()` only if a tracking ID is provided.
   - Injects SEO metadata (`<Meta />`) and mounts `<Ubuntu />`.
2. **Master Controller (`components/ubuntu.js`)**:
   - Manages top-level state: `booting_screen`, `screen_locked`, `shutDownScreen`, and `bg_image_name`.
   - Reads `localStorage` to restore previous sessions (saved wallpaper, prior visits to skip initial boot duration, shutdown states).
   - Coordinates global screen transitions (fade to black on shutdown, lock screen blur overlay).
3. **Desktop & Window Orchestrator (`components/screen/desktop.js`)**:
   - Maintains the active window stack (`app_stack`), closed state (`closed_windows`), focus tracking (`focused_windows`), and minimization maps (`minimized_windows`).
   - Tracks app launch frequencies in `localStorage.frequentApps` to populate the "Frequent" tab in the app drawer.
   - Manages custom desktop folder creation (`localStorage.new_folders`) added through the right-click desktop menu.
   - Detects window positions to automatically hide the left launcher dock (`hideSideBar`) when a window is moved within 50px of the left screen edge.

---

## 4. In-Depth Application Catalog

| Application ID | Title | Component File | Description & Special Features |
| :--- | :--- | :--- | :--- |
| `terminal` | Terminal | `components/apps/terminal.js` | Simulated bash terminal. Supports `cd`, `ls`, `pwd`, `echo`, `mkdir`, `clear`, `exit`, and app shortcuts (`code`, `spotify`, `chrome`, etc.). Includes arrow key command history and a humorous `sudo` easter egg. |
| `about-manish` | About Manish | `components/apps/manish_portfolio.js` | The central resume and portfolio showcase. Features sub-navigation for "About Me", "Education", "Skills" (styled tech boxes & clean fundamentals), "Projects" (with live links, metrics, and image switchers), and an embedded PDF viewer for the resume. |
| `calc` | Calc | `components/apps/calc.js` | Terminal-style calculator running the `expr-eval` expression parsing engine. Supports variables, math functions, arithmetic chains, and history navigation. |
| `gedit` | Contact Me | `components/apps/gedit.js` | Text editor styled like Ubuntu Gedit. Features input validation and is wired to EmailJS (`@emailjs/browser`) with honeypot bot-trapping and error feedback. |
| `settings` | Settings | `components/apps/settings.js` | Wallpaper manager allowing the user to select from 8 bundled Ubuntu wallpapers. Updates active wallpaper dynamically and saves preference in `localStorage`. |
| `chrome` | Google Chrome | `components/apps/chrome.js` | Web browser simulator complete with top address bar, reload button, home button, iframe loader, and native GitHub profile integration. |
| `github` | GitHub | `components/apps/github_profile.js` | Internal launcher that opens Chrome navigated to Manish's authentic Dark Theme GitHub profile with pinned repositories, followers, and 2026 contribution graph. |
| `image-viewer` | Photos | `components/apps/image_viewer.js` | Full-featured Ubuntu image gallery and lightbox inspector with pan, zoom, rotate, and album filters. |
| `vscode` | Visual Studio Code| `components/apps/vscode.js` | Embeds GitHub1s (`github1s.com`) to allow visitors to view and browse the portfolio's actual source code in an authentic VS Code interface. |
| `spotify` | Spotify | `components/apps/spotify.js` | Embeds Spotify's official web player with a curated playlist. |
| `trash` | Trash | `components/apps/trash.js` | Desktop recycle bin populated with humorous developer items. Features selection highlight, non-overlapping responsive layout, and an "Empty Trash" action. |

---

## 5. UI & Design System

- **Ubuntu GNOME 20.04 Replication**:
  - Exact color scheme defined in `tailwind.config.js`:
    - `ub-orange`: `#E95420` (Ubuntu canonical orange)
    - `ub-cool-grey`: `#333333` / `ub-grey`: `#111111`
    - `ub-drk-abrgn`: `#2C001E` (Aubergine terminal background)
    - `ubt-blue`: `#3465A4` / `ubt-green`: `#4E9A06`
- **Typography**:
  - The official Ubuntu font family (`Ubuntu:wght@300;400;500;700`) is preloaded via `<Head>` in `pages/_document.js` with `font-display: swap`.
- **Window Management System (`components/base/window.js`)**:
  - Uses `react-draggable` for smooth, native window dragging with boundary constraints based on current viewport dimensions.
  - Implements maximize/restore toggle, double-click header to maximize, and minimize to dock.
  - Custom window borders configured with directional resize cursors (`n-resize`, `e-resize`, `se-resize`).
- **Interactive Control Center (`components/util components/status_card.js`)**:
  - Functional brightness slider applying a real-time CSS filter `brightness(...)` to `#monitor-screen`.
  - Functional volume slider persisted in storage.
  - Working Lock and Power Off buttons.

---

## 6. Environment Configuration & Integration Points

The application integrates external services through the following optional environment variables:

| Variable Name | Required? | Service | Description |
| :--- | :---: | :--- | :--- |
| `NEXT_PUBLIC_TRACKING_ID` | Optional | Google Analytics 4 | GA4 measurement ID (e.g. `G-XXXXXXXXXX`). If absent, analytics calls gracefully bypass without errors. |
| `NEXT_PUBLIC_USER_ID` | Optional | EmailJS | Public user key from EmailJS account to authenticate contact form. |
| `NEXT_PUBLIC_SERVICE_ID` | Optional | EmailJS | EmailJS service ID connected to Gmail/Outlook. |
| `NEXT_PUBLIC_TEMPLATE_ID` | Optional | EmailJS | EmailJS email template identifier. |

A template file [`.env.example`](file:///d:/Projects/Manish/.env.example) is included in the root directory for quick onboarding.

---

## 7. Development & Deployment Guide

### Prerequisites
- Node.js `>= 16.x`
- NPM or Yarn

### Running in Development
To start the Next.js development server with Fast Refresh:
```powershell
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### Building for Production
To create an optimized production build:
```powershell
npm run build
```

### Running the Production Server
To serve the pre-built application locally:
```powershell
npm start
```

### Static Export & GitHub Pages Deployment
The project is configured with a static export script (`npm run export` / `next export`) and automated GitHub Actions workflow (`.github/workflows/gh-deploy.yml`) that builds and deploys the generated `./out` directory directly to GitHub Pages (`gh-pages` branch).

---

## 8. Summary of Recent Fixes & Stability Improvements

1. **Google Analytics Initialization Guard**:
   - Resolved a startup crash (`Error: Require GA_MEASUREMENT_ID`) in [pages/index.js](file:///d:/Projects/Manish/pages/index.js) by wrapping `ReactGA.initialize(TRACKING_ID)` in a truthiness check, allowing local development without requiring a live GA ID.
2. **Document Head Compliance**:
   - Relocated Google Font `<link>` stylesheet declarations into [pages/_document.js](file:///d:/Projects/Manish/pages/_document.js) to resolve Next.js `<Head>` warning violations.
3. **Environment Template**:
   - Added [`.env.example`](file:///d:/Projects/Manish/.env.example) to standardize developer setup.
4. **Documentation Alignment**:
   - Corrected [README.md](file:///d:/Projects/Manish/README.md) instructions regarding `npm run dev` vs `npm start`.
