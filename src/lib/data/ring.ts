export interface Ring {
    name: string;
    base: string;
    previous: string;
    next: string;
    random: string;
}

export const getRing = (host: string): Ring => {
    return {
        name: "Yellow Brick Ring",
        base: "https://yellowbrickring.com",
        previous: `webring?from=${host}&to=prev`,
        next: `webring?from=${host}&to=next`,
        random: `webring?from=${host}&to=random`
    };
};
