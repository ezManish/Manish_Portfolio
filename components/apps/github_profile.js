import React, { Component } from 'react';

export class GitHubProfile extends Component {
    constructor(props) {
        super(props);
        this.containerRef = React.createRef();
        this.state = {
            activeTab: 'overview',
            isFollowing: false,
            followersCount: 3,
            searchQuery: '',
            filterLanguage: 'all',
            containerWidth: 800,
        };
    }

    componentDidMount() {
        if (this.containerRef.current) {
            this.setState({ containerWidth: this.containerRef.current.clientWidth });

            if (typeof ResizeObserver !== 'undefined') {
                this.resizeObserver = new ResizeObserver((entries) => {
                    for (let entry of entries) {
                        if (entry.contentRect && entry.contentRect.width > 0) {
                            this.setState({ containerWidth: entry.contentRect.width });
                        }
                    }
                });
                this.resizeObserver.observe(this.containerRef.current);
            }
        }
    }

    componentWillUnmount() {
        if (this.resizeObserver) {
            this.resizeObserver.disconnect();
        }
    }

    toggleFollow = () => {
        this.setState(prevState => ({
            isFollowing: !prevState.isFollowing,
            followersCount: prevState.isFollowing ? prevState.followersCount - 1 : prevState.followersCount + 1
        }));
    }

    pinnedRepos = [
        {
            name: "pdf-to-images-cli",
            description: "High performance Python CLI tool to convert multi-page PDF documents into crisp, high-resolution images.",
            language: "Python",
            langColor: "#3572A5",
            stars: 1,
            forks: 0,
            license: "MIT",
            url: "https://github.com/ezManish/pdf-to-images-cli"
        },
        {
            name: "EaseMotion-css",
            description: "Animation-first CSS framework with reusable UI components, modern effects, and zero dependencies.",
            language: "CSS",
            langColor: "#563d7c",
            stars: 2,
            forks: 1,
            license: "MIT",
            url: "https://github.com/ezManish/EaseMotion-css"
        },
        {
            name: "Manish_Portfolio",
            description: "Interactive Ubuntu 20.04 desktop environment portfolio built with Next.js and Tailwind CSS.",
            language: "JavaScript",
            langColor: "#f1e05a",
            stars: 4,
            forks: 1,
            license: "MIT",
            url: "https://github.com/ezManish/Manish_Portfolio"
        },
        {
            name: "CuratiX",
            description: "Curated digital health & clinical operations platform with appointment triage and analytics.",
            language: "Java",
            langColor: "#b07219",
            stars: 2,
            forks: 0,
            license: null,
            url: "https://github.com/ezManish"
        },
        {
            name: "Aegis-Desktop",
            description: "Desktop emergency communication and disaster response management system with offline failover.",
            language: "Java",
            langColor: "#b07219",
            stars: 3,
            forks: 0,
            license: null,
            url: "https://github.com/ezManish"
        },
        {
            name: "Traject",
            description: "Real-time multi-threaded trajectory analysis and path prediction engine.",
            language: "C++",
            langColor: "#f34b7d",
            stars: 2,
            forks: 0,
            license: null,
            url: "https://github.com/ezManish"
        }
    ];

