import { cmds, output } from "$lib/terminal/cmds";

export function showHelp(args: string[], input: string) {
    const maxCmdLength = Math.max(...Object.keys(cmds).map(cmd => cmd.length));
    const uniqueOpts: { [key: string]: string } = {};
    Object.values(cmds).forEach(cmd => {
        cmd.opts?.forEach(opt => {
        const key = opt.opts.join(", ");
        if (!uniqueOpts[key]) {
            uniqueOpts[key] = opt.help;
        }
        });
    });
    console.log(...Object.keys(uniqueOpts).map(opt => opt));
    const maxOptLength = Math.max(...Object.keys(uniqueOpts).map(opt => opt.length));
    const maxLength = Math.max(maxCmdLength, maxOptLength);

    output.update((prev) => [...prev, {
        inp: input,
        res: [
            "Usage:",
            `  [<span class="text-cyan-400">COMMAND</span>] [<span class="text-cyan-400">OPTION</span>]`,
            "",
            "Commands:",
            ...Object.keys(cmds).map((cmd) => `  <span class="text-cyan-400">${cmd.padEnd(maxLength)}</span> ${cmds[cmd].help}`),
            "",
            "Options:",
            ...Object.entries(uniqueOpts).map(([opt, help]) => {
                const coloredOpts = opt.split(", ").map(o => `<span class="text-cyan-400">${o}</span>`).join(", ");
                return `  ${coloredOpts.padEnd(maxLength + (coloredOpts.length - opt.length))} ${help}`;
            }),
            "",
            "Examples:",
            ...Object.keys(cmds).sort(() => 0.5 - Math.random()).slice(0, 1).map((cmd) => {
                const cmdOpts = cmds[cmd].opts?.map(opt => opt.opts).flat() || [];
                const randomCmdOpt = cmdOpts.sort(() => 0.5 - Math.random())[0] || "";
                return `  <span class="text-cyan-400">${cmd}</span> ${randomCmdOpt}`;
            })
        ].join("<br>"),
        isError: false
    }]);
}

export function showCommandHelp(args: string[], input: string) {
    const cmd = args[0];
    const cmdObj = cmds[cmd];
    const maxLength = Math.max(...(cmdObj.opts || []).map(opt => opt.opts.join(", ").length));

    output.update((prev) => [...prev, {
        inp: input,
        res: ["Usage:",
            `  <span class="text-cyan-400">${cmd}</span> ${cmdObj.opts ? "[<span class=\"text-cyan-400\">OPTION</span>]" : ""}`,
            "",
            "Description:",
            `  ${cmdObj.help}`,
            "",
            "Options:",
            cmdObj.opts ? cmdObj.opts.map(opt => {
                const coloredOpts = opt.opts.map(o => `<span class="text-cyan-400">${o}</span>`).join(", ");
                return `  ${coloredOpts.padEnd(maxLength + (coloredOpts.length - opt.opts.join(", ").length))} ${opt.help}`;
            }).join("<br>") : "  No options available.",
        ].join("<br>"),
        isError: false
    }]);
}
