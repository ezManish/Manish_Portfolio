import React, { Component } from 'react';
import GitHubProfile from './github_profile';

export class Chrome extends Component {
    constructor() {
        super();
        this.home_url = 'https://www.google.com/webhp?igu=1';
        this.state = {
            url: 'https://www.google.com/webhp?igu=1',
            display_url: "https://www.google.com",
        }
    }

    componentDidMount() {
        let lastVisitedUrl = localStorage.getItem("chrome-url");
        let lastDisplayedUrl = localStorage.getItem("chrome-display-url");
        if (lastVisitedUrl !== null && lastVisitedUrl !== undefined) {
            this.setState({ url: lastVisitedUrl, display_url: lastDisplayedUrl }, this.refreshChrome);
        }
        if (typeof window !== 'undefined') {
            window.addEventListener("chrome-navigate", this.handleExternalNavigate);
        }
    }

    componentWillUnmount() {
        if (typeof window !== 'undefined') {
            window.removeEventListener("chrome-navigate", this.handleExternalNavigate);
        }
    }

    handleExternalNavigate = (e) => {
        if (e && e.detail) {
            const targetUrl = e.detail;
            this.setState({ url: targetUrl, display_url: targetUrl });
            this.storeVisitedUrl(targetUrl, targetUrl);
        }
    }

    storeVisitedUrl = (url, display_url) => {
        try {
            localStorage.setItem("chrome-url", url);
            localStorage.setItem("chrome-display-url", display_url);
        } catch (e) {}
    }

    refreshChrome = () => {
        const iframe = document.getElementById("chrome-screen");
        if (iframe) {
            iframe.src += '';
        } else {
            this.forceUpdate();
        }
    }

    goToHome = () => {
        this.setState({ url: this.home_url, display_url: "https://www.google.com" });
        this.storeVisitedUrl(this.home_url, "https://www.google.com");
    }

    checkKey = (e) => {
        if (e.key === "Enter") {
            let url = e.target.value;
            let display_url = "";

            url = url.trim();
            if (url.length === 0) return;

            if (url.indexOf("http://") !== 0 && url.indexOf("https://") !== 0) {
                url = "https://" + url;
            }

            url = encodeURI(url);
            display_url = url;
            if (url.includes("google.com")) { // 😅
                url = 'https://www.google.com/webhp?igu=1';
                display_url = "https://www.google.com";
            }
            this.setState({ url, display_url: url });
            this.storeVisitedUrl(url, display_url);
            const input = document.getElementById("chrome-url-bar");
            if (input) input.blur();
        }
    }

    handleDisplayUrl = (e) => {
        this.setState({ display_url: e.target.value });
    }

    displayUrlBar = () => {
        return (
            <div className="w-full pt-0.5 pb-1 flex justify-start items-center text-white text-sm border-b border-gray-900 bg-ub-cool-grey">
                <div onClick={this.refreshChrome} className=" ml-2 mr-1 flex justify-center items-center rounded-full bg-gray-50 bg-opacity-0 hover:bg-opacity-10 cursor-pointer">
                    <img className="w-5" src="./themes/Yaru/status/chrome_refresh.svg" alt="Ubuntu Chrome Refresh" />
                </div>
                <div onClick={this.goToHome} className=" mr-2 ml-1 flex justify-center items-center rounded-full bg-gray-50 bg-opacity-0 hover:bg-opacity-10 cursor-pointer">
                    <img className="w-5" src="./themes/Yaru/status/chrome_home.svg" alt="Ubuntu Chrome Home" />
                </div>
                <input onKeyDown={this.checkKey} onChange={this.handleDisplayUrl} value={this.state.display_url} id="chrome-url-bar" className="outline-none bg-ub-grey rounded-full pl-3 py-0.5 mr-3 w-5/6 text-gray-300 focus:text-white" type="url" spellCheck={false} autoComplete="off" />
            </div>
        );
    }

    render() {
        const isGitHub = this.state.url && this.state.url.toLowerCase().includes("github.com");

        return (
            <div className="h-full w-full flex flex-col bg-ub-cool-grey overflow-hidden">
                {this.displayUrlBar()}
                {isGitHub ? (
                    <GitHubProfile isMaximized={this.props.isMaximized} />
                ) : (
                    <iframe src={this.state.url} className="flex-grow" id="chrome-screen" frameBorder="0" title="Ubuntu Chrome Url"></iframe>
                )}
            </div>
        )
    }
}

export default Chrome

export const displayChrome = (isMaximized) => {
    return <Chrome isMaximized={isMaximized}> </Chrome>;
}
