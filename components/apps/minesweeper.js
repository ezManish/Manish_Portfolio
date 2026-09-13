import React, { Component, createRef } from 'react';

// ─── GNOME Mines (Ubuntu Desktop & Mobile Responsive Edition) ─────────────────

const LEVELS = {
    beginner: {
        rows: 9, cols: 9, mines: 10,
        label: '9×9', fullLabel: 'Small (9×9)'
    },
    intermediate: {
        rows: 16, cols: 16, mines: 40,
        label: '16×16', fullLabel: 'Medium (16×16)'
    },
    expert: {
        rows: 16, cols: 30, mines: 99,
        label: '30×16', fullLabel: 'Large (30×16)'
    },
};

function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
}

function buildBoard(rows, cols, mines, firstR, firstC) {
    const safe = new Set();
    for (let dr = -1; dr <= 1; dr++) {
        for (let dc = -1; dc <= 1; dc++) {
            const r = firstR + dr, c = firstC + dc;
            if (r >= 0 && r < rows && c >= 0 && c < cols) safe.add(r * cols + c);
        }
    }

    const positions = [];
    for (let i = 0; i < rows * cols; i++) {
        if (!safe.has(i)) positions.push(i);
    }

    for (let i = positions.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [positions[i], positions[j]] = [positions[j], positions[i]];
    }
    const mineSet = new Set(positions.slice(0, mines));

    const cells = Array.from({ length: rows * cols }, (_, i) => ({
        mine: mineSet.has(i),
        revealed: false,
        flagged: false,
        adj: 0,
    }));

    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            if (cells[r * cols + c].mine) continue;
            let count = 0;
            for (let dr = -1; dr <= 1; dr++) {
                for (let dc = -1; dc <= 1; dc++) {
                    const nr = r + dr, nc = c + dc;
                    if (nr >= 0 && nr < rows && nc >= 0 && nc < cols && cells[nr * cols + nc].mine) {
                        count++;
                    }
                }
            }
            cells[r * cols + c].adj = count;
        }
    }
    return cells;
}

function floodReveal(cells, rows, cols, startR, startC) {
    const queue = [[startR, startC]];
    const visited = new Set();
    while (queue.length) {
        const [r, c] = queue.pop();
        const idx = r * cols + c;
        if (visited.has(idx)) continue;
        visited.add(idx);
        if (cells[idx].flagged || cells[idx].revealed || cells[idx].mine) continue;
        cells[idx].revealed = true;
        if (cells[idx].adj === 0) {
            for (let dr = -1; dr <= 1; dr++) {
                for (let dc = -1; dc <= 1; dc++) {
                    const nr = r + dr, nc = c + dc;
                    if (nr >= 0 && nr < rows && nc >= 0 && nc < cols) {
                        queue.push([nr, nc]);
                    }
                }
            }
        }
    }
}

const ADJ_COLORS = [
    '',
    '#4A90E2', // 1: Blue
    '#388E3C', // 2: Green
    '#D32F2F', // 3: Red
    '#7B1FA2', // 4: Purple
    '#E65100', // 5: Deep Orange
    '#0097A7', // 6: Teal
    '#EEEEEE', // 7: Light Silver
    '#9E9E9E', // 8: Grey
];

// Straight geometric marker pin
const CellMarker = ({ size = 13 }) => (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none">
        <line x1="6" y1="2" x2="6" y2="18" stroke="#E5E7EB" strokeWidth="2" strokeLinecap="round" />
        <polygon points="7,3 17,7.5 7,12" fill="#E95420" stroke="#C13808" strokeWidth="0.8" />
        <rect x="3" y="16.5" width="6" height="2" rx="1" fill="#9CA3AF" />
    </svg>
);

