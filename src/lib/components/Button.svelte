<script lang="ts">
    import { goto } from "$app/navigation";


    interface Props {
        class?: string;
        size?: "sm" | "md" | "lg" | "xl";
        href?: string;
        event?: () => void;
        disabled?: boolean;
        children?: import("svelte").Snippet;
    }

    let {
        class: className = "",
        size = "md",
        href = "",
        event = () => {},
        disabled = false,
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

<div class="bg-slate-950 z-50 rounded-lg {className}">
    <button class="bg-slate-800 hover:bg-opacity-80 transition-all flex space-x-1 justify-center items-center {sizeClass} rounded-lg" onclick={() => {href != "" ? goto(href) : null; event != null ? event() : null}} disabled={disabled}>
        {@render children?.()}
    </button>
</div>
