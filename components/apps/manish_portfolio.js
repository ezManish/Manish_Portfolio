import React, { Component } from 'react';
import ImageViewer from './image_viewer';

export class AboutManish extends Component {

    constructor() {
        super();
        this.state = {
            active_screen: "about", // by default 'about' screen is active
            navbar: false,
            viewerImage: null,
        }
    }

    componentDidMount() {
        let lastVisitedScreen = localStorage.getItem("about-section");
        if (lastVisitedScreen === null || lastVisitedScreen === undefined) {
            lastVisitedScreen = "about";
        }

        // focus last visited screen
        const targetEl = document.getElementById(lastVisitedScreen);
        if (targetEl) {
            this.changeScreen(targetEl);
        } else {
            this.setState({ active_screen: lastVisitedScreen });
        }

        window.addEventListener('resize', this.handleResize);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.handleResize);
    }

    handleResize = () => {
        this.forceUpdate();
    }

    getIsMaximized = () => {
        if (typeof this.props.isMaximized === 'boolean') {
            return this.props.isMaximized;
        }
        if (typeof document !== 'undefined') {
            const win = document.querySelector('#about-manish');
            if (win && (win.classList.contains('rounded-none') || win.style.width === '100.2%')) {
                return true;
            }
        }
        return false;
    }

    changeScreen = (e) => {
        const screen = e.id || e.target.id;

        // store this state
        localStorage.setItem("about-section", screen);

        this.setState({
            active_screen: screen
        });
    }

    showNavBar = () => {
        this.setState({ navbar: !this.state.navbar });
    }

    openImageViewer = (src, title) => {
        this.setState({ viewerImage: { src, title } });
    }

    closeImageViewer = () => {
        this.setState({ viewerImage: null });
    }

    renderScreen = () => {
        switch (this.state.active_screen) {
            case "about":
                return <About onOpenImageViewer={this.openImageViewer} />;
            case "education":
                return <EducationAndAchievements onOpenImageViewer={this.openImageViewer} />;
            case "skills":
                return <Skills />;
            case "projects":
                return <Projects onOpenImageViewer={this.openImageViewer} />;
            case "resume":
                return <Resume />;
            default:
                return <About onOpenImageViewer={this.openImageViewer} />;
        }
    }

    renderNavLinks = () => {
        const isMaximized = this.getIsMaximized();
        const eduLabel = isMaximized ? "Education & Achievements" : "Edu & achiev...";

        return (
            <>
                <div id="about" tabIndex="0" onFocus={this.changeScreen} className={(this.state.active_screen === "about" ? " bg-ub-orange bg-opacity-100 hover:bg-opacity-95" : " hover:bg-gray-50 hover:bg-opacity-5 ") + " w-28 md:w-full md:rounded-none rounded-sm cursor-default outline-none py-1.5 focus:outline-none duration-100 my-0.5 flex justify-start items-center pl-2 md:pl-2.5"}>
                    <img className=" w-3 md:w-4" alt="about manish" src="./themes/Yaru/status/about.svg" />
                    <span className=" ml-1 md:ml-2 text-gray-50 ">About Me</span>
                </div>
                <div id="education" tabIndex="0" onFocus={this.changeScreen} title="Education & Achievements" className={(this.state.active_screen === "education" ? " bg-ub-orange bg-opacity-100 hover:bg-opacity-95" : " hover:bg-gray-50 hover:bg-opacity-5 ") + " w-28 md:w-full md:rounded-none rounded-sm cursor-default outline-none py-1.5 focus:outline-none duration-100 my-0.5 flex justify-start items-center pl-2 md:pl-2.5"}>
                    <img className=" w-3 md:w-4 flex-shrink-0" alt="manish's education" src="./themes/Yaru/status/education.svg" />
                    <div className="relative ml-1 md:ml-2 text-gray-50 text-xs md:text-sm h-5 flex items-center overflow-hidden">
                        <span
                            className={`whitespace-nowrap transition-all duration-300 ease-in-out ${
                                isMaximized
                                    ? 'opacity-100 translate-x-0'
                                    : 'opacity-0 -translate-x-2 pointer-events-none absolute'
                            }`}
                        >
                            Education & Achievements
                        </span>
                        <span
                            className={`whitespace-nowrap transition-all duration-300 ease-in-out ${
                                !isMaximized
                                    ? 'opacity-100 translate-x-0'
                                    : 'opacity-0 translate-x-2 pointer-events-none absolute'
                            }`}
                        >
                            Edu & achiev...
                        </span>
                    </div>
                </div>
                <div id="skills" tabIndex="0" onFocus={this.changeScreen} className={(this.state.active_screen === "skills" ? " bg-ub-orange bg-opacity-100 hover:bg-opacity-95" : " hover:bg-gray-50 hover:bg-opacity-5 ") + " w-28 md:w-full md:rounded-none rounded-sm cursor-default outline-none py-1.5 focus:outline-none duration-100 my-0.5 flex justify-start items-center pl-2 md:pl-2.5"}>
                    <img className=" w-3 md:w-4" alt="manish's skills" src="./themes/Yaru/status/skills.svg" />
                    <span className=" ml-1 md:ml-2 text-gray-50 ">Skills</span>
                </div>
                <div id="projects" tabIndex="0" onFocus={this.changeScreen} className={(this.state.active_screen === "projects" ? " bg-ub-orange bg-opacity-100 hover:bg-opacity-95" : " hover:bg-gray-50 hover:bg-opacity-5 ") + " w-28 md:w-full md:rounded-none rounded-sm cursor-default outline-none py-1.5 focus:outline-none duration-100 my-0.5 flex justify-start items-center pl-2 md:pl-2.5"}>
                    <img className=" w-3 md:w-4" alt="manish's projects" src="./themes/Yaru/status/projects.svg" />
                    <span className=" ml-1 md:ml-2 text-gray-50 ">Projects</span>
                </div>
                <div id="resume" tabIndex="0" onFocus={this.changeScreen} className={(this.state.active_screen === "resume" ? " bg-ub-orange bg-opacity-100 hover:bg-opacity-95" : " hover:bg-gray-50 hover:bg-opacity-5 ") + " w-28 md:w-full md:rounded-none rounded-sm cursor-default outline-none py-1.5 focus:outline-none duration-100 my-0.5 flex justify-start items-center pl-2 md:pl-2.5"}>
                    <img className=" w-3 md:w-4" alt="manish's resume" src="./themes/Yaru/status/download.svg" />
                    <span className=" ml-1 md:ml-2 text-gray-50 ">Resume</span>
                </div>
            </>
        );
    }

    render() {
        return (
            <div className="w-full h-full flex bg-ub-cool-grey text-white select-none relative">
                {this.state.viewerImage && (
                    <ImageViewer
                        src={this.state.viewerImage.src}
                        title={this.state.viewerImage.title}
                        onClose={this.closeImageViewer}
                    />
                )}
                <div className="md:flex hidden flex-col w-1/4 md:w-1/5 text-sm overflow-y-auto windowMainScreen border-r border-black">
                    {this.renderNavLinks()}
                </div>
                <div onClick={this.showNavBar} className="md:hidden flex flex-col items-center justify-center absolute bg-ub-cool-grey rounded w-6 h-6 top-1 left-1">
                    <div className=" w-3.5 border-t border-white"></div>
                    <div className=" w-3.5 border-t border-white" style={{ marginTop: "2pt", marginBottom: "2pt" }}></div>
                    <div className=" w-3.5 border-t border-white"></div>
                    <div className={(this.state.navbar ? " visible animateShow z-30 " : " invisible ") + " md:hidden text-xs absolute bg-ub-cool-grey py-0.5 px-1 rounded-sm top-full mt-1 left-0 shadow border-black border border-opacity-20"}>
                        {this.renderNavLinks()}
                    </div>
                </div>
                <div className={"flex flex-col w-3/4 md:w-4/5 justify-start items-center flex-grow bg-ub-grey overflow-y-auto windowMainScreen " + (this.state.active_screen === "resume" ? "" : "pb-8 md:pb-12")}>
                    {this.renderScreen()}
                    {this.state.active_screen !== "resume" && <div className="w-full h-10 md:h-14 flex-shrink-0"></div>}
                </div>
            </div>
        );
    }
}

