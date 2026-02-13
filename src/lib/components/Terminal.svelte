<script lang="ts">
    import { cmds, output, setDefaultModeSetter } from "$lib/terminal/cmds";
    import { showCommandHelp } from "$lib/terminal/help";
    import { handleKeys, setInput } from "$lib/terminal/keys";
    import { onMount } from "svelte";
    import { fade } from "svelte/transition";
    import LucideChevronRight from "~icons/lucide/chevron-right";

    let { defaultMode = $bindable() }: { defaultMode: boolean } = $props();
    let input: string = $state("");
    let lastOutput = $derived.by(() => $output[$output.length - 1] || { isError: false });

    setDefaultModeSetter((value: boolean) => {
        defaultMode = value;
    });
    setInput((value: string) => {
        input = value;
    });

    function handleCommand() {
        const commands = input.split("&&").map((cmd) => cmd.trim());
        for (const command of commands) {
            if (!command) continue;
            const [cmd, ...opts] = command.split(" ");
            const cmdObj = cmds[cmd];

            if (cmdObj) {
                const opt = opts.find((opt) => opt.startsWith("-"));
                if (opt) {
                    if (opt === "--help" || opt === "-h") {
                        showCommandHelp([cmd, ...opts], command);
                    } else {
                        const optObj = cmdObj.opts?.find((o) => o.opts.includes(opt));
                        optObj
                            ? optObj.func([cmd, ...opts], command)
                            : output.update((prev) => [
                                  ...prev,
                                  { inp: command, res: `Option not found: ${opt}.`, isError: true }
                              ]);
                    }
                } else {
                    cmdObj.func([cmd, ...opts], command);
                }
            } else {
                output.update((prev) => [
                    ...prev,
                    {
                        inp: command,
                        res: `Command not found: ${cmd}. Type "help" for a list of commands.`,
                        isError: !!cmd
                    }
                ]);
            }
        }
        input = "";
    }

    onMount(() => {
        output.set([
            { inp: "", res: 'Welcome to the terminal. Type "help" for a list of commands.' }
        ]);
        document.onclick = document.onkeydown = () => {
            const input = document.querySelector("input");
            input && input.focus();
        };
    });
</script>

<div in:fade class="flex h-screen w-full flex-col overflow-hidden">
    <div class="overflow-hidden overflow-y-scroll p-5 pt-10 text-sm whitespace-pre-wrap">
        {#each $output as { inp, res, isError, restrict }, i}
            <div transition:fade={{ duration: 100 }} class="flex flex-col">
                {#if inp}
                    <span class="flex items-center gap-0.5">
                        <LucideChevronRight class="block size-5 text-slate-400" />
                        <p class="max-w-fit">{inp}</p>
                    </span>
                {/if}
                {#if isError || restrict}
                    <span>{res}</span>
                {:else}
                    <span>{@html res}</span>
                {/if}
            </div>
        {/each}
        <div class="flex items-center gap-0.5">
            <p class="whitespace-nowrap text-blue-400">~</p>
            <LucideChevronRight
                class="size-5 {lastOutput.isError ? 'text-red-400' : 'text-green-400'}"
            />
            <input
                type="text"
                id="terminal-input"
                bind:value={input}
                onkeydown={(e) => {
                    (e.key === "Enter" && handleCommand()) || handleKeys(e, input, output);
                    setTimeout(() => {
                        const terminalInput = document.getElementById("terminal-input");
                        terminalInput?.scrollIntoView({ behavior: "smooth", block: "end" });
                    });
                }}
                class="w-full border-none bg-transparent focus:outline-hidden"
            />
        </div>
    </div>
</div>
