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

<button
    class="z-50 rounded-lg bg-slate-800 {sizeClass} {className} transition-all duration-200 hover:brightness-90"
    onclick={() => {
        if (href != "") {
            goto(href);
        }
        if (event != null) {
            event();
        }
    }}
    {disabled}
>
    <div class="flex items-center justify-center space-x-1 transition-all">
        {@render children?.()}
    </div>
</button>
