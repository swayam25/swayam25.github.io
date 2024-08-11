import { sveltekit } from "@sveltejs/kit/vite";
import { defineConfig } from "vite";
import Icon from "unplugin-icons/vite";

export default defineConfig({
	plugins: [
		sveltekit(),
		Icon({ compiler: "svelte" })
	]
});
