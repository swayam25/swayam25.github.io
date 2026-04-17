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

    let inputEl: HTMLInputElement | undefined = $state();
    let measureSpan: HTMLSpanElement | undefined = $state();
    let cursorPos = $state(0);
    let cursorLeft = $state(0);
    let isFocused = $state(false);
    let isTyping = $state(false);
    let typingTimeout: ReturnType<typeof setTimeout> | undefined;

    setDefaultModeSetter((value: boolean) => {
        defaultMode = value;
    });
    setInput((value: string) => {
        input = value;
        if (inputEl) cursorPos = input.length;
    });

    $effect(() => {
        // Trigger on input / cursorPos changes
        input;
        cursorPos;
        if (measureSpan) {
            measureSpan.textContent = input.slice(0, cursorPos);
            cursorLeft = measureSpan.getBoundingClientRect().width;
        }

        isTyping = true;
        clearTimeout(typingTimeout);
        typingTimeout = setTimeout(() => (isTyping = false), 500);
    });

    function handleCommand() {
        if (!input.trim()) {
            output.update((prev) => [...prev, { inp: input, res: "" }]);
            input = "";
            cursorPos = 0;
            return;
        }

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
        cursorPos = 0;
    }

    function initFocus(node: HTMLInputElement) {
        node.focus();
        setTimeout(() => node.focus(), 150);
    }

    onMount(() => {
        const handleGlobalKeydown = (e: KeyboardEvent) => {
            if (
                !inputEl ||
                document.activeElement === inputEl ||
                e.ctrlKey ||
                e.metaKey ||
                e.altKey
            )
                return;
            if (window.getSelection()?.toString().length) window.getSelection()?.removeAllRanges();

            inputEl.focus();

            if (e.key.length === 1 || e.key === "Backspace") {
                e.preventDefault();
                if (e.key === "Backspace" && cursorPos > 0) {
                    input = input.slice(0, cursorPos - 1) + input.slice(cursorPos);
                    cursorPos--;
                } else if (e.key.length === 1) {
                    input = input.slice(0, cursorPos) + e.key + input.slice(cursorPos);
                    cursorPos++;
                }
                setTimeout(() => inputEl?.setSelectionRange(cursorPos, cursorPos));
            } else if (e.key === "Enter") {
                e.preventDefault();
                handleCommand();
            }
        };

        setTimeout(() => document.addEventListener("keydown", handleGlobalKeydown), 50);
        return () => document.removeEventListener("keydown", handleGlobalKeydown);
    });
</script>

<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<div
    in:fade
    class="flex h-screen w-full flex-col overflow-hidden"
    onclick={(e) => {
        if (window.getSelection()?.toString().length) return;
        inputEl?.focus();
        if (e.target !== inputEl) {
            setTimeout(() => {
                if (inputEl)
                    inputEl.selectionStart = inputEl.selectionEnd = cursorPos = input.length;
            });
        }
    }}
>
    <div class="h-full overflow-y-scroll p-4 pt-10 text-sm whitespace-pre-wrap">
        {#each $output as { inp, res, isError, restrict }, i}
            <div transition:fade={{ duration: 100 }} class="flex flex-col">
                {#if inp !== "" || res === ""}
                    <span class="flex items-center gap-0.5">
                        <LucideChevronRight class="block size-6 text-slate-400" />
                        <p class="max-w-fit">{inp}</p>
                    </span>
                {/if}
                {#if res !== ""}
                    <div class="mt-1">
                        {#if isError || restrict}
                            <span>{res}</span>
                        {:else}
                            <span>{@html res}</span>
                        {/if}
                    </div>
                {/if}
            </div>
        {/each}
        <div class="flex items-center">
            <p class="leading-none whitespace-nowrap text-blue-400">~</p>
            <LucideChevronRight
                class="size-6 {lastOutput.isError ? 'text-red-400' : 'text-green-400'}"
            />
            <div class="relative ml-1 flex h-6 flex-1 items-center overflow-hidden text-sm">
                <span
                    bind:this={measureSpan}
                    class="pointer-events-none absolute text-sm whitespace-pre opacity-0"
                ></span>

                <div
                    class="pointer-events-none absolute top-1/2 z-0 -translate-y-1/2 bg-slate-50 transition-all duration-40 ease-linear
                     {isFocused
                        ? isTyping
                            ? 'mix-blend-difference'
                            : 'animate-pulse mix-blend-difference'
                        : 'border border-slate-50 bg-transparent'}"
                    style="width: 8px; height: 20px; left: {cursorLeft}px;"
                ></div>

                <input
                    use:initFocus
                    bind:this={inputEl}
                    type="text"
                    id="terminal-input"
                    bind:value={input}
                    onfocus={() => (isFocused = true)}
                    onblur={() => (isFocused = false)}
                    onkeydown={(e) => {
                        if (e.key === "Enter") handleCommand();
                        else handleKeys(e, input, output);

                        setTimeout(() => {
                            if (inputEl) cursorPos = inputEl.selectionStart || 0;
                            inputEl?.scrollIntoView({ block: "end" });
                        });
                    }}
                    oninput={() => {
                        if (inputEl) cursorPos = inputEl.selectionStart || 0;
                    }}
                    onselect={() => {
                        if (inputEl) cursorPos = inputEl.selectionStart || 0;
                    }}
                    onmousedown={() => {
                        setTimeout(() => {
                            if (inputEl) cursorPos = inputEl.selectionStart || 0;
                        });
                    }}
                    class="absolute inset-0 m-0 h-full w-full border-none bg-transparent p-0 text-sm leading-none caret-transparent ring-0 outline-none focus:outline-none"
                    autocomplete="off"
                    spellcheck="false"
                />
            </div>
        </div>
    </div>
</div>
