<script lang="ts">
    import { onMount } from "svelte";
    import { fade } from "svelte/transition";
    import { cmds, output, setDefaultModeSetter } from "$lib/terminal/cmds";
    import { showCommandHelp } from "$lib/terminal/help";
    import MaterialSymbolsArrowForwardIosRounded from "~icons/material-symbols/arrow-forward-ios-rounded";
    import MaterialSymbolsCloseSmallRounded from "~icons/material-symbols/close-small-rounded";
    import MaterialSymbolsHorizontalRuleRounded from "~icons/material-symbols/horizontal-rule-rounded";
    import MaterialSymbolsCloseFullscreenRounded from "~icons/material-symbols/close-fullscreen-rounded";

    let { defaultMode = $bindable() }: { defaultMode: boolean } = $props();
    let input: string = $state("");
    let args: string[] = $derived.by(() => input.split(" "));
    let lastOutput = $derived.by(() => $output[$output.length - 1] || { isError: false });

    setDefaultModeSetter((value: boolean) => {
        defaultMode = value;
    });

    function handleCommand() {
        const [cmd, opt] = args;
        const cmdObj = cmds[cmd];

        if (cmdObj) {
            if (opt?.startsWith("-")) {
                if (opt === "--help" || opt === "-h") {
                    showCommandHelp(args, input);
                } else {
                    const optObj = cmdObj.opts?.find((o) => o.opts.includes(opt));
                    optObj ? optObj.func(args, input) : output.update((prev) => [...prev, { inp: input, res: `Option not found: ${opt}.`, isError: true }]);
                }
            } else {
                cmdObj.func(args, input);
            }
        } else {
            output.update((prev) => [...prev, { inp: input, res: cmd ? `Command not found: ${cmd}. Type "help" for a list of commands.` : "", isError: !!cmd }]);
        }
        input = "";
    }

    onMount(() => {
        output.set([{ inp: "", res: "Welcome to the terminal. Type \"help\" for a list of commands." }]);
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
        {#each $output as { inp, res, isError, restrict }, i}
            <div transition:fade={{ duration: 100 }} class="flex flex-col">
                {#if inp}
                    <span class="flex space-x-1 items-center">
                        <MaterialSymbolsArrowForwardIosRounded class="block size-4 text-slate-300" />
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
            <p class="text-blue-300 whitespace-nowrap">~</p>
            <MaterialSymbolsArrowForwardIosRounded class="size-4 {lastOutput.isError ? "text-red-300" : "text-green-300"} mr-1" />
            <input type="text" bind:value={input} onkeydown={(e) => e.key === "Enter" && handleCommand()} class="w-full border-none focus:outline-none bg-transparent" />
        </div>
    </div>
</div>


