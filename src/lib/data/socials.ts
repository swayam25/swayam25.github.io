import type { Component } from "svelte";
import RiDiscordFill from "~icons/ri/discord-fill";
import RiGithubFill from "~icons/ri/github-fill";
import RiSpotifyFill from "~icons/ri/spotify-fill";

interface Social {
    [key: string]: {
        url: string;
        icon: Component;
    };
}

const socials: Social = {
    GitHub: {
        url: "https://github.com/swayam25",
        icon: RiGithubFill
    },
    Discord: {
        url: "https://discord.com/users/1272113262455951464",
        icon: RiDiscordFill
    },
    Spotify: {
        url: "https://open.spotify.com/user/31lozcjyk355j54nho6m5k5aulvm",
        icon: RiSpotifyFill
    }
};

export default socials;
