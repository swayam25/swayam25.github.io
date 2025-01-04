<script lang="ts">
    import { onNavigate } from "$app/navigation";
    import type { Snippet } from "svelte";
    import "../app.css";

    interface Props {
        children?: Snippet;
    }

    let { children }: Props = $props();

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

{@render children?.()}
