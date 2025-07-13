<script lang="ts">
    import { cn } from "$lib/utils/cn";
    import type { Snippet } from "svelte";

    interface Props {
        class?: string;
        size?: "sm" | "md" | "lg" | "xl" | "";
        href?: string;
        onclick?: () => void;
        children?: Snippet;
    }

    let {
        class: className = "",
        size = "",
        href = "",
        onclick = () => {},
        children
    }: Props = $props();

    let sizeClass: string = $derived.by(() => {
        switch (size) {
            case "sm":
                return "text-sm px-2 py-1";
            case "md":
                return "text-base px-4 py-2";
            case "lg":
                return "text-lg px-4 py-3";
            case "xl":
                return "text-xl px-6 py-4";
            default:
                return "";
        }
    });
</script>

<svelte:element
    this={href ? "a" : "button"}
    role={href ? "link" : "button"}
    tabindex="0"
    class={cn(
        "z-50 flex cursor-pointer items-center justify-center gap-2 rounded-lg bg-slate-800 transition-all duration-200 hover:brightness-90",
        sizeClass,
        className
    )}
    {onclick}
    {href}
    data-sveltekit-preload-data="hover"
>
    {@render children?.()}
</svelte:element>
