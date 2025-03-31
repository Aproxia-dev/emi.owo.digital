<script lang="ts">
    import { onMount } from 'svelte';
    import '@fortawesome/fontawesome-free/css/all.min.css';
    import Title from '$lib/assets/title.svelte';

    import { fade, fly } from 'svelte/transition';
    import { blink, typewriter } from '$lib/transitions.svelte'
    import { backOut } from 'svelte/easing';

    import '../main.scss';
    import '$lib/assets/no-overflow.scss';

    let socials: string[] = [
        "<p style='margin:0 auto;'><i class='fa-brands fa-youtube'></i></p>",
        "<p style='width:1em;height:1em;line-height:0.85em;margin:0 auto;border-radius:50%;color:#141b1e;background-color:#b3b9b8' class='fa-text-height'>⁂</p>",
        "<p style='margin:0 auto;'><i class='fa-brands fa-github'></i></p>",
        "<p style='margin:0 auto;'><i class='fa-brands fa-discord'></i></p>",
    ]

        // <p onmouseover={() => hoveredSocial = 'YouTube'}   onmouseout={() => hoveredSocial = '  '} style='margin:0 auto;'><i class='fa-brands fa-youtube'></i></p>
        // <p onmouseover={() => hoveredSocial = 'Fediverse'} onmouseout={() => hoveredSocial = '  '} style='width:1em;height:1em;line-height:0.85em;margin:0 auto;border-radius:50%;color:#141b1e;background-color:#b3b9b8' class='fa-text-height'>⁂</p>
        // <p onmouseover={() => hoveredSocial = 'GitHub'}    onmouseout={() => hoveredSocial = '  '} style='margin:0 auto;'><i class='fa-brands fa-github'></i></p>
        // <p onmouseover={() => hoveredSocial = 'Discord'}   onmouseout={() => hoveredSocial = '  '} style='margin:0 auto;'><i class='fa-brands fa-discord'></i></p>

    let mounted: boolean = $state(false);
    let titleanim: boolean = $state(false);
    let titleanimOver: boolean = $state(false);
    let selectedTab: number = $state(1);
    let hoveredSocial: string = $state('  ');
    $inspect(hoveredSocial);

    let term: HTMLElement = $state(undefined)!; 

    let top: number = $state(0);
    let left: number = $state(0);

    let grabbed: boolean = $state(false);

    function onmousedown() { grabbed = true; };
    function onmouseup() { grabbed = false; };
    function onmousemove(e: MouseEvent) {
        if (grabbed) {
            left += e.movementX;
            top += e.movementY;
        }
    }

    onMount(() => {
        mounted = true;
        titleanim = true;

        term = document.getElementById('term-border')!;
    });
</script>

<svelte:head>
    <title>your mom &lt;3</title>
    <link href="https://iosevka-webfonts.github.io/iosevka/Iosevka.css" rel="stylesheet" />
</svelte:head>

