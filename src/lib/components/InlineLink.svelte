<script lang="ts">
    import { cn } from "$lib/utils/cn";
    import type { Component, Snippet } from "svelte";

    interface Props {
        class?: string;
        href: string;
        icon?: Component;
        children?: Snippet;
    }

    let { class: className = "", href, icon, children }: Props = $props();
</script>

<a
    {href}
    target="_blank"
    class={cn(
        "relative inline-block text-base text-slate-50 transition-colors duration-200 after:absolute after:bottom-0 after:left-0 after:h-[0.2px] after:w-full after:origin-bottom-right after:scale-x-0 after:bg-slate-50 after:transition-transform after:duration-300 after:ease-in-out hover:after:origin-bottom-left hover:after:scale-x-100",
        className
    )}
>
    {#if icon}
        {@const SvelteComponent = icon}
        <SvelteComponent class="inline-block size-fit" />
    {/if}
    {@render children?.()}
</a>
