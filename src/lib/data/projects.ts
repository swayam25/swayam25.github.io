interface Project {
    [key: string]: {
        desc: string;
        url: string;
        img: string;
        time: number;
        tags: string[];
    };
}

const projects: Project = {
    "MC Addon": {
        desc: "Welcome to the official hub of MC Addon! A competitive, community-driven Lifesteal Minecraft Network with thrilling mechanics, epic events, and intense mini-games!",
        url: "https://mcaddon.fun",
        img: "/project/mcaddon.webp",
        time: 2025,
        tags: ["Minecraft", "Lifesteal", "SMP"]
    },
    Aero: {
        desc: "Aero makes listening to music feel light and breezy.",
        url: "https://github.com/swayam25/Aero",
        img: "/project/aero.webp",
        time: 2025,
        tags: ["Music Player", "Discord OAuth", "SvelteKit"]
    },
    "Clash With JPA": {
        desc: "FWA experts in War-Farming, offering diverse clans and simultaneous 50v50 FWA wars and CWL action. Join one of the clans in our family today!",
        url: "https://clashwithjpa.com",
        img: "/project/clashwithjpa.webp",
        time: 2024,
        tags: ["Clash of Clans", "FWA", "Clan War"]
    },
    Rythmify: {
        desc: "Introducing Rythmify, your go-to web music player that's designed to amplify your moments.",
        img: "/project/rythmify.webp",
        url: "https://github.com/swayam25/Rythmify",
        time: 2023,
        tags: ["Music Player", "AD Free Music", "History", "Playlist"]
    },

    "Bit Box": {
        desc: "Elevate your coding skills with Bit Box. Whether you're a developer, a designer, a student, or anyone else who works with code, Bit Box makes it easy to share your work and get feedback from others.",
        url: "https://github.com/swayam25/Bit-Box",
        img: "/project/bitbox.webp",
        time: 2023,
        tags: ["Code Bin", "Cloud IDE", "Code Sharing"]
    },

    "Swayam's Portfolio": {
        desc: "My porfolio & work website. Shows all my info, my projects etc. Check it!",
        url: "https://github.com/swayam25/swayam25.github.io",
        img: "/project/swayam.webp",
        time: 2022,
        tags: ["Website", "Portfolio", "Work"]
    },

    "Multi DL": {
        desc: "A cli tool for downloading media from various platforms.",
        url: "https://github.com/swayam25/Multi-DL",
        img: "/project/multidl.webp",
        time: 2022,
        tags: ["Media Downloader", "YouTube", "Spotify", "CLI App"]
    },

    "Square Bot": {
        desc: "Advance multipurpose discord bot for all your needs. Contains a powerful music player with high quality music. Contains 100+ commands.",
        url: "https://github.com/swayam25/Square-Bot",
        img: "/project/square.webp",
        time: 2021,
        tags: ["Discord Bot", "Music", "Moderation", "Utility"]
    }
};

export default projects;