    allRepos = [
        {
            name: "pdf-to-images-cli",
            description: "High performance Python CLI tool to convert multi-page PDF documents into crisp, high-resolution images.",
            language: "Python",
            langColor: "#3572A5",
            stars: 1,
            forks: 0,
            license: "MIT",
            updated: "Updated on Aug 10, 2026",
            url: "https://github.com/ezManish/pdf-to-images-cli"
        },
        {
            name: "EaseMotion-css",
            description: "Animation-first CSS framework with reusable UI components, modern effects, and zero dependencies.",
            language: "CSS",
            langColor: "#563d7c",
            stars: 2,
            forks: 1,
            license: "MIT",
            updated: "Updated on Aug 8, 2026",
            url: "https://github.com/ezManish/EaseMotion-css"
        },
        {
            name: "Manish_Portfolio",
            description: "Interactive Ubuntu 20.04 desktop environment portfolio built with Next.js and Tailwind CSS.",
            language: "JavaScript",
            langColor: "#f1e05a",
            stars: 4,
            forks: 1,
            license: "MIT",
            updated: "Updated on Sep 12, 2026",
            url: "https://github.com/ezManish/Manish_Portfolio"
        },
        {
            name: "CuratiX",
            description: "Curated digital health & clinical operations platform with appointment triage and analytics.",
            language: "Java",
            langColor: "#b07219",
            stars: 2,
            forks: 0,
            license: null,
            updated: "Updated on Apr 15, 2026",
            url: "https://github.com/ezManish"
        },
        {
            name: "Aegis-Desktop",
            description: "Desktop emergency communication and disaster response management system with offline failover.",
            language: "Java",
            langColor: "#b07219",
            stars: 3,
            forks: 0,
            license: null,
            updated: "Updated on Dec 20, 2025",
            url: "https://github.com/ezManish"
        },
        {
            name: "Traject",
            description: "Real-time multi-threaded trajectory analysis and path prediction engine.",
            language: "C++",
            langColor: "#f34b7d",
            stars: 2,
            forks: 0,
            license: null,
            updated: "Updated on Sep 2, 2026",
            url: "https://github.com/ezManish"
        },
        {
            name: "Memoize",
            description: "Smart note-taking and revision companion designed for active recall and spaced repetition.",
            language: "JavaScript",
            langColor: "#f1e05a",
            stars: 1,
            forks: 0,
            license: "MIT",
            updated: "Updated on Jul 25, 2026",
            url: "https://github.com/ezManish"
        },
        {
            name: "DSA-Practice",
            description: "Data Structures & Algorithms problem solutions in Java and C++ covering LeetCode, Codeforces and Codolio.",
            language: "C++",
            langColor: "#f34b7d",
            stars: 1,
            forks: 0,
            license: null,
            updated: "Updated on Sep 5, 2026",
            url: "https://github.com/ezManish"
        }
    ];

    renderContributionGraph = (isCompact) => {
        const weeks = 52;
        const days = 7;
        const grid = [];

        for (let w = 0; w < weeks; w++) {
            const weekDays = [];
            for (let d = 0; d < days; d++) {
                const seed = (w * 7 + d * 13) % 100;
                let level = 0;
                if (seed > 85) level = 4;
                else if (seed > 65) level = 3;
                else if (seed > 45) level = 2;
                else if (seed > 25) level = 1;
                weekDays.push(level);
            }
            grid.push(weekDays);
        }

        const colors = [
            "#161b22",
            "#0e4429",
            "#006d32",
            "#26a641",
            "#39d353",
        ];

        return (
            <div className="border border-[#30363d] rounded-md p-3.5 bg-[#0d1117] mt-5">
                <div className="flex justify-between items-center mb-2.5">
                    <span className="text-xs sm:text-sm font-semibold text-white">247 contributions in 2026</span>
                    <div className="text-[11px] text-[#8b949e] flex items-center space-x-1">
                        <span>Less</span>
                        {colors.map((c, i) => (
                            <span key={i} className="inline-block w-2.5 h-2.5 rounded-sm" style={{ backgroundColor: c }}></span>
                        ))}
                        <span>More</span>
                    </div>
                </div>
                <div className="overflow-x-auto pb-1.5 scrollbar-thin">
                    <div className="flex gap-1 min-w-[580px]">
                        {grid.map((week, wIdx) => (
                            <div key={wIdx} className="flex flex-col gap-1">
                                {week.map((lvl, dIdx) => (
                                    <div
                                        key={dIdx}
                                        className="w-2.5 h-2.5 rounded-sm transition-colors hover:ring-1 hover:ring-white"
                                        style={{ backgroundColor: colors[lvl] }}
                                        title={`${lvl > 0 ? (lvl * 2) + 1 : 0} contributions`}
                                    />
                                ))}
                            </div>
                        ))}
                    </div>
                </div>
                <div className="flex justify-between text-[10px] text-[#8b949e] mt-2 px-1">
                    <span>Jan</span><span>Feb</span><span>Mar</span><span>Apr</span><span>May</span><span>Jun</span>
                    <span>Jul</span><span>Aug</span><span>Sep</span><span>Oct</span><span>Nov</span><span>Dec</span>
                </div>
            </div>
        );
    }

