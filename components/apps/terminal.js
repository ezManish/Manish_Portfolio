import React, { Component } from 'react'
import $ from 'jquery';

export class Terminal extends Component {
    constructor() {
        super();
        this.cursor = "";
        this.terminal_rows = 1;
        this.current_directory = "~";
        this.curr_dir_name = "root";
        this.prev_commands = [];
        this.commands_index = -1;
        this.child_directories = {
            root: ["projects", "personal-documents", "skills", "languages", "Galgotias", "interests"],
            Galgotias: ["BTech-CSE"],
            skills: ["C++", "C", "Java", "Python", "JavaScript", "HTML", "CSS", "Spring-Boot", "Linux", "SQL", "PostgreSQL", "Git", "GitHub", "Render", "Vercel", "Photoshop"],
            projects: ["TRAJECT-Narrative-Intelligence", "CuratiX-Vault", "Aegis-Safety-App", "PDF-to-Images-CLI", "Memoize-Telegram-Bot", "OpenSource-GSSoC26"],
            interests: ["Backend-Development", "Problem-Solving", "System-Design", "Open-Source"],
            languages: ["C++", "C", "Java", "Python", "JavaScript", "HTML", "CSS", "SQL", "PostgreSQL"],
        };
        this.state = {
            terminal: [],
        }
    }

    componentDidMount() {
        this.reStartTerminal();
    }

    componentDidUpdate() {
        clearInterval(this.cursor);
        this.startCursor(this.terminal_rows - 2);
    }

    componentWillUnmount() {
        clearInterval(this.cursor);
    }

    reStartTerminal = () => {
        clearInterval(this.cursor);
        $('#terminal-body').empty();
        this.appendTerminalRow();
    }

    appendTerminalRow = () => {
        let terminal = this.state.terminal;
        terminal.push(this.terminalRow(this.terminal_rows));
        this.setState({ terminal });
        this.terminal_rows += 2;
    }

    terminalRow = (id) => {
        return (
            <React.Fragment key={id}>
                <div className="flex w-full h-5">
                    <div className="flex">
                        <div className=" text-ubt-green">manish@Victus</div>
                        <div className="text-white mx-px font-medium">:</div>
                        <div className=" text-ubt-blue">{this.current_directory}</div>
                        <div className="text-white mx-px font-medium mr-1">$</div>
                    </div>
                    <div id="cmd" onClick={this.focusCursor} className=" bg-transperent relative flex-1 overflow-hidden">
                        <span id={`show-${id}`} className=" float-left whitespace-pre pb-1 opacity-100 font-normal tracking-wider"></span>
                        <div id={`cursor-${id}`} className=" float-left mt-1 w-1.5 h-3.5 bg-white"></div>
                        <input id={`terminal-input-${id}`} data-row-id={id} onKeyDown={this.checkKey} onBlur={this.unFocusCursor} className=" absolute top-0 left-0 w-full opacity-0 outline-none bg-transparent" spellCheck={false} autoFocus={true} autoComplete="off" type="text" />
                    </div>
                </div>
                <div id={`row-result-${id}`} className={"my-2 font-normal"}></div>
            </React.Fragment>
        );

    }

    focusCursor = (e) => {
        clearInterval(this.cursor);
        this.startCursor($(e.target).data("row-id"));
    }

    unFocusCursor = (e) => {
        this.stopCursor($(e.target).data("row-id"));
    }

    startCursor = (id) => {
        clearInterval(this.cursor);
        $(`input#terminal-input-${id}`).trigger("focus");
        // On input change, set current text in span
        $(`input#terminal-input-${id}`).on("input", function () {
            $(`#cmd span#show-${id}`).text($(this).val());
        });
        this.cursor = window.setInterval(function () {
            if ($(`#cursor-${id}`).css('visibility') === 'visible') {
                $(`#cursor-${id}`).css({ visibility: 'hidden' });
            } else {
                $(`#cursor-${id}`).css({ visibility: 'visible' });
            }
        }, 500);
    }

    stopCursor = (id) => {
        clearInterval(this.cursor);
        $(`#cursor-${id}`).css({ visibility: 'visible' });
    }

    removeCursor = (id) => {
        this.stopCursor(id);
        $(`#cursor-${id}`).css({ display: 'none' });
    }

    clearInput = (id) => {
        $(`input#terminal-input-${id}`).trigger("blur");
    }

