<script lang="ts">
    import { page } from "$app/state";
    import { getRing, type Ring } from "$lib/data/ring";
    import { onMount } from "svelte";
    import { fly } from "svelte/transition";
    import SolarArrowLeftLinear from "~icons/solar/arrow-left-linear";
    import SolarArrowRightLinear from "~icons/solar/arrow-right-linear";
    import SolarLinkCircleOutline from "~icons/solar/link-circle-outline";
    import SolarMagicStickOutline from "~icons/solar/magic-stick-outline";

    let ring = $state<Ring | null>(null);
    onMount(() => {
        ring = getRing(page.url.host);
    });
</script>

{#if ring}
    <div
        class="group flex w-full flex-col gap-2 rounded-lg bg-slate-900 p-4 transition-all duration-300"
        in:fly={{ y: -50 }}
    >
        <!-- Header -->
        <p class="text-center text-sm font-medium">{ring?.name}</p>

        <!-- Navigation Links -->
        <div
            class="flex items-center justify-center gap-1 *:flex *:items-center *:gap-1 *:rounded-lg *:px-3 *:py-1.5 *:text-xs *:font-medium *:text-slate-400 *:transition-all *:duration-200 *:hover:bg-slate-800 *:hover:text-slate-100"
        >
            <a href="{ring?.base}/{ring?.previous}" target="_blank" title="Previous site">
                <SolarArrowLeftLinear class="size-3" />
                <span>Prev</span>
            </a>

            <a href={ring?.base} target="_blank" title="Visit {ring?.name}">
                <SolarLinkCircleOutline class="size-3" />
                <span>Ring</span>
            </a>

            <a href="{ring?.base}/{ring?.next}" target="_blank" title="Next site">
                <span>Next</span>
                <SolarArrowRightLinear class="size-3" />
            </a>

            <a href="{ring?.base}/{ring?.random}" target="_blank" title="Random site">
                <SolarMagicStickOutline class="size-3" />
                <span>Random</span>
            </a>
        </div>
    </div>
{/if}
