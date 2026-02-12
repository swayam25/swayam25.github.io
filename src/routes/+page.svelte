<script lang="ts">
    import Button from "$lib/components/Button.svelte";
    import InlineLink from "$lib/components/InlineLink.svelte";
    import Terminal from "$lib/components/Terminal.svelte";
    import projects from "$lib/data/projects";
    import socials from "$lib/data/socials";
    import { animateTags, initPageAnimations, kickAnimation } from "$lib/utils/animations";
    import { expoOut } from "svelte/easing";
    import { fly } from "svelte/transition";
    import PhArrowRightBold from "~icons/ph/arrow-right-bold";
    import PhArrowUpRightBold from "~icons/ph/arrow-up-right-bold";
    import SimpleIconsDiscord from "~icons/simple-icons/discord";
    import SimpleIconsFastapi from "~icons/simple-icons/fastapi";
    import SimpleIconsGo from "~icons/simple-icons/go";
    import SimpleIconsPython from "~icons/simple-icons/python";
    import SimpleIconsSvelte from "~icons/simple-icons/svelte";
    import SimpleIconsTailwindcss from "~icons/simple-icons/tailwindcss";
    import SolarProgrammingOutline from "~icons/solar/programming-outline";
    import SolarWidgetOutline from "~icons/solar/widget-outline";

    const DURATION = { FAST: 150, MEDIUM: 200, SMOOTH: 800 };

    let defaultMode: boolean = $state(true);
    let projectsContainer: HTMLDivElement | undefined = $state();
    let projectsSection: HTMLElement | undefined = $state();
    let headerContainer: HTMLElement | undefined = $state();
    let aboutSection: HTMLElement | undefined = $state();
    let footerSection: HTMLElement | undefined = $state();
    let hasAnimated = $state(false);

    function handleProjectHover(index: number, isHovering: boolean) {
        const cards = projectsContainer?.querySelectorAll(".project-card");
        if (!cards) return;

        const hoveredCard = cards[index];
        const tags = hoveredCard?.querySelectorAll(".project-tag");

        if (isHovering && tags?.length) {
            animateTags(Array.from(tags));
            console.log;
            cards.forEach((card, i) => {
                if (i > index) kickAnimation(card);
            });
        }
    }

    $effect(() => {
        if (defaultMode) hasAnimated = false;
    });

    $effect(() => {
        if (projectsContainer && !hasAnimated && defaultMode) {
            hasAnimated = true;
            initPageAnimations({
                name: headerContainer?.querySelector(".name") || undefined,
                profile: headerContainer?.querySelector(".profile-section") || undefined,
                socials: headerContainer?.querySelectorAll(".socials-section a"),
                about: aboutSection,
                aboutText: aboutSection?.querySelectorAll(".about-text") || undefined,
                projectsHeading: projectsSection?.querySelector("h1") || undefined,
                projects: projectsContainer?.querySelectorAll(".project-card"),
                footer: footerSection
            });
        }
    });
</script>

<svelte:head>
    <title>Swayam</title>
</svelte:head>

<!-- Toggle button -->
<Button
    size="md"
    class="fixed right-0 bottom-0 m-5 h-11"
    onclick={() => {
        defaultMode = !defaultMode;
    }}
