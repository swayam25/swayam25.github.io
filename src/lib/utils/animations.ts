import { animate, splitText, stagger } from "animejs";

export const DURATION = { FAST: 150, MEDIUM: 200, SMOOTH: 800 };

export const textGlide = (el: Element, options?: { chars?: { wrap: string } }) => {
    const { chars } = splitText(el as HTMLElement, {
        ...options,
        chars: { wrap: "clip" }
    });
    animate(chars, {
        y: [{ to: ["100%", "0%"] }],
        duration: DURATION.SMOOTH,
        ease: "out(3)",
        delay: stagger(50)
    });
};

export const fadeUp = (
    el: Element | Element[],
    options?: {
        y?: number;
        staggerDelay?: number;
        callback?: () => void;
    }
) => {
    const { y = 15, staggerDelay, callback } = options || {};
    return animate(el, {
        opacity: [0, 1],
        translateY: [y, 0],
        easing: "out(3)",
        duration: DURATION.MEDIUM,
        ...(staggerDelay && { delay: stagger(staggerDelay) }),
        ...(callback && { complete: callback })
    });
};

export const scaleIn = (el: Element | Element[], staggerDelay?: number) => {
    return animate(el, {
        opacity: [0.5, 1],
        scale: [0.8, 1],
        easing: "out(3)",
        duration: DURATION.MEDIUM,
        ...(staggerDelay && { delay: stagger(staggerDelay) })
    });
};

export const animateTags = (tags: Element[]) => {
    return animate(tags, {
        opacity: [0, 1],
        translateY: [5, 0],
        scale: [0.9, 1],
        easing: "out(3)",
        duration: DURATION.FAST,
        delay: stagger(30)
    });
};

export const kickAnimation = (el: Element) => {
    return animate(el, {
        translateY: [0, 5, 0],
        easing: "spring(1, 80, 10, 0)",
        duration: DURATION.SMOOTH
    });
};

export const wavyBounce = (el: Element) => {
    return animate(el, {
        scale: [
            { to: 0, duration: 0 },
            { to: 1.15, duration: 400 },
            { to: 0.95, duration: 200 },
            { to: 1.05, duration: 150 },
            { to: 1, duration: 150 }
        ],
        rotate: [
            { to: 0, duration: 0 },
            { to: -5, duration: 400 },
            { to: 3, duration: 200 },
            { to: -2, duration: 150 },
            { to: 0, duration: 150 }
        ],
        easing: "out(2)"
    });
};

export const initPageAnimations = (elements: {
    name?: Element;
    profile?: Element;
    profileImage?: Element;
    socials?: NodeListOf<Element>;
    about?: Element;
    aboutText?: NodeListOf<Element>;
    projectsHeading?: Element;
    projects?: NodeListOf<Element>;
    footer?: Element;
}) => {
    const {
        name,
        profile,
        profileImage,
        socials,
        about,
        aboutText,
        projectsHeading,
        projects,
        footer
    } = elements;

    if (name) textGlide(name);
    if (profile) fadeUp(profile);
    if (profileImage) wavyBounce(profileImage);
    if (socials) scaleIn(Array.from(socials), 50);
    if (about) fadeUp(about);
    if (aboutText) animateTags(Array.from(aboutText));
    if (projectsHeading) fadeUp(projectsHeading);
    if (projects) scaleIn(Array.from(projects), 80);
    if (footer) fadeUp(footer, { y: 10 });
};

export const toggleBtnAnimation = (el?: Element) => {
    if (!el) return;
    return animate(el, {
        opacity: [0, 1],
        translateY: [document.body.clientHeight, 0],
        translateX: [document.body.clientWidth, 0],
        duration: DURATION.MEDIUM,
        easing: "out(2)"
    });
};
