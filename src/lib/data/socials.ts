import type { Component } from "svelte";
import SimpleIconsDiscord from "~icons/simple-icons/discord";
import SimpleIconsGithub from "~icons/simple-icons/github";
import SimpleIconsSpotify from "~icons/simple-icons/spotify";

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
    Spotify: {
        url: "https://open.spotify.com/user/31lozcjyk355j54nho6m5k5aulvm",
        icon: SimpleIconsSpotify
    }
};

export default socials;