const MineGraphic = ({ size = 14, isDetonated = false }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="6.5" fill={isDetonated ? '#FFFFFF' : '#171717'} stroke={isDetonated ? '#FFFFFF' : '#333333'} strokeWidth="1" />
        <line x1="12" y1="2" x2="12" y2="22" stroke={isDetonated ? '#FFFFFF' : '#262626'} strokeWidth="2" strokeLinecap="round" />
        <line x1="2" y1="12" x2="22" y2="12" stroke={isDetonated ? '#FFFFFF' : '#262626'} strokeWidth="2" strokeLinecap="round" />
        <line x1="4.9" y1="4.9" x2="19.1" y2="19.1" stroke={isDetonated ? '#FFFFFF' : '#262626'} strokeWidth="2" strokeLinecap="round" />
        <line x1="4.9" y1="19.1" x2="19.1" y2="4.9" stroke={isDetonated ? '#FFFFFF' : '#262626'} strokeWidth="2" strokeLinecap="round" />
        <circle cx="12" cy="12" r="2.5" fill={isDetonated ? '#DC2626' : '#E95420'} />
    </svg>
);

export class MinesweeperApp extends Component {
    constructor(props) {
        super(props);
        const { rows, cols } = LEVELS.beginner;
        this.appRootRef = createRef();
        this.stageRef = createRef();
        this.state = {
            level: 'beginner',
            rows, cols,
            mines: LEVELS.beginner.mines,
            cells: Array.from({ length: rows * cols }, () => ({ mine: false, revealed: false, flagged: false, adj: 0 })),
            phase: 'idle',   // 'idle' | 'playing' | 'won' | 'dead'
            flagCount: 0,
            timeElapsed: 0,
            detonated: -1,
            isMobile: false,
            stageWidth: 0,
            stageHeight: 0,
        };
        this.timerRef = null;
        this.longPressTimer = null;
        this.longPressTriggered = false;
        this.lastFlagTime = 0;
        this.touchStartX = 0;
        this.touchStartY = 0;
        this.clickTimer = null;
        this.pendingCell = null;
    }

    componentDidMount() {
        window.addEventListener('keydown', this.handleKeyDown);
        window.addEventListener('resize', this.handleWindowResize);
        if (this.appRootRef.current) {
            this.appRootRef.current.addEventListener('contextmenu', this.preventNativeContextMenu, true);
        }
        this.handleWindowResize();
        this.updateStageDimensions();
        // Measure stage again after initial layout render
        setTimeout(this.updateStageDimensions, 100);
        setTimeout(this.updateStageDimensions, 350);
    }

    componentWillUnmount() {
        clearInterval(this.timerRef);
        clearTimeout(this.longPressTimer);
        clearTimeout(this.clickTimer);
        window.removeEventListener('keydown', this.handleKeyDown);
        window.removeEventListener('resize', this.handleWindowResize);
        if (this.appRootRef.current) {
            this.appRootRef.current.removeEventListener('contextmenu', this.preventNativeContextMenu, true);
        }
    }