    checkKey = (e) => {
        if (e.key === "Enter") {
            let terminal_row_id = $(e.target).data("row-id");
            let command = $(`input#terminal-input-${terminal_row_id}`).val().trim();
            if (command.length !== 0) {
                this.removeCursor(terminal_row_id);
                this.handleCommands(command, terminal_row_id);
            }
            else return;
            // push to history
            this.prev_commands.push(command);
            this.commands_index = this.prev_commands.length - 1;

            this.clearInput(terminal_row_id);
        }
        else if (e.key === "ArrowUp") {
            let prev_command;

            if (this.commands_index <= -1) prev_command = "";
            else prev_command = this.prev_commands[this.commands_index];

            let terminal_row_id = $(e.target).data("row-id");

            $(`input#terminal-input-${terminal_row_id}`).val(prev_command);
            $(`#show-${terminal_row_id}`).text(prev_command);

            this.commands_index--;
        }
        else if (e.key === "ArrowDown") {
            let prev_command;

            if (this.commands_index >= this.prev_commands.length) return;
            if (this.commands_index <= -1) this.commands_index = 0;

            if (this.commands_index === this.prev_commands.length) prev_command = "";
            else prev_command = this.prev_commands[this.commands_index];

            let terminal_row_id = $(e.target).data("row-id");

            $(`input#terminal-input-${terminal_row_id}`).val(prev_command);
            $(`#show-${terminal_row_id}`).text(prev_command);

            this.commands_index++;
        }
        else if (e.key === "Tab") {
            e.preventDefault();
            let terminal_row_id = $(e.target).data("row-id");
            let inputEl = $(`input#terminal-input-${terminal_row_id}`);
            let val = inputEl.val();
            if (!val) return;

            const allCommands = [
                "neofetch", "resume", "projects", "skills", "help", "about-manish",
                "minesweeper", "2048", "code", "spotify", "chrome", "github",
                "gedit", "sendmsg", "trash", "settings",
                "cd", "ls", "pwd", "echo", "clear", "exit", "mkdir", "sudo"
            ];

            const trimmed = val.trimStart();
            const parts = trimmed.split(' ');

            if (parts.length === 1) {
                const prefix = parts[0].toLowerCase();
                const matches = allCommands.filter(c => c.startsWith(prefix));
                if (matches.length === 1) {
                    inputEl.val(matches[0] + " ");
                    $(`#show-${terminal_row_id}`).text(matches[0] + " ");
                } else if (matches.length > 1) {
                    let common = prefix;
                    let canExtend = true;
                    while (canExtend) {
                        if (common.length >= matches[0].length) break;
                        const char = matches[0][common.length];
                        for (let i = 1; i < matches.length; i++) {
                            if (matches[i][common.length] !== char) {
                                canExtend = false;
                                break;
                            }
                        }
                        if (canExtend) common += char;
                    }
                    inputEl.val(common);
                    $(`#show-${terminal_row_id}`).text(common);
                }
            } else if (parts.length === 2 && (parts[0] === "cd" || parts[0] === "ls")) {
                const prefix = parts[1].toLowerCase();
                const dirs = this.child_directories[this.curr_dir_name] || [];
                const matches = dirs.filter(d => d.toLowerCase().startsWith(prefix));
                if (matches.length === 1) {
                    const filled = `${parts[0]} ${matches[0]} `;
                    inputEl.val(filled);
                    $(`#show-${terminal_row_id}`).text(filled);
                }
            }
        }
    }

    childDirectories = (parent) => {
        let files = [];
        files.push(`<div class="flex justify-start flex-wrap">`)
        this.child_directories[parent].forEach(file => {
            files.push(
                `<span class="font-bold mr-2 text-ubt-blue">'${file}'</span>`
            )
        });
        files.push(`</div>`)
        return files;
    }

    closeTerminal = () => {
        $("#close-terminal").trigger('click');
    }

