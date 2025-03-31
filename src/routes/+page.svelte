<script lang="ts">
    import Title from '$lib/assets/title.svelte';
    import subtitles from '$lib/assets/subtitles.json';
    import Social from '$lib/components/social.svelte';

    import { onMount } from 'svelte';
    import { blink, typewriter } from '$lib/transitions.svelte'
    import { backOut, quintOut } from 'svelte/easing';
    import { Tween } from 'svelte/motion';
    import { fly, slide } from 'svelte/transition';
    import { page } from '$app/state';

    import '@fortawesome/fontawesome-free/css/all.min.css';

    import '../main.scss';
    import '$lib/assets/no-overflow.scss';

    let socials: string[] = ["YouTube", "Fediverse", "GitHub", "Discord"]

    let mounted: boolean        = $state(false);
    let titleReveal: boolean    = $state(false)
    let titleIntroOver: boolean = $state(false);
    let subtitleIn: boolean     = $state(true);
    let subtitleIndex: number = $state(0)
    let hoveredSocial: number | null = $state(null);
    let clickedSocial: boolean = $state(false);
    let selectedTab: number = $state(1);
    let hoveredTab: number = $state(0);
    let tabOpen: boolean[] = $state([false, false, false, false])
    let tabSize: number[] = $state([0, 0, 0, 0, 0])
    let touchscreen: boolean = $state(false);
    let closingTimeout: number;

    let tabGlider = Tween.of(() => {
        let ret: number = 0;
        if (mounted) {
            for (let i = 1; i < selectedTab; i++) {
                ret += (tabOpen[i - 1] || touchscreen ? tabSize[i] : tabSize[0]) + 4
            }
        }
        return ret;
    }, {
        duration: 500,
        easing: quintOut
    });

    function getTabSizes() {
        touchscreen = window.matchMedia('(pointer: coarse)').matches;

        tabSize[0] = document.getElementById('glider')!.clientWidth;
        for (let i = 1; i <= 4; i++) {
            tabSize[i] = document.getElementById(`tab-size-${i}`)!.clientWidth;
        }
    }

    function changeTabHover(id: number) {
        hoveredTab = id;
        clearTimeout(closingTimeout!)
    }

    function leaveTabHover() {
        closingTimeout = setTimeout(() => {
            hoveredTab = 0;
        }, 1)
    }

    let term: HTMLElement = $state(undefined)!; 

    let top: number = $state(0);
    let left: number = $state(0);

    let titlebarGrabbed: boolean = $state(false);

    function randomizeSubtitle() {
        let newIndex: number = Math.floor(Math.random() * (subtitles.length - 1));
        subtitleIndex = newIndex < subtitleIndex ? newIndex : newIndex + 1;
    }

    function grabTitlebar() { titlebarGrabbed = true; };
    function moveTitlebar(e: MouseEvent) {
        if (titlebarGrabbed) {
            left += e.movementX;
            top += e.movementY;
        }
    };

    function padTime(i: number): string { return (i >= 10) ? `${i}` : `0${i}` }

    let today = $state(new Date());
    let h: string = $derived(padTime(((today.getHours() + 11) % 12) + 1));
    let m: string = $derived(padTime(today.getMinutes()));
    let p: string = $derived((today.getHours() <= 12) ? "AM" : "PM");

    let clockTime = $derived(`${h}:${m} ${p}`);

    function onmouseup() {
        titlebarGrabbed = false;
        clickedSocial = false;
    };

    onMount(() => {
        mounted = true;
        titleReveal = true;

        term = document.getElementById('term-border')!;

        getTabSizes();

        const clock = setInterval(() => { today = new Date(); }, 1000)
        return () => clearInterval(clock);
    });
</script>

<svelte:head>
    <title>your mom &lt;3</title>
    <link href="https://iosevka-webfonts.github.io/iosevka/Iosevka.css" rel="stylesheet" />