    preventNativeContextMenu = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.stopImmediatePropagation) {
            e.stopImmediatePropagation();
        }
        return false;
    };

    handleWindowResize = () => {
        const isMobile = window.innerWidth < 640;
        if (isMobile !== this.state.isMobile) {
            this.setState({ isMobile });
        }
        this.updateStageDimensions();
    };

    updateStageDimensions = () => {
        if (this.stageRef.current) {
            const rect = this.stageRef.current.getBoundingClientRect();
            if (rect.width > 0 && rect.height > 0) {
                if (Math.abs(rect.width - this.state.stageWidth) > 3 || Math.abs(rect.height - this.state.stageHeight) > 3) {
                    this.setState({ stageWidth: rect.width, stageHeight: rect.height });
                }
            }
        }
    };

    handleKeyDown = (e) => {
        if (e.key === 'r' || e.key === 'R') {
            this.resetGame();
        }
    };

    _startTimer() {
        clearInterval(this.timerRef);
        this.timerRef = setInterval(() => {
            this.setState(s => ({ timeElapsed: Math.min(s.timeElapsed + 1, 9999) }));
        }, 1000);
    }

    resetGame = (level = this.state.level) => {
        clearInterval(this.timerRef);
        const { rows, cols, mines } = LEVELS[level];
        this.setState({
            level, rows, cols, mines,
            cells: Array.from({ length: rows * cols }, () => ({ mine: false, revealed: false, flagged: false, adj: 0 })),
            phase: 'idle',
            flagCount: 0,
            timeElapsed: 0,
            detonated: -1,
        }, () => {
            setTimeout(this.updateStageDimensions, 50);
        });
    };

    toggleFlag = (r, c) => {
        const { cells, phase, cols } = this.state;
        if (phase === 'won' || phase === 'dead') return;

        const idx = r * cols + c;
        if (cells[idx].revealed) return;

        const newCells = cells.map(x => ({ ...x }));
        newCells[idx].flagged = !newCells[idx].flagged;
        const flagCount = newCells.filter(x => x.flagged).length;
        this.setState({ cells: newCells, flagCount });
    };

    handleContextMenu = (e, r, c) => {
        if (e) {
            e.preventDefault();
            e.stopPropagation();
            if (e.nativeEvent) e.nativeEvent.stopImmediatePropagation();
        }
        // If press-and-hold just flagged this tile, don't unflag immediately
        if (Date.now() - this.lastFlagTime < 450) {
            return;
        }
        this.lastFlagTime = Date.now();
        this.toggleFlag(r, c);
    };

    handleTouchStart = (e, r, c) => {
        this.longPressTriggered = false;
        clearTimeout(this.longPressTimer);
        const touch = e.touches && e.touches[0];
        if (touch) {
            this.touchStartX = touch.clientX;
            this.touchStartY = touch.clientY;
        }
        this.longPressTimer = setTimeout(() => {
            this.longPressTriggered = true;
            this.lastFlagTime = Date.now();
            this.toggleFlag(r, c);
            if (typeof navigator !== 'undefined' && navigator.vibrate) {
                try { navigator.vibrate(40); } catch (err) {}
            }
        }, 280);
    };

    handleTouchMove = (e) => {
        const touch = e.touches && e.touches[0];
        if (touch && this.touchStartX !== undefined) {
            const dx = Math.abs(touch.clientX - this.touchStartX);
            const dy = Math.abs(touch.clientY - this.touchStartY);
            if (dx > 10 || dy > 10) {
                clearTimeout(this.longPressTimer);
            }
        }
    };

    handleTouchEnd = () => {
        clearTimeout(this.longPressTimer);
    };

    handleMouseDown = (e, r, c) => {
        if (e.button === 2) return; // Handled by handleContextMenu
        this.longPressTriggered = false;
        clearTimeout(this.longPressTimer);
        this.longPressTimer = setTimeout(() => {
            this.longPressTriggered = true;
            this.lastFlagTime = Date.now();
            this.toggleFlag(r, c);
        }, 280);
    };

    handleMouseUp = () => {
        clearTimeout(this.longPressTimer);
    };

    handleCellDoubleClick = (e, r, c) => {
        if (e && e.preventDefault) e.preventDefault();
        clearTimeout(this.clickTimer);
        this.clickTimer = null;
        this.pendingCell = null;
        if (Date.now() - this.lastFlagTime < 350) {
            return;
        }
        this.lastFlagTime = Date.now();
        this.toggleFlag(r, c);
    };

    handleCellClick = (e, r, c) => {
        if (this.longPressTriggered) {
            this.longPressTriggered = false;
            return;
        }
        if (Date.now() - this.lastFlagTime < 350) {
            return;
        }
        if (e && (e.shiftKey || e.altKey || e.ctrlKey || e.metaKey)) {
            if (e.preventDefault) e.preventDefault();
            this.lastFlagTime = Date.now();
            this.toggleFlag(r, c);
            return;
        }

        const { phase, cols, cells } = this.state;
        if (phase === 'won' || phase === 'dead') return;

        const idx = r * cols + c;
        if (cells[idx].revealed) return;

        // DOUBLE-CLICK / DOUBLE-TAP: If same cell clicked within 260ms, toggle flag!
        if (this.pendingCell === idx && this.clickTimer) {
            clearTimeout(this.clickTimer);
            this.clickTimer = null;
            this.pendingCell = null;
            this.lastFlagTime = Date.now();
            this.toggleFlag(r, c);
            if (typeof navigator !== 'undefined' && navigator.vibrate) {
                try { navigator.vibrate(35); } catch (err) {}
            }
            return;
        }

        // If a different cell was awaiting single-click reveal, reveal it immediately
        if (this.clickTimer && this.pendingCell !== null && this.pendingCell !== idx) {
            clearTimeout(this.clickTimer);
            const prevR = Math.floor(this.pendingCell / cols);
            const prevC = this.pendingCell % cols;
            this.handleLeft(prevR, prevC);
            this.clickTimer = null;
            this.pendingCell = null;
        }

        // If cell is flagged, wait for possible second click to unflag without revealing
        if (cells[idx].flagged) {
            this.pendingCell = idx;
            this.clickTimer = setTimeout(() => {
                this.clickTimer = null;
                this.pendingCell = null;
            }, 260);
            return;
        }

        // Schedule single-click reveal after 260ms delay (cancelled if double-clicked)
        this.pendingCell = idx;
        this.clickTimer = setTimeout(() => {
            this.clickTimer = null;
            this.pendingCell = null;
            this.handleLeft(r, c);
        }, 260);
    };

    handleLeft = (r, c) => {
        const { cells, phase, rows, cols, mines } = this.state;
        if (phase === 'won' || phase === 'dead') return;

        const idx = r * cols + c;
        if (cells[idx].revealed || cells[idx].flagged) return;

        let newCells = cells.map(x => ({ ...x }));
        let newPhase = phase;
        let detonated = -1;

        if (phase === 'idle') {
            newCells = buildBoard(rows, cols, mines, r, c);
            newPhase = 'playing';
            this._startTimer();
        }

        if (newCells[idx].mine) {
            newCells.forEach((cell, i) => { if (cell.mine) cell.revealed = true; });
            newPhase = 'dead';
            detonated = idx;
            clearInterval(this.timerRef);
        } else {
            floodReveal(newCells, rows, cols, r, c);
            const unrevealed = newCells.filter(x => !x.revealed && !x.mine).length;
            if (unrevealed === 0) {
                newPhase = 'won';
                clearInterval(this.timerRef);
                newCells.forEach(x => { if (x.mine) x.flagged = true; });
            }
        }

        this.setState({ cells: newCells, phase: newPhase, detonated });
    };

    handleRight = (e, r, c) => {
        if (e) {
            e.preventDefault();
            e.stopPropagation();
            if (e.nativeEvent) {
                e.nativeEvent.stopImmediatePropagation();
            }
        }
        const { cells, phase, cols } = this.state;
        if (phase === 'won' || phase === 'dead') return;

        const idx = r * cols + c;
        if (cells[idx].revealed) return;

        const newCells = cells.map(x => ({ ...x }));
        newCells[idx].flagged = !newCells[idx].flagged;
        const flagCount = newCells.filter(x => x.flagged).length;
        this.setState({ cells: newCells, flagCount });
    };

    // Calculate optimal responsive tile dimensions based on container width/height
    getDynamicSizes() {
        const { level, cols, rows, stageWidth, stageHeight, isMobile } = this.state;
        
        // Estimate fallback available dimensions if container not yet mounted
        const fallbackW = typeof window !== 'undefined' ? (isMobile ? window.innerWidth - 20 : 440) : 380;
        const fallbackH = typeof window !== 'undefined' ? (isMobile ? window.innerHeight - 200 : 440) : 380;
        
        const padX = isMobile ? 12 : 24;
        const padY = isMobile ? 12 : 24;
        const availW = Math.max((stageWidth || fallbackW) - padX, 60);
        const availH = Math.max((stageHeight || fallbackH) - padY, 60);
        
        const gap = cols > 16 ? 1 : 1.5;
        // Maximum tile size that fits entirely horizontally
        const fitTileW = Math.floor((availW - (cols * gap)) / cols);
        // Maximum tile size that fits entirely vertically
        const fitTileH = Math.floor((availH - (rows * gap)) / rows);

        let tileSize;
        if (level === 'beginner') {
            // 9x9: Always comfortably sized and fits completely without scrolling
            tileSize = Math.min(38, Math.max(26, Math.min(fitTileW, fitTileH)));
        } else if (level === 'intermediate') {
            // 16x16: MUST fit on mobile screens without scrolling!
            tileSize = Math.min(24, Math.max(16, Math.min(fitTileW, fitTileH)));
        } else {
            // 30x16: Fits vertically, pans smoothly horizontally on small portrait screens; fits both in landscape
            if (isMobile && fitTileW < 16) {
                tileSize = Math.min(22, Math.max(17, fitTileH));
            } else {
                tileSize = Math.min(22, Math.max(16, Math.min(fitTileW, fitTileH)));
            }
        }

        const fontSize = Math.max(10, Math.floor(tileSize * 0.58));
        const markerSize = Math.max(8, tileSize - 7);
        return { tileSize, fontSize, markerSize, gap };
    }

    render() {
        const { level, rows, cols, mines, cells, phase, flagCount, timeElapsed, detonated, isMobile } = this.state;
        const remaining = Math.max(mines - flagCount, -99);
        const currentConfig = LEVELS[level];
        const { tileSize, fontSize, markerSize, gap } = this.getDynamicSizes();

        return (
            <div
                ref={this.appRootRef}
                data-app="minesweeper"
                className="minesweeper-app w-full h-full flex flex-col bg-[#242424] text-gray-100 select-none overflow-hidden"
                style={{
                    fontFamily: "'Ubuntu', -apple-system, sans-serif",
                    WebkitTouchCallout: 'none',
                    WebkitUserSelect: 'none',
                    userSelect: 'none',
                }}
                onContextMenu={e => {
                    e.preventDefault();
                    e.stopPropagation();
                    if (e.nativeEvent) e.nativeEvent.stopImmediatePropagation();
                }}
            >
                {/* ── Native GNOME HeaderBar (Streamlined & Fully Responsive) ────── */}
                <div className="flex items-center justify-between px-2.5 sm:px-4 py-1.5 sm:py-2 bg-[#1c1c1c] border-b border-black border-opacity-60 flex-shrink-0 z-10 gap-1.5 sm:gap-2">
                    
                    {/* Left: App Identity & Level Selector */}
                    <div className="flex items-center gap-1.5 sm:gap-3 flex-shrink-0">
                        <div className="flex items-center gap-1.5 pr-1.5 sm:pr-2 border-r border-white border-opacity-10">
                            <img src="./themes/Yaru/apps/minesweeper.png" alt="Mines" className="w-5 h-5 rounded-sm flex-shrink-0" />
                            <span className="font-semibold text-xs text-gray-200 tracking-wide hidden xs:inline">Mines</span>
                        </div>

                        {/* Segmented Level Selector */}
                        <div className="flex bg-[#111111] p-0.5 rounded-lg border border-white border-opacity-10 gap-0.5">
                            {Object.entries(LEVELS).map(([lv, cfg]) => (
                                <button
                                    key={lv}
                                    onClick={() => this.resetGame(lv)}
                                    className={`px-1.5 sm:px-2.5 py-0.5 sm:py-1 rounded-md text-[10px] sm:text-xs font-medium transition-all cursor-pointer ${
                                        level === lv
                                            ? 'bg-ub-orange text-white shadow-sm font-semibold'
                                            : 'text-gray-400 hover:text-gray-200 hover:bg-white hover:bg-opacity-5'
                                    }`}
                                >
                                    {isMobile ? cfg.label : cfg.fullLabel}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Right: Badges & Controls */}
                    <div className="flex items-center gap-1.5 sm:gap-2 ml-auto flex-shrink-0">
                        {/* Mines Remaining Badge */}
                        <div className="flex items-center gap-1 bg-[#111111] px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-md border border-white border-opacity-10 text-xs shadow-inner">
                            <MineGraphic size={11} isDetonated={false} />
                            <span className="font-mono font-bold text-gray-100 text-[10px] sm:text-[11px] min-w-[14px] text-right">
                                {remaining}
                            </span>
                        </div>

                        {/* Stopwatch Timer */}
                        <div className="flex items-center gap-1 bg-[#111111] px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-md border border-white border-opacity-10 text-xs shadow-inner">
                            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400">
                                <circle cx="12" cy="12" r="10" />
                                <polyline points="12 6 12 12 16 14" />
                            </svg>
                            <span className="font-mono font-bold text-gray-100 text-[10px] sm:text-[11px] min-w-[30px] sm:min-w-[34px] text-right">
                                {formatTime(timeElapsed)}
                            </span>
                        </div>

                        {/* New Game / Restart Button */}
                        <button
                            onClick={() => this.resetGame()}
                            className="flex items-center justify-center p-1 sm:px-2.5 sm:py-1 rounded-md text-xs font-medium text-white bg-ub-orange hover:brightness-110 active:scale-95 transition-all shadow-sm cursor-pointer"
                            title="Restart game (Press R)"
                        >
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
                                <path d="M3 3v5h5" />
                            </svg>
                            <span className="hidden sm:inline ml-1 text-xs">New</span>
                        </button>
                    </div>
                </div>

                {/* ── GTK Infobar Notification (Slides down on Game Over / Victory) ── */}
                {phase === 'won' && (
                    <div className="bg-emerald-950 bg-opacity-95 border-b border-emerald-600 border-opacity-40 px-3 sm:px-6 py-1.5 sm:py-2 flex items-center justify-between text-xs text-emerald-100 flex-shrink-0 animate-fadeIn">
                        <div className="flex items-center gap-1.5 sm:gap-2">
                            <div className="w-5 h-5 rounded-full bg-emerald-500 bg-opacity-20 border border-emerald-400 flex items-center justify-center">
                                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#34D399" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                                    <polyline points="20 6 9 17 4 12" />
                                </svg>
                            </div>
                            <span className="font-semibold text-emerald-200">Victory!</span>
                            <span className="text-emerald-300 text-[11px] hidden xs:inline">Cleared in {formatTime(timeElapsed)}.</span>
                        </div>
                        <button
                            onClick={() => this.resetGame()}
                            className="px-2.5 py-0.5 sm:py-1 rounded bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-[11px] sm:text-xs transition-colors shadow cursor-pointer"
                        >
                            Play Again
                        </button>
                    </div>
                )}

                {phase === 'dead' && (
                    <div className="bg-rose-950 bg-opacity-95 border-b border-rose-600 border-opacity-40 px-3 sm:px-6 py-1.5 sm:py-2 flex items-center justify-between text-xs text-rose-100 flex-shrink-0 animate-fadeIn">
                        <div className="flex items-center gap-1.5 sm:gap-2">
                            <div className="w-5 h-5 rounded-full bg-rose-500 bg-opacity-20 border border-rose-400 flex items-center justify-center">
                                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#F87171" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                    <line x1="18" y1="6" x2="6" y2="18" />
                                    <line x1="6" y1="6" x2="18" y2="18" />
                                </svg>
                            </div>
                            <span className="font-semibold text-rose-200">Detonated!</span>
                            <span className="text-rose-300 text-[11px] hidden xs:inline">Press 'R' or click to retry.</span>
                        </div>
                        <button
                            onClick={() => this.resetGame()}
                            className="px-2.5 py-0.5 sm:py-1 rounded bg-rose-600 hover:bg-rose-500 text-white font-semibold text-[11px] sm:text-xs transition-colors shadow cursor-pointer"
                        >
                            Try Again
                        </button>
                    </div>
                )}

                {/* ── Main Tactical Game Grid Stage (Adaptive & Zero-Scroll on 9x9 and 16x16) ── */}
                <div
                    ref={this.stageRef}
                    className="flex-1 flex flex-col items-center justify-center p-1 sm:p-3 overflow-auto w-full min-h-0"
                >
                    <div className="p-1 sm:p-2.5 rounded-xl bg-[#181818] border border-white border-opacity-10 shadow-2xl max-w-full max-h-full overflow-auto touch-pan-x touch-pan-y">
                        <div
                            style={{
                                display: 'grid',
                                gridTemplateColumns: `repeat(${cols}, ${tileSize}px)`,
                                gap: `${gap}px`,
                                background: '#121212',
                                padding: `${gap}px`,
                                borderRadius: '4px',
                            }}
                        >
                            {Array.from({ length: rows }, (_, r) =>
                                Array.from({ length: cols }, (_, c) => {
                                    const idx = r * cols + c;
                                    const cell = cells[idx];
                                    const isDetonated = idx === detonated;

                                    let cellClasses = "flex items-center justify-center font-bold select-none transition-colors duration-75 rounded-[2px] ";
                                    let content = null;

                                    if (cell.revealed) {
                                        if (cell.mine) {
                                            if (isDetonated) {
                                                cellClasses += "bg-rose-700 ring-2 ring-rose-400 shadow-md";
                                                content = <MineGraphic size={markerSize} isDetonated={true} />;
                                            } else {
                                                cellClasses += "bg-[#252525] border border-black border-opacity-40";
                                                content = <MineGraphic size={markerSize} isDetonated={false} />;
                                            }
                                        } else {
                                            cellClasses += "bg-[#1f1e1d] border border-black border-opacity-20";
                                            if (cell.adj > 0) {
                                                content = (
                                                    <span style={{ color: ADJ_COLORS[cell.adj], fontSize: `${fontSize}px`, lineHeight: 1 }}>
                                                        {cell.adj}
                                                    </span>
                                                );
                                            }
                                        }
                                    } else {
                                        cellClasses += "bg-[#383735] hover:bg-[#444341] active:bg-[#2b2a28] border-t border-white border-opacity-15 border-b border-black border-opacity-50 cursor-pointer shadow-sm";
                                        if (cell.flagged) {
                                            content = <CellMarker size={markerSize} />;
                                        }
                                    }

                                    return (
                                        <div
                                            key={idx}
                                            onClick={(e) => this.handleCellClick(e, r, c)}
                                            onDoubleClick={(e) => this.handleCellDoubleClick(e, r, c)}
                                            onContextMenu={(e) => this.handleContextMenu(e, r, c)}
                                            onTouchStart={(e) => this.handleTouchStart(e, r, c)}
                                            onTouchMove={this.handleTouchMove}
                                            onTouchEnd={this.handleTouchEnd}
                                            onTouchCancel={this.handleTouchEnd}
                                            onMouseDown={(e) => this.handleMouseDown(e, r, c)}
                                            onMouseUp={this.handleMouseUp}
                                            onMouseLeave={this.handleMouseUp}
                                            className={cellClasses}
                                            style={{
                                                width: `${tileSize}px`,
                                                height: `${tileSize}px`,
                                                touchAction: 'manipulation',
                                                WebkitTouchCallout: 'none',
                                                WebkitUserSelect: 'none',
                                                userSelect: 'none',
                                            }}
                                        >
                                            {content}
                                        </div>
                                    );
                                })
                            )}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default MinesweeperApp;
export const displayMinesweeper = () => <MinesweeperApp />;
