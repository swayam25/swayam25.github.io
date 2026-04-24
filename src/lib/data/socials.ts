import type { Component } from "svelte";
import SimpleIconsDiscord from "~icons/simple-icons/discord";
import SimpleIconsGithub from "~icons/simple-icons/github";
import SimpleIconsYoutubemusic from "~icons/simple-icons/youtubemusic";

interface Social {
    [key: string]: {
        url: string;
        icon: Component;
    };
}

const socials: Social = {
    GitHub: {
        url: "https://github.com/swayam25",
        icon: SimpleIconsGithub
    },
    Discord: {
        url: "https://discord.com/users/1272113262455951464",
        icon: SimpleIconsDiscord
    },
    "YouTube Music": {
        url: "https://music.youtube.com/@swayam25_yt",
        icon: SimpleIconsYoutubemusic
    }
};

export default socials;
