<script lang="ts">
    import { onMount } from "svelte";
    import { writable, type Writable } from "svelte/store";
    import { fade } from "svelte/transition";
    import socials from "$lib/data/socials";
    import projects from "$lib/data/projects";
    import MaterialSymbolsArrowForwardIosRounded from "~icons/material-symbols/arrow-forward-ios-rounded";
    import MaterialSymbolsCloseSmallRounded from "~icons/material-symbols/close-small-rounded";
    import MaterialSymbolsHorizontalRuleRounded from "~icons/material-symbols/horizontal-rule-rounded";
    import MaterialSymbolsCloseFullscreenRounded from "~icons/material-symbols/close-fullscreen-rounded";

    let { defaultMode = $bindable() }: { defaultMode: boolean } = $props();
    let input: string = $state("");
    let args: string[] = $derived.by(() => input.split(" "));
    let output: Writable<{ inp: string, res: string; isError: boolean }[]> = writable([]);
    let dir: string = $state("~");

    interface Cmds {
        [key: string]: {
            help: string;
            func: (args: string[]) => void;
            opts?: {
                opts: string[];
                help: string;
                func: (args: string[]) => void;
            }[];
        };
    }
    const cmds: Cmds = {
        help: {
            help: "List all available commands",
            func: showHelp
        },
        clear: {
            help: "Clear the terminal",
            func: () => {
                output.set([]);
            }
        },
        exit: {
            help: "Exit the terminal",
            func: () => {
                defaultMode = true;
            }
        },
        socials: {
            help: "List all socials",
            func: () => {
                output.update((prev) => [...prev, {
                    inp: input,
                    res: `I'm on ${Object.keys(socials).map((social) => makeHyperlink(social, socials[social].url)).join(", ")}.`,
                    isError: false
                }]);
            },
            opts: [
                {
                    opts: ["-o", "--open"],
                    help: "Opens socials/projects",
                    func: () => {
                        const social: string = args.slice(2).join(" ");
                        const socialName: string | undefined = Object.keys(socials).find((s) => s === social || s.toLowerCase() === social);
                        if (socialName) {
                            output.update((prev) => [...prev, {
                                inp: input,
                                res: `Opening ${makeHyperlink(social, socials[socialName].url)}...`,
                                isError: false
                            }]);
                            window.open(socials[socialName].url, "_blank");
                        } else if (social === "") {
                            output.update((prev) => [...prev, { inp: input, res: `No social provided. Type "socials" for a list of socials.`, isError: true }]);
                        } else {
                            output.update((prev) => [...prev, { inp: input, res: `Social not found: ${social}. Type "socials" for a list of socials.`, isError: true }]);
                        }
                    }
                }
            ]
        },
        projects: {
            help: "List all projects",
            func: () => {
                output.update((prev) => [...prev, {
                    inp: input,
                    res: Object.keys(projects).map((project) => `${makeHyperlink(project, projects[project].url)}<br>  ${projects[project].desc}`).join("<br>"),
                    isError: false
                }]);
            },
            opts: [
                {
                    opts: ["-o", "--open"],
                    help: "Opens socials/projects",
                    func: () => {
                        const project: any = args.slice(2).join(" ");
                        const projectName = Object.keys(projects).find((p) => p === project || p.toLowerCase() === project);
                        if (projectName) {
                            output.update((prev) => [...prev, {
                                inp: input,
                                res: `Opening ${makeHyperlink(projectName, projects[projectName].url)}...`,
                                isError: false
                            }]);
                            window.open(projects[projectName].url, "_blank");
                        } else if (project === "") {
                            output.update((prev) => [...prev, { inp: input, res: `No project provided. Type "projects" for a list of projects.`, isError: true }]);
                        } else {
                            output.update((prev) => [...prev, { inp: input, res: `Project not found: ${project}. Type "projects" for a list of projects.`, isError: true }]);
                        }
                    }
                }
            ]
        }
    };

    function showHelp() {
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
                    return `  <span class="text-cyan-400">${opt.padEnd(maxLength)}</span> ${help}`;
                }),
                "",
                "Examples:",
                ...Object.keys(cmds).sort(() => 0.5 - Math.random()).slice(0, 1).map((cmd) => {
                    const cmdOpts = cmds[cmd].opts?.map(opt => opt.opts).flat() || [];
                    const randomCmdOpt = cmdOpts.sort(() => 0.5 - Math.random())[0] || "";
                    return `  <span class="text-cyan-400">${cmd}</span> ${randomCmdOpt}`;
                })
            ].join("\n"),
            isError: false
        }]);
    }

    function showCommandHelp() {
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
                    return `  <span class="text-cyan-400">${opt.opts.join(", ").padEnd(maxLength)}</span> ${opt.help}`;
                }).join("<br>") : "  No options available.",
            ].join("<br>"),
            isError: false
        }]);
    }

    function handleCommand() {
        const cmd = args[0];
        const cmdObj = cmds[cmd];
        if (cmdObj) {
            const opt = args[1] || undefined;
            if (opt) {
                if (opt === "--help" || opt === "-h") {
                    showCommandHelp();
                } else if (cmdObj.opts) {
                    const optObj = cmdObj.opts.find((o) => o.opts.includes(opt));
                    if (optObj) {
                        optObj.func(args);
                    } else {
                        output.update((prev) => [...prev, { inp: input, res: `Option not found: ${opt}. Type "${cmd} --help" for more information.`, isError: true }]);
                    }
                } else {
                    output.update((prev) => [...prev, { inp: input, res: `Option not found: ${opt}. Type "${cmd} --help" for more information.`, isError: true }]);
                }
            } else {
                cmdObj.func(args);
            }
        } else if (cmd === "") {
            output.update((prev) => [...prev, { inp: " ", res: "", isError: false }]);
        } else {
            output.update((prev) => [...prev, { inp: input, res: `Command not found: ${cmd}. Type "help" for a list of commands.`, isError: true }]);
        }
        input = "";
    }

    function makeHyperlink(text: string, href: string) {
        return `<a href="${href}" class="text-cyan-400 leading-4 border-b border-transparent hover:border-cyan-400 duration-200">${text}</a>`;
    }

    onMount(() => {
        output.set([{ inp: "", res: "Welcome to the terminal. Type \"help\" for a list of commands.", isError: false }]);
        document.onclick = () => {
            const input = document.querySelector("input");
            input && input.focus();
        };
    });
