import projects from "$lib/data/projects";
import socials from "$lib/data/socials";
import { showHelp } from "$lib/terminal/help";
import { writable, type Writable } from "svelte/store";

export const output: Writable<
    { inp: string; res: string; isError?: boolean; restrict?: boolean }[]
> = writable([]);
export let defaultModeSetter: (value: boolean) => void;

interface Cmds {
    [key: string]: {
        help: string;
        func: (args: string[], input: string) => void;
        opts?: {
            opts: string[];
            help: string;
            func: (args: string[], input: string) => void;
        }[];
    };
}

export const cmds: Cmds = {
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
            if (defaultModeSetter) {
                defaultModeSetter(true);
            }
        }
    },
    about: {
        help: "About me",
        func: (args, input) => {
            output.update((prev) => [
                ...prev,
                {
                    inp: input,
                    res: `Hi, I'm <span class="text-cyan-400">Swayam</span>, a full stack developer. I have a passion for creating elegant and efficient code that delivers exceptional user experiences.`
                }
            ]);
        }
    },
    socials: {
        help: "List all socials",
        func: (args, input) => {
            output.update((prev) => [
                ...prev,
                {
                    inp: input,
                    res: `I'm on ${Object.keys(socials)
                        .map((social) => makeHyperlink(social, socials[social].url))
                        .join(", ")}.`
                }
            ]);
        },
        opts: [
            {
                opts: ["-o", "--open"],
                help: "Opens socials/projects",
                func: (args, input) => {
                    const social: string = args.slice(2).join(" ");
                    const socialName: string | undefined = Object.keys(socials).find(
                        (s) => s === social || s.toLowerCase() === social
                    );
                    if (socialName) {
                        output.update((prev) => [
                            ...prev,
                            {
                                inp: input,
                                res: `Opening ${makeHyperlink(social, socials[socialName].url)}...`
                            }
                        ]);
                        window.open(socials[socialName].url, "_blank");
                    } else if (social === "") {
                        output.update((prev) => [
                            ...prev,
                            {
                                inp: input,
                                res: `No social provided. Type "socials" for a list of socials.`,
                                isError: true
                            }
                        ]);
                    } else {
                        output.update((prev) => [
                            ...prev,
                            {
                                inp: input,
                                res: `Social not found: ${social}. Type "socials" for a list of socials.`,
                                isError: true
                            }
                        ]);
                    }
                }
            }
        ]
    },
    projects: {
        help: "List all projects",
        func: (args, input) => {
            output.update((prev) => [
                ...prev,
                {
                    inp: input,
                    res: Object.keys(projects)
                        .map(
                            (project) =>
                                `${makeHyperlink(project, projects[project].url)}<br>  ${projects[project].desc}`
                        )
                        .join("<br>")
                }
            ]);
        },
        opts: [
            {
                opts: ["-o", "--open"],
                help: "Opens socials/projects",
                func: (args, input) => {
                    const project: any = args.slice(2).join(" ");
                    const projectName = Object.keys(projects).find(
                        (p) => p === project || p.toLowerCase() === project
                    );
                    if (projectName) {
                        output.update((prev) => [
                            ...prev,
                            {
                                inp: input,
                                res: `Opening ${makeHyperlink(projectName, projects[projectName].url)}...`
                            }
                        ]);
                        window.open(projects[projectName].url, "_blank");
                    } else if (project === "") {
                        output.update((prev) => [
                            ...prev,
                            {
                                inp: input,
                                res: `No project provided. Type "projects" for a list of projects.`,
                                isError: true
                            }
                        ]);
                    } else {
                        output.update((prev) => [
                            ...prev,
                            {
                                inp: input,
                                res: `Project not found: ${project}. Type "projects" for a list of projects.`,
                                isError: true
                            }
                        ]);
                    }
                }
            }
        ]
    },
    echo: {
        help: "Prints the given text",
        func: (args, input) => {
            output.update((prev) => [
                ...prev,
                {
                    inp: input,
                    res: args.slice(1).join(" "),
                    restrict: true
                }
            ]);
        }
    },
    cowsay: {
        help: "Generate a cow saying something",
        func: (args, input) => {
            const text = args.slice(1).join(" ");
            const border = "-".repeat(text.length + 2);
            const cowParts = [
                ` ${border}`,
                `< ${text} >`,
                ` ${border}`,
                `        \\    ^__^`,
                `         \\   (oo)\\_______`,
                `             (__)\\       )\\/\\`,
                `                 ||----w |`,
                `                 ||     ||`
            ];
            const cow = cowParts.join("\n");
            output.update((prev) => [
                ...prev,
                {
                    inp: input,
                    res: `${cow}`,
                    restrict: true
                }
            ]);
        }
    }
};

export function setDefaultModeSetter(setter: (value: boolean) => void) {
    defaultModeSetter = setter;
}

function makeHyperlink(text: string, href: string) {
    return `<a href="${href}" target="_blank" class="text-cyan-400 leading-4 border-b border-transparent hover:border-cyan-400 duration-200">${text}</a>`;
}