</svelte:head>
<main transition:fly={{ y: -50 }}>
    <div id='bar'>
        <div>Logo</div>
        <div class='workspaces'>
            {#snippet tab(id: number, name: string)}
            <button style='visibility: hidden;position:absolute;' id='tab-size-{id}'><div class='index'>{id}</div><p class='name'>{name}</button>
            <button
                onclick={    () => selectedTab = id} class={(selectedTab == id ? 'active' : '')}
                onmouseover={() => changeTabHover(id)}
                onfocus={    () => changeTabHover(id)}
                onmouseout={ () => leaveTabHover()}
                onblur={     () => leaveTabHover()}
                id='tab-{id}'
            >
                <div class='index'>
                    <div class='bg' style:background-color={hoveredTab == id ? '#404749' : 'transparent'}></div>
                    <div class='id' style:color={selectedTab == id ? '#0a1114' : '#dadada'}>{id}</div>
                </div>
                {#if (selectedTab == id || hoveredTab == id) || touchscreen}
                    <p
                        class='name'
                        transition:slide={{
                            axis: 'x',
                            duration: 500,
                            easing: quintOut
                        }}
                        onintrostart={() => tabOpen[id - 1] = true  }
                        onoutrostart={() => tabOpen[id - 1] = false }
                    >{name}</p>
                {/if}
            </button>
            {/snippet}

            {@render tab(1, 'Home')}
            {@render tab(2, 'About Me')}
            {@render tab(3, 'Blog')}
            {@render tab(4, 'Projects')}
            <span id='glider' style:--pos={`${tabGlider.current}px`}></span>
        </div>
        <div class='button'>{clockTime}</div>
    </div>

    <div id='term-border' style='--top: {top}px; --left: {left}px; --termHeight: {(term) ? term.offsetHeight / 2 : 2147483647}px; --termWidth: {(term) ? term.offsetWidth / 2 : 2147483647}px;'>
        <div id='titlebar' onmousedown={grabTitlebar} role='none'>
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
        <div id='term-window' style='--open:{mounted ? 2147483647 : 0}px'>
            <div></div>
            <div class='flex'>
                <!-- svelte-ignore a11y_mouse_events_have_key_events -->
                <div class='titles'>
                    {#if mounted}
                        {#each [0, 1, 2] as title}
                            <div class='title'>
                                <Title 
                                    title={title} 
                                    enabled={titleReveal} 
                                    introover={titleIntroOver}
                                    outroend={(title == 2) ?
                                        () => titleIntroOver = true :
                                        () => void 0}
                                />
                            </div>
                        {/each}
                        <div class='title main-title'
                            in:blink|global={{ delay: 400 }}
                            onintroend={() => (titleReveal = false)}
                            onmouseover={() => { if (titleIntroOver) titleReveal = true  } } 
                            onmouseout={ () => { if (titleIntroOver) titleReveal = false } } 
                            role='none'
                        >
                            <h1>Apro</h1>
                        </div>
                    {/if}
                </div>
                <p class='subtitle'>
                    {#if (titleIntroOver && subtitleIn)}
                        <span
                            in:typewriter={{ delay: 100, speed: 200 }}
                            out:typewriter={{ delay: 1500, backspace: true }}
                            onintrostart={() => randomizeSubtitle() }
                            onintroend={  () => subtitleIn = false }
                            onoutroend={  () => subtitleIn = true  }
                        >{subtitles[subtitleIndex]}</span>
                    {/if}
                &#8203;</p>
                <div id='socials'>
                    {#if titleIntroOver}
                    {#each socials as social, i}
                        <button class='social'
                            transition:fly|global={{
                                y: 50,
                                delay: 500 + 200 * i,
                                easing: backOut,
                            }}
                            onmouseover={() => hoveredSocial = i}
                            onfocus={() => hoveredSocial = i}
                            onmouseout={() => hoveredSocial = null}
                            onblur={() => hoveredSocial = null}
                            onmousedown={() => clickedSocial = true}
                        >
                            <Social name={social} hoverPos={(hoveredSocial === null) ? null : (i - hoveredSocial)} clicked={clickedSocial}/>
                        </button>
                    {/each}
                    {:else}
                        <p>&#8203;</p>
                    {/if}
                </div>
            </div>
            <div class='prompt'>
                <p class='ps1'><span class='pwd'>/home/apro</span><span class='shell-symbol'>❤</span><span class='cursor'>_</span></p> 
            </div>
        </div>
    </div>
</main>

<svelte:window {onmouseup} onmousemove={moveTitlebar} />

<style lang="scss">
    button {
        all: unset;
    }
    
    main { 
        width: 100vw;
        height: 100vh;
        padding: 0;
        margin: 0;
    }

    #bar {
        width: 80%;
        height: 1.5em;
        margin: 8px auto;
        padding: 4px 8px;
        border-radius: 8px;
        background-color: #141b1e;
        color: #dadada;
        display: flex;
        justify-content: space-between;
        align-items: center;
        z-index: 1;
        position: relative;
        border: 2px solid #232a2d;
        
        font-family: 'Iosevka', monospace;

        .workspaces {
            position: relative;
            display: flex;
            justify-content: space-around;
            align-items: center;
            gap: 4px;
            
            button { 
                border-radius: 8px;
                background-color: #0a1114;
                // border: 2px solid #404749;
                cursor: pointer;
                display: flex;
                justify-content: center;
                align-items: center;
                user-select: none;
                
                transition: background-color 0.2s easeOutSine;

                &:hover, &:is(.active) { 
                    background-color: #232a2d;
                }

                div.index {
                    display: grid;
                    grid-template: 1fr / 1fr;
                    place-items: center;
                    height: 100%;
                    width: calc(1.5em);
                    div {
                        grid-column: 1 / 1;
                        grid-row: 1 / 1;
                        height: calc(100% - 8px);
                        padding: 2px 4px;
                        border-radius: 8px;
                        width: calc(1.5em - 8px);
                        text-align: center;
                        transition: background-color 0.2s easeOutSine;

                        &.id { z-index: 3; padding-bottom: 4px; transition: color 0.2s easeOutSine; }
                    }
                }
                
                p {
                    all: unset;
                    display: block;
                    padding: 2px 4px;
                    height: 100%;
                    text-align: center;
                    transition: background-color 0.2s easeOutSine;


                    &.name {
                        margin-left: 6px;
                        white-space: nowrap;
                        overflow: hidden;
                    }
                }
            }

            span#glider {
                position: absolute;
                width: calc(1.5em);
                height: calc(1.5em);
                border-radius: 8px;
                left: var(--pos);
                // top: 0;
                pointer-events: none;
                z-index: 2;

                transition: all 0.4s quintOut;
                // left: anchor(left);

                background-color: #67b0e8;
                // background-color: none;
            }
        }

        div.button {
            border-radius: 8px;
            background-color: #0a1114;
            padding: 4px;
            cursor: default;
            white-space: nowrap;

            &:hover { background-color: #232a2d; }
        }
    }
    
    #term-border {
        position: absolute;
        padding: 4px;
        margin: 8px;
        border-radius: 12px;
        z-index: 0;
        background-color: #67b0e8;

        @media screen and (orientation:landscape) and (width > 1280px) {
            top:  calc(50vh - var(--termHeight) + var(--top));
            left: calc(50vw - var(--termWidth)  + var(--left));
        }

        @media screen and (orientation:portrait) {
            left:  calc(50vw - var(--termWidth));
            top:  calc(50vh - var(--termHeight));
            width: min(1280px, calc(100% - 56px));
            height: 60%;
        }

        @media screen and (orientation:landscape) and (width < 1280px) {
            left:  calc(50vw - var(--termWidth));
            top:  calc(50vh - var(--termHeight));
            height: min(720px, calc(100% - 56px));
            width: 70%;
        }
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
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        align-items: stretch;
        min-height: 45vh;
        min-width:  35vw;
        height: min(720px,  calc(100% - 56px));
        width:  min(1280px, calc(100% - 24px));

        transition: height 1s easeOutCirc, width 1s easeOutCirc;

        // @media screen and (orientation:landscape) and (width > 1280px) {
        // }
        // @media screen and (orientation:portrait) {
        //     width: calc(100% - 24px);
        //     height: calc(100% - 56px);
        // }
        // @media screen and (orientation:landscape) and (width < 1280px) {
        //     height: calc(100% - 56px);
        // }

        .flex {
            flex-grow: 2;
            display: flex;
            flex-direction: column;
            align-items: stretch;

            @media screen and (orientation:landscape) {
                justify-content: space-around;
            }
            @media screen and (orientation:portrait) {
                justify-content: center;
                gap: 1rem;
            }
        }
    }

    .titles {
        margin-top: 4rem;
        pointer-events: none;
        color: #dadada;
        font-size: 4rem;
        text-align: center;
        @media screen and (orientation:landscape) and (width < 1280px) {
            margin-top: 2.5rem;
        }
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
        text-align: center;
    }

    #socials {
        min-width: 70%;
        max-width: 100%;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        color: #b3b9b8;
        user-select: none;
        margin-top: 1rem;
        margin-bottom: 2rem;
        height: 4rem;

        @media screen and (height < 480px) { margin-top: 2rem; }

        @media screen and (orientation:landscape) and (width > 1280px) {
            margin-left: auto;
            margin-right: auto;
        }
    }
    
    .social { 
        font-family: 'Roboto Condensed', serif;
        font-optical-sizing: auto;
        font-weight: 400;
        font-style: normal;
        line-height: 0;
        font-size: 3rem;
        text-align: center;
        // height: 2em;
        padding: 0 5%;
        width: 100%;
        cursor: pointer;
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
        margin-top: auto;

        .ps1 { display: inline-block; }
        .pwd    { color: #c47fd5; }

        .shell-symbol { 
            color: #8ccf7e; 
            margin-left: 0.5ch;
            margin-right: 0.5ch;
        }

        .cursor {
            animation: cursor-blink 1s easeInOutExpo infinite;
            color: #dadada;
        }

        @media screen and (height < 480px) { visibility: hidden; }
    }

    // .tabs {
    //     display: flex;
    //     // height: 2rem;
    //     margin-top: 4px;
    //     padding: 4px;
    //     gap: 4px;
    //     justify-content: space-between;
    //     border-radius: 8px;
    //     background-color: #141b1e;
        
    //     button { 
    //         flex-grow: 1;
    //         height: 100%;
    //         padding: 0 8px;
    //         border-radius: 4px;
    //         // border-radius: 8px;
    //         line-height: 0em;
    //         display: flex;
    //         justify-content: space-between;
    //         align-items: center;
    //         text-align: center;
    //         cursor: pointer;

    //         font-family: 'Iosevka', monospace;
    //         font-size: 12pt;
    //         i { text-align: end; }

    //         &.active {
    //             background-color: #c47fd5;
    //             color: #141b1e;
    //         }

    //         &:not(&.active) {
    //             color:#dadada;
    //             background-color: #232a2d;
    //             // background-color: #141b1e;
    //         }
    //     }
    // }
</style>