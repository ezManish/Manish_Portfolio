import React, { Component } from 'react';

export class ResumeApp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isMobile: false,
        };
    }

    componentDidMount() {
        this.checkMobile();
        window.addEventListener('resize', this.checkMobile);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.checkMobile);
    }

    checkMobile = () => {
        if (typeof window !== 'undefined') {
            this.setState({ isMobile: window.innerWidth < 640 });
        }
    };

    render() {
        const { isMobile } = this.state;
        const resumePath = "./files/Manish-Kumar-Resume.pdf";

        return (
            <div className="w-full h-full flex flex-col bg-[#2e2e2e] text-gray-200 select-none overflow-hidden font-sans">
                {/* ── Native GNOME Document Viewer (Evince) HeaderBar ───────── */}
                <div className="flex items-center justify-between px-3 sm:px-4 py-2 bg-[#202020] border-b border-black border-opacity-50 flex-shrink-0 z-10 gap-2">
                    {/* Left: App & Document Title */}
                    <div className="flex items-center gap-2 min-w-0">
                        <img
                            src="./themes/Yaru/apps/evince.svg"
                            alt="Document Viewer"
                            className="w-5 h-5 flex-shrink-0"
                        />
                        <span className="font-semibold text-xs sm:text-sm text-gray-100 truncate">
                            Resume_Manish_Kumar.pdf
                        </span>
                        <span className="hidden sm:inline-block text-[11px] px-2 py-0.5 rounded bg-black bg-opacity-40 text-gray-400 font-mono">
                            Page 1 of 1
                        </span>
                    </div>

                    {/* Right: Actions */}
                    <div className="flex items-center gap-1.5 sm:gap-2 flex-shrink-0">
                        {/* Open in New Tab Button */}
                        <a
                            href={resumePath}
                            target="_blank"
                            rel="noreferrer noopener"
                            className="flex items-center gap-1 px-2.5 py-1 rounded bg-[#333333] hover:bg-[#3d3d3d] active:bg-[#252525] text-gray-200 text-xs font-medium transition-colors border border-white border-opacity-10 shadow-sm"
                            title="Open PDF in new browser tab"
                        >
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                                <polyline points="15 3 21 3 21 9" />
                                <line x1="10" y1="14" x2="21" y2="3" />
                            </svg>
                            <span className="hidden xs:inline">Open</span>
                        </a>

                        {/* Download PDF Button */}
                        <a
                            href={resumePath}
                            download="Manish-Kumar-Resume.pdf"
                            className="flex items-center gap-1 px-3 py-1 rounded bg-ub-orange hover:brightness-110 active:brightness-90 text-white text-xs font-semibold transition-all shadow cursor-pointer"
                            title="Download official PDF resume"
                        >
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                                <polyline points="7 10 12 15 17 10" />
                                <line x1="12" y1="15" x2="12" y2="3" />
                            </svg>
                            <span>Download PDF</span>
                        </a>
                    </div>
                </div>

                {/* ── Main Document Stage ─────────────────────────────────────── */}
                <div className="flex-1 w-full h-full min-h-0 bg-[#525659] relative flex flex-col items-center justify-center overflow-hidden">
                    {/* Embedded PDF iframe for desktop and supported browsers */}
                    <iframe
                        src={`${resumePath}#view=FitH`}
                        title="Manish Kumar Resume"
                        className="w-full h-full border-0 flex-1 bg-white"
                    />

                    {/* Mobile fallback banner if iframe display is restricted */}
                    {isMobile && (
                        <div className="absolute bottom-3 left-3 right-3 p-3 rounded-xl bg-[#1c1c1c] bg-opacity-95 backdrop-blur-md border border-white border-opacity-15 shadow-2xl flex items-center justify-between z-20">
                            <div className="flex flex-col min-w-0 pr-2">
                                <span className="text-xs font-semibold text-white truncate">Manish Kumar — Resume</span>
                                <span className="text-[10px] text-gray-400">PDF • 1 Page • Backend Developer</span>
                            </div>
                            <a
                                href={resumePath}
                                download="Manish-Kumar-Resume.pdf"
                                className="px-3 py-1.5 rounded-lg bg-ub-orange text-white text-xs font-semibold flex items-center gap-1.5 shadow-md flex-shrink-0"
                            >
                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                                    <polyline points="7 10 12 15 17 10" />
                                    <line x1="12" y1="15" x2="12" y2="3" />
                                </svg>
                                <span>Get PDF</span>
                            </a>
                        </div>
                    )}
                </div>
            </div>
        );
    }
}

export default ResumeApp;
export const displayResume = () => <ResumeApp />;