    renderNeofetch = () => {
        return `
<div class="flex flex-col sm:flex-row gap-3 sm:gap-6 my-2 text-xs font-mono select-text">
    <pre class="text-ubt-orange font-bold leading-tight select-none">
        .-.
       .-' '' '-.
    .-'    __    '-.
   /    .-'  '-.    \\
  |   .'        '.   |
  |   |          |   |
  |   '.        .'   |
   \\    '-.__.-'    /
    '-.          .-'
       '-.____.-'
    </pre>
    <div class="flex flex-col gap-1 leading-snug">
        <div><span class="text-ubt-green font-bold">manish</span><span class="text-white">@</span><span class="text-ubt-green font-bold">Victus</span></div>
        <div class="text-gray-400">--------------------------------</div>
        <div><span class="text-ubt-orange font-semibold">OS:</span> Ubuntu 20.04.6 LTS x86_64</div>
        <div><span class="text-ubt-orange font-semibold">Host:</span> Manish Kumar Portfolio (<a href="https://ezmanish.vercel.app/" target="_blank" class="underline text-blue-400">ezmanish.vercel.app</a>)</div>
        <div><span class="text-ubt-orange font-semibold">Kernel:</span> 5.15.0-generic</div>
        <div><span class="text-ubt-orange font-semibold">Uptime:</span> 1 hr, 28 mins</div>
        <div><span class="text-ubt-orange font-semibold">Shell:</span> bash 5.0.17</div>
        <div><span class="text-ubt-orange font-semibold">Role:</span> Backend Developer &amp; CS Undergrad</div>
        <div><span class="text-ubt-orange font-semibold">College:</span> Galgotias University (B.Tech CSE)</div>
        <div><span class="text-ubt-orange font-semibold">Languages:</span> C++, Python, JavaScript, TypeScript, SQL</div>
        <div><span class="text-ubt-orange font-semibold">Backend:</span> Go, Node.js, Express, Spring Boot, REST APIs</div>
        <div><span class="text-ubt-orange font-semibold">Databases:</span> PostgreSQL, MongoDB, Redis</div>
        <div><span class="text-ubt-orange font-semibold">DevOps:</span> Docker, Linux, Git, GitHub Actions, Vercel</div>
        <div class="flex gap-1.5 mt-2 select-none">
            <span class="w-3.5 h-3.5 rounded-xs bg-black border border-white border-opacity-20"></span>
            <span class="w-3.5 h-3.5 rounded-xs bg-red-600"></span>
            <span class="w-3.5 h-3.5 rounded-xs bg-green-500"></span>
            <span class="w-3.5 h-3.5 rounded-xs bg-yellow-400"></span>
            <span class="w-3.5 h-3.5 rounded-xs bg-blue-500"></span>
            <span class="w-3.5 h-3.5 rounded-xs bg-purple-500"></span>
            <span class="w-3.5 h-3.5 rounded-xs bg-cyan-400"></span>
            <span class="w-3.5 h-3.5 rounded-xs bg-gray-200"></span>
        </div>
    </div>
</div>`;
    };