</script>


<div in:fade class="rounded-lg shadow-lg flex flex-col overflow-hidden h-screen">
    <div class="flex items-center sticky top-0 py-5 bg-slate-950">
        <div class="text-center flex-1 text-md text-slate-400">Terminal</div>
        <div class="group flex space-x-2 p-2">
            <button class="size-3 bg-red-400 group-hover:scale-110 transition-transform rounded-full cursor-default" onclick={() => defaultMode = true} aria-label="Exit terminal">
                <span class="flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <MaterialSymbolsCloseSmallRounded class="block size-fit text-slate-950" />
                </span>
            </button>
            <button class="size-3 bg-yellow-400 group-hover:scale-110 transition-transform rounded-full cursor-default" onclick={() => defaultMode = true} aria-label="Exit terminal">
                <span class="flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <MaterialSymbolsHorizontalRuleRounded class="block size-fit text-slate-950" />
                </span>
            </button>
            <button class="size-3 bg-green-400 group-hover:scale-110 transition-transform rounded-full cursor-default" onclick={() => defaultMode = true} aria-label="Exit terminal">
                <span class="flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <MaterialSymbolsCloseFullscreenRounded class="block size-fit text-slate-950" />
                </span>
            </button>
        </div>
    </div>
    <div class="whitespace-pre-wrap overflow-y-scroll overflow-hidden text-sm">
        {#each $output as { inp, res, isError }, i}
            <div transition:fade={{ duration: 100 }} class="flex flex-col">
                {#if inp}
                    <span class="flex space-x-1 items-center">
                        <MaterialSymbolsArrowForwardIosRounded class="block size-4 text-slate-300" />
                        <p class="max-w-fit">{inp}</p>
                    </span>
                {/if}
                {#if isError}
                    <span>{res}</span>
                {:else}
                    <span>{@html res}</span>
                {/if}
            </div>
        {/each}
        <div class="flex items-center">
            <p class="text-blue-300 whitespace-nowrap">{dir}</p>
            <MaterialSymbolsArrowForwardIosRounded class="size-4 text-green-300 mr-1" />
            <input type="text" bind:value={input} onkeydown={(e) => e.key === "Enter" && handleCommand()} class="w-full border-none focus:outline-none bg-transparent" />
        </div>
    </div>
</div>


