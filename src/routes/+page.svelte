<script lang="ts">
    import { onMount } from 'svelte';
    import '@fortawesome/fontawesome-free/css/all.min.css';

    import '../main.scss';

</script>

<svelte:head>
    <title>your mom &lt;3</title>
    <link href="https://iosevka-webfonts.github.io/iosevka/Iosevka.css" rel="stylesheet" />
</svelte:head>

<div class='screen-center'>
    <div class='term-border'>
        <div class='titlebar'>
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
            <div style='margin-top:4rem;margin-bottom:4rem;'>
                {#each [...Array(4).keys()] as index}
                    <h1 class='title title-{index}'>Apro</h1>
                {/each}
            </div>
            <div class='socials'>
                <p><i class="fa-brands fa-youtube"></i></p>
                <div style='width:4rem;height:4rem;line-height:4rem;text-align:center;border-radius:50%;color:#141b1e;background-color:#dadada'>⁂</div>
                <p><i class="fa-brands fa-github"></i></p>
                <p><i class="fa-brands fa-discord"></i></p>
            </div>
        </div>
    </div>
</div>

<style lang="scss">
    .screen-center {
        position: fixed;
        inset: 0;
        width: fit-content;
        height: fit-content;
        margin: auto;
    }

    .term-border {
        padding: 4px;
        // padding-top: 24px;
        border-radius: 12px;
        background-color: #67b0e8;
    }

    .titlebar {
        display: flex;
        justify-content: space-between;
        align-items: center;
        line-height: 0px;
        font-family: 'Iosevka';
        padding-right: 4px;
        padding-left: 8px;
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

        &:hover {
            filter: brightness(70%) saturate(200%);
        }
    }

    .term-window {
        background-color: #141b1e;
        border-radius: 8px;
        padding: 12px;
        min-width: 40vw;
        min-height: 45vh;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    .socials {
        width: 80%;
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        align-items: center;
        color: #dadada;
        font-size: 4rem;
    }

    @keyframes blink {
        0%   { visibility: hidden; }
        100%  { visibility: visible; }
    }

    .title {
        color: #dadada;
        font-size: 4rem;
        line-height: 0;
        text-align: center;
        visibility: hidden;
        animation: blink 0.4s;
        // position: absolute;
        // top: 0;
        // left: 0;
    }

    .title-0 {
        transform: translate(0, -0.9rem);
        font-family: "Pacifico";
        animation-delay: 0.6s
    }
    .title-1 {
        transform: translate(0, -0.6rem);
        font-family: "Tiny5";
        animation-delay: 0.7s
    }
    .title-2 {
        visibility: hidden;
        transform: translate(0, -0.3rem);
        font-family: "Asset";
        animation-delay: 0.8s
    }
    .title-3 {
        font-family: "Iosevka";
        animation-fill-mode: forwards;
        animation-delay: 0.9s;
    }
</style>