<main>
    <div id='term-border' style='--top: {top}px; --left: {left}px; --termHeight: {(term) ? term.offsetHeight / 2 : Infinity}px; --termWidth: {(term) ? term.offsetWidth / 2 : Infinity}px; visibility: {mounted ? 'visible' : 'hidden'};'>
        <div id='titlebar' {onmousedown} role='toolbar' aria-grabbed={grabbed} tabindex='0'>
            <span style='width:100px;'>
                <i class="fa-solid fa-terminal"></i>
            </span>
            <p>Terminal</p>
            <div class='term-buttons'>
                <div class='term-button' style='background-color:#8ccf7e'></div>
                <div class='term-button' style='background-color:#e5c76b'></div>
                <div class='term-button' style='background-color:#e57474'></div>
            </div>
        </div>
        <div id='term-window'>
            <div class='titles'>
                {#if mounted}
                    {#each [0, 1, 2] as title}
                        <div class='title'>
                            <Title 
                                title={title} 
                                delay={100 + 100 * title} 
                                enabled={titleanim} 
                                outroend={(title == 2) ?
                                    () => titleanimOver = true :
                                    () => void 0}
                                />
                        </div>
                    {/each}
                    <div class='title main-title' in:blink|global={{ delay: 400 }} onintroend={() => (titleanim = false)}><h1>Apro</h1></div>
                {/if}
            </div>
            <p class='subtitle'>
                &nbsp;
                {#if (titleanimOver)}
                    <span
                        in:typewriter={{ speed: 200 }}
                        out:typewriter={{ backspace: true }}
                    >figuring out how to make this animated</span>
                {/if}
                &nbsp;
            </p>
            <div id='socials'>
                {#if titleanimOver}
                {#each socials as social, i}
                    <div class='social' transition:fly|global={{
                        y: 50,
                        delay: 500 + 200 * i,
                        easing: backOut,
                    }}>
                    {@html social}
                    </div>
                {/each}
                {:else}
                    <p>&nbsp;</p>
                {/if}
            </div>
            <p class='social-name'>{@html hoveredSocial}</p>
            <div class='prompt'>
                <p class='ps1'><span class='pwd'>/home/apro</span><span class='shell-symbol'>❤</span><span class='cursor'>_</span></p> 
            </div>
        </div>
        <!-- <div class='tabs'>
            <p onclick={() => selectedTab = 1} class={(selectedTab == 1 ? 'active' : '')}>1: Home</p>
            <p onclick={() => selectedTab = 2} class={(selectedTab == 2 ? 'active' : '')}>2: About me</p>
            <p onclick={() => selectedTab = 3} class={(selectedTab == 3 ? 'active' : '')}>3: Blog</p>
            <p onclick={() => selectedTab = 4} class={(selectedTab == 4 ? 'active' : '')}>4: Projects</p>
        </div> -->
    </div>
</main>

<svelte:window {onmouseup} {onmousemove} />

<style lang="scss">
    #term-border {
        position: absolute;
        padding: 4px;
        border-radius: 12px;
        background-color: #67b0e8;
        top:  calc(50vh - var(--termHeight) + var(--top));
        left: calc(50vw - var(--termWidth)  + var(--left));
    }

    #titlebar {
        cursor: move;
        display: flex;
        justify-content: space-between;
        align-items: center;
        line-height: 0px;
        font-family: 'Iosevka';
        padding-right: 4px;
        padding-left: 8px;
        user-select: none;
    }

    .term-buttons {
        width: 100px;
        display: flex;
        justify-content: flex-end;
        align-items: center;
        gap: 4px;
    }

    .term-button {
        width: 18px;
        height: 18px;
        aspect-ratio: 1;
        clip-path: polygon(50% 0,100% 50%,50% 100%,0 50%); 
        cursor: pointer;

        &:hover {
            filter: brightness(70%) saturate(200%);
        }
    }

    #term-window {
        background-color: #141b1e;
        border-radius: 8px;
        padding: 12px;
        min-width: 35vw;
        min-height: 45vh;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
    }

    .titles {
        margin-top: 4rem;
        pointer-events: none;
        color: #dadada;
        font-size: 4rem;
        text-align: center;
    }

    .title {
        margin-top: -3rem;
        margin-bottom: -3rem;
    }

    .main-title {
        font-family: "Iosevka";
        pointer-events: fill;
        h1 {
            margin-top: -3rem;
            font-size: 4rem;
        }
    }

    .subtitle {
        color: #dadada;
        font-family: 'Iosevka', monospace;
        margin-top: 1rem;
        margin-bottom: -1rem;
        font-size: 1.5rem;
    }

    #socials {
        width: 70%;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        color: #b3b9b8;
        user-select: none;
        margin-top: 1rem;
        height: 4rem;
    }
    
    .social { 
        font-family: 'Roboto Condensed', serif;
        font-optical-sizing: auto;
        font-weight: 400;
        font-style: normal;
        transition: all 0.3s cubic-bezier(0, 0.55, 0.45, 1);
        line-height: 1em;
        font-size: 3rem;
        text-align: center;
        height: 1em;
        width: 1em;

        &:hover {
            font-size: 5rem;
        }
    }

    @keyframes cursor-blink {
        0%    { opacity: 0%;   }
        50%   { opacity: 100%; }
        100%  { opacity: 0%;   }
    }

    .prompt {
        font-family: 'Iosevka', monospace;
        font-size: 12pt;
        width: 100%;
        line-height: 0;

        .ps1 { display: inline-block; }
        .pwd    { color: #c47fd5; }

        .shell-symbol { 
            color: #8ccf7e; 
            margin-left: 0.5ch;
            margin-right: 0.5ch;
        }

        .cursor {
            animation: cursor-blink 1s cubic-bezier(0.83, 0, 0.17, 1) infinite;
            color: #dadada;
        }
    }

    .tabs {
        display: grid;
        grid-template-columns: 25% 25% 25% 25%;
        height: 100%;
        * { height: 100%; }

        .active {
            background-color: #c47fd5;
        }
    }
</style>