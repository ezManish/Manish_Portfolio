import React, { Component } from 'react';
import $ from 'jquery';
import emailjs from '@emailjs/browser';

export class Gedit extends Component {

    constructor() {
        super();
        this.state = {
            sending: false,
            statusMessage: null,
            isError: false,
        }
    }

    componentDidMount() {
        if (process.env.NEXT_PUBLIC_USER_ID) {
            emailjs.init(process.env.NEXT_PUBLIC_USER_ID);
        }
        this.openedAt = Date.now();
    }

    sendMessage = async () => {
        let name = $("#sender-name").val();
        let subject = $("#sender-subject").val();
        let message = $("#sender-message").val();
        let honeypot = $("#sender-website").val();

        name = (name || "").trim();
        subject = (subject || "").trim();
        message = (message || "").trim();

        let error = false;

        if (name.length === 0) {
            $("#sender-name").val('');
            $("#sender-name").attr("placeholder", "Name must not be Empty!");
            error = true;
        }

        if (message.length === 0) {
            $("#sender-message").val('');
            $("#sender-message").attr("placeholder", "Message must not be Empty!");
            error = true;
        }
        if (error) return;

        // 1. Client-side cooldown rate limit (60 seconds)
        try {
            const lastSent = localStorage.getItem("gedit_last_sent");
            if (lastSent) {
                const elapsedSeconds = Math.floor((Date.now() - parseInt(lastSent, 10)) / 1000);
                const COOLDOWN = 60;
                if (elapsedSeconds < COOLDOWN) {
                    const remaining = COOLDOWN - elapsedSeconds;
                    this.setState({
                        sending: false,
                        statusMessage: `Please wait ${remaining}s before sending another message.`,
                        isError: true,
                    });
                    return;
                }
            }
        } catch (e) {
            // LocalStorage might be disabled in private mode
        }

        // 2. Bot Trap: Honeypot check & human-typing speed check (< 1.8 seconds)
        const isTooFast = (Date.now() - (this.openedAt || 0)) < 1800;
        if (honeypot || isTooFast) {
            // Silently feign success to fool automated bots without consuming EmailJS quota
            this.setState({ sending: false, statusMessage: "Message sent successfully! Closing editor...", isError: false });
            setTimeout(() => {
                $("#close-gedit").trigger("click");
            }, 1200);
            return;
        }

        this.setState({ sending: true, statusMessage: null });

        const serviceID = process.env.NEXT_PUBLIC_SERVICE_ID;
        const templateID = process.env.NEXT_PUBLIC_TEMPLATE_ID;
        const userID = process.env.NEXT_PUBLIC_USER_ID;

        const templateParams = {
            name: name,
            from_name: name,
            reply_to: name,
            user_email: name,
            subject: subject,
            message: message,
        };

        emailjs.send(serviceID, templateID, templateParams, userID).then(() => {
            try {
                localStorage.setItem("gedit_last_sent", Date.now().toString());
            } catch (e) {}

            this.setState({ sending: false, statusMessage: "Message sent successfully! Closing editor...", isError: false });
            setTimeout(() => {
                $("#close-gedit").trigger("click");
            }, 1200);
        }).catch((err) => {
            console.error("EmailJS Error:", err);
            const errText = (err && (err.text || err.message)) ? (err.text || err.message) : "Failed to send message. Please try again.";
            this.setState({
                sending: false,
                statusMessage: errText,
                isError: true,
            });
        });
    }

    render() {
        return (
            <div className="w-full h-full relative flex flex-col bg-ub-cool-grey text-white select-none">
                <div className="flex items-center justify-between w-full bg-ub-gedit-light bg-opacity-60 border-b border-t border-blue-400 text-sm">
                    <span className="font-bold ml-2">Send a Message to Me</span>
                    <div className="flex">
                        <button
                            type="button"
                            onClick={this.sendMessage}
                            disabled={this.state.sending}
                            className="border border-black bg-black bg-opacity-50 px-3 py-0.5 my-1 mx-1 rounded hover:bg-opacity-80 disabled:opacity-50 cursor-pointer"
                        >
                            Send
                        </button>
                    </div>
                </div>
                <div className="relative flex-grow flex flex-col bg-ub-gedit-dark font-normal windowMainScreen">
                    {/* Honeypot field for bot protection (invisible to humans and screen readers) */}
                    <div className="absolute opacity-0 pointer-events-none -z-50 w-0 h-0 overflow-hidden" aria-hidden="true">
                        <label htmlFor="sender-website">Website</label>
                        <input id="sender-website" name="sender_website" tabIndex={-1} autoComplete="off" type="text" />
                    </div>
                    <div className="absolute left-0 top-0 h-full px-2 bg-ub-gedit-darker"></div>
                    <div className="relative">
                        <input id="sender-name" className=" w-full text-ubt-gedit-orange focus:bg-ub-gedit-light outline-none font-medium text-sm pl-6 py-0.5 bg-transparent" placeholder="Your Email / Name :" spellCheck="false" autoComplete="off" type="text" />
                        <span className="absolute left-1 top-1/2 transform -translate-y-1/2 font-bold light text-sm text-ubt-gedit-blue">1</span>
                    </div>
                    <div className="relative">
                        <input id="sender-subject" className=" w-full my-1 text-ubt-gedit-blue focus:bg-ub-gedit-light gedit-subject outline-none text-sm font-normal pl-6 py-0.5 bg-transparent" placeholder="subject (may be a feedback for this website!)" spellCheck="false" autoComplete="off" type="text" />
                        <span className="absolute left-1 top-1/2 transform -translate-y-1/2 font-bold  text-sm text-ubt-gedit-blue">2</span>
                    </div>
                    <div className="relative flex-grow">
                        <textarea id="sender-message" className=" w-full gedit-message font-light text-sm resize-none h-full windowMainScreen outline-none tracking-wider pl-6 py-1 bg-transparent" placeholder="Message" spellCheck="false" autoComplete="none" type="text" />
                        <span className="absolute left-1 top-1 font-bold  text-sm text-ubt-gedit-blue">3</span>
                    </div>
                </div>
                {this.state.statusMessage && (
                    <div className={`px-4 py-1.5 text-xs font-medium flex items-center justify-between z-10 ${this.state.isError ? "bg-red-900/90 text-red-200 border-t border-red-700" : "bg-green-900/90 text-green-200 border-t border-green-700"}`}>
                        <span>{this.state.statusMessage}</span>
                        {this.state.isError && (
                            <button onClick={() => this.setState({ statusMessage: null })} className="ml-2 text-xs hover:text-white cursor-pointer">✕</button>
                        )}
                    </div>
                )}
                {
                    (this.state.sending
                        ?
                        <div className="flex justify-center items-center animate-pulse h-full w-full bg-gray-400 bg-opacity-30 absolute top-0 left-0 z-20">
                            <img className={" w-8 absolute animate-spin"} src="./themes/Yaru/status/process-working-symbolic.svg" alt="Ubuntu Process Symbol" />
                        </div>
                        : null
                    )
                }
            </div>
        )
    }
}

export default Gedit;

export const displayGedit = () => {
    return <Gedit> </Gedit>;
}
