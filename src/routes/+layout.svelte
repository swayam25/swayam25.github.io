<script lang="ts">
    import { onNavigate } from "$app/navigation";
    import type { Snippet } from "svelte";
    import "../app.css";

    interface Props {
        children?: Snippet;
    }

    let { children }: Props = $props();

    let mouseX = $state(50);
    let mouseY = $state(50);
    let innerWidth = $state(1024);
    let mouseMoved = $state(false);

    onNavigate((navigation) => {
        if (!document.startViewTransition) return;

        return new Promise((resolve) => {
            document.startViewTransition(async () => {
                resolve();
                await navigation.complete;
            });
        });
    });
</script>

<svelte:window
    bind:innerWidth
    onmousemove={(e) => {
        mouseMoved = true;
        mouseX = e.clientX;
        mouseY = e.clientY;
    }}
/>

<!-- Cursor glow -->
<div
    class="pointer-events-none fixed inset-0 z-[-1] transition-opacity duration-200"
    style="background: radial-gradient({innerWidth < 1024 || !mouseMoved
        ? '1000px circle at 100% 0%'
        : `1000px circle at ${mouseX}px ${mouseY}px`}, rgba(0, 163, 255, 0.06), transparent 80%);"
    aria-hidden="true"
></div>

{@render children?.()}