    handleCommands = (command, rowId) => {
        let words = command.split(' ').filter(Boolean);
        let main = words[0];
        words.shift();
        let result = "";
        let rest = words.join(" ").trim();
        const availableCmds = "[ neofetch, resume, projects, skills, help, about-manish, minesweeper, 2048, code, spotify, chrome, github, sendmsg, trash, settings, cd, ls, pwd, echo, clear, exit ]";

        switch (main) {
            case "neofetch":
                result = this.renderNeofetch();
                break;
            case "resume":
                if (words[0] === "download") {
                    window.open("./files/Manish-Kumar-Resume.pdf", "_blank");
                    result = "Downloading Manish Kumar Resume PDF... 📄";
                } else {
                    this.props.openApp("resume");
                    result = "Opening Resume_Manish_Kumar.pdf in Document Viewer...<br><span class='text-gray-400 text-xs'>Tip: Type 'resume download' to download directly.</span>";
                }
                break;
            case "help":
                result = `
<div class="my-1.5 text-xs leading-relaxed">
    <div class="text-ubt-orange font-bold mb-1">Available Terminal Commands:</div>
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1 text-gray-200">
        <div><span class="text-ubt-green font-semibold">neofetch</span> - Display Ubuntu system specs &amp; stack</div>
        <div><span class="text-ubt-green font-semibold">resume</span> - Open or download official PDF resume</div>
        <div><span class="text-ubt-green font-semibold">projects</span> - View featured backend &amp; full-stack projects</div>
        <div><span class="text-ubt-green font-semibold">skills</span> - List programming languages &amp; frameworks</div>
        <div><span class="text-ubt-green font-semibold">about-manish</span> - Launch full About Manish portfolio app</div>
        <div><span class="text-ubt-green font-semibold">minesweeper</span> - Play authentic GNOME Minesweeper game</div>
        <div><span class="text-ubt-green font-semibold">2048</span> - Play 2048 sliding puzzle game</div>
        <div><span class="text-ubt-green font-semibold">code</span> - Launch Visual Studio Code IDE</div>
        <div><span class="text-ubt-green font-semibold">chrome / github</span> - Open browser &amp; GitHub profile</div>
        <div><span class="text-ubt-green font-semibold">spotify</span> - Launch Spotify music player</div>
        <div><span class="text-ubt-green font-semibold">sendmsg</span> - Open Contact Me (Gedit text editor)</div>
        <div><span class="text-ubt-green font-semibold">settings</span> - Open GNOME Control Center (Wallpapers)</div>
        <div><span class="text-ubt-green font-semibold">ls / cd / pwd</span> - Browse simulated Linux filesystem</div>
        <div><span class="text-ubt-green font-semibold">clear / exit</span> - Reset terminal screen or close window</div>
    </div>
    <div class="text-gray-400 mt-2 italic">Tip: Press [Tab] to auto-complete commands and folders!</div>
</div>`;
                break;
            case "projects":
                result = `
<div class="my-1.5 text-xs">
    <div class="text-ubt-orange font-bold mb-1">Featured Backend &amp; Engineering Projects:</div>
    <div class="space-y-1.5 text-gray-200">
        <div>• <span class="text-white font-semibold">TRAJECT</span> — Narrative Intelligence Engine (AI &amp; Graph Analytics)</div>
        <div>• <span class="text-white font-semibold">CuratiX Vault</span> — Digital asset discovery &amp; indexing service</div>
        <div>• <span class="text-white font-semibold">Aegis Safety App</span> — Real-time telemetry, location beacons &amp; emergency API</div>
        <div>• <span class="text-white font-semibold">PDF-to-Images CLI</span> — High-throughput document rasterization CLI in Go</div>
        <div>• <span class="text-white font-semibold">Memoize Bot</span> — Telegram productivity bot with persistent message caching</div>
    </div>
    <div class="text-gray-400 mt-2">Launch <span class="text-ubt-green font-mono">about-manish</span> to view live demos, screenshots, and system metrics.</div>
</div>`;
                break;
            case "skills":
                result = `
<div class="my-1.5 text-xs">
    <div class="text-ubt-orange font-bold mb-1">Technical Skills Overview:</div>
    <div class="space-y-1 text-gray-200">
        <div><span class="text-ubt-green font-semibold">Languages:</span> C++, Python, JavaScript, TypeScript, Go, SQL</div>
        <div><span class="text-ubt-green font-semibold">Backend &amp; APIs:</span> Node.js, Express, Spring Boot, REST APIs, Microservices</div>
        <div><span class="text-ubt-green font-semibold">Databases &amp; Caching:</span> PostgreSQL, MongoDB, Redis</div>
        <div><span class="text-ubt-green font-semibold">DevOps &amp; Cloud:</span> Docker, Linux, Git, GitHub Actions, Vercel, Render</div>
    </div>
</div>`;
                break;
            case "cd":
                if (words.length === 0 || rest === "") {
                    this.current_directory = "~";
                    this.curr_dir_name = "root";
                    break;
                }
                if (words.length > 1) {
                    result = "too many arguments, arguments must be <1.";
                    break;
                }

                if (rest === "personal-documents") {
                    result = `bash /${this.curr_dir_name} : Permission denied 😏`;
                    break;
                }

                if (this.child_directories[this.curr_dir_name].includes(rest)) {
                    this.current_directory += "/" + rest;
                    this.curr_dir_name = rest;
                }
                else if (rest === "." || rest === ".." || rest === "../") {
                    result = "Type 'cd' to go back 😅";
                    break;
                }
                else {
                    result = `bash: cd: ${words}: No such file or directory`;
                }
                break;
            case "ls":
                let target = words[0];
                if (target === "" || target === undefined || target === null) target = this.curr_dir_name;

                if (words.length > 1) {
                    result = "too many arguments, arguments must be <1.";
                    break;
                }
                if (target in this.child_directories) {
                    result = this.childDirectories(target).join("");
                }
                else if (target === "personal-documents") {
                    result = "Nope! 🙃";
                    break;
                }
                else {
                    result = `ls: cannot access '${words}': No such file or directory`;
                }
                break;
            case "mkdir":
                if (words[0] !== undefined && words[0] !== "") {
                    this.props.addFolder(words[0]);
                    result = "";
                } else {
                    result = "mkdir: missing operand";
                }
                break;
            case "pwd":
                let str = this.current_directory;
                result = str.replace("~", "/home/manish");
                break;
            case "code":
                if (words[0] === "." || words.length === 0) {
                    this.props.openApp("vscode");
                } else {
                    result = "Command '" + main + "' not found, or not yet implemented.<br>Available Commands: " + availableCmds;
                }
                break;
            case "echo":
                result = this.xss(words.join(" "));
                break;
            case "spotify":
                if (words[0] === "." || words.length === 0) {
                    this.props.openApp("spotify");
                } else {
                    result = "Command '" + main + "' not found, or not yet implemented.<br>Available Commands: " + availableCmds;
                }
                break;
            case "chrome":
                if (words[0] === "." || words.length === 0) {
                    this.props.openApp("chrome");
                } else {
                    result = "Command '" + main + "' not found, or not yet implemented.<br>Available Commands: " + availableCmds;
                }
                break;
            case "github":
                if (words[0] === "." || words.length === 0) {
                    this.props.openApp("github");
                } else {
                    result = "Command '" + main + "' not found, or not yet implemented.<br>Available Commands: " + availableCmds;
                }
                break;
            case "trash":
                if (words[0] === "." || words.length === 0) {
                    this.props.openApp("trash");
                } else {
                    result = "Command '" + main + "' not found, or not yet implemented.<br>Available Commands: " + availableCmds;
                }
                break;
            case "about-manish":
                if (words[0] === "." || words.length === 0) {
                    this.props.openApp("about-manish");
                } else {
                    result = "Command '" + main + "' not found, or not yet implemented.<br>Available Commands: " + availableCmds;
                }
                break;
            case "terminal":
                if (words[0] === "." || words.length === 0) {
                    this.props.openApp("terminal");
                } else {
                    result = "Command '" + main + "' not found, or not yet implemented.<br>Available Commands: " + availableCmds;
                }
                break;
            case "settings":
                if (words[0] === "." || words.length === 0) {
                    this.props.openApp("settings");
                } else {
                    result = "Command '" + main + "' not found, or not yet implemented.<br>Available Commands: " + availableCmds;
                }
                break;
            case "sendmsg":
            case "contact":
            case "gedit":
                if (words[0] === "." || words.length === 0) {
                    this.props.openApp("gedit");
                } else {
                    result = "Command '" + main + "' not found, or not yet implemented.<br>Available Commands: " + availableCmds;
                }
                break;
            case "minesweeper":
                if (words[0] === "." || words.length === 0) {
                    this.props.openApp("minesweeper");
                } else {
                    result = "Command '" + main + "' not found, or not yet implemented.<br>Available Commands: " + availableCmds;
                }
                break;
            case "2048":
            case "game-2048":
                if (words[0] === "." || words.length === 0) {
                    this.props.openApp("game-2048");
                } else {
                    result = "Command '" + main + "' not found, or not yet implemented.<br>Available Commands: " + availableCmds;
                }
                break;
            case "clear":
                this.reStartTerminal();
                return;
            case "exit":
                this.closeTerminal();
                return;
            case "sudo":
                result = "<img class=' w-2/5' src='./images/memes/used-sudo-command.webp' />";
                break;
            default:
                result = "Command '" + main + "' not found, or not yet implemented.<br>Available Commands: " + availableCmds;
        }
        document.getElementById(`row-result-${rowId}`).innerHTML = result;
        this.appendTerminalRow();
    }

    xss(str) {
        if (!str) return;
        return str.split('').map(char => {
            switch (char) {
                case '&':
                    return '&amp';
                case '<':
                    return '&lt';
                case '>':
                    return '&gt';
                case '"':
                    return '&quot';
                case "'":
                    return '&#x27';
                case '/':
                    return '&#x2F';
                default:
                    return char;
            }
        }).join('');
    }

    render() {
        return (
            <div className="h-full w-full bg-ub-drk-abrgn text-white text-sm font-bold" id="terminal-body">
                {
                    this.state.terminal
                }
            </div>
        )
    }
}

export default Terminal

export const displayTerminal = (addFolder, openApp) => {
    return <Terminal addFolder={addFolder} openApp={openApp}> </Terminal>;
}
