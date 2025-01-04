<script lang="ts">
    import type { Snippet } from "svelte";

    interface Props {
        class?: string;
        href: string;
        icon?: any;
        children?: Snippet;
    }

    let { class: className = "", href, icon = null, children }: Props = $props();
</script>

<a
    {href}
    target="_blank"
    class="inline-block border-b border-slate-800 text-slate-100 transition-colors duration-200 hover:border-slate-100 {className}"
>
    {#if icon}
        {@const SvelteComponent = icon}
        <SvelteComponent class="inline-block size-fit" />
    {/if}
    {@render children?.()}
</a>
