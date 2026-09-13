# Manish Kumar — Ubuntu OS Web Desktop Portfolio

An interactive, web-based simulation of the Ubuntu 20.04 LTS desktop environment built with Next.js and Tailwind CSS to showcase Manish Kumar's projects, technical skills, and experience.

Live Deployment: https://ezmanish.vercel.app/

---

## Overview

This project recreates the authentic GNOME desktop experience (Yaru theme) inside the browser. It features window management (dragging, resizing, maximizing, minimizing), a simulated Linux bash terminal with real filesystem navigation and command execution, an application launcher dock, system tray controls, and a suite of interactive desktop applications.

The entire interface is responsive, supporting desktop mouse interactions, keyboard navigation, and mobile touch gestures with adaptive layout scaling.

---

## Architecture & System Features

### Desktop Environment
- **Top Panel / Navigation Bar**: Displays system activities button, live clock and date picker, and a unified status dropdown tray controlling volume, display brightness overlay, lock screen, and shutdown simulation.
- **Ubuntu Dock (Sidebar)**: Left-side application launcher dock. Automatically collapses (`-translate-x-full`) on mobile viewports (< 768px) when an application window is open to maximize screen space, and reappears when viewing the desktop background.
- **Window Management System**:
  - Drag and move windows via titlebars with boundary collision detection.
  - Multi-directional window resizing from edges and corners.
  - Minimize to dock, maximize to full viewport, and restore window states.
  - Active window z-index layering and focus management.
  - Context-menu suppression: Global desktop right-click menu is strictly isolated from application windows, preventing accidental context dropdowns during app usage.

### Built-in Applications

| Application | Identifier | Description |
| :--- | :--- | :--- |
| **About Manish** | `about-manish` | Tabbed portfolio interface covering biography, education, technical skills, detailed project showcases with interactive image switchers, and integrated resume viewer. |
| **Terminal** | `terminal` | Simulated Linux bash shell supporting directory navigation (`cd`, `ls`, `pwd`), file inspection (`cat`), folder creation (`mkdir`), command history, autocompletion, and application launching commands. |
| **Minesweeper** | `minesweeper` | Tactical GNOME Minesweeper with Beginner (9x9), Intermediate (16x16), and Expert (30x16) modes. Features double-click / double-tap flag toggling, press-and-hold touch flagging, adaptive zero-scroll viewport scaling, timer, and mine counters. |
| **2048** | `game-2048` | Sliding tile puzzle game. Supports keyboard arrow keys and touch swipe gestures, with local storage high score tracking and clean responsive tile scaling. |
| **Google Chrome** | `chrome` | Browser simulator featuring a working navigation address bar, bookmark bar, and Manish's GitHub profile interface. |
| **Visual Studio Code** | `vscode` | Source code viewer powered by an embedded GitHub1s environment. |
| **Contact Me (Gedit)** | `gedit` | Ubuntu text editor interface wired to EmailJS for sending direct messages and inquiries. |
| **Calculator** | `calc` | Desktop calculator with mathematical expression evaluation and variable storage. |
| **Settings** | `settings` | System preferences application supporting custom wallpaper selection with persistent storage. |
| **Spotify** | `spotify` | Music player interface embedding Spotify web playback. |
| **Trash** | `trash` | Desktop recycle bin utility. |

---

## Project Structure

