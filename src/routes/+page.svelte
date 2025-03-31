<script lang="ts">
    import { onMount } from 'svelte';
    import '@fortawesome/fontawesome-free/css/all.min.css';
    import Title_0 from '$lib/assets/title-anim/title-0.svelte';
    import Title_1 from '$lib/assets/title-anim/title-1.svelte';
    import Title_2 from '$lib/assets/title-anim/title-2.svelte';

    import { fade, fly } from 'svelte/transition';
    import { backOut } from 'svelte/easing';

    import '../main.scss';
    import '$lib/assets/no-overflow.scss';

    let socials: string[] = [
        "<p><i class='fa-brands fa-youtube'></i></p>",
        "<p style='width:1em;height:1em;line-height:1em;text-align:center;border-radius:50%;color:#141b1e;background-color:#b3b9b8'>⁂</p>",
        "<p><i class='fa-brands fa-github'></i></p>",
        "<p><i class='fa-brands fa-discord'></i></p>",
    ]


    let top: number = $state(0);
    let left: number = $state(0);

    let grabbed: boolean = $state(false);

    let fadeIn: boolean = $state(false);

    function onmousedown() { grabbed = true; };
    function onmouseup() { grabbed = false; };
    function onmousemove(e: MouseEvent) {
        if (grabbed) {
            left += e.movementX;
            top += e.movementY;
        }
    }

    onMount(() => fadeIn = true);
</script>

<svelte:head>
    <title>your mom &lt;3</title>
    <link href="https://iosevka-webfonts.github.io/iosevka/Iosevka.css" rel="stylesheet" />
</svelte:head>

<main>
    <div class='term-border' style='--top: {top}px; --left: {left}px;'>
        <div class='titlebar' {onmousedown} role='toolbar' aria-grabbed={grabbed} tabindex='0'>
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
        <div class='term-window'>
            <div class='titles'>
                <div class='title title-0'><Title_0 /></div>
                <div class='title title-1'><Title_1 /></div>
                <div class='title title-2'><Title_2 /></div>
                <div class='title title-3'><h1>Apro</h1></div>
            </div>
            <p class='subtitle'>figuring out how to make this animated</p>
            <div class='socials'>
                {#if fadeIn}
                    {#each socials as social, i}
                        <div style='flex-shrink:0;' transition:fly|global={{
                            y: 50,
                            delay: 1000 + 200 * i,
                            easing: backOut,
                        }}>
                        {@html social}
                        </div>
                    {/each}
                {:else}
                    <p>&nbsp;</p>
                {/if}
            </div>
            <div class='prompt'>
                <p class='ps1'><span class='pwd'>/home/apro</span><span class='shell-symbol'>❤</span><span class='cursor'>_</span></p> 
            </div>
        </div>
    </div>
</main>

<svelte:window {onmouseup} {onmousemove} />

<style lang="scss">
    .term-border {
        position: absolute;
        padding: 4px;
        border-radius: 12px;
        background-color: #67b0e8;
        top: calc(27.5vh - 4px + var(--top));
        left: calc(32.5vw - 4px + var(--left));
    }

    .titlebar {
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

    .term-window {
        background-color: #141b1e;
        border-radius: 8px;
        padding: 12px;
        width: 35vw;
        height: 45vh;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
    }

    @keyframes title-blink {
        0%   { visibility: hidden; }
        100%  { visibility: visible; }
    }

    .titles {
        margin-top: 4rem;
        pointer-events: none;
        color: #dadada;
        font-size: 4rem;
        text-align: center;
    }

    .title {
        visibility: hidden;
        animation: title-blink 0.5s;
        margin-top: -3rem;
        margin-bottom: -3rem;
    }

    $title-delay: 0.2s;

    .title-0 {
        animation-delay: $title-delay;
        margin-bottom: -4rem;
    }
    .title-1 {
        animation-delay: calc($title-delay + 0.1s);
    }
    .title-2 {
        animation-delay: calc($title-delay + 0.2s);
    }
    .title-3 {
        font-family: "Iosevka";
        animation-fill-mode: forwards;
        animation-delay: calc($title-delay + 0.3s);
        pointer-events: fill;
        h1 {
            margin-top: -3rem;
            font-size: 4rem;
        }
    }

    .subtitle {
        color: #dadada;
        font-family: 'Iosevka', monospace;
        margin-top: 2rem;
        margin-bottom: -1rem;
        font-size: 1.5rem;
    }

    .socials {
        width: 70%;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        color: #b3b9b8;
        font-size: 3rem;
        user-select: none;
        line-height: 3rem;
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
        flex-shrink: 999;

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
</style>