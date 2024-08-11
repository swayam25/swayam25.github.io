<script lang="ts">
    import { page } from "$app/stores";
    import Button from "$lib/components/Button.svelte";
    import PhCaretLeftBold from "~icons/ph/caret-left-bold";
</script>

<svelte:head>
    <title>Swayam | {$page.error?.message}</title>
</svelte:head>

<div class="h-screen w-screen flex flex-col space-y-1 justify-center items-center">
    <h1 class="text-4xl md:text-5xl font-bold">{$page.status}</h1>
    <h2 class="text-xl text-slate-400 font-semibold">{$page.error?.message}</h2>
    <div class="pt-5">
        <Button size="md" href="/" class="group">
            <PhCaretLeftBold class="size-4 group-hover:-translate-x-2 transition-transform" />
            <span>Homepage</span>
        </Button>
    </div>
</div>