<script lang="ts">
    import { onMount } from "svelte";

    let { name, icon, children } = $props();

    let app: {
        top: number;
        left: number;
        grabbed: boolean;
    } = $state({
        top: 0,
        left: 0,
        grabbed: false,
    });

    function grabTitlebar() {
        app.grabbed = true;
    }
    function moveTitlebar(e: MouseEvent) {
        if (app.grabbed) {
            app.left += e.movementX;
            app.top += e.movementY;
        }
    }

    function onmouseup() {
        app.grabbed = false;
    }
</script>

<div id="app" style="--top:{app.top}px; --left:{app.left}px;">
    <div id="titlebar" onmousedown={grabTitlebar} role="none">
        <span style="width:100px;">
            {@render icon()}
        </span>
        <p>{name}</p>
        <div class="app-buttons">
            <div class="app-button" style="background-color:#8ccf7e"></div>
            <div class="app-button" style="background-color:#e5c76b"></div>
            <div class="app-button" style="background-color:#e57474"></div>
        </div>
    </div>
    {@render children()}
</div>

<svelte:window {onmouseup} onmousemove={moveTitlebar} />

<style lang="scss">
    #app {
        position: absolute;
        padding: 4px;
        margin: 8px;
        border-radius: 12px;
        z-index: 0;
        background-color: #67b0e8;
        transform: translate(-50%, -50%);

        top: calc(50vh + var(--top));
        left: calc(50vw + var(--left));
    }

    #titlebar {
        cursor: move;
        display: flex;
        justify-content: space-between;
        align-items: center;
        line-height: 0px;
        font-family: "Atkinson Hyperlegible";
        padding-right: 4px;
        padding-left: 8px;
        user-select: none;
    }

    .app-buttons {
        width: 100px;
        display: flex;
        justify-content: flex-end;
        align-items: center;
        gap: 4px;
    }

    .app-button {
        width: 18px;
        height: 18px;
        aspect-ratio: 1;
        clip-path: polygon(50% 0, 100% 50%, 50% 100%, 0 50%);
        cursor: pointer;

        &:hover {
            filter: brightness(70%) saturate(200%);
        }
    }
</style>
