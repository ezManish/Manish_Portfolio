import React, { Component } from 'react';

// ─── GNOME 2048 (Ubuntu Desktop & Mobile Responsive Edition) ──────────────────

const SIZE = 4;

const TILE_STYLES = {
    0:    { bg: 'transparent', color: 'transparent', shadow: '' },
    2:    { bg: '#f0ebe3', color: '#2d2c2a', shadow: 'shadow-sm' },
    4:    { bg: '#ebe1d1', color: '#2d2c2a', shadow: 'shadow-sm' },
    8:    { bg: '#f4a261', color: '#ffffff', shadow: 'shadow-md' },
    16:   { bg: '#e76f51', color: '#ffffff', shadow: 'shadow-md' },
    32:   { bg: '#e95420', color: '#ffffff', shadow: 'shadow-lg ring-1 ring-orange-300/40' }, // Signature Ubuntu Orange
    64:   { bg: '#d63b0a', color: '#ffffff', shadow: 'shadow-lg ring-1 ring-orange-400/50' },
    128:  { bg: '#f4a226', color: '#ffffff', shadow: 'shadow-xl ring-1 ring-amber-300/60' },
    256:  { bg: '#e59819', color: '#ffffff', shadow: 'shadow-xl ring-1 ring-amber-400/70' },
    512:  { bg: '#d68a0c', color: '#ffffff', shadow: 'shadow-xl ring-2 ring-yellow-400/80' },
    1024: { bg: '#77216f', color: '#ffffff', shadow: 'shadow-2xl ring-2 ring-purple-300/60' }, // Ubuntu Aubergine
    2048: { bg: 'linear-gradient(135deg, #e95420 0%, #77216f 50%, #2c001e 100%)', color: '#ffffff', shadow: 'shadow-2xl ring-2 ring-yellow-400' },
};

function getTileFontSize(val) {
    if (val >= 1024) return 'text-xs xs:text-sm sm:text-base';
    if (val >= 128) return 'text-sm xs:text-base sm:text-xl';
    return 'text-lg xs:text-xl sm:text-2xl';
}

function emptyGrid() {
    return Array.from({ length: SIZE }, () => Array(SIZE).fill(0));
}

function addRandom(grid) {
    const empty = [];
    for (let r = 0; r < SIZE; r++) {
        for (let c = 0; c < SIZE; c++) {
            if (grid[r][c] === 0) empty.push([r, c]);
        }
    }
    if (!empty.length) return grid;
    const [r, c] = empty[Math.floor(Math.random() * empty.length)];
    const next = grid.map(row => [...row]);
    next[r][c] = Math.random() < 0.9 ? 2 : 4;
    return next;
}

function slideRow(row) {
    const nums = row.filter(x => x !== 0);
    let score = 0;
    const merged = [];
    let i = 0;
    while (i < nums.length) {
        if (i + 1 < nums.length && nums[i] === nums[i + 1]) {
            const val = nums[i] * 2;
            merged.push(val);
            score += val;
            i += 2;
        } else {
            merged.push(nums[i]);
            i++;
        }
    }
    while (merged.length < SIZE) merged.push(0);
    return [merged, score];
}

function rotateRight(grid) {
    return grid[0].map((_, c) => grid.map(row => row[c]).reverse());
}

function rotateLeft(grid) {
    return grid[0].map((_, c) => grid.map(row => row[row.length - 1 - c]));
}

function moveGrid(grid, dir) {
    let oriented;
    if (dir === 'left')  oriented = grid;
    if (dir === 'right') oriented = grid.map(r => [...r].reverse());
    if (dir === 'up')    oriented = rotateLeft(grid);
    if (dir === 'down')  oriented = rotateRight(grid);

    let totalScore = 0;
    const slid = oriented.map(row => {
        const [nr, sc] = slideRow(row);
        totalScore += sc;
        return nr;
    });

    let result;
    if (dir === 'left')  result = slid;
    if (dir === 'right') result = slid.map(r => [...r].reverse());
    if (dir === 'up')    result = rotateRight(slid);
    if (dir === 'down')  result = rotateLeft(slid);

    const moved = JSON.stringify(grid) !== JSON.stringify(result);
    return { grid: result, score: totalScore, moved };
}

