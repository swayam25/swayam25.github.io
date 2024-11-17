<script lang="ts">

    interface Props {
        class?: string;
        href: string;
        icon?: any;
        children?: import('svelte').Snippet;
    }

    let {
        class: className = "",
        href,
        icon = null,
        children
    }: Props = $props();
</script>

<a
    href={href} target="_blank"
    class="inline-block border-b text-slate-100 border-slate-800 hover:border-slate-100 transition-colors duration-200 leading-1 {className}"
>
    {#if icon}
        {@const SvelteComponent = icon}
        <SvelteComponent class="size-fit inline-block" />
    {/if}
    {@render children?.()}
</a>