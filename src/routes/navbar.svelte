<script lang="ts">
    import { onMount } from 'svelte';
    import { quintOut } from 'svelte/easing';
    import { Tween } from 'svelte/motion';
    import { slide } from 'svelte/transition';

    import { page } from '$app/state';

    import '../main.scss';

    let tabs: string[][] = [
        ['Home', '/'],
        ['About Me', '/about-me'],
        ['Blog', '/blog'],
        ['Projects', '/projects'],
        /* 'fifth entry', 'sixth entry' */]
    let forceTabOpen: boolean = true;

    let mounted: boolean = $state(false);
    let selectedTab: number = $state(0);
    let hoveredTab: number = $state(0);
    let tabOpen: boolean[] = $state([])
    let tabSize: number[] = $state([])
    let touchscreen: boolean = $state(false);
    let closingTimeout: number;

    for (let i = 0; i < tabs.length; i++) {
        if (tabs[i][1] == page.url.pathname) {
            selectedTab = i + 1
        }
    }

    if (forceTabOpen) for (let i = 0; i < tabs.length; i++) tabOpen[i] = true; 

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
        for (let i = 1; i <= tabs.length; i++) {
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

    function padTime(i: number): string { return (i >= 10) ? `${i}` : `0${i}` }

    let today = $state(new Date());
    let h: string = $derived(padTime(((today.getHours() + 11) % 12) + 1));
    let m: string = $derived(padTime(today.getMinutes()));
    let p: string = $derived((today.getHours() <= 12) ? "AM" : "PM");

    let clockTime = $derived(`${h}:${m} ${p}`);

    onMount(() => {
        mounted = true;
        getTabSizes();

        const clock = setInterval(() => { today = new Date(); }, 1000)
        return () => clearInterval(clock);
    });
</script>

<div id='bar'>
    <div>Logo</div>
    <div class='workspaces'>
        {#snippet tabButton(id: number, name: string, path: string)}
        <button style='visibility: hidden;position:absolute;' id='tab-size-{id}'><div class='index'>{id}</div><p class='name'>{name}</button>
        <a href={path}>
            <button
                onclick={    () => selectedTab = id} class={(selectedTab == id ? 'active' : '')}
                onmouseover={() => changeTabHover(id)}
                onfocus={    () => changeTabHover(id)}
                onmouseout={ () => leaveTabHover()}
                onblur={     () => leaveTabHover()}
                id='tab-{id}'
                aria-current={ selectedTab == id ? 'page' : undefined }
            >
                <div class='index'>
                    <div class='bg' style:background-color={hoveredTab == id ? '#404749' : 'transparent'}></div>
                    <div class='id' style:color={selectedTab == id ? '#0a1114' : '#dadada'}>{id}</div>
                </div>
                {#if forceTabOpen || selectedTab == id || hoveredTab == id || touchscreen }
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
        </a>
        {/snippet}

        {#each tabs as tab, index}
            {@render tabButton(index + 1, tab[0], tab[1])}
        {/each}
        <span id='glider' style:--pos={`${tabGlider.current}px`}></span>
    </div>
    <div class='button'>{clockTime}</div>
</div>

<style lang='scss'>
    button, a { all: unset; }

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

                        &.id { z-index: 3; padding: 3px 0; transition: color 0.2s easeOutSine; }
                    }
                }
                
                p {
                    all: unset;
                    display: block;
                    padding: 3px 4px;
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
    
</style>