function canMove(grid) {
    for (let r = 0; r < SIZE; r++) {
        for (let c = 0; c < SIZE; c++) {
            if (grid[r][c] === 0) return true;
            if (c + 1 < SIZE && grid[r][c] === grid[r][c + 1]) return true;
            if (r + 1 < SIZE && grid[r][c] === grid[r + 1][c]) return true;
        }
    }
    return false;
}

function hasWon(grid) {
    return grid.some(row => row.some(v => v >= 2048));
}

export class Game2048App extends Component {
    constructor(props) {
        super(props);
        this.state = this._newGameState();
        this.touchStartX = null;
        this.touchStartY = null;
    }

    _newGameState() {
        let g = emptyGrid();
        g = addRandom(g);
        g = addRandom(g);
        const storedBest = typeof window !== 'undefined' ? parseInt(localStorage.getItem('2048_best_score') || '0', 10) : 0;
        return {
            grid: g,
            score: 0,
            best: storedBest,
            prevGrid: null,
            prevScore: 0,
            phase: 'playing',
            wonAck: false,
        };
    }

    componentDidMount() {
        window.addEventListener('keydown', this.handleKey);
        try {
            const savedBest = parseInt(localStorage.getItem('2048_best_score') || '0', 10);
            if (savedBest > 0) this.setState({ best: savedBest });
        } catch (e) {}
    }

    componentWillUnmount() {
        window.removeEventListener('keydown', this.handleKey);
    }

    handleKey = (e) => {
        const map = {
            ArrowLeft: 'left',  a: 'left',  A: 'left',
            ArrowRight: 'right', d: 'right', D: 'right',
            ArrowUp: 'up',      w: 'up',    W: 'up',
            ArrowDown: 'down',  s: 'down',  S: 'down',
        };
        const dir = map[e.key];
        if (!dir) return;
        e.preventDefault();
        this.doMove(dir);
    };

    handleTouchStart = (e) => {
        if (!e.touches || e.touches.length === 0) return;
        this.touchStartX = e.touches[0].clientX;
        this.touchStartY = e.touches[0].clientY;
    };

    handleTouchMove = (e) => {
        if (this.touchStartX !== null && this.touchStartY !== null) {
            if (e.cancelable) {
                e.preventDefault();
            }
        }
    };

    handleTouchEnd = (e) => {
        if (this.touchStartX === null || this.touchStartY === null) return;
        if (!e.changedTouches || e.changedTouches.length === 0) return;

        const endX = e.changedTouches[0].clientX;
        const endY = e.changedTouches[0].clientY;
        const diffX = endX - this.touchStartX;
        const diffY = endY - this.touchStartY;

        const minDistance = 20;

        if (Math.abs(diffX) > Math.abs(diffY)) {
            if (Math.abs(diffX) > minDistance) {
                this.doMove(diffX > 0 ? 'right' : 'left');
            }
        } else {
            if (Math.abs(diffY) > minDistance) {
                this.doMove(diffY > 0 ? 'down' : 'up');
            }
        }

        this.touchStartX = null;
        this.touchStartY = null;
    };

    doMove = (dir) => {
        const { grid, score, best, phase, wonAck } = this.state;
        if (phase === 'lost') return;
        if (phase === 'won' && !wonAck) return;

        const { grid: newGrid, score: gained, moved } = moveGrid(grid, dir);
        if (!moved) return;

        const withNew = addRandom(newGrid);
        const newScore = score + gained;
        const newBest = Math.max(best, newScore);

        if (newBest > best) {
            try {
                localStorage.setItem('2048_best_score', newBest.toString());
            } catch (e) {}
        }

        let newPhase = 'playing';
        if (!wonAck && hasWon(withNew)) newPhase = 'won';
        else if (!canMove(withNew)) newPhase = 'lost';

        this.setState({
            grid: withNew,
            score: newScore,
            best: newBest,
            prevGrid: grid,
            prevScore: score,
            phase: newPhase,
        });
    };

    undoMove = () => {
        const { prevGrid, prevScore } = this.state;
        if (!prevGrid) return;
        this.setState({
            grid: prevGrid,
            score: prevScore,
            prevGrid: null,
            phase: 'playing',
        });
    };