```
Manish/
├── apps.config.js              # Application registry and dock launcher configuration
├── package.json                # Project dependencies, scripts, and package metadata
├── postcss.config.js           # PostCSS and Tailwind processing configuration
├── tailwind.config.js          # Tailwind CSS theme tokens and color definitions
├── components/
│   ├── ubuntu.js               # Top-level desktop orchestrator and boot lifecycle manager
│   ├── SEO/
│   │   └── Meta.js             # HTML head metadata, OpenGraph tags, and canonical links
│   ├── apps/
│   │   ├── calc.js             # Calculator application logic
│   │   ├── chrome.js           # Chrome browser simulator
│   │   ├── game2048.js         # 2048 sliding tile puzzle game
│   │   ├── gedit.js            # Gedit contact form (EmailJS integration)
│   │   ├── github_profile.js   # GitHub profile and repository display
│   │   ├── image_viewer.js     # Image preview utility
│   │   ├── manish_portfolio.js # Resume and portfolio presentation app
│   │   ├── minesweeper.js      # Minesweeper tactical game
│   │   ├── settings.js         # Wallpaper and system settings
│   │   ├── spotify.js          # Spotify web player embed
│   │   ├── terminal.js         # Linux terminal emulator and command interpreter
│   │   ├── trash.js            # Trash bin application
│   │   └── vscode.js           # VS Code editor embed
│   ├── base/
│   │   ├── side_bar_app.js     # Dock launcher icon component
│   │   ├── ubuntu_app.js       # Desktop icon component
│   │   └── window.js           # Core draggable and resizable window framework
│   ├── context menus/
│   │   ├── default.js          # Default fallback context handler
│   │   └── desktop-menu.js     # Desktop wallpaper right-click menu
│   ├── screen/
│   │   ├── all-applications.js # Application grid launcher view
│   │   ├── booting_screen.js   # System boot loader animation
│   │   ├── desktop.js          # Desktop workspace, window container, and layout manager
│   │   ├── lock_screen.js      # Ubuntu lock screen with unlock clock
│   │   ├── navbar.js           # Top panel status bar
│   │   └── side_bar.js         # Left launcher dock container
│   └── util components/
│       ├── background-image.js # Dynamic wallpaper renderer
│       ├── clock.js            # Real-time clock and calendar display
│       ├── small_arrow.js      # Directional indicator utility
│       ├── status.js           # Status bar system icons
│       └── status_card.js      # System control tray dropdown card
├── pages/
│   ├── _app.js                 # Next.js custom application wrapper
│   ├── _document.js            # Custom HTML document definition
│   └── index.js                # Root page mounting the desktop environment
├── public/
│   ├── files/                  # Downloadable assets (Resume PDF)
│   ├── images/
│   │   ├── logos/              # Technology logos and skill badges
│   │   ├── projects/           # Screenshots for featured portfolio projects
│   │   └── wallpapers/         # Default Ubuntu desktop wallpapers
│   └── themes/Yaru/            # Canonical Yaru SVG icons and UI assets
└── styles/
    └── index.css               # Global CSS rules, fonts, and Tailwind directives
```

---

## Technology Stack

- **Core Framework**: Next.js 12 (React 18)
- **Styling**: Tailwind CSS, Vanilla CSS
- **Window Dragging & Boundaries**: `react-draggable`
- **Math Expression Engine**: `expr-eval`
- **Contact Service**: `@emailjs/browser`
- **Icons & Theme**: Canonical Yaru Icon Set (SVG)

---

## Getting Started

### Prerequisites
- Node.js (v16.x or later)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/ezManish/Manish_Portfolio.git
   cd Manish_Portfolio
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. (Optional) Configure EmailJS for the Contact Form:
   Create a `.env.local` file in the root directory:
   ```env
   NEXT_PUBLIC_USER_ID=your_emailjs_public_key
   NEXT_PUBLIC_SERVICE_ID=your_emailjs_service_id
   NEXT_PUBLIC_TEMPLATE_ID=your_emailjs_template_id
   ```

4. Start the local development server:
   ```bash
   npm run dev
   ```

5. Open http://localhost:3000 in your browser.

---

## Available Commands

| Command | Description |
| :--- | :--- |
| `npm run dev` | Starts the Next.js development server on port 3000 with hot reloading. |
| `npm run build` | Compiles the production application bundle. |
| `npm start` | Serves the production build locally. |
| `npm run export` | Generates a static HTML export in the `out/` directory. |

---

## Terminal Commands Reference

The built-in terminal emulator supports standard shell navigation and app shortcuts:

- `ls` / `dir`: List files and folders in current directory.
- `cd <dir>`: Change current working directory (`cd ..` to go back).
- `pwd`: Print current working directory path.
- `cat <filename>`: View file contents.
- `echo <text>`: Output text to terminal.
- `mkdir <name>`: Create a new directory in local storage.
- `clear`: Clear terminal history.
- `help`: Display available terminal commands.
- `about-manish`: Launch the About Manish application.
- `minesweeper`: Launch the Minesweeper game.
- `2048`: Launch the 2048 puzzle game.
- `chrome`: Launch the Google Chrome simulator.
- `code`: Launch the Visual Studio Code editor.
- `spotify`: Launch Spotify.
- `settings`: Launch system settings.
- `sendmsg`: Launch the contact editor.

---

## Author

**Manish Kumar**
- Portfolio: https://ezmanish.vercel.app/
- GitHub: https://github.com/ezManish
- LinkedIn: https://www.linkedin.com/in/manish-kumar-16a2b932a/

---

## License

This project is open source and available under the [MIT License](LICENSE).
