import React, { Component } from 'react'

export class UbuntuApp extends Component {
    constructor() {
        super();
        this.lastOpenTime = 0;
        this.lastClick = 0;
    }

    openApp = () => {
        const now = Date.now();
        if (now - this.lastOpenTime < 400) {
            return;
        }
        this.lastOpenTime = now;
        if (this.props.isExternalApp && this.props.url) {
            window.open(this.props.url, "_blank");
        } else {
            this.props.openApp(this.props.id);
        }
    }

    handleClick = () => {
        const isMobile = typeof window !== 'undefined' && (
            window.innerWidth < 768 ||
            ('ontouchstart' in window) ||
            (typeof navigator !== 'undefined' && navigator.maxTouchPoints > 0)
        );

        if (isMobile) {
            this.openApp();
            return;
        }

        // On desktop, open if clicked twice within 400ms
        const now = Date.now();
        if (this.lastClick && (now - this.lastClick) < 400) {
            this.openApp();
            this.lastClick = 0;
        } else {
            this.lastClick = now;
        }
    }

    handleTouchEnd = () => {
        this.openApp();
    }

    handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            this.openApp();
        }
    }

    render() {
        return (
            <div
                className="p-1 m-px z-10 bg-white bg-opacity-0 hover:bg-opacity-20 focus:bg-ub-orange focus:bg-opacity-50 focus:border-yellow-700 focus:border-opacity-100 border border-transparent outline-none rounded select-none w-24 h-20 flex flex-col justify-start items-center text-center text-xs font-normal text-white relative cursor-pointer"
                id={"app-" + this.props.id}
                onClick={this.handleClick}
                onDoubleClick={this.openApp}
                onTouchEnd={this.handleTouchEnd}
                onKeyDown={this.handleKeyDown}
                tabIndex={0}
            >
                <div className="relative pointer-events-none">
                    <img width="40px" height="40px" className="mb-1 w-10" src={this.props.icon} alt={"Ubuntu " + this.props.name} />
                    {this.props.isExternalApp && (
                        <img 
                            src="./themes/Yaru/status/arrow-up-right.svg" 
                            alt="External Link" 
                            className="w-2.5 h-2.5 absolute -bottom-0.5 -right-0.5"
                        />
                    )}
                </div>
                <span className="pointer-events-none line-clamp-2">{this.props.name}</span>
            </div>
        )
    }
}

export default UbuntuApp
