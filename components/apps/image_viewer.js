import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

const GALLERY_PHOTOS = [
    {
        title: "Manish Kumar",
        src: "./images/logos/me.png",
        category: "profile",
        subtitle: "Profile Photo"
    },
    {
        title: "Google Solution Challenge 2026",
        src: "./images/badge/badge.png",
        category: "achievements",
        subtitle: "Top Finalist"
    },
    {
        title: "Idea Discovery — 1st Place",
        src: "./images/logos/idea_Discovery.png",
        category: "achievements",
        subtitle: "Hackathon Winner"
    },
    {
        title: "Traject Landing",
        src: "./images/projects/traject/Traject_landing.png",
        category: "projects",
        subtitle: "C++ Analysis Engine"
    },
    {
        title: "Traject Forecast",
        src: "./images/projects/traject/Traject_forcast.png",
        category: "projects",
        subtitle: "Predictive Modeling"
    },
    {
        title: "CuratiX Dashboard",
        src: "./images/projects/curatix/curatix-home.png",
        category: "projects",
        subtitle: "Digital Health Platform"
    },
    {
        title: "CuratiX Board",
        src: "./images/projects/curatix/curatix-board.png",
        category: "projects",
        subtitle: "Triage & Scheduling"
    },
    {
        title: "Aegis Desktop Home",
        src: "./images/projects/Aegis/Aegis-home.jpeg",
        category: "projects",
        subtitle: "Disaster Communication"
    },
    {
        title: "Aegis Contact System",
        src: "./images/projects/Aegis/Aegis-contact.jpeg",
        category: "projects",
        subtitle: "Emergency Network"
    },
    {
        title: "Memoize Home",
        src: "./images/projects/Memoize/Memoize-home.jpeg",
        category: "projects",
        subtitle: "Active Recall Companion"
    },
    {
        title: "Memoize Start Session",
        src: "./images/projects/Memoize/Memoize-start.png",
        category: "projects",
        subtitle: "Study Session Flow"
    },
    {
        title: "PDF to Images CLI Benchmark",
        src: "./images/projects/pdf-to-images-cli/pdf-to-images-cli-benchmark.jpg",
        category: "projects",
        subtitle: "High-Performance Benchmark"
    },
    {
        title: "Ubuntu Wallpaper 1",
        src: "./images/wallpapers/wall-1.webp",
        category: "wallpapers",
        subtitle: "Default Wallpaper"
    },
    {
        title: "Ubuntu Wallpaper 3",
        src: "./images/wallpapers/wall-3.webp",
        category: "wallpapers",
        subtitle: "Abstract Gradient"
    },
    {
        title: "Ubuntu Wallpaper 5",
        src: "./images/wallpapers/wall-5.webp",
        category: "wallpapers",
        subtitle: "Minimal Yaru"
    },
    {
        title: "Ubuntu Wallpaper 8",
        src: "./images/wallpapers/wall-8.webp",
        category: "wallpapers",
        subtitle: "Dark Theme Wallpaper"
    },
];

