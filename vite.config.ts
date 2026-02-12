import { sveltekit } from "@sveltejs/kit/vite";
import tailwindcss from "@tailwindcss/vite";
import { FileSystemIconLoader } from "unplugin-icons/loaders";
import Icon from "unplugin-icons/vite";
import { defineConfig } from "vite";

export default defineConfig({
    plugins: [
        sveltekit(),
        tailwindcss(),
        Icon({
            compiler: "svelte",
            customCollections: {
                "my-icons": FileSystemIconLoader("./static/icons", (svg) =>
                    svg.replace(/^<svg /, '<svg fill="currentColor" ')
                )
            }
        })
    ]
});
