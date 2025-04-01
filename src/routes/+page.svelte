<script lang="ts">
    import App from '$lib/components/app.svelte';
    import Title from '$lib/assets/title.svelte';
    import subtitles from '$lib/assets/subtitles.json';
    import Social from '$lib/components/social.svelte';

    import { blink, typewriter } from '$lib/transitions.svelte'
    import { backOut } from 'svelte/easing';
    import { fly } from 'svelte/transition';
    import { afterNavigate } from '$app/navigation';

    import '@fortawesome/fontawesome-free/css/all.min.css';
    import '../main.scss';

    let socials: string[] = ["YouTube", "Fediverse", "GitHub", "Discord"]

    let mounted: boolean        = $state(false);
    let titleReveal: boolean    = $state(false)
    let titleIntroOver: boolean = $state(false);
    let subtitleIn: boolean     = $state(true);
    let subtitleIndex: number = $state(0)
    let animOn: boolean = $state(false);
    let hoveredSocial: number | null = $state(null);
    let clickedSocial: boolean = $state(false);

    function randomizeSubtitle() {
        let newIndex: number = Math.floor(Math.random() * (subtitles.length - 1));
        subtitleIndex = newIndex < subtitleIndex ? newIndex : newIndex + 1;
    }

    afterNavigate(({ from }) => {
        mounted = true;

        animOn = (from === null);
        titleReveal = animOn;
        if (!animOn) {
            titleIntroOver = true;
        }
    })
</script>

<svelte:head>
    <title>your mom &lt;3</title>
</svelte:head>
<main>
    {#snippet termicon()}
        <i class='fa-solid fa-terminal'></i>
    {/snippet}
    <App name={'Terminal'} icon={termicon}>
        <div id='term'>
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
                                    animon={animOn}
                                    introover={titleIntroOver}
                                    outroend={(title == 2) ?
                                        () => titleIntroOver = true :
                                        () => void 0}
                                />
                            </div>
                        {/each}
                        <div class='title main-title'
                            in:blink={{delay: animOn ? 400 : 0 }}
                            onintroend={() =>  titleReveal = false }
                            onmouseover={() => { if (titleIntroOver) titleReveal = true  } } 
                            onmouseout={ () => { if (titleIntroOver) titleReveal = false } } 
                            role='none'
                        >
                            <h1>Apro</h1>
                        </div>
                    {/if}
                </div>
                <p class='subtitle'>
                    {#if ((titleIntroOver) && subtitleIn)}
                        <span
                            in:typewriter={{ delay: 100, speed: 200 }}
                            out:typewriter={{ delay: 1500, backspace: true }}
                            onintrostart={() => randomizeSubtitle() }
                            onintroend={  () => subtitleIn = false }
                            onoutroend={  () => subtitleIn = true  }
                        >{subtitles[subtitleIndex]}</span>&#8203;
                    {/if}
                </p>
                <div id='socials'>
                    {#each socials as social, i}
                    {#if titleIntroOver}
                        <button class='social'
                            in:fly={{
                                y: 50,
                                delay: (animOn ? (500 + 200 * i) : 0),
                                duration: (animOn ? 400 : 0),
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
                    {:else}
                        <p>&#8203;</p>
                    {/if}
                    {/each}
                </div>
            </div>
            <div class='prompt'>
                <p class='ps1'><span class='pwd'>/home/apro</span><span class='shell-symbol'>❤</span><span class='cursor'>_</span></p> 
            </div>
        </div>
    </App>
</main>

<style lang="scss">
    #term {
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
        font-family: "Iosevka Web";
        pointer-events: fill;
        h1 {
            margin-top: -3rem;
            font-size: 4rem;
        }
    }

    .subtitle {
        color: #dadada;
        font-family: 'Iosevka Web', monospace;
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
        font-family: 'Atkinson Hyperlegible', sans-serif;
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

        font-family: 'Iosevka Web', monospace;
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
</style>