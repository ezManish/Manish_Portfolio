import React from 'react';
import dynamic from 'next/dynamic';
import { displayTerminal } from './components/apps/terminal';
import { displaySettings } from './components/apps/settings';
import { displayChrome } from './components/apps/chrome';
import { displayTrash } from './components/apps/trash';
import { displayGedit } from './components/apps/gedit';
import { displayAboutManish } from './components/apps/manish_portfolio';
import { displayTerminalCalc } from './components/apps/calc';
import { displayImageViewer } from './components/apps/image_viewer';

const LoadingApp = () => (
    <div className="w-full h-full flex flex-col items-center justify-center bg-[#242424] text-gray-300">
        <div className="w-7 h-7 border-2 border-ub-orange border-t-transparent rounded-full animate-spin"></div>
        <span className="mt-3 text-xs tracking-wider text-gray-400 font-mono">Loading application...</span>
    </div>
);

// Code-split heavy secondary apps to optimize initial page bundle size
const SpotifyApp = dynamic(() => import('./components/apps/spotify'), { ssr: false, loading: () => <LoadingApp /> });
const VsCodeApp = dynamic(() => import('./components/apps/vscode'), { ssr: false, loading: () => <LoadingApp /> });
const MinesweeperApp = dynamic(() => import('./components/apps/minesweeper'), { ssr: false, loading: () => <LoadingApp /> });
const Game2048App = dynamic(() => import('./components/apps/game2048'), { ssr: false, loading: () => <LoadingApp /> });
const ResumeApp = dynamic(() => import('./components/apps/resume'), { ssr: false, loading: () => <LoadingApp /> });

const displaySpotify = () => <SpotifyApp />;
const displayVsCode = () => <VsCodeApp />;
const displayMinesweeper = () => <MinesweeperApp />;
const display2048 = () => <Game2048App />;
const displayResume = () => <ResumeApp />;

const apps = [
    {
        id: "chrome",
        title: "Google Chrome",
        icon: './themes/Yaru/apps/chrome.png',
        disabled: false,
        favourite: true,
        desktop_shortcut: true,
        screen: displayChrome,
    },
    {
        id: "calc",
        title: "Calc",
        icon: './themes/Yaru/apps/calc.png',
        disabled: false,
        favourite: true,
        desktop_shortcut: false,
        screen: displayTerminalCalc,
    },
    {
        id: "about-manish",
        title: "About Manish",
        icon: './themes/Yaru/system/user-home.png',
        disabled: false,
        favourite: true,
        desktop_shortcut: true,
        screen: displayAboutManish,
    },
    {
        id: "resume",
        title: "Resume.pdf",
        icon: './themes/Yaru/apps/evince.svg',
        disabled: false,
        favourite: true,
        desktop_shortcut: true,
        screen: displayResume,
    },
    {
        id: "minesweeper",
        title: "Minesweeper",
        icon: './themes/Yaru/apps/minesweeper.png',
        disabled: false,
        favourite: true,
        desktop_shortcut: true,
        screen: displayMinesweeper,
    },
    {
        id: "game-2048",
        title: "2048",
        icon: './themes/Yaru/apps/2048.svg',
        disabled: false,
        favourite: true,
        desktop_shortcut: true,
        screen: display2048,
    },
    {
        id: "vscode",
        title: "Visual Studio Code",
        icon: './themes/Yaru/apps/vscode.png',
        disabled: false,
        favourite: true,
        desktop_shortcut: false,
        screen: displayVsCode,
    },
    {
        id: "terminal",
        title: "Terminal",
        icon: './themes/Yaru/apps/bash.png',
        disabled: false,
        favourite: true,
        desktop_shortcut: false,
        screen: displayTerminal,
    },
    {
        id: "spotify",
        title: "Spotify",
        icon: './themes/Yaru/apps/spotify.png',
        disabled: false,
        favourite: true,
        desktop_shortcut: false,
        screen: displaySpotify,
    },
    {
        id: "settings",
        title: "Settings",
        icon: './themes/Yaru/apps/gnome-control-center.png',
        disabled: false,
        favourite: true,
        desktop_shortcut: false,
        screen: displaySettings,
    },
    {
        id: "trash",
        title: "Trash",
        icon: './themes/Yaru/system/user-trash-full.png',
        disabled: false,
        favourite: false,
        desktop_shortcut: true,
        screen: displayTrash,
    },
    {
        id: "gedit",
        title: "Contact Me",
        icon: './themes/Yaru/apps/gedit.png',
        disabled: false,
        favourite: false,
        desktop_shortcut: true,
        screen: displayGedit,
    },
    {
        id: "github",
        title: "GitHub",
        icon: './themes/Yaru/apps/github.png',
        disabled: false,
        favourite: false,
        desktop_shortcut: true,
        screen: displayChrome,
    },
    {
        id: "image-viewer",
        title: "Photos",
        icon: './themes/Yaru/system/user-desktop.png',
        disabled: false,
        favourite: false,
        desktop_shortcut: false,
        screen: displayImageViewer,
    },
];

export default apps;