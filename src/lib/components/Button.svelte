<script lang="ts">
    import { goto } from "$app/navigation";

    let className: string = "";
    export { className as class };
    export let size: "sm" | "md" | "lg" | "xl" = "md";
    export let href: string;
    export let disabled: boolean = false;

    let sizeClass: string = "";
    $: {
        switch (size) {
            case "sm":
                sizeClass = "text-sm px-2 py-1";
                break;
            case "md":
                sizeClass = "text-base px-4 py-2";
                break;
            case "lg":
                sizeClass = "text-lg px-4 py-3";
                break;
            case "xl":
                sizeClass = "text-xl px-6 py-4";
                break;
        }
    }
</script>

<button
    class="bg-slate-800 hover:bg-opacity-80 transition-opacity rounded-lg {sizeClass} flex space-x-1 justify-center items-center {className}"
    on:click={() => {href ? goto(href) : null;}}
    disabled={disabled}
>
    <slot />
</button>
