<script lang="ts">
    import { page } from "$app/state";
    import Button from "$lib/components/Button.svelte";
    import PhCaretLeftBold from "~icons/ph/caret-left-bold";
</script>

<svelte:head>
    <title>Swayam | {page.error?.message}</title>
</svelte:head>

<div class="flex h-screen w-screen flex-col items-center justify-center gap-1">
    <h1 class="text-4xl font-bold md:text-5xl">{page.status}</h1>
    <h2 class="text-xl font-semibold text-slate-400">{page.error?.message}</h2>
    <div class="pt-5">
        <Button size="md" href="/" class="group">
            <PhCaretLeftBold class="size-4 transition-transform group-hover:-translate-x-2" />
            <span>Homepage</span>
        </Button>
    </div>
</div>