    newGame = () => {
        const best = this.state.best;
        const s = this._newGameState();
        this.setState({ ...s, best });
    };

    keepPlaying = () => {
        this.setState({ phase: 'playing', wonAck: true });
    };

    render() {
        const { grid, score, best, prevGrid, phase } = this.state;

        return (
            <div
                className="w-full h-full flex flex-col bg-[#242424] text-gray-100 select-none outline-none overflow-hidden"
                style={{ fontFamily: "'Ubuntu', -apple-system, sans-serif" }}
                tabIndex={0}
                onTouchStart={this.handleTouchStart}
                onTouchMove={this.handleTouchMove}
                onTouchEnd={this.handleTouchEnd}
            >
                {/* ── Native GNOME HeaderBar (Responsive on Mobile & Desktop) ────── */}
                <div className="flex items-center justify-between px-2.5 sm:px-4 py-1.5 sm:py-2 bg-[#201f1f] border-b border-black border-opacity-60 flex-shrink-0 gap-1.5 sm:gap-2">
                    <div className="flex items-center gap-1.5 sm:gap-2">
                        <img src="./themes/Yaru/apps/2048.svg" alt="2048" className="w-5 h-5 drop-shadow-sm flex-shrink-0" />
                        <span className="font-semibold text-xs sm:text-sm text-gray-200 tracking-wide truncate">2048</span>
                    </div>

                    {/* Score Badges & Controls */}
                    <div className="flex items-center gap-1.5 sm:gap-2 ml-auto flex-shrink-0">
                        {/* Score Pill */}
                        <div className="bg-[#181818] border border-white border-opacity-10 rounded-md sm:rounded-lg px-2 sm:px-3 py-0.5 sm:py-1 text-center shadow-inner min-w-[44px] sm:min-w-[60px]">
                            <div className="text-[7.5px] sm:text-[9px] uppercase tracking-widest text-gray-400 font-semibold leading-tight">Score</div>
                            <div className="text-[11px] sm:text-sm font-bold text-white font-mono leading-tight">{score}</div>
                        </div>

                        {/* Best Pill */}
                        <div className="bg-[#181818] border border-white border-opacity-10 rounded-md sm:rounded-lg px-2 sm:px-3 py-0.5 sm:py-1 text-center shadow-inner min-w-[44px] sm:min-w-[60px]">
                            <div className="text-[7.5px] sm:text-[9px] uppercase tracking-widest text-gray-400 font-semibold leading-tight">Best</div>
                            <div className="text-[11px] sm:text-sm font-bold text-ub-orange font-mono leading-tight">{best}</div>
                        </div>

                        {/* Undo Button */}
                        {prevGrid && (
                            <button
                                onClick={this.undoMove}
                                className="px-1.5 sm:px-2.5 py-1 sm:py-1.5 rounded-md sm:rounded-lg text-[11px] sm:text-xs font-medium text-gray-300 bg-white bg-opacity-5 hover:bg-opacity-10 border border-white border-opacity-10 hover:text-white transition-all cursor-pointer"
                                title="Undo last move"
                            >
                                ↶
                            </button>
                        )}

                        {/* New Game Button */}
                        <button
                            onClick={this.newGame}
                            className="px-2 sm:px-3 py-1 sm:py-1.5 rounded-md sm:rounded-lg text-[11px] sm:text-xs font-semibold text-white bg-ub-orange hover:brightness-110 active:scale-95 shadow transition-all cursor-pointer"
                        >
                            New
                        </button>
                    </div>
                </div>

                {/* ── Main Game Stage (Scales gracefully to viewports from 320px to 4K) ─ */}
                <div className="flex-1 flex flex-col items-center justify-center p-2 sm:p-4 overflow-y-auto overflow-x-hidden gap-2 sm:gap-3 min-h-0">
                    {/* Tactical Recessed Board Container (Adaptive Width & Height) */}
                    <div
                        className="relative rounded-2xl bg-[#181818] border border-white border-opacity-10 shadow-2xl p-2 sm:p-2.5 touch-none select-none flex-shrink-0"
                        style={{
                            width: 'min(calc(100vw - 28px), 330px, 45vh)',
                            height: 'min(calc(100vw - 28px), 330px, 45vh)',
                        }}
                    >
                        {/* Background Empty Slots */}
                        <div className="w-full h-full grid grid-cols-4 grid-rows-4 gap-1.5 sm:gap-2.5">
                            {Array.from({ length: SIZE * SIZE }).map((_, i) => (
                                <div
                                    key={i}
                                    className="w-full h-full rounded-lg sm:rounded-xl bg-[#252525] border border-black border-opacity-30"
                                />
                            ))}
                        </div>

                        {/* Tile Matrix Layer */}
                        <div className="absolute inset-0 p-2 sm:p-2.5 grid grid-cols-4 grid-rows-4 gap-1.5 sm:gap-2.5">
                            {grid.map((row, r) =>
                                row.map((val, c) => {
                                    if (val === 0) {
                                        return <div key={`${r}-${c}`} className="w-full h-full" />;
                                    }

                                    const styleConfig = TILE_STYLES[val] || {
                                        bg: '#2c001e',
                                        color: '#ffffff',
                                        shadow: 'shadow-xl',
                                    };

                                    return (
                                        <div
                                            key={`${r}-${c}`}
                                            className={`w-full h-full rounded-lg sm:rounded-xl flex items-center justify-center font-extrabold select-none transition-all duration-100 ease-out ${styleConfig.shadow} ${getTileFontSize(val)} font-mono`}
                                            style={{
                                                background: styleConfig.bg,
                                                color: styleConfig.color,
                                                lineHeight: 1,
                                            }}
                                        >
                                            {val}
                                        </div>
                                    );
                                })
                            )}
                        </div>

                        {/* Win / Game Over Overlay Modal */}
                        {(phase === 'won' || phase === 'lost') && (
                            <div className="absolute inset-0 rounded-2xl bg-black bg-opacity-80 backdrop-blur-md flex flex-col items-center justify-center gap-2.5 sm:gap-4 z-20 border border-white border-opacity-15 p-3 sm:p-6 animate-fadeIn">
                                <div className="text-center flex flex-col items-center">
                                    <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-full flex items-center justify-center mb-1">
                                        {phase === 'won' ? (
                                            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-emerald-500 bg-opacity-10 border border-emerald-500 border-opacity-30 flex items-center justify-center text-emerald-400">
                                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                                    <polyline points="20 6 9 17 4 12" />
                                                </svg>
                                            </div>
                                        ) : (
                                            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-rose-500 bg-opacity-10 border border-rose-500 border-opacity-30 flex items-center justify-center text-rose-400">
                                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                                    <circle cx="12" cy="12" r="10" />
                                                    <line x1="15" y1="9" x2="9" y2="15" />
                                                    <line x1="9" y1="9" x2="15" y2="15" />
                                                </svg>
                                            </div>
                                        )}
                                    </div>
                                    <div className="text-sm sm:text-base font-bold text-white tracking-wide">
                                        {phase === 'won' ? 'You Reached 2048!' : 'Game Over'}
                                    </div>
                                    <div className="text-[10px] sm:text-xs text-gray-400 mt-0.5">
                                        {phase === 'won' ? 'Magnificent strategy!' : 'No more legal moves.'}
                                    </div>
                                </div>

                                <div className="flex gap-2">
                                    {phase === 'won' && (
                                        <button
                                            onClick={this.keepPlaying}
                                            className="px-2.5 sm:px-4 py-1 sm:py-1.5 rounded-lg text-xs font-semibold text-gray-200 bg-white bg-opacity-10 hover:bg-opacity-20 border border-white border-opacity-15 transition-all cursor-pointer"
                                        >
                                            Keep Playing
                                        </button>
                                    )}
                                    <button
                                        onClick={this.newGame}
                                        className="px-3 sm:px-4 py-1 sm:py-1.5 rounded-lg text-xs font-semibold text-white bg-ub-orange hover:brightness-110 active:scale-95 shadow transition-all cursor-pointer"
                                    >
                                        Try Again
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        );
    }
}

export default Game2048App;
export const display2048 = () => <Game2048App />;
