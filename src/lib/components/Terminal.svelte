<script lang="ts">
    import { cmds, output, setDefaultModeSetter } from "$lib/terminal/cmds";
    import { showCommandHelp } from "$lib/terminal/help";
    import { onMount } from "svelte";
    import { fade } from "svelte/transition";
    import MaterialSymbolsArrowForwardIosRounded from "~icons/material-symbols/arrow-forward-ios-rounded";
    import MaterialSymbolsCloseFullscreenRounded from "~icons/material-symbols/close-fullscreen-rounded";
    import MaterialSymbolsCloseSmallRounded from "~icons/material-symbols/close-small-rounded";
    import MaterialSymbolsHorizontalRuleRounded from "~icons/material-symbols/horizontal-rule-rounded";

    let { defaultMode = $bindable() }: { defaultMode: boolean } = $props();
    let input: string = $state("");
    let lastOutput = $derived.by(() => $output[$output.length - 1] || { isError: false });

    setDefaultModeSetter((value: boolean) => {
        defaultMode = value;
    });

    function handleCommand() {
        const commands = input.split("&&").map((cmd) => cmd.trim());
        for (const command of commands) {
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
                        res: cmd
                            ? `Command not found: ${cmd}. Type "help" for a list of commands.`
                            : "",
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
        document.onclick = () => {
            const input = document.querySelector("input");
            input && input.focus();
        };
    });
</script>

<div in:fade class="flex h-screen flex-col overflow-hidden rounded-lg shadow-lg">
    <div class="sticky top-0 flex items-center bg-slate-950 py-5">
        <div class="text-md flex-1 text-center text-slate-400">Terminal</div>
        <div class="group flex space-x-2 p-2">
            <button
                class="size-3 cursor-default rounded-full bg-red-400 transition-transform group-hover:scale-110"
                onclick={() => (defaultMode = true)}
                aria-label="Exit terminal"
            >
                <span
                    class="flex items-center justify-center opacity-0 transition-opacity group-hover:opacity-100"
                >
                    <MaterialSymbolsCloseSmallRounded class="block size-fit text-slate-950" />
                </span>
            </button>
            <button
                class="size-3 cursor-default rounded-full bg-yellow-400 transition-transform group-hover:scale-110"
                onclick={() => (defaultMode = true)}
                aria-label="Exit terminal"
            >
                <span
                    class="flex items-center justify-center opacity-0 transition-opacity group-hover:opacity-100"
                >
                    <MaterialSymbolsHorizontalRuleRounded class="block size-fit text-slate-950" />
                </span>
            </button>
            <button
                class="size-3 cursor-default rounded-full bg-green-400 transition-transform group-hover:scale-110"
                onclick={() => (defaultMode = true)}
                aria-label="Exit terminal"
            >
                <span
                    class="flex items-center justify-center opacity-0 transition-opacity group-hover:opacity-100"
                >
                    <MaterialSymbolsCloseFullscreenRounded class="block size-fit text-slate-950" />
                </span>
            </button>
        </div>
    </div>
    <div class="overflow-hidden overflow-y-scroll text-sm whitespace-pre-wrap">
        {#each $output as { inp, res, isError, restrict }, i}
            <div transition:fade={{ duration: 100 }} class="flex flex-col">
                {#if inp}
                    <span class="flex items-center space-x-1">
                        <MaterialSymbolsArrowForwardIosRounded
                            class="block size-4 text-slate-400"
                        />
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
        <div class="flex items-center">
            <p class="whitespace-nowrap text-blue-400">~</p>
            <MaterialSymbolsArrowForwardIosRounded
                class="size-4 {lastOutput.isError ? 'text-red-400' : 'text-green-400'} mr-1"
            />
            <input
                type="text"
                bind:value={input}
                onkeydown={(e) => e.key === "Enter" && handleCommand()}
                class="w-full border-none bg-transparent focus:outline-hidden"
            />
        </div>
    </div>
</div>
