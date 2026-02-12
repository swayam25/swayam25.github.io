import type { Component } from "svelte";
import Lavalink from "~icons/my-icons/lavalink";
import Tebex from "~icons/my-icons/tebex";
import SimpleIconsCloudflarepages from "~icons/simple-icons/cloudflarepages";
import SimpleIconsDiscord from "~icons/simple-icons/discord";
import SimpleIconsDocker from "~icons/simple-icons/docker";
import SimpleIconsFastapi from "~icons/simple-icons/fastapi";
import SimpleIconsGithub from "~icons/simple-icons/github";
import SimpleIconsJavascript from "~icons/simple-icons/javascript";
import SimpleIconsPostgresql from "~icons/simple-icons/postgresql";
import SimpleIconsPython from "~icons/simple-icons/python";
import SimpleIconsSupabase from "~icons/simple-icons/supabase";
import SimpleIconsSvelte from "~icons/simple-icons/svelte";
import SimpleIconsTailwindcss from "~icons/simple-icons/tailwindcss";
import SimpleIconsTyper from "~icons/simple-icons/typer";
import SimpleIconsTypescript from "~icons/simple-icons/typescript";

interface Project {
    [key: string]: {
        desc: string;
        url: string;
        img: string;
        time: number;
        tags?: {
            icon: Component;
            name: string;
        }[];
    };
}

const projects: Project = {
    "MC Addon": {
        desc: "Welcome to the official hub of MC Addon! A competitive, community-driven Lifesteal Minecraft Network with thrilling mechanics, epic events, and intense mini-games!",
        url: "https://mcaddon.fun",
        img: "/project/mcaddon.webp",
        time: 2025,
        tags: [
            { icon: SimpleIconsTypescript, name: "TypeScript" },
            { icon: SimpleIconsSvelte, name: "SvelteKit" },
            { icon: SimpleIconsTailwindcss, name: "Tailwind CSS" },
            { icon: SimpleIconsSupabase, name: "Supabase" },
            { icon: SimpleIconsCloudflarepages, name: "Cloudflare Pages" },
            { icon: Tebex, name: "Tebex" },
            { icon: SimpleIconsDiscord, name: "Discord OAuth" }
        ]
    },
    Aero: {
        desc: "Aero makes listening to music feel light and breezy.",
        url: "https://github.com/swayam25/Aero",
        img: "/project/aero.webp",
        time: 2025,
        tags: [
            { icon: SimpleIconsTypescript, name: "TypeScript" },
            { icon: SimpleIconsSvelte, name: "SvelteKit" },
            { icon: SimpleIconsTailwindcss, name: "Tailwind CSS" },
            { icon: SimpleIconsSupabase, name: "Supabase" },
            { icon: SimpleIconsDocker, name: "Docker" },
            { icon: SimpleIconsDiscord, name: "Discord OAuth" }
        ]
    },
    "Clash With JPA": {
        desc: "FWA experts in War-Farming, offering diverse clans and simultaneous 50v50 FWA wars and CWL action. Join one of the clans in our family today!",
        url: "https://clashwithjpa.com",
        img: "/project/clashwithjpa.webp",
        time: 2024,
        tags: [
            { icon: SimpleIconsTypescript, name: "TypeScript" },
            { icon: SimpleIconsSvelte, name: "SvelteKit" },
            { icon: SimpleIconsTailwindcss, name: "Tailwind CSS" },
            { icon: SimpleIconsPostgresql, name: "PostgreSQL" },
            { icon: SimpleIconsDocker, name: "Docker" },
            { icon: SimpleIconsDiscord, name: "Discord OAuth" }
        ]
    },
    Rythmify: {
        desc: "Introducing Rythmify, your go-to web music player that's designed to amplify your moments.",
        img: "/project/rythmify.webp",
        url: "https://github.com/swayam25/Rythmify",
        time: 2023,
        tags: [
            { icon: SimpleIconsPython, name: "Python" },
            { icon: SimpleIconsFastapi, name: "FastAPI" },
            { icon: SimpleIconsJavascript, name: "JavaScript" },
            { icon: SimpleIconsSvelte, name: "SvelteKit" },
            { icon: SimpleIconsTailwindcss, name: "Tailwind CSS" },
            { icon: SimpleIconsDiscord, name: "Discord OAuth" }
        ]
    },

    "Bit Box": {
        desc: "Elevate your coding skills with Bit Box. Whether you're a developer, a designer, a student, or anyone else who works with code, Bit Box makes it easy to share your work and get feedback from others.",
        url: "https://github.com/swayam25/Bit-Box",
        img: "/project/bitbox.webp",
        time: 2023,
        tags: [
            { icon: SimpleIconsPython, name: "Python" },
            { icon: SimpleIconsFastapi, name: "FastAPI" },
            { icon: SimpleIconsJavascript, name: "JavaScript" },
            { icon: SimpleIconsSvelte, name: "SvelteKit" },
            { icon: SimpleIconsTailwindcss, name: "Tailwind CSS" }
        ]
    },

    "Swayam's Portfolio": {
        desc: "My porfolio website. Shows all my info, my projects etc. Check it!",
        url: "https://github.com/swayam25/swayam25.github.io",
        img: "/project/swayam.webp",
        time: 2022,
        tags: [
            { icon: SimpleIconsTypescript, name: "TypeScript" },
            { icon: SimpleIconsSvelte, name: "SvelteKit" },
            { icon: SimpleIconsTailwindcss, name: "Tailwind CSS" },
            { icon: SimpleIconsGithub, name: "GitHub Pages" }
        ]
    },

    "Multi DL": {
        desc: "A cli tool for downloading media from various platforms.",
        url: "https://pypi.org/project/multidl",
        img: "/project/multidl.webp",
        time: 2022,
        tags: [
            { icon: SimpleIconsPython, name: "Python" },
            { icon: SimpleIconsTyper, name: "Typer" }
        ]
    },

    "Square Bot": {
        desc: "Advance multipurpose discord bot for all your needs. Contains a powerful music player with high quality music.",
        url: "https://github.com/swayam25/Square-Bot",
        img: "/project/square.webp",
        time: 2021,
        tags: [
            { icon: SimpleIconsPython, name: "Python" },
            { icon: SimpleIconsDiscord, name: "Pycord" },
            { icon: SimpleIconsPostgresql, name: "PostgreSQL" },
            { icon: Lavalink, name: "Lavalink" },
            { icon: SimpleIconsDocker, name: "Docker" }
        ]
    }
};

export default projects;