    render() {
        const { activeTab, isFollowing, followersCount, searchQuery, filterLanguage, containerWidth } = this.state;

        // Container-aware responsive breakpoints
        const isMaximized = !!this.props.isMaximized;
        const isWide = isMaximized && (containerWidth >= 1150);
        const isMedium = containerWidth >= 580;

        const filteredRepos = this.allRepos.filter(repo => {
            const matchesSearch = repo.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                repo.description.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesLang = filterLanguage === 'all' || repo.language.toLowerCase() === filterLanguage.toLowerCase();
            return matchesSearch && matchesLang;
        });

        return (
            <div
                ref={this.containerRef}
                className="flex-grow flex flex-col bg-[#0d1117] text-[#c9d1d9] overflow-y-auto select-text font-sans text-sm w-full h-full"
            >
                {/* GitHub Top Header */}
                <header className="bg-[#161b22] border-b border-[#30363d] px-3 sm:px-4 py-2 flex items-center justify-between text-xs sticky top-0 z-20">
                    <div className="flex items-center space-x-3">
                        <a href="https://github.com/ezManish" target="_blank" rel="noopener noreferrer" className="hover:opacity-80 flex-shrink-0">
                            <svg height="26" viewBox="0 0 16 16" width="26" fill="white">
                                <path d="M8 0c4.42 0 8 3.58 8 8a8.013 8.013 0 0 1-5.45 7.59c-.4.08-.55-.17-.55-.38 0-.27.01-1.13.01-2.2 0-.75-.25-1.23-.54-1.48 1.78-.2 3.65-.88 3.65-3.95 0-.88-.31-1.59-.82-2.15.08-.2.36-1.02-.08-2.12 0 0-.67-.22-2.2.82-.64-.18-1.32-.27-2-.27-.68 0-1.36.09-2 .27-1.53-1.03-2.2-.82-2.2-.82-.44 1.1-.16 1.92-.08 2.12-.51.56-.82 1.28-.82 2.15 0 3.06 1.86 3.75 3.64 3.95-.23.2-.44.55-.51 1.07-.46.21-1.61.55-2.33-.66-.15-.24-.6-.83-1.23-.82-.67.01-.27.38.01.53.34.19.73.9.82 1.13.16.45.68 1.31 2.69.94 0 .67.01 1.3.01 1.49 0 .21-.15.45-.55.38A7.995 7.995 0 0 1 0 8c0-4.42 3.58-8 8-8Z"></path>
                            </svg>
                        </a>
                        {containerWidth >= 550 && (
                            <div className="flex items-center bg-[#0d1117] border border-[#30363d] rounded-md px-2 py-0.5 text-[#8b949e] w-48 sm:w-56 text-[11px]">
                                <span className="flex-grow truncate">Type <kbd className="border border-[#30363d] rounded px-1 text-[9px] bg-[#161b22]">/</kbd> to search</span>
                            </div>
                        )}
                        {containerWidth >= 780 && (
                            <nav className="flex items-center space-x-2.5 text-white text-xs font-medium">
                                <span className="hover:text-[#58a6ff] cursor-pointer">Pull requests</span>
                                <span className="hover:text-[#58a6ff] cursor-pointer">Issues</span>
                                <span className="hover:text-[#58a6ff] cursor-pointer">Explore</span>
                            </nav>
                        )}
                    </div>
                    <div className="flex items-center space-x-2.5 flex-shrink-0">
                        <a
                            href="https://github.com/ezManish"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center space-x-1 bg-[#238636] hover:bg-[#2ea043] text-white font-medium px-2 py-1 rounded text-xs transition"
                        >
                            <span>Open on GitHub</span>
                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                            </svg>
                        </a>
                        <img
                            src="https://avatars.githubusercontent.com/u/193204489?v=4"
                            alt="Manish Avatar"
                            className="w-5 h-5 sm:w-6 sm:h-6 rounded-full border border-gray-700 object-cover"
                        />
                    </div>
                </header>

                {/* GitHub Subnav Tabs */}
                <div className="bg-[#0d1117] border-b border-[#30363d] px-3 sm:px-6 flex space-x-4 sm:space-x-6 text-xs sm:text-sm overflow-x-auto">
                    <button
                        onClick={() => this.setState({ activeTab: 'overview' })}
                        className={`py-2.5 px-1 border-b-2 font-medium flex items-center space-x-1.5 transition flex-shrink-0 ${
                            activeTab === 'overview'
                                ? 'border-[#f78166] text-white font-semibold'
                                : 'border-transparent text-[#8b949e] hover:text-[#c9d1d9]'
                        }`}
                    >
                        <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 16 16">
                            <path d="M0 1.75A.75.75 0 0 1 .75 1h4.253c1.227 0 2.317.59 3 1.501A3.743 3.743 0 0 1 11.006 1h4.245a.75.75 0 0 1 .75.75v10.5a.75.75 0 0 1-.75.75h-4.507a2.25 2.25 0 0 0-1.591.659l-.622.621a.75.75 0 0 1-1.06 0l-.622-.621A2.25 2.25 0 0 0 5.258 13H.75a.75.75 0 0 1-.75-.75Zm7.251 10.324.004-9.074c-.588-.58-1.415-.934-2.251-.934H1.5v8.934h3.758c.732 0 1.433.272 1.993.774Zm1.5 0c.56-.502 1.261-.774 1.993-.774h3.758V2.066h-3.751c-.836 0-1.663.354-2.251.934l.004 9.074Z" />
                        </svg>
                        <span>Overview</span>
                    </button>

                    <button
                        onClick={() => this.setState({ activeTab: 'repositories' })}
                        className={`py-2.5 px-1 border-b-2 font-medium flex items-center space-x-1.5 transition flex-shrink-0 ${
                            activeTab === 'repositories'
                                ? 'border-[#f78166] text-white font-semibold'
                                : 'border-transparent text-[#8b949e] hover:text-[#c9d1d9]'
                        }`}
                    >
                        <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 16 16">
                            <path d="M2 2.5A2.5 2.5 0 0 1 4.5 0h8.75a.75.75 0 0 1 .75.75v12.5a.75.75 0 0 1-.75.75h-2.5a.75.75 0 0 1 0-1.5h1.75v-2h-8a1 1 0 0 0-.714 1.7.75.75 0 1 1-1.072 1.05A2.495 2.495 0 0 1 2 11.5Zm10.5-1h-8a1 1 0 0 0-1 1v6.708A2.486 2.486 0 0 1 4.5 9h8ZM5 12.25a.25.25 0 0 1 .25-.25h6.5a.25.25 0 0 1 .25.25v1.5a.25.25 0 0 1-.25.25h-6.5a.25.25 0 0 1-.25-.25Z" />
                        </svg>
                        <span>Repositories</span>
                        <span className="bg-[#30363d] text-[#c9d1d9] text-[10px] px-1.5 py-0.2 rounded-full font-normal">20</span>
                    </button>

                    <button
                        onClick={() => this.setState({ activeTab: 'projects' })}
                        className={`py-2.5 px-1 border-b-2 font-medium flex items-center space-x-1.5 transition flex-shrink-0 ${
                            activeTab === 'projects'
                                ? 'border-[#f78166] text-white font-semibold'
                                : 'border-transparent text-[#8b949e] hover:text-[#c9d1d9]'
                        }`}
                    >
                        <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 16 16">
                            <path d="M1.75 0h12.5C15.216 0 16 .784 16 1.75v12.5A1.75 1.75 0 0 1 14.25 16H1.75A1.75 1.75 0 0 1 0 14.25V1.75C0 .784.784 0 1.75 0ZM1.5 1.75v12.5c0 .138.112.25.25.25h12.5a.25.25 0 0 0 .25-.25V1.75a.25.25 0 0 0-.25-.25H1.75a.25.25 0 0 0-.25.25ZM11.75 3a.75.75 0 0 1 .75.75v7.5a.75.75 0 0 1-1.5 0v-7.5a.75.75 0 0 1 .75-.75Zm-8.25.75a.75.75 0 0 1 1.5 0v5.5a.75.75 0 0 1-1.5 0ZM8 3a.75.75 0 0 1 .75.75v3.5a.75.75 0 0 1-1.5 0v-3.5A.75.75 0 0 1 8 3Z" />
                        </svg>
                        <span>Projects</span>
                    </button>
                </div>

                {/* Main Profile Layout */}
                <div className="w-full max-w-6xl mx-auto p-4 sm:p-6">
                    {/* Compact Profile Header for Non-Maximized/Windowed Mode */}
                    {!isWide && (
                        <div className="bg-[#161b22] border border-[#30363d] rounded-lg p-3.5 sm:p-4 mb-5">
                            <div className="flex items-start sm:items-center space-x-3 sm:space-x-4">
                                <div className="relative flex-shrink-0">
                                    <img
                                        src="https://avatars.githubusercontent.com/u/193204489?v=4"
                                        alt="Manish Kumar"
                                        className="w-14 h-14 sm:w-18 sm:h-18 rounded-full border border-[#30363d] object-cover"
                                    />
                                    <div className="absolute -bottom-1 -right-1 bg-[#0d1117] border border-[#30363d] rounded-full p-0.5 text-xs shadow">
                                        🎯
                                    </div>
                                </div>
                                <div className="flex-grow min-w-0">
                                    <div className="flex flex-wrap items-center justify-between gap-2">
                                        <div>
                                            <h1 className="text-lg sm:text-xl font-bold text-white leading-tight">Manish Kumar</h1>
                                            <p className="text-xs sm:text-sm text-[#8b949e]">ezManish</p>
                                        </div>
                                        <button
                                            onClick={this.toggleFollow}
                                            className={`py-1 px-3 rounded-md border font-medium text-xs transition ${
                                                isFollowing
                                                    ? 'bg-[#21262d] border-[#30363d] text-white hover:bg-[#30363d]'
                                                    : 'bg-[#21262d] border-[#30363d] text-[#c9d1d9] hover:bg-[#30363d] hover:text-white'
                                            }`}
                                        >
                                            {isFollowing ? '✓ Following' : 'Follow'}
                                        </button>
                                    </div>
                                    <p className="text-xs text-[#c9d1d9] mt-1.5 leading-relaxed">
                                        B.Tech CS undergrad focused on backend development. Proficient in Java, C++, Spring Boot and MySQL currently deepening my DSA and system design skills.
                                    </p>
                                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-2 text-[11px] text-[#8b949e]">
                                        <div className="flex items-center space-x-1">
                                            <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 16 16">
                                                <path d="M2 5.5a3.5 3.5 0 1 1 5.898 2.549 5.508 5.508 0 0 1 3.034 4.084.75.75 0 1 1-1.482.234 4.002 4.002 0 0 0-7.89 0 .75.75 0 0 1-1.482-.234A5.508 5.508 0 0 1 1.102 8.05 3.493 3.493 0 0 1 2 5.5ZM5.5 3.5a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm4.5 4a3.5 3.5 0 1 1 5.898 2.549 5.508 5.508 0 0 1 3.034 4.084.75.75 0 1 1-1.482.234 4.002 4.002 0 0 0-7.89 0 .75.75 0 0 1-1.482-.234A5.508 5.508 0 0 1 9.102 10.05 3.493 3.493 0 0 1 10 7.5ZM13.5 5.5a2 2 0 1 0 0 4 2 2 0 0 0 0-4Z" />
                                            </svg>
                                            <span className="font-semibold text-white">{followersCount}</span>
                                            <span>followers · <strong className="text-white font-semibold">0</strong> following</span>
                                        </div>
                                        <span>·</span>
                                        <span>🎓 B.Tech CS</span>
                                        <span>·</span>
                                        <span>📍 India</span>
                                        <span>·</span>
                                        <a href="https://ezmanish.github.io/Manish_Portfolio/" target="_blank" rel="noopener noreferrer" className="text-[#58a6ff] hover:underline">
                                            ezmanish.github.io
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    <div className={isWide ? "flex gap-8" : "w-full"}>
                        {/* Classic Left Sidebar: Only shown in Wide / Maximized Mode */}
                        {isWide && (
                            <div className="w-64 flex-shrink-0 flex flex-col">
                                <div className="relative group mb-4">
                                    <img
                                        src="https://avatars.githubusercontent.com/u/193204489?v=4"
                                        alt="Manish Kumar"
                                        className="w-56 h-56 rounded-full border border-[#30363d] shadow-lg object-cover"
                                    />
                                    <div className="absolute bottom-3 right-5 bg-[#161b22] border border-[#30363d] rounded-full p-1.5 shadow text-sm">
                                        🎯
                                    </div>
                                </div>

                                <div className="mb-3">
                                    <h1 className="text-2xl font-bold text-white leading-tight">Manish Kumar</h1>
                                    <p className="text-base text-[#8b949e] font-light">ezManish</p>
                                </div>

                                <button
                                    onClick={this.toggleFollow}
                                    className={`w-full py-1.5 px-3 rounded-md border font-medium text-xs transition mb-3.5 ${
                                        isFollowing
                                            ? 'bg-[#21262d] border-[#30363d] text-white hover:bg-[#30363d]'
                                            : 'bg-[#21262d] border-[#30363d] text-[#c9d1d9] hover:bg-[#30363d] hover:text-white'
                                    }`}
                                >
                                    {isFollowing ? '✓ Following' : 'Follow'}
                                </button>

                                <p className="text-xs text-[#c9d1d9] mb-4 leading-relaxed">
                                    B.Tech CS undergrad focused on backend development. Proficient in Java, C++, Spring Boot and MySQL currently deepening my DSA and system design skills.
                                </p>

                                <div className="flex items-center space-x-2 text-xs text-[#8b949e] mb-4">
                                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 16 16">
                                        <path d="M2 5.5a3.5 3.5 0 1 1 5.898 2.549 5.508 5.508 0 0 1 3.034 4.084.75.75 0 1 1-1.482.234 4.002 4.002 0 0 0-7.89 0 .75.75 0 0 1-1.482-.234A5.508 5.508 0 0 1 1.102 8.05 3.493 3.493 0 0 1 2 5.5ZM5.5 3.5a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm4.5 4a3.5 3.5 0 1 1 5.898 2.549 5.508 5.508 0 0 1 3.034 4.084.75.75 0 1 1-1.482.234 4.002 4.002 0 0 0-7.89 0 .75.75 0 0 1-1.482-.234A5.508 5.508 0 0 1 9.102 10.05 3.493 3.493 0 0 1 10 7.5ZM13.5 5.5a2 2 0 1 0 0 4 2 2 0 0 0 0-4Z" />
                                    </svg>
                                    <span className="font-semibold text-white">{followersCount}</span>
                                    <span>followers · <strong className="text-white">0</strong> following</span>
                                </div>

                                <div className="border-t border-[#30363d] pt-3.5 space-y-2 text-xs text-[#8b949e]">
                                    <div className="flex items-center space-x-2">
                                        <span>🎓</span>
                                        <span>B.Tech Computer Science</span>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <span>📍</span>
                                        <span>India</span>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <span>🔗</span>
                                        <a href="https://ezmanish.github.io/Manish_Portfolio/" target="_blank" rel="noopener noreferrer" className="text-[#58a6ff] hover:underline truncate">
                                            ezmanish.github.io
                                        </a>
                                    </div>
                                </div>

                                <div className="border-t border-[#30363d] mt-4 pt-3.5">
                                    <h2 className="text-xs font-semibold text-white mb-2">Achievements</h2>
                                    <div className="flex space-x-2">
                                        <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-[#161b22] border border-[#30363d] text-sm" title="Pull Shark">🦈</span>
                                        <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-[#161b22] border border-[#30363d] text-sm" title="Quickdraw">⚡</span>
                                        <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-[#161b22] border border-[#30363d] text-sm" title="Arctic Code Vault">❄️</span>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Content Area */}
                        <div className="flex-grow min-w-0">
                            {activeTab === 'overview' && (
                                <div>
                                    <div className="flex justify-between items-center mb-3">
                                        <h2 className="text-xs sm:text-sm font-semibold text-white">Pinned</h2>
                                        <span className="text-[11px] text-[#8b949e]">Customize your pins</span>
                                    </div>

                                    {/* Pinned Repositories Grid: Adapts cleanly to 2 cols or 1 col based on container width */}
                                    <div className={`grid gap-3.5 ${isMedium ? 'grid-cols-2' : 'grid-cols-1'}`}>
                                        {this.pinnedRepos.map((repo, idx) => (
                                            <div
                                                key={idx}
                                                className="p-3.5 rounded-md border border-[#30363d] bg-[#0d1117] hover:border-[#8b949e] transition flex flex-col justify-between"
                                            >
                                                <div>
                                                    <div className="flex items-center justify-between mb-1.5">
                                                        <a
                                                            href={repo.url}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="text-[#58a6ff] font-semibold text-xs sm:text-sm hover:underline flex items-center space-x-1.5 truncate mr-2"
                                                        >
                                                            <svg className="w-3.5 h-3.5 text-[#8b949e] flex-shrink-0" fill="currentColor" viewBox="0 0 16 16">
                                                                <path d="M2 2.5A2.5 2.5 0 0 1 4.5 0h8.75a.75.75 0 0 1 .75.75v12.5a.75.75 0 0 1-.75.75h-2.5a.75.75 0 0 1 0-1.5h1.75v-2h-8a1 1 0 0 0-.714 1.7.75.75 0 1 1-1.072 1.05A2.495 2.495 0 0 1 2 11.5Zm10.5-1h-8a1 1 0 0 0-1 1v6.708A2.486 2.486 0 0 1 4.5 9h8ZM5 12.25a.25.25 0 0 1 .25-.25h6.5a.25.25 0 0 1 .25.25v1.5a.25.25 0 0 1-.25.25h-6.5a.25.25 0 0 1-.25-.25Z" />
                                                            </svg>
                                                            <span className="truncate">{repo.name}</span>
                                                        </a>
                                                        <span className="text-[10px] text-[#8b949e] border border-[#30363d] rounded-full px-1.5 py-0.2 flex-shrink-0">Public</span>
                                                    </div>
                                                    <p className="text-xs text-[#8b949e] mb-2.5 leading-relaxed line-clamp-2">
                                                        {repo.description}
                                                    </p>
                                                </div>

                                                <div className="flex items-center space-x-3.5 text-xs text-[#8b949e] pt-1">
                                                    <div className="flex items-center space-x-1.5">
                                                        <span className="w-2.5 h-2.5 rounded-full inline-block flex-shrink-0" style={{ backgroundColor: repo.langColor }}></span>
                                                        <span>{repo.language}</span>
                                                    </div>
                                                    {repo.stars > 0 && (
                                                        <div className="flex items-center space-x-1">
                                                            <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 16 16">
                                                                <path d="M8 .25a.75.75 0 0 1 .673.418l1.882 3.815 4.21.612a.75.75 0 0 1 .416 1.279l-3.046 2.97.719 4.192a.751.751 0 0 1-1.088.791L8 12.347l-3.766 1.98a.75.75 0 0 1-1.088-.79l.72-4.194L.818 6.374a.75.75 0 0 1 .416-1.28l4.21-.611L7.327.668A.75.75 0 0 1 8 .25Z" />
                                                            </svg>
                                                            <span>{repo.stars}</span>
                                                        </div>
                                                    )}
                                                    {repo.forks > 0 && (
                                                        <div className="flex items-center space-x-1">
                                                            <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 16 16">
                                                                <path d="M5 3.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm0 2.122a2.25 2.25 0 1 0-1.5 0v.878A2.25 2.25 0 0 0 5.75 8.5h4.5A2.25 2.25 0 0 0 12.5 6.25v-.878a2.25 2.25 0 1 0-1.5 0v.878a.75.75 0 0 1-.75.75h-4.5A.75.75 0 0 1 5 6.25v-.878ZM10.5 4a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM7.75 10.5a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM7 12.622a2.25 2.25 0 1 0 1.5 0V8.75a.75.75 0 0 0-1.5 0v3.872Z" />
                                                            </svg>
                                                            <span>{repo.forks}</span>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Contribution Graph */}
                                    {this.renderContributionGraph(!isWide)}

                                    {/* Contribution Activity Log */}
                                    <div className="mt-5">
                                        <h3 className="text-xs font-semibold text-white mb-2.5">Contribution Activity</h3>
                                        <div className="border-l-2 border-[#30363d] ml-2.5 pl-3.5 space-y-3 text-xs">
                                            <div className="relative">
                                                <div className="absolute -left-[19px] top-1 w-2 h-2 rounded-full bg-[#30363d] border-2 border-[#0d1117]"></div>
                                                <p className="text-white font-medium">Created 20 repositories in 2026</p>
                                                <p className="text-[#8b949e] text-[11px]">Traject, CuratiX, Aegis-Desktop, pdf-to-images-cli, EaseMotion-css, and others</p>
                                            </div>
                                            <div className="relative">
                                                <div className="absolute -left-[19px] top-1 w-2 h-2 rounded-full bg-[#238636] border-2 border-[#0d1117]"></div>
                                                <p className="text-white font-medium">114 commits pushed to main</p>
                                                <p className="text-[#8b949e] text-[11px]">Backend services, algorithm optimisations, and UI components</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {activeTab === 'repositories' && (
                                <div>
                                    <div className="flex flex-col sm:flex-row gap-2.5 justify-between items-stretch sm:items-center mb-4 pb-3 border-b border-[#30363d]">
                                        <input
                                            type="text"
                                            placeholder="Find a repository..."
                                            value={searchQuery}
                                            onChange={(e) => this.setState({ searchQuery: e.target.value })}
                                            className="w-full sm:w-72 bg-[#161b22] border border-[#30363d] rounded-md px-3 py-1.5 text-xs text-white placeholder-[#8b949e] outline-none focus:border-[#58a6ff]"
                                        />
                                        <div className="flex space-x-2 text-xs self-end sm:self-auto">
                                            <select
                                                value={filterLanguage}
                                                onChange={(e) => this.setState({ filterLanguage: e.target.value })}
                                                className="bg-[#21262d] border border-[#30363d] rounded-md px-2.5 py-1 text-[#c9d1d9] outline-none text-xs"
                                            >
                                                <option value="all">All Languages</option>
                                                <option value="python">Python</option>
                                                <option value="javascript">JavaScript</option>
                                                <option value="java">Java</option>
                                                <option value="c++">C++</option>
                                                <option value="css">CSS</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div className="divide-y divide-[#30363d]">
                                        {filteredRepos.map((repo, idx) => (
                                            <div key={idx} className="py-3.5 flex justify-between items-start gap-4">
                                                <div className="space-y-1 min-w-0">
                                                    <div className="flex items-center space-x-2">
                                                        <a
                                                            href={repo.url}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="text-sm sm:text-base text-[#58a6ff] font-semibold hover:underline truncate"
                                                        >
                                                            {repo.name}
                                                        </a>
                                                        <span className="text-[10px] text-[#8b949e] border border-[#30363d] rounded-full px-1.5 py-0.2 flex-shrink-0">Public</span>
                                                    </div>
                                                    <p className="text-xs text-[#8b949e] line-clamp-2">{repo.description}</p>
                                                    <div className="flex items-center space-x-3.5 text-xs text-[#8b949e] pt-1">
                                                        <div className="flex items-center space-x-1.5">
                                                            <span className="w-2 h-2 rounded-full inline-block" style={{ backgroundColor: repo.langColor }}></span>
                                                            <span>{repo.language}</span>
                                                        </div>
                                                        {repo.license && (
                                                            <span>{repo.license}</span>
                                                        )}
                                                        <span className="hidden sm:inline">{repo.updated}</span>
                                                    </div>
                                                </div>
                                                <a
                                                    href={repo.url}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="bg-[#21262d] hover:bg-[#30363d] border border-[#30363d] text-xs px-2.5 py-1 rounded-md text-white font-medium flex items-center space-x-1 flex-shrink-0"
                                                >
                                                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 16 16">
                                                        <path d="M8 .25a.75.75 0 0 1 .673.418l1.882 3.815 4.21.612a.75.75 0 0 1 .416 1.279l-3.046 2.97.719 4.192a.751.751 0 0 1-1.088.791L8 12.347l-3.766 1.98a.75.75 0 0 1-1.088-.79l.72-4.194L.818 6.374a.75.75 0 0 1 .416-1.28l4.21-.611L7.327.668A.75.75 0 0 1 8 .25Z" />
                                                    </svg>
                                                    <span>Star</span>
                                                </a>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {activeTab === 'projects' && (
                                <div className="text-center py-10 border border-[#30363d] rounded-md bg-[#0d1117]">
                                    <span className="text-2xl block mb-2">📋</span>
                                    <h3 className="text-sm font-semibold text-white mb-1">Portfolio & Active Projects</h3>
                                    <p className="text-xs text-[#8b949e] max-w-sm mx-auto px-4">
                                        All personal and university engineering projects are actively tracked and updated on GitHub.
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default GitHubProfile;
