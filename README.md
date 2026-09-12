# Manish Kumar — Ubuntu OS Portfolio

An interactive, web-based simulation of the **Ubuntu 20.04 LTS Desktop (Linux)** built as a personal portfolio using **Next.js** and **Tailwind CSS**.

Experience an authentic GNOME desktop in the browser with resizable and draggable windows, a simulated bash terminal, application launcher dock, customizable wallpapers, control center, and full system interactions.

---

## 💻 Features

- **Ubuntu 20.04 Yaru UI**: Authentic GNOME desktop environment with canonical Ubuntu color palette and typography.
- **Window Management**: Draggable, resizable, minimizable, and maximizable windows with responsive viewport boundary collision handling.
- **Simulated Linux Terminal**: Real command execution (`cd`, `ls`, `pwd`, `echo`, `mkdir`, `clear`), directory navigation, command history, and application shortcuts (`code`, `chrome`, `spotify`, `about-manish`, `sendmsg`).
- **Interactive Apps**:
  - **About Manish**: Tabbed resume portfolio covering About Me, Education, Technical Skills, Projects, and Resume viewer.
  - **Terminal Calculator**: Mathematical expression parser and variable evaluator.
  - **Contact Me (Gedit)**: Text editor UI integrated with EmailJS for real email delivery.
  - **Settings**: Wallpaper switcher with 8 bundled Ubuntu wallpapers and persistent storage.
  - **Google Chrome**: Web browser simulator with interactive URL bar.
  - **Visual Studio Code**: Integrated GitHub1s source code explorer.
  - **Spotify Web Player**: Embedded music player.
  - **Trash**: Interactive desktop recycle bin with file management actions.
- **System Tray & Control Center**: Top bar status tray with real-time screen brightness filter, volume slider, lock screen, and shutdown simulation.

---

## 🛠️ Built With

- **Framework**: [Next.js](https://nextjs.org/) (React 18)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Window Dragging**: `react-draggable`
- **Math Parser**: `expr-eval`
- **Contact Service**: `@emailjs/browser`
- **DOM & Utilities**: `jQuery`, `react-onclickoutside`

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (version 16.x or later)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/ezManish/Manish_Portfolio.git
   cd Manish_Portfolio
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. (Optional) Configure environment variables for the Contact Me form:
   Create a `.env.local` file in the root folder:
   ```bash
   NEXT_PUBLIC_USER_ID=your_emailjs_public_key
   NEXT_PUBLIC_SERVICE_ID=your_emailjs_service_id
   NEXT_PUBLIC_TEMPLATE_ID=your_emailjs_template_id
   ```

4. Run the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📦 Available Scripts

- **`npm run dev`**: Starts the development server with hot module reloading.
- **`npm run build`**: Compiles and creates an optimized production bundle.
- **`npm start`**: Serves the pre-built production application locally.
- **`npm run export`**: Generates a static HTML export in the `out/` folder for GitHub Pages.

---

## 👤 Author

**Manish Kumar**
- **GitHub**: [@ezManish](https://github.com/ezManish)
- **LinkedIn**: [Manish Kumar](https://www.linkedin.com/in/manish-kumar-16a2b932a/)

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