export function SingleImageViewer({ src, title, onClose, onBack, isWindowMode = false }) {
    const [zoom, setZoom] = useState(1);
    const [rotation, setRotation] = useState(0);
    const [flipH, setFlipH] = useState(false);
    const [pan, setPan] = useState({ x: 0, y: 0 });
    const [isDragging, setIsDragging] = useState(false);
    const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
    const [imgDimensions, setImgDimensions] = useState({ width: 0, height: 0 });
    const [showInfo, setShowInfo] = useState(false);

    const viewportRef = useRef(null);

    const handleClose = () => {
        if (onClose) {
            onClose();
        } else {
            const closeBtn = document.getElementById("close-image-viewer");
            if (closeBtn) closeBtn.click();
        }
    };

    // Keyboard navigation
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape') {
                if (onBack) {
                    onBack();
                } else {
                    handleClose();
                }
            } else if (e.key === '+' || e.key === '=') {
                setZoom((prev) => Math.min(+(prev + 0.25).toFixed(2), 4));
            } else if (e.key === '-' || e.key === '_') {
                setZoom((prev) => Math.max(+(prev - 0.25).toFixed(2), 0.25));
            } else if (e.key === '0') {
                setZoom(1);
                setPan({ x: 0, y: 0 });
            } else if (e.key.toLowerCase() === 'r') {
                setRotation((prev) => (prev + 90) % 360);
            } else if (e.key.toLowerCase() === 'l') {
                setRotation((prev) => (prev - 90 + 360) % 360);
            } else if (e.key.toLowerCase() === 'h') {
                setFlipH((prev) => !prev);
            } else if (e.key.toLowerCase() === 'i') {
                setShowInfo((prev) => !prev);
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [onClose, onBack]);

    // Reset view state when new image is loaded
    useEffect(() => {
        setZoom(1);
        setPan({ x: 0, y: 0 });
        setRotation(0);
        setFlipH(false);
    }, [src]);

    const handleWheel = (e) => {
        e.stopPropagation();
        if (e.deltaY < 0) {
            setZoom((prev) => Math.min(+(prev + 0.15).toFixed(2), 4));
        } else {
            setZoom((prev) => Math.max(+(prev - 0.15).toFixed(2), 0.25));
        }
    };

    const handleMouseDown = (e) => {
        e.stopPropagation();
        if (e.button === 0 || e.button === 1) {
            setIsDragging(true);
            setDragStart({ x: e.clientX - pan.x, y: e.clientY - pan.y });
        }
    };

    const handleMouseMove = (e) => {
        if (!isDragging) return;
        e.stopPropagation();
        setPan({
            x: e.clientX - dragStart.x,
            y: e.clientY - dragStart.y,
        });
    };

    const handleMouseUp = (e) => {
        if (isDragging) {
            e.stopPropagation();
            setIsDragging(false);
        }
    };

    const handleReset = () => {
        setZoom(1);
        setRotation(0);
        setFlipH(false);
        setPan({ x: 0, y: 0 });
    };

    const fileName = src ? src.split('/').pop() : 'Photo';
    const fileExt = fileName.includes('.') ? fileName.split('.').pop().toUpperCase() : 'IMG';
    const displayTitle = title || fileName;

    const content = (
        <div className="w-full h-full flex flex-col bg-[#201f1f] text-white select-none overflow-hidden relative">
            {/* Minimalist Action Toolbar */}
            <div className="bg-[#2c2a2a] border-b border-gray-800/80 px-3 py-1.5 flex flex-wrap justify-between items-center text-xs gap-2 select-none z-10">
                {/* Left Controls: Back / Zoom / Rotate */}
                <div className="flex items-center gap-2">
                    {onBack && (
                        <button
                            type="button"
                            onClick={onBack}
                            className="px-2.5 py-1 text-xs bg-gray-800 hover:bg-gray-700 text-gray-200 hover:text-white rounded border border-gray-700 transition flex items-center gap-1.5 cursor-pointer"
                        >
                            <span>&#x2190;</span>
                            <span>Albums</span>
                        </button>
                    )}

                    {/* Zoom Controls */}
                    <div className="inline-flex rounded-md bg-gray-800/90 p-0.5 border border-gray-700/60 shadow-inner">
                        <button
                            type="button"
                            onClick={() => setZoom((prev) => Math.max(+(prev - 0.25).toFixed(2), 0.25))}
                            className="px-2 py-1 text-gray-300 hover:text-white hover:bg-gray-700/80 rounded transition-colors flex items-center cursor-pointer"
                            title="Zoom Out (-)"
                        >
                            <span className="font-mono text-sm leading-none font-bold">&#x2212;</span>
                        </button>
                        <button
                            type="button"
                            onClick={handleReset}
                            className="px-2.5 py-1 text-[11px] font-mono font-semibold text-gray-200 hover:text-white hover:bg-gray-700/80 rounded transition-colors cursor-pointer"
                            title="Fit to Screen (0)"
                        >
                            {zoom === 1 ? 'Fit' : `${Math.round(zoom * 100)}%`}
                        </button>
                        <button
                            type="button"
                            onClick={() => setZoom((prev) => Math.min(+(prev + 0.25).toFixed(2), 4))}
                            className="px-2 py-1 text-gray-300 hover:text-white hover:bg-gray-700/80 rounded transition-colors flex items-center cursor-pointer"
                            title="Zoom In (+)"
                        >
                            <span className="font-mono text-sm leading-none font-bold">+</span>
                        </button>
                    </div>

                    {/* Rotate & Flip Controls */}
                    <div className="inline-flex rounded-md bg-gray-800/90 p-0.5 border border-gray-700/60">
                        <button
                            type="button"
                            onClick={() => setRotation((prev) => (prev - 90 + 360) % 360)}
                            className="px-2 py-1 text-gray-300 hover:text-white hover:bg-gray-700/80 rounded transition-colors font-mono cursor-pointer"
                            title="Rotate Left (L)"
                        >
                            &#x21BA;
                        </button>
                        <button
                            type="button"
                            onClick={() => setRotation((prev) => (prev + 90) % 360)}
                            className="px-2 py-1 text-gray-300 hover:text-white hover:bg-gray-700/80 rounded transition-colors font-mono cursor-pointer"
                            title="Rotate Right (R)"
                        >
                            &#x21BB;
                        </button>
                        <button
                            type="button"
                            onClick={() => setFlipH((prev) => !prev)}
                            className={`px-2 py-1 rounded transition-colors cursor-pointer ${flipH ? 'bg-ub-orange text-white' : 'text-gray-300 hover:text-white hover:bg-gray-700/80'}`}
                            title="Flip Horizontal (H)"
                        >
                            &#x21C4;
                        </button>
                    </div>
                </div>

                {/* Right Controls: Title & Info */}
                <div className="flex items-center gap-2 ml-auto">
                    <span className="text-xs text-gray-300 font-medium truncate max-w-[200px] sm:max-w-xs">{displayTitle}</span>
                    <button
                        type="button"
                        onClick={() => setShowInfo((prev) => !prev)}
                        className={`p-1.5 rounded-md border text-xs transition-colors cursor-pointer ${showInfo ? 'bg-ub-orange border-orange-600 text-white' : 'bg-gray-800/90 border-gray-700/60 text-gray-300 hover:text-white'}`}
                        title="Image Info (I)"
                    >
                        <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 16 16">
                            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                            <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"/>
                        </svg>
                    </button>

                    {!isWindowMode && (
                        <button
                            type="button"
                            onClick={handleClose}
                            className="w-5 h-5 rounded-full bg-ub-orange hover:bg-orange-600 flex items-center justify-center transition focus:outline-none cursor-pointer ml-1"
                            title="Close"
                        >
                            <img src="./themes/Yaru/window/window-close-symbolic.svg" alt="Close" className="w-3 h-3" />
                        </button>
                    )}
                </div>
            </div>

            {/* Interactive Viewport Area */}
            <div
                ref={viewportRef}
                className="flex-grow w-full h-full relative overflow-hidden flex items-center justify-center bg-[#151414] cursor-grab active:cursor-grabbing select-none"
                onWheel={handleWheel}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
            >
                {/* Checkered pattern background */}
                <div
                    className="absolute inset-0 opacity-15 pointer-events-none"
                    style={{
                        backgroundImage:
                            'linear-gradient(45deg, #333 25%, transparent 25%), linear-gradient(-45deg, #333 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #333 75%), linear-gradient(-45deg, transparent 75%, #333 75%)',
                        backgroundSize: '20px 20px',
                        backgroundPosition: '0 0, 0 10px, 10px -10px, -10px 0px',
                    }}
                />

                {src && (
                    <img
                        src={src}
                        alt={displayTitle}
                        draggable={false}
                        onLoad={(e) => {
                            setImgDimensions({
                                width: e.target.naturalWidth,
                                height: e.target.naturalHeight,
                            });
                        }}
                        style={{
                            transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom}) rotate(${rotation}deg) scaleX(${flipH ? -1 : 1})`,
                            transition: isDragging ? 'none' : 'transform 0.12s ease-out',
                            maxHeight: '90%',
                            maxWidth: '90%',
                        }}
                        className="object-contain pointer-events-none drop-shadow-2xl user-select-none"
                    />
                )}

                {/* Floating Info Overlay */}
                {showInfo && (
                    <div className="absolute top-3 right-3 bg-[#1e1c1c]/95 border border-gray-700/80 rounded-lg p-3 text-xs text-gray-200 shadow-2xl backdrop-blur-md z-30 font-mono min-w-[200px] space-y-1.5 animateShow">
                        <div className="flex justify-between border-b border-gray-700/60 pb-1 font-sans font-semibold text-white">
                            <span>Image Details</span>
                            <button onClick={() => setShowInfo(false)} className="text-gray-400 hover:text-white cursor-pointer">✕</button>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-400">File:</span>
                            <span className="text-white truncate max-w-[120px]">{fileName}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-400">Type:</span>
                            <span className="text-ub-orange font-bold">{fileExt}</span>
                        </div>
                        {imgDimensions.width > 0 && (
                            <div className="flex justify-between">
                                <span className="text-gray-400">Dimensions:</span>
                                <span className="text-white">{imgDimensions.width} × {imgDimensions.height}</span>
                            </div>
                        )}
                        <div className="flex justify-between">
                            <span className="text-gray-400">Zoom:</span>
                            <span className="text-ub-orange font-bold">{Math.round(zoom * 100)}%</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-400">Orientation:</span>
                            <span className="text-white">{rotation}° {flipH ? '(Flipped)' : ''}</span>
                        </div>
                    </div>
                )}
            </div>

            {/* Ubuntu Window Status Bar */}
            <div className="bg-[#1e1c1c] border-t border-gray-800 px-3 py-1 text-[11px] text-gray-400 flex flex-wrap justify-between items-center font-mono gap-2 select-none z-10">
                <div className="flex items-center gap-2 truncate">
                    <span className="text-gray-300 truncate max-w-[200px] sm:max-w-xs">{fileName}</span>
                    {imgDimensions.width > 0 && (
                        <span className="text-gray-500 hidden sm:inline">
                            ({imgDimensions.width} × {imgDimensions.height} px)
                        </span>
                    )}
                </div>

                <div className="flex items-center gap-3 text-gray-400 text-[10px]">
                    <span className="hidden md:inline text-gray-500 font-sans">
                        [Scroll] Zoom &#x2022; [Drag] Pan &#x2022; [Esc] Back
                    </span>
                    <div className="flex items-center gap-1 font-sans">
                        <button
                            type="button"
                            onClick={handleReset}
                            className={`px-2 py-0.5 rounded text-[10px] transition-colors cursor-pointer ${zoom === 1 ? 'bg-ub-orange text-white font-semibold' : 'text-gray-400 hover:text-white hover:bg-gray-800'}`}
                            title="Fit whole image on screen"
                        >
                            Fit
                        </button>
                        <button
                            type="button"
                            onClick={() => setZoom(1.5)}
                            className={`px-2 py-0.5 rounded text-[10px] transition-colors cursor-pointer ${zoom === 1.5 ? 'bg-ub-orange text-white font-semibold' : 'text-gray-400 hover:text-white hover:bg-gray-800'}`}
                            title="Zoom 150%"
                        >
                            150%
                        </button>
                        <button
                            type="button"
                            onClick={() => setZoom(2)}
                            className={`px-2 py-0.5 rounded text-[10px] transition-colors cursor-pointer ${zoom === 2 ? 'bg-ub-orange text-white font-semibold' : 'text-gray-400 hover:text-white hover:bg-gray-800'}`}
                            title="Zoom 200%"
                        >
                            200%
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );

    return content;
}

export function PhotosApp() {
    const [selectedPhoto, setSelectedPhoto] = useState(null);
    const [category, setCategory] = useState('all');

    const filteredPhotos = GALLERY_PHOTOS.filter((photo) => {
        if (category === 'all') return true;
        return photo.category === category;
    });

    if (selectedPhoto) {
        return (
            <SingleImageViewer
                src={selectedPhoto.src}
                title={selectedPhoto.title}
                onBack={() => setSelectedPhoto(null)}
                isWindowMode={true}
            />
        );
    }

    return (
        <div className="w-full h-full flex flex-col bg-[#201f1f] text-white select-none overflow-hidden">
            {/* Photos Header Toolbar */}
            <div className="bg-[#2c2a2a] border-b border-gray-800 px-4 py-2.5 flex flex-wrap justify-between items-center gap-2">
                <div className="flex items-center space-x-2">
                    <img src="./themes/Yaru/system/user-desktop.png" alt="Photos" className="w-5 h-5" />
                    <span className="text-sm font-semibold text-white">Photos</span>
                    <span className="text-xs text-gray-400">({filteredPhotos.length} items)</span>
                </div>

                {/* Filter Tabs */}
                <div className="flex space-x-1 text-xs bg-gray-800/80 p-0.5 rounded-md border border-gray-700/60">
                    {[
                        { id: 'all', label: 'All Photos' },
                        { id: 'projects', label: 'Projects' },
                        { id: 'achievements', label: 'Achievements' },
                        { id: 'wallpapers', label: 'Wallpapers' },
                    ].map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setCategory(tab.id)}
                            className={`px-2.5 py-1 rounded text-xs transition cursor-pointer ${
                                category === tab.id
                                    ? 'bg-ub-orange text-white font-semibold shadow-sm'
                                    : 'text-gray-300 hover:text-white hover:bg-gray-700/60'
                            }`}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* Gallery Grid View */}
            <div className="flex-grow p-4 sm:p-6 overflow-y-auto bg-[#181717]">
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 max-w-6xl mx-auto">
                    {filteredPhotos.map((photo, idx) => (
                        <div
                            key={idx}
                            onClick={() => setSelectedPhoto(photo)}
                            className="group bg-[#242222] border border-gray-800 hover:border-ub-orange rounded-lg overflow-hidden cursor-pointer transition shadow hover:shadow-xl flex flex-col"
                        >
                            <div className="h-32 sm:h-36 w-full bg-[#121111] overflow-hidden flex items-center justify-center p-2 relative">
                                <img
                                    src={photo.src}
                                    alt={photo.title}
                                    className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-200"
                                />
                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                                    <span className="opacity-0 group-hover:opacity-100 bg-black/75 text-white text-[10px] px-2 py-1 rounded-full backdrop-blur-sm transition">
                                        Click to view
                                    </span>
                                </div>
                            </div>
                            <div className="p-2.5 bg-[#242222] border-t border-gray-800/80">
                                <p className="text-xs font-medium text-gray-200 group-hover:text-white truncate" title={photo.title}>
                                    {photo.title}
                                </p>
                                <p className="text-[10px] text-gray-400 truncate">{photo.subtitle}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Footer Bar */}
            <div className="bg-[#1e1c1c] border-t border-gray-800 px-4 py-1.5 text-[11px] text-gray-400 flex justify-between items-center font-mono">
                <span>Ubuntu Image Gallery</span>
                <span>Select any photo to preview & edit</span>
            </div>
        </div>
    );
}

// Default export for lightbox usage in manish_portfolio.js
export default function ImageViewer({ src, title, onClose }) {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const handleClose = () => {
        if (onClose) {
            onClose();
        } else {
            const closeBtn = document.getElementById("close-image-viewer");
            if (closeBtn) closeBtn.click();
        }
    };

    if (!mounted || typeof document === 'undefined') return null;

    const modalContent = (
        <div
            className="fixed inset-0 top-7 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm select-none p-3 sm:p-6 overflow-hidden animateShow"
            onClick={(e) => {
                if (e.target === e.currentTarget) handleClose();
            }}
        >
            <div
                className="w-full max-w-5xl h-[85vh] max-h-[800px] rounded-lg border border-gray-700/80 shadow-2xl overflow-hidden flex flex-col bg-[#201f1f]"
                onClick={(e) => e.stopPropagation()}
            >
                <SingleImageViewer
                    src={src}
                    title={title}
                    onClose={handleClose}
                    isWindowMode={false}
                />
            </div>
        </div>
    );

    const mountTarget = document.getElementById('monitor-screen') || document.body;
    return createPortal(modalContent, mountTarget);
}

// Display function used by window manager for "Photos" app in apps.config.js
export const displayImageViewer = () => {
    return <PhotosApp />;
};
