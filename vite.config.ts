import { sveltekit } from "@sveltejs/kit/vite";
import tailwindcss from "@tailwindcss/vite";
import Icon from "unplugin-icons/vite";
import { defineConfig } from "vite";

export default defineConfig({
    plugins: [sveltekit(), tailwindcss(), Icon({ compiler: "svelte" })]
});
