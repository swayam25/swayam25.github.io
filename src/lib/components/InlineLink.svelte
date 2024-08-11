<script lang="ts">
    let className: string = "";
    export { className as class };
    export let href: string;
    export let icon: any = null;
</script>

<a
    href={href} target="_blank"
    class="inline-block border-b text-slate-100 border-slate-800 hover:border-slate-100 transition-colors duration-200 leading-1 {className}"
>
    {#if icon}
        <svelte:component this={icon} class="size-fit inline-block" />
    {/if}
    <slot />
</a>