>
    {#if defaultMode}
        <span
            in:fly={{ y: -25, duration: DURATION.MEDIUM, easing: expoOut }}
            class="flex size-full items-center justify-center gap-2"
        >
            <SolarProgrammingOutline class="size-fit" />
            <span>Terminal</span>
        </span>
    {:else}
        <span
            in:fly={{ y: 25, duration: DURATION.MEDIUM, easing: expoOut }}
            class="flex size-full items-center justify-center gap-2"
        >
            <SolarWidgetOutline class="size-fit" />
            <span>Default</span>
        </span>
    {/if}
</Button>

{#if defaultMode}
    <div class="container mx-auto min-h-screen">
        <!-- Main Page -->
        <div
            class="p-5 pt-10 transition-all duration-200 lg:flex lg:items-start lg:justify-between lg:py-0 lg:pt-0"
        >
            <!-- Sidebar -->
            <header
                bind:this={headerContainer}
                class="flex flex-col items-start justify-between transition-all duration-200 lg:sticky lg:top-0 lg:h-screen lg:w-1/2 lg:py-24"
            >
                <div class="flex h-full flex-col items-start justify-between gap-4 lg:max-w-md">
                    <div class="flex h-full flex-col items-start justify-between gap-4">
                        <!-- Profile -->
                        <div class="profile-section flex flex-col items-start justify-start">
                            <div class="flex items-center justify-start gap-x-2">
                                <img
                                    src="https://github.com/swayam25.png"
                                    alt="Swayam Logo"
                                    class="size-20 rounded-lg object-cover"
                                />
                                <div class="flex flex-col items-start justify-center">
                                    <h1 class="name text-4xl font-semibold lg:text-5xl">Swayam</h1>
                                    <p class="font-base text-lg">Student</p>
                                </div>
                            </div>
                            <p class="mt-2 text-slate-400">
                                Have a passion for creating elegant and efficient code that delivers
                                exceptional user experiences.
                            </p>
                        </div>
                        <!-- Socials -->
                        <div class="socials-section mt-5 flex items-center justify-start gap-x-4">
                            {#each Object.entries(socials) as [name, data]}
                                <a
                                    href={data.url}
                                    target="_blank"
                                    title={name}
                                    class="text-slate-400 transition-colors duration-200 hover:text-slate-50"
                                >
                                    <data.icon class="size-8" />
                                </a>
                            {/each}
                        </div>
                    </div>
                </div>
            </header>
            <!-- Content -->
            <main class="mt-10 transition-all duration-200 lg:mt-0 lg:w-1/2 lg:py-24">
                <!-- About -->
                <section bind:this={aboutSection} aria-label="About Me">
                    <h1 class="visible text-xl font-semibold lg:hidden">ABOUT ME</h1>
                    <p class="about-text text-slate-400">
                        Hi there! I started my coding journey in 2020 at the age of 12. It all began
                        with <InlineLink href="https://python.org" icon={SimpleIconsPython}
                            >Python</InlineLink
                        >, where I first created some <InlineLink
                            href="https://discord.com"
                            icon={SimpleIconsDiscord}>Discord Bots</InlineLink
                        >. As I got more into coding, I explored APIs using tools like <InlineLink
                            href="https://fastapi.tiangolo.com"
                            icon={SimpleIconsFastapi}>FastAPI</InlineLink
                        >. I then moved on to mastering CLI apps before diving into frontend
                        development. Learning <InlineLink
                            href="https://kit.svelte.dev"
                            icon={SimpleIconsSvelte}>SvelteKit</InlineLink
                        > & <InlineLink href="https://tailwindcss.com" icon={SimpleIconsTailwindcss}
                            >TailwindCSS</InlineLink
                        > opened up a whole new world for me. As I delved deeper into backend, my curiosity
                        led me to explore <InlineLink href="https://go.dev" icon={SimpleIconsGo}
                            >Go</InlineLink
                        >.
                        <br /><br />
                    </p>
                    <p class="about-text text-slate-400">
                        Now, I enjoy building full-stack applications. My coding journey is ongoing,
                        and I love the challenges and growth it brings. Coding, to me, is an
                        artistic expression, a harmonious combination of logic and grace that shapes
                        smooth user experiences.
                    </p>
                </section>
                <!-- Projects -->
                <section bind:this={projectsSection} aria-label="Projects" class="mt-10">
                    <h1 class="visible text-xl font-semibold lg:hidden">PROJECTS</h1>
                    <div bind:this={projectsContainer} class="group mt-2 flex flex-col gap-y-5">
                        {#each Object.entries(projects) as [name, data], index}
                            <a
                                href={data.url}
                                target="_blank"
                                class="project-card group/item rounded-lg p-2 transition-all duration-200 group-hover:opacity-50! hover:bg-slate-900 hover:opacity-100!"
                                class:pointer-events-none={!hasAnimated}
                                onmouseenter={() => handleProjectHover(index, true)}
                                onmouseleave={() => handleProjectHover(index, false)}
                            >
                                <div
                                    class="flex flex-col items-center justify-start gap-y-4 md:flex-row md:items-start md:gap-x-4 md:gap-y-0"
                                >
                                    <div
                                        class="aspect-video w-full rounded-lg border border-slate-900 bg-slate-900 bg-cover bg-center object-cover md:h-24 md:w-auto"
                                        style="background-image: url({data.img});"
                                    ></div>
                                    <div class="flex flex-1 flex-col items-start justify-center">
                                        <div class="flex w-full items-center justify-between">
                                            <div class="flex items-center justify-start gap-x-1">
                                                <h2 class="text-lg font-semibold">{name}</h2>
                                                <PhArrowUpRightBold
                                                    class="size-4 transition-transform duration-200 group-hover/item:translate-x-2 group-hover/item:-translate-y-1"
                                                />
                                            </div>
                                            <p class="text-sm font-semibold text-slate-400">
                                                {data.time}
                                            </p>
                                        </div>
                                        <p class="mt-2 text-slate-400">{data.desc}</p>
                                        <div
                                            class="tags-container mt-2 flex max-h-0 flex-wrap items-center justify-start gap-2 overflow-hidden transition-all duration-800 ease-out group-hover/item:max-h-40"
                                        >
                                            {#each data.tags as tag}
                                                <span
                                                    class="project-tag flex items-center justify-center gap-1 rounded-lg bg-slate-800 px-2 py-1 text-xs transition-all duration-150"
                                                >
                                                    <tag.icon class="size-fit" />
                                                    <span>{tag.name}</span>
                                                </span>
                                            {/each}
                                        </div>
                                    </div>
                                </div>
                            </a>
                        {/each}
                    </div>
                </section>
                <!-- More Projects -->
                <footer bind:this={footerSection} class="mt-10 w-fit">
                    <InlineLink
                        href="{socials.GitHub.url}?tab=repositories"
                        class="group flex items-center justify-start gap-x-1"
                    >
                        <span>Get more projects here</span>
                        <PhArrowRightBold
                            class="inline-block size-4 transition-transform duration-200 group-hover:translate-x-2"
                        />
                    </InlineLink>
                </footer>
            </main>
        </div>
    </div>
{:else}
    <!-- Terminal -->
    <Terminal bind:defaultMode />
{/if}

<style>
    .profile-section,
    .socials-section a,
    section[aria-label="About Me"],
    section[aria-label="Projects"] > h1,
    .project-card,
    .project-tag,
    footer {
        opacity: 0;
    }

    .project-card,
    .tags-container {
        will-change: transform, max-height;
    }
</style>
