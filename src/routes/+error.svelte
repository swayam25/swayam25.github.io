<script lang="ts">
    import { page } from "$app/state";
    import Button from "$lib/components/Button.svelte";
    import { glitchAnimation } from "$lib/utils/animations";
    import LucideArrowLeft from "~icons/lucide/arrow-left";

    let errorStatus: HTMLElement | undefined = $state();

    $effect(() => {
        if (errorStatus) glitchAnimation(errorStatus);
    });
</script>

<svelte:head>
    <title>Swayam | {page.error?.message}</title>
</svelte:head>

<div class="flex h-screen w-screen flex-col items-center justify-center gap-1">
    <h1 bind:this={errorStatus} class="text-6xl font-bold">{page.status}</h1>
    <h2 class="text-xl font-semibold text-slate-400">{page.error?.message}</h2>
    <div class="pt-6">
        <Button href="/" class="group">
            <LucideArrowLeft class="size-4 transition-transform group-hover:-translate-x-2" />
            <span>Homepage</span>
        </Button>
    </div>
</div>