export default AboutManish;

export const displayAboutManish = (isMaximized) => {
    return <AboutManish isMaximized={isMaximized} />;
}


function About({ onOpenImageViewer }) {
    return (
        <>
            <div className="w-5/6 md:w-3/4 flex flex-row items-center justify-between mt-6 md:mt-8 gap-4 md:gap-6">
                <div className="flex justify-center items-center flex-shrink-0" style={{ width: "30%" }}>
                    <img
                        className="w-full max-w-[160px] md:max-w-[220px] h-auto object-contain cursor-pointer hover:opacity-95 transition-opacity"
                        src="./images/logos/me.png"
                        alt="Manish Kumar"
                        title="Double-click to open in Photos"
                        onDoubleClick={() => onOpenImageViewer && onOpenImageViewer('./images/logos/me.png', 'Manish Kumar')}
                    />
                </div>
                <div className="flex flex-col justify-center items-start text-left pl-2" style={{ width: "70%" }}>
                    <div className="text-xl sm:text-2xl md:text-3xl font-light text-gray-200 leading-snug">
                        my name is <span className="font-bold text-white">Manish Kumar</span> ,
                    </div>
                    <div className="text-lg sm:text-xl md:text-2xl font-normal mt-1 text-gray-300">
                        I'm a <span className="text-pink-500 font-bold">Backend Developer!</span>
                    </div>
                </div>
            </div>
            <div className="mt-4 md:mt-6 relative pt-px bg-white w-5/6 md:w-3/4">
                <div className="bg-white absolute rounded-full p-0.5 md:p-1 top-0 transform -translate-y-1/2 left-0"></div>
                <div className="bg-white absolute rounded-full p-0.5 md:p-1 top-0 transform -translate-y-1/2 right-0"></div>
            </div>
            <ul className="mt-6 space-y-3.5 text-sm md:text-base w-5/6 md:w-3/4 mb-6">
                <li className="flex items-start gap-3 leading-relaxed text-gray-200">
                    <span className="w-2 h-2 rounded-full bg-ub-orange mt-2 flex-shrink-0"></span>
                    <div>
                        I'm a <span className="font-medium text-white">Computer Science undergraduate</span> at Galgotias University with knowledge of data structures, algorithms, and software development.
                    </div>
                </li>
                <li className="flex items-start gap-3 leading-relaxed text-gray-200">
                    <span className="w-2 h-2 rounded-full bg-ub-orange mt-2 flex-shrink-0"></span>
                    <div>
                        I work with <strong className="text-ubt-gedit-orange">Java, Spring Boot, C++, Python, SQL</strong>, and backend technologies through academic and personal projects.
                    </div>
                </li>
                <li className="flex items-start gap-3 leading-relaxed text-gray-200">
                    <span className="w-2 h-2 rounded-full bg-ub-orange mt-2 flex-shrink-0"></span>
                    <div>
                        Global Rank #63 (A-Tier) Contributor in <span className="font-medium text-white">GirlScript Summer of Code (GSSoC '26)</span> with 100+ merged PRs across 7 open-source repositories, and Collaborator on AlgoBuddy.
                    </div>
                </li>
                <li className="flex items-start gap-3 leading-relaxed text-gray-200">
                    <span className="w-2 h-2 rounded-full bg-ub-orange mt-2 flex-shrink-0"></span>
                    <div>
                        Solved <span className="font-medium text-white">350+ problems</span> across coding platforms with 1500+ rating on LeetCode. Winner of GDG TechSprint hackathon (2026) and 1st place at Idea Discovery (Galgotias Incubation Centre).
                    </div>
                </li>
                <li className="flex items-start gap-3 leading-relaxed text-gray-200">
                    <span className="w-2 h-2 rounded-full bg-ub-orange mt-2 flex-shrink-0"></span>
                    <div>
                        Interested in building practical software, solving programming problems, and exploring backend and full-stack opportunities.
                    </div>
                </li>
            </ul>
        </>
    )
}

function EducationAndAchievements({ onOpenImageViewer }) {
    const gssocBadges = [
        { name: "Global Rank #63 (Top 100)", img: "./images/badge/gssoc-badge-top_100.png" },
        { name: "GSSoC Legend", img: "./images/badge/gssoc-badge-legend.png" },
        { name: "GSSoC Champion", img: "./images/badge/gssoc-badge-gssoc_champion.png" },
        { name: "First Steps", img: "./images/badge/gssoc-badge-first_steps.png" },
    ];

    const certBadges = [
        {
            name: "GDG on Campus - Galgotias University",
            issuer: "Google Developer Groups",
            certId: "CERT-AC5B0844-3D10-4154",
            img: "./images/badge/GDG.jpg",
        },
        {
            name: "Networking Basics",
            issuer: "Cisco Networking Academy / Credly",
            img: "./images/badge/networking-basics.png",
        },
        {
            name: "Getting Started with Linux Fundamentals",
            issuer: "Red Hat Training",
            img: "./images/badge/red-hat-training-getting-started-with-linux-fundame.1.png",
        },
        {
            name: "Google Solution Challenge 2026",
            issuer: "All-India National Competition",
            url: "https://promptwars.in/solutionchallenge2026.html",
            img: "./images/badge/badge.png",
        },
    ];

    return (
        <>
            <div className="font-medium relative text-2xl mt-2 md:mt-4 mb-4">
                Education & Achievements
                <div className="absolute pt-px bg-white mt-px top-full w-full">
                    <div className="bg-white absolute rounded-full p-0.5 md:p-1 top-0 transform -translate-y-1/2 left-full"></div>
                    <div className="bg-white absolute rounded-full p-0.5 md:p-1 top-0 transform -translate-y-1/2 right-full"></div>
                </div>
            </div>

            <div className="w-10/12 flex flex-col space-y-8 my-4">
                {/* 1. Academic Education */}
                <div>
                    <div className="text-sm md:text-base font-bold text-gray-200 mb-3 border-b border-gray-700 pb-1 flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-ub-orange"></span>
                        <span>Academic Education</span>
                    </div>
                    <div className="space-y-3">
                        <div className="p-3.5 rounded-lg bg-gray-900 bg-opacity-40 border border-gray-800 hover:border-gray-700 transition-all duration-200 flex flex-col sm:flex-row items-start sm:items-center gap-4">
                            <div className="w-14 h-14 md:w-16 md:h-16 rounded-full overflow-hidden bg-white p-1 border border-gray-700 shadow flex-shrink-0 flex items-center justify-center">
                                <img
                                    src="./images/logos/Galgotias.png"
                                    alt="Galgotias University"
                                    className="w-full h-full object-contain rounded-full"
                                    style={{ borderRadius: "50%" }}
                                />
                            </div>
                            <div className="flex-1 w-full">
                                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start">
                                    <div>
                                        <div className="text-base md:text-lg font-bold text-white leading-tight">
                                            Galgotias University, Greater Noida
                                        </div>
                                        <div className="text-sm text-gray-300 font-medium mt-0.5">
                                            B. Tech in Computer Science and Engineering
                                        </div>
                                    </div>
                                    <span className="text-xs text-ub-orange font-mono font-medium px-2 py-0.5 bg-ub-orange bg-opacity-10 border border-ub-orange border-opacity-30 rounded self-start mt-1 sm:mt-0">
                                        2024 – 2028
                                    </span>
                                </div>
                                <div className="text-xs md:text-sm text-gray-400 mt-2 flex items-center gap-2">
                                    <span className="text-gray-300">CGPA:</span>
                                    <span className="text-white font-bold bg-gray-800 px-2 py-0.5 rounded border border-gray-700">8.64</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 2. Hackathons & Honors */}
                <div>
                    <div className="text-sm md:text-base font-bold text-gray-200 mb-3 border-b border-gray-700 pb-1 flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-ub-orange"></span>
                        <span>Hackathons & Honors</span>
                    </div>
                    <div className="space-y-3">
                        {/* Google Solution Challenge 2026 */}
                        <div className="p-3.5 rounded-lg bg-gray-900 bg-opacity-40 border border-gray-800 hover:border-gray-700 transition-all duration-200 flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
                            <div className="flex gap-3.5 items-start">
                                <img
                                    src="./images/badge/badge.png"
                                    alt="Google Solution Challenge 2026"
                                    title="Double-click to open in Photos"
                                    onDoubleClick={() => onOpenImageViewer && onOpenImageViewer('./images/badge/badge.png', 'Google Solution Challenge 2026')}
                                    className="w-16 h-16 object-contain rounded-md border border-gray-700 shadow flex-shrink-0 cursor-pointer hover:border-ub-orange transition-all p-1 bg-black bg-opacity-30"
                                />
                                <div>
                                    <div className="text-base font-bold text-white leading-tight">
                                        Google Solution Challenge 2026
                                    </div>
                                    <div className="text-xs text-gray-300 mt-0.5">
                                        All-India National Level Competition — Organized by PromptWars & Google
                                    </div>
                                    <div className="text-xs text-gray-400 mt-1">
                                        Pan-India developer competition across colleges in India building solutions to real-world challenges using Google technologies and AI.
                                    </div>
                                </div>
                            </div>
                            <a
                                href="https://promptwars.in/solutionchallenge2026.html"
                                target="_blank"
                                rel="noreferrer"
                                className="text-xs px-3 py-1.5 rounded font-medium bg-ub-orange hover:bg-orange-600 text-white flex items-center gap-1.5 self-start md:self-auto flex-shrink-0 transition-colors shadow-sm"
                            >
                                <span>Challenge Details</span>
                                <span className="text-[10px] opacity-75">↗</span>
                            </a>
                        </div>

                        {/* Idea Discovery */}
                        <div className="p-3.5 rounded-lg bg-gray-900 bg-opacity-40 border border-gray-800 hover:border-gray-700 transition-all duration-200 flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
                            <div className="flex gap-3.5 items-start">
                                <img
                                    src="./images/logos/idea_Discovery.png"
                                    alt="Idea Discovery Recognition"
                                    title="Double-click to open in Photos"
                                    onDoubleClick={() => onOpenImageViewer && onOpenImageViewer('./images/logos/idea_Discovery.png', 'Idea Discovery — 1st Place Winner')}
                                    className="w-16 h-16 object-cover rounded-md border border-gray-700 shadow flex-shrink-0 cursor-pointer hover:border-ub-orange transition-all"
                                />
                                <div>
                                    <div className="text-base font-bold text-white leading-tight">
                                        Idea Discovery Ideathon — 1st Place Winner
                                    </div>
                                    <div className="text-xs text-gray-300 mt-0.5">
                                        Organized by Galgotias Incubation Centre (GIC)
                                    </div>
                                    <div className="text-xs text-gray-400 mt-1">
                                        Secured 1st place pitching innovative technological architecture and novel problem-solving solutions.
                                    </div>
                                </div>
                            </div>
                            <a
                                href="https://www.linkedin.com/posts/manish-kumar-16a2b932a_innovation-ideadiscovery-teamwork-activity-7435303386826121217-ipFR"
                                target="_blank"
                                rel="noreferrer"
                                className="text-xs px-3 py-1.5 rounded font-medium bg-ub-orange hover:bg-orange-600 text-white flex items-center gap-1.5 self-start md:self-auto flex-shrink-0 transition-colors shadow-sm"
                            >
                                <span>LinkedIn Post</span>
                                <span className="text-[10px] opacity-75">↗</span>
                            </a>
                        </div>
                    </div>
                </div>

                {/* 3. Open Source Contributions (GSSoC '26) */}
                <div>
                    <div className="text-sm md:text-base font-bold text-gray-200 mb-3 border-b border-gray-700 pb-1 flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-ub-orange"></span>
                        <span>Open Source & Badges (GSSoC '26)</span>
                    </div>
                    <div className="p-4 rounded-lg bg-gray-900 bg-opacity-40 border border-gray-800 hover:border-gray-700 transition-all duration-200">
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3">
                            <div>
                                <div className="text-base md:text-lg font-bold text-white leading-tight">
                                    GirlScript Summer of Code (GSSoC '26)
                                </div>
                                <p className="text-xs text-gray-300 mt-1.5 leading-relaxed max-w-2xl">
                                    Promoted from Contributor to <strong className="text-white">Collaborator on AlgoBuddy</strong>. Delivered 100+ merged PRs across 7 production repositories: AlgoBuddy, VoiceForge, TermUI, Story Spark AI, PDF Assistant RAG, easemotion-css, and truxify.
                                </p>
                            </div>
                            <a
                                href="https://gssoc.girlscript.org/profile/79903b8e-3896-47e4-8c3e-747c22c23aff"
                                target="_blank"
                                rel="noreferrer"
                                className="text-xs px-3 py-1.5 rounded font-medium bg-ub-orange hover:bg-orange-600 text-white flex items-center gap-1.5 self-start sm:self-auto flex-shrink-0 transition-colors shadow-sm"
                            >
                                <span>GSSoC Profile</span>
                                <span className="text-[10px] opacity-75">↗</span>
                            </a>
                        </div>

                        {/* Engineering Performance Metrics */}
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mt-3.5 font-mono text-xs">
                            <div className="p-2.5 rounded bg-black bg-opacity-40 border border-gray-800 flex flex-col">
                                <span className="text-[10px] uppercase tracking-wider text-gray-400">Global Rank</span>
                                <span className="text-base font-bold text-ub-orange mt-0.5">#63</span>
                            </div>
                            <div className="p-2.5 rounded bg-black bg-opacity-40 border border-gray-800 flex flex-col">
                                <span className="text-[10px] uppercase tracking-wider text-gray-400">Contributor Tier</span>
                                <span className="text-base font-bold text-white mt-0.5">A-Tier</span>
                            </div>
                            <div className="p-2.5 rounded bg-black bg-opacity-40 border border-gray-800 flex flex-col">
                                <span className="text-[10px] uppercase tracking-wider text-gray-400">Merged PRs</span>
                                <span className="text-base font-bold text-white mt-0.5">100+</span>
                            </div>
                            <div className="p-2.5 rounded bg-black bg-opacity-40 border border-gray-800 flex flex-col">
                                <span className="text-[10px] uppercase tracking-wider text-gray-400">AlgoBuddy</span>
                                <span className="text-base font-bold text-white mt-0.5">Collaborator</span>
                            </div>
                        </div>

                        {/* GSSoC Badges Showcase */}
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4 pt-3 border-t border-gray-800">
                            {gssocBadges.map((badge, bIdx) => (
                                <div
                                    key={bIdx}
                                    title="Double-click to open in Photos"
                                    onDoubleClick={() => onOpenImageViewer && onOpenImageViewer(badge.img, badge.name)}
                                    className="flex flex-col items-center justify-center p-2.5 rounded-md bg-black bg-opacity-40 border border-gray-800 hover:border-ub-orange transition-all duration-150 group cursor-pointer"
                                >
                                    <div className="h-16 w-16 flex items-center justify-center">
                                        <img
                                            src={badge.img}
                                            alt={badge.name}
                                            className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-150"
                                        />
                                    </div>
                                    <span className="text-[11px] text-gray-300 font-medium text-center mt-2 leading-tight">
                                        {badge.name}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* 4. Certifications & Badges */}
                <div>
                    <div className="text-sm md:text-base font-bold text-gray-200 mb-3 border-b border-gray-700 pb-1 flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-ub-orange"></span>
                        <span>Professional Certifications & Badges</span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
                        {certBadges.map((cert, cIdx) => (
                            <div
                                key={cIdx}
                                title="Double-click to open in Photos"
                                onDoubleClick={() => onOpenImageViewer && onOpenImageViewer(cert.img, cert.name)}
                                className="p-3.5 rounded-lg bg-gray-900 bg-opacity-40 border border-gray-800 hover:border-ub-orange transition-all duration-200 flex flex-col items-center text-center justify-between cursor-pointer group"
                            >
                                <div className="h-20 w-full flex items-center justify-center">
                                    <img
                                        src={cert.img}
                                        alt={cert.name}
                                        className="max-h-16 max-w-[80px] object-contain group-hover:scale-105 transition-transform duration-150"
                                    />
                                </div>
                                <div className="w-full flex flex-col flex-1 justify-between mt-2">
                                    <div>
                                        <div className="text-xs md:text-sm font-bold text-white leading-tight">
                                            {cert.name}
                                        </div>
                                        {cert.issuer && (
                                            <div className="text-[11px] text-gray-400 mt-1">
                                                {cert.issuer}
                                            </div>
                                        )}
                                    </div>
                                    <div className="mt-2.5">
                                        {cert.certId && (
                                            <div className="text-[10px] font-mono text-ub-orange bg-ub-orange bg-opacity-10 border border-ub-orange border-opacity-30 px-1.5 py-0.5 rounded truncate">
                                                {cert.certId}
                                            </div>
                                        )}
                                        {cert.url && (
                                            <a
                                                href={cert.url}
                                                target="_blank"
                                                rel="noreferrer"
                                                title="Visit promptwars.in competition page"
                                                onClick={(e) => e.stopPropagation()}
                                                className="inline-flex items-center gap-1 text-[10px] font-mono text-ub-orange bg-ub-orange bg-opacity-10 hover:bg-opacity-20 border border-ub-orange border-opacity-30 px-1.5 py-0.5 rounded transition-colors"
                                            >
                                                <span>promptwars.in</span>
                                                <span className="text-[9px]">↗</span>
                                            </a>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}

function Skills() {
    const languagesAndDatabases = [
        { name: "C++", icon: "./images/logos/skills/cplusplus.svg" },
        { name: "C", icon: "./images/logos/skills/c.svg" },
        { name: "Java", icon: "./images/logos/skills/java.svg" },
        { name: "Python", icon: "./images/logos/skills/python.svg" },
        { name: "JavaScript", icon: "./images/logos/skills/javascript.svg" },
        { name: "HTML5", icon: "./images/logos/skills/html5.svg" },
        { name: "CSS3", icon: "./images/logos/skills/css.svg" },
        { name: "MySQL", icon: "./images/logos/skills/mysql.svg" },
        { name: "PostgreSQL", icon: "./images/logos/skills/postgresql.svg" },
    ];

    const frameworksAndTools = [
        { name: "Spring Boot", icon: "./images/logos/skills/springboot.svg" },
        { name: "Linux", icon: "./images/logos/skills/linux.svg" },
        { name: "Git", icon: "./images/logos/skills/git.svg" },
        { name: "GitHub", icon: "./images/logos/skills/github.svg" },
        { name: "Vercel", icon: "./images/logos/skills/vercel.svg" },
        { name: "Render", icon: "./images/logos/skills/render.svg" },
        { name: "Photoshop", icon: "./images/logos/skills/photoshop.svg" },
    ];

    return (
        <>
            <div className="font-medium relative text-2xl mt-2 md:mt-4 mb-4">
                Technical Skills
                <div className="absolute pt-px bg-white mt-px top-full w-full">
                    <div className="bg-white absolute rounded-full p-0.5 md:p-1 top-0 transform -translate-y-1/2 left-full"></div>
                    <div className="bg-white absolute rounded-full p-0.5 md:p-1 top-0 transform -translate-y-1/2 right-full"></div>
                </div>
            </div>

            <div className="w-10/12 flex flex-col space-y-7 my-4">
                {/* Summary Highlight */}
                <ul className="space-y-2.5 text-sm md:text-base">
                    <li className="flex items-start gap-2.5 leading-relaxed text-gray-200">
                        <span className="w-2 h-2 rounded-full bg-ub-orange mt-2 flex-shrink-0"></span>
                        <div>
                            Hands-on experience architecting resilient backend services, concurrent algorithmic systems, and data pipelines.
                        </div>
                    </li>
                    <li className="flex items-start gap-2.5 leading-relaxed text-gray-200">
                        <span className="w-2 h-2 rounded-full bg-ub-orange mt-2 flex-shrink-0"></span>
                        <div>
                            Primary focus areas: <strong className="text-ubt-gedit-orange">Java & Spring Boot, C++, Python</strong>, and <strong className="text-ubt-gedit-orange">Relational Database</strong> Systems.
                        </div>
                    </li>
                </ul>

                {/* 1. Languages & Databases */}
                <div>
                    <div className="text-sm md:text-base font-bold text-gray-200 mb-3 border-b border-gray-700 pb-1 flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-ub-orange"></span>
                        <span>Languages & Databases</span>
                    </div>
                    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3">
                        {languagesAndDatabases.map((skill, idx) => (
                            <div
                                key={idx}
                                className="flex flex-col items-center justify-center p-3 rounded-lg bg-gray-900 bg-opacity-40 border border-gray-800 hover:border-ub-orange hover:bg-opacity-60 transition-all duration-200 group select-none"
                            >
                                <div className="w-12 h-12 flex items-center justify-center p-2 rounded-md bg-black bg-opacity-40 border border-gray-800/80 group-hover:border-ub-orange/40 group-hover:bg-opacity-60 transition-all duration-150 mb-2">
                                    <img
                                        src={skill.icon}
                                        alt={skill.name}
                                        className="w-8 h-8 object-contain group-hover:scale-110 transition-transform duration-150 select-none"
                                        draggable={false}
                                    />
                                </div>
                                <span className="text-xs md:text-sm font-medium text-gray-200 text-center tracking-tight group-hover:text-white transition-colors">
                                    {skill.name}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 2. Frameworks, Tools & Platforms */}
                <div>
                    <div className="text-sm md:text-base font-bold text-gray-200 mb-3 border-b border-gray-700 pb-1 flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-ub-orange"></span>
                        <span>Frameworks, Tools & Platforms</span>
                    </div>
                    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-4 lg:grid-cols-7 gap-3">
                        {frameworksAndTools.map((skill, idx) => (
                            <div
                                key={idx}
                                className="flex flex-col items-center justify-center p-3 rounded-lg bg-gray-900 bg-opacity-40 border border-gray-800 hover:border-ub-orange hover:bg-opacity-60 transition-all duration-200 group select-none"
                            >
                                <div className="w-12 h-12 flex items-center justify-center p-2 rounded-md bg-black bg-opacity-40 border border-gray-800/80 group-hover:border-ub-orange/40 group-hover:bg-opacity-60 transition-all duration-150 mb-2">
                                    <img
                                        src={skill.icon}
                                        alt={skill.name}
                                        className="w-8 h-8 object-contain group-hover:scale-110 transition-transform duration-150 select-none"
                                        draggable={false}
                                    />
                                </div>
                                <span className="text-xs md:text-sm font-medium text-gray-200 text-center tracking-tight group-hover:text-white transition-colors">
                                    {skill.name}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 3. Computer Science Fundamentals */}
                <div>
                    <div className="text-sm md:text-base font-bold text-gray-200 mb-3 border-b border-gray-700 pb-1 flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-ub-orange"></span>
                        <span>Computer Science Fundamentals</span>
                    </div>
                    <ul className="space-y-2.5 text-sm md:text-base text-gray-200">
                        <li className="flex items-start gap-2.5 leading-relaxed">
                            <span className="text-ub-orange font-bold text-base leading-none mt-0.5 select-none flex-shrink-0">⇀</span>
                            <div>
                                <strong className="text-white font-medium">Data Structures & Algorithms:</strong> Problem Solving, Complexity Analysis (Time & Space), Trees, Graphs, and Dynamic Programming.
                            </div>
                        </li>
                        <li className="flex items-start gap-2.5 leading-relaxed">
                            <span className="text-ub-orange font-bold text-base leading-none mt-0.5 select-none flex-shrink-0">⇀</span>
                            <div>
                                <strong className="text-white font-medium">Database Management (DBMS):</strong> Relational Schema Design, Normalization, SQL Indexing, and Query Optimization.
                            </div>
                        </li>
                        <li className="flex items-start gap-2.5 leading-relaxed">
                            <span className="text-ub-orange font-bold text-base leading-none mt-0.5 select-none flex-shrink-0">⇀</span>
                            <div>
                                <strong className="text-white font-medium">Operating Systems & Linux:</strong> Process Scheduling, Concurrency & Multithreading, Memory Management, and Linux CLI.
                            </div>
                        </li>
                        <li className="flex items-start gap-2.5 leading-relaxed">
                            <span className="text-ub-orange font-bold text-base leading-none mt-0.5 select-none flex-shrink-0">⇀</span>
                            <div>
                                <strong className="text-white font-medium">Object-Oriented Programming (OOP):</strong> Modular Architecture, OOP Principles (Inheritance, Polymorphism), and Clean System Design.
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </>
    );
}

function ProjectCard({ project, onOpenImageViewer }) {
    const [activeImage, setActiveImage] = React.useState(project.image);
    const isAegis = project.name.toLowerCase().includes("aegis");

    return (
        <div className="w-full py-3.5 px-3.5 sm:px-4 my-3 border border-gray-700 bg-gray-900 bg-opacity-40 rounded-lg hover:border-gray-500 transition-all duration-200">
            {/* Header: Title, Date, Tagline */}
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-1">
                <div>
                    <h3 className="text-base md:text-lg font-bold text-white tracking-tight flex items-center gap-2">
                        {project.name}
                    </h3>
                    {project.tagline && (
                        <p className="text-xs md:text-sm text-gray-300 italic mt-0.5">
                            {project.tagline}
                        </p>
                    )}
                </div>
                <span className="text-xs text-ub-orange font-mono font-medium px-2 py-0.5 bg-ub-orange bg-opacity-10 border border-ub-orange border-opacity-30 rounded self-start mt-1 sm:mt-0 whitespace-nowrap">
                    {project.date}
                </span>
            </div>

            {/* Media Section */}
            {isAegis ? (
                /* Aegis 3-Screen Mobile Showcase (Side-by-Side Portrait Display) */
                <div className="mt-3 bg-black bg-opacity-50 p-3 rounded-md border border-gray-800">
                    <div className="grid grid-cols-3 gap-2.5 sm:gap-4 max-w-lg mx-auto">
                        {project.screenshots.map((shot, sIdx) => (
                            <div
                                key={sIdx}
                                className="relative rounded-md overflow-hidden border border-gray-700 bg-gray-950 flex flex-col items-center cursor-pointer shadow-md"
                                onClick={() => onOpenImageViewer && onOpenImageViewer(shot, `${project.name} Screen ${sIdx + 1}`)}
                                title="Click to open in Photos"
                            >
                                <img
                                    src={shot}
                                    alt={`${project.name} screen ${sIdx + 1}`}
                                    className="w-full h-auto max-h-56 sm:max-h-64 object-contain rounded"
                                />
                            </div>
                        ))}
                    </div>
                    <div className="text-center mt-2 text-[11px] text-gray-400 font-mono">
                        Calculator Disguise • Covert PIN Unlock • Emergency SOS Dispatch (Click to expand)
                    </div>
                </div>
            ) : project.image && (
                /* Web & Bot Showcase (Active Full-Size View with Thumbnails) */
                <div className="mt-3 flex flex-col md:flex-row gap-3 bg-black bg-opacity-50 p-2.5 rounded-md border border-gray-800">
                    <div className="relative flex-1 rounded overflow-hidden max-h-60 flex items-center justify-center bg-gray-950 group">
                        <img
                            src={activeImage}
                            alt={`${project.name} preview`}
                            title="Double-click to open in Photos"
                            onDoubleClick={() => onOpenImageViewer && onOpenImageViewer(activeImage, `${project.name} Preview`)}
                            className="w-full h-auto max-h-60 object-contain rounded hover:scale-[1.01] transition-transform duration-200 cursor-pointer"
                        />
                        <div className="absolute top-2 right-2 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity text-[10px] font-medium px-2 py-0.5 rounded bg-black/80 backdrop-blur-sm text-gray-300 border border-gray-700/80 flex items-center gap-1">
                            <span className="text-ub-orange">🔍</span> Double-click to expand
                        </div>
                    </div>
                    {project.screenshots && project.screenshots.length > 1 && (
                        <div className="flex md:flex-col gap-2 justify-center items-center overflow-x-auto pb-1 md:pb-0">
                            {project.screenshots.map((shot, sIdx) => (
                                <button
                                    key={sIdx}
                                    type="button"
                                    onClick={() => setActiveImage(shot)}
                                    onDoubleClick={(e) => {
                                        e.stopPropagation();
                                        onOpenImageViewer && onOpenImageViewer(shot, `${project.name} Screenshot`);
                                    }}
                                    title="Click to select, double-click to view in Photos"
                                    className={`relative w-16 h-12 rounded border overflow-hidden transition-all duration-150 flex-shrink-0 cursor-pointer ${
                                        activeImage === shot
                                            ? "border-ub-orange ring-2 ring-ub-orange ring-opacity-60"
                                            : "border-gray-700 opacity-60 hover:opacity-100"
                                    }`}
                                >
                                    <img
                                        src={shot}
                                        alt={`Thumbnail ${sIdx + 1}`}
                                        className="w-full h-full object-cover"
                                    />
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            )}

            {/* Description Points with Ubuntu Arrow Bullets & Metric Highlights */}
            <ul className="tracking-normal leading-relaxed text-xs md:text-sm text-gray-300 mt-3 space-y-2">
                {project.description.map((desc, i) => (
                    <li key={i} className="flex items-start gap-2">
                        <span className="text-ub-orange font-bold text-xs select-none mt-0.5 flex-shrink-0">⇀</span>
                        <div>{desc}</div>
                    </li>
                ))}
            </ul>

            {/* Action Links */}
            {project.links && project.links.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-3 pt-2.5 border-t border-gray-800">
                    {project.links.map((lnk, lIdx) => {
                        const isLive = lnk.label.toLowerCase().includes("live") || lnk.label.toLowerCase().includes("site") || lnk.label.toLowerCase().includes("bot");
                        const isGitHub = lnk.label.toLowerCase().includes("github");
                        return (
                            <a
                                key={lIdx}
                                href={lnk.url}
                                target="_blank"
                                rel="noreferrer"
                                className={`text-xs px-2.5 py-1 rounded font-medium flex items-center gap-1.5 transition-all duration-150 ${
                                    isLive
                                        ? "bg-ub-orange hover:bg-orange-600 text-white shadow-sm"
                                        : isGitHub
                                        ? "bg-gray-800 hover:bg-gray-700 text-gray-200 border border-gray-700 hover:border-gray-500"
                                        : "bg-gray-800/90 hover:bg-gray-700 text-gray-300 border border-gray-700 hover:border-gray-500"
                                }`}
                            >
                                <span>{lnk.label}</span>
                                <span className="text-[10px] opacity-75">↗</span>
                            </a>
                        );
                    })}
                </div>
            )}

            {/* Domains / Tags (Kept at bottom) */}
            {project.domains && project.domains.length > 0 && (
                <div className="flex flex-wrap items-center gap-1.5 mt-2.5">
                    {project.domains.map((domain, i) => (
                        <span
                            key={i}
                            className="px-2 py-0.5 text-[11px] font-medium rounded-full bg-gray-800 text-gray-300 border border-gray-700 hover:border-gray-600 transition-colors select-none"
                        >
                            {domain}
                        </span>
                    ))}
                </div>
            )}
        </div>
    );
}

function Projects({ onOpenImageViewer }) {
    const project_list = [
        {
            name: "TRAJECT — Narrative Intelligence Platform",
            date: "Sept 2026",
            tagline: "Production Social Media Analytics & Narrative Intelligence Platform built for Smart India Hackathon 2026 (Problem Statement 26152 — NTRO).",
            image: "./images/projects/traject/Traject_landing.png",
            screenshots: [
                "./images/projects/traject/Traject_landing.png",
                "./images/projects/traject/Traject_dashboard.png",
                "./images/projects/traject/Traject_forcast.png",
                "./images/projects/traject/Traject_trends.png",
            ],
            links: [
                { label: "GitHub Repo", url: "https://github.com/ezManish/Traject" },
            ],
            description: [
                <>Built an end-to-end intelligence platform processing multi-source communications streams with real-time <strong className="text-white font-medium">MTProto ingestion</strong> and <strong className="text-white font-medium">Snappy-compressed Apache Parquet</strong> columnar storage.</>,
                <>Engineered ML narrative formation pipeline using <strong className="text-white font-medium">multilingual MiniLM sentence embeddings</strong>, unsupervised <strong className="text-white font-medium">HDBSCAN clustering</strong>, and explainable <strong className="text-white font-medium">Priority Signal Scoring (S ∈ [0, 1])</strong>.</>,
                <>Constructed high-performance FastAPI backend exposing <strong className="text-white font-medium">sub-2ms REST endpoints</strong> and <strong className="text-white font-medium">WebSocket hub (/api/v1/ws/live)</strong> for live message streaming and alert dispatch.</>,
                <>Developed reactive Analyst Dashboard in <strong className="text-white font-medium">Vite + React + TypeScript + Tailwind CSS</strong> featuring real-time telemetry, dynamic cascade networks, topic clusters, and data exploration.</>,
                <>Enforced bulletproof production reliability with <strong className="text-white font-medium">240 backend pytest tests</strong>, deterministic SQLite inference caching, and offline streaming replay.</>,
            ],
            domains: ["FastAPI", "Python", "React", "TypeScript", "Machine Learning", "Apache Parquet", "HDBSCAN", "WebSockets", "Vite", "Tailwind CSS"],
        },
        {
            name: "pdf-to-images-cli",
            date: "Aug 2026",
            tagline: "High-performance Python package, CLI utility, and FastAPI REST microservice for converting PDF pages into high-resolution images with multi-core parallelism.",
            image: "./images/projects/pdf-to-images-cli/pdf-to-images-cli-home.jpg",
            screenshots: [
                "./images/projects/pdf-to-images-cli/pdf-to-images-cli-home.jpg",
                "./images/projects/pdf-to-images-cli/pdf-to-images-cli-benchmark.jpg",
                "./images/projects/pdf-to-images-cli/pdf-to-images-cli-swagger-endpoint.jpg",
            ],
            links: [
                { label: "PyPI Package", url: "https://pypi.org/project/pdf-to-images-cli/" },
                { label: "GitHub Repo", url: "https://github.com/ezManish/pdf-to-images-cli" },
                { label: "CI Actions", url: "https://github.com/ezManish/pdf-to-images-cli/actions/workflows/ci.yml" },
            ],
            description: [
                <>Engineered a multi-core parallel rendering engine utilizing <strong className="text-white font-medium">PyMuPDF and Pillow</strong>, delivering up to <strong className="text-white font-medium">5.4x throughput acceleration</strong> over sequential conversions.</>,
                <>Distributed as a unified package: <strong className="text-white font-medium">CLI utility (pdf-to-image)</strong>, importable Python library on <strong className="text-white font-medium">PyPI</strong>, and containerized <strong className="text-white font-medium">FastAPI microservice</strong>.</>,
                <>Includes live <strong className="text-white font-medium">Swagger OpenAPI documentation endpoints</strong>, performance benchmarking harness, Docker containerization, and <strong className="text-white font-medium">automated Pytest CI pipelines</strong>.</>,
            ],
            domains: ["Python", "FastAPI", "PyMuPDF", "PyPI", "CLI", "CI/CD"],
        },
        {
            name: "Memoize — LeetCode Companion Bot",
            date: "July 2026",
            tagline: "Telegram-native LeetCode companion bot featuring daily challenges, 1v1 battles, AI coaching, spaced repetition, and real-time leaderboards.",
            image: "./images/projects/Memoize/Memoize-home.jpeg",
            screenshots: [
                "./images/projects/Memoize/Memoize-home.jpeg",
                "./images/projects/Memoize/Memoize-start.png",
                "./images/projects/Memoize/Memoize-info.png",
            ],
            links: [
                { label: "Live Telegram Bot", url: "https://t.me/MemoizeLC_bot?start" },
                { label: "GitHub Repo", url: "https://github.com/Charicific/memoize-tgbot" },
            ],
            description: [
                <>Co-authored performance, caching, AI routing, and container infrastructure using <strong className="text-white font-medium">aiogram 3 and FastAPI</strong> in a multi-process Docker container with local <strong className="text-white font-medium">telegram-bot-api</strong> binary.</>,
                <>Engineered hybrid L1/L2 cache (<strong className="text-white font-medium">in-process cachetools TTLCache + Upstash Redis</strong>) delivering <strong className="text-white font-medium">0.001ms hot-key lookups</strong> with negative caching against burst traffic.</>,
                <>Implemented multi-provider AI routing (<strong className="text-white font-medium">Groq, NVIDIA Build, OpenRouter fallback</strong>) for progressive hints (conceptual, strategic, pseudocode).</>,
                <>Implemented <strong className="text-white font-medium">SuperMemo SM-2 spaced repetition algorithm</strong> directly for problem retention and automated cron job recovery.</>,
            ],
            domains: ["Python", "FastAPI", "Redis", "PostgreSQL", "Groq AI", "aiogram"],
        },
        {
            name: "CuratiX Vault",
            date: "April 2026",
            tagline: "A premium, lightweight project management platform for hackathon teams to consolidate member profiles, track project assets, and maintain a historical record.",
            image: "./images/projects/curatix/curatix-home.png",
            screenshots: [
                "./images/projects/curatix/curatix-home.png",
                "./images/projects/curatix/curatix-board.png",
                "./images/projects/curatix/curatix-login.png",
            ],
            links: [
                { label: "Live Site", url: "https://www.curatix.co.in/" },
                { label: "GitHub Repo", url: "https://github.com/ezManish/CuratiX_Vault" },
                { label: "Vercel Mirror", url: "https://curati-x-vault.vercel.app/" },
                { label: "Swagger API Docs", url: "https://curatix-vault.onrender.com/swagger-ui/index.html" },
            ],
            description: [
                <>Architected a stateless <strong className="text-white font-medium">Spring Boot 3.4 (Java 17)</strong> backend with board-scoped RBAC supporting 3 roles (OWNER, EDITOR, VIEWER) across an <strong className="text-white font-medium">11-cell permission matrix</strong>.</>,
                <>Constructed responsive <strong className="text-white font-medium">React 19 + Vite</strong> frontend leveraging <strong className="text-white font-medium">TanStack Query</strong> for server state caching and <strong className="text-white font-medium">Zustand</strong> for UI state management.</>,
                <>Enforced <strong className="text-white font-medium">Firebase OIDC authentication</strong> with server-side JWT verification using <strong className="text-white font-medium">firebase-admin SDK</strong> on all controller endpoints.</>,
                <>Configured <strong className="text-white font-medium">Flyway database version control</strong> with MySQL (Aiven) and Cloudinary integration for secure asset management.</>,
            ],
            domains: ["Spring Boot", "React 19", "MySQL", "Java", "Vite", "Tailwind CSS", "Firebase", "Swagger"],
        },
        {
            name: "Aegis — Covert AI Safety System",
            date: "Dec 2025",
            tagline: "A covert, AI-powered women's safety system disguised as a fully functional calculator with multi-path trigger arbitration.",
            image: "./images/projects/Aegis/Aegis-home.jpeg",
            screenshots: [
                "./images/projects/Aegis/Aegis-home.jpeg",
                "./images/projects/Aegis/Aegishidden-calc.jpeg",
                "./images/projects/Aegis/Aegis-contact.jpeg",
            ],
            links: [
                { label: "GitHub Repo", url: "https://github.com/ezManish/Aegis" },
                { label: "APK Release", url: "https://github.com/ezManish/Aegis/releases/latest" },
                { label: "Architecture Spec", url: "https://github.com/ezManish/Aegis/blob/main/Brain.md" },
            ],
            description: [
                <>Full arithmetic <strong className="text-white font-medium">calculator disguise (com.ezmanish.calculator)</strong> that secretly unlocks covert safety orchestration upon secret PIN entry or voice/sensor triggers.</>,
                <>Engineered triple trigger paths with strict arbitration: <strong className="text-white font-medium">Voice keyword detection (Groq Whisper-large-v3, 3s chunks)</strong>, motion/shake sensors, and hidden PIN.</>,
                <>Developed a custom <strong className="text-white font-medium">Kotlin native module (expo-silent-sms)</strong> for direct Android <strong className="text-white font-medium">SmsManager background cellular dispatch</strong>, bypassing internet locks and SMS UI.</>,
                <>Built around a <strong className="text-white font-medium">10-rule engineering constitution</strong> ensuring cellular SOS SMS dispatches before any network sync, failing open on any storage or config error.</>,
            ],
            domains: ["React Native", "Expo", "Kotlin", "Groq AI", "TypeScript", "Android", "Cloudinary"],
        },
    ];

    return (
        <>
            <div className=" font-medium relative text-2xl mt-2 md:mt-4 mb-4">
                Projects
                <div className="absolute pt-px bg-white mt-px top-full w-full">
                    <div className="bg-white absolute rounded-full p-0.5 md:p-1 top-0 transform -translate-y-1/2 left-full"></div>
                    <div className="bg-white absolute rounded-full p-0.5 md:p-1 top-0 transform -translate-y-1/2 right-full"></div>
                </div>
            </div>

            <div className="w-full flex flex-col px-2 md:px-4 mb-6">
                {project_list.map((project, index) => (
                    <ProjectCard key={index} project={project} onOpenImageViewer={onOpenImageViewer} />
                ))}
            </div>
        </>
    );
}

function Resume() {
    return (
        <iframe className="h-full w-full" src="./files/Manish-Kumar-Resume.pdf" title="Manish Kumar Resume" frameBorder="0"></iframe>
    )
}
