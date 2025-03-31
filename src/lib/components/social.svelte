<script lang="ts">
    import SocialIcon from '$lib/assets/social-icons-outline.svelte'; // Obrysy
    // import SocialIcon from '$lib/assets/social-icons-filled.svelte';  // Bublinky
    // import SocialIcon from '$lib/assets/social-icons-basic.svelte';   // Obycejny
    let { name, hoverPos, clicked } = $props();

    // $inspect(hoverPos, clicked, name)
</script>

<div style='--translate: {hoverPos ? 2 >= hoverPos && hoverPos >= -2 ? 3 / hoverPos : 0 : 0}rem; --scale: {(hoverPos == 0 ? 180 : (5 - Math.abs(hoverPos) + 1) * 20)}%;'>
    <p class='icon' style='opacity:{(5-Math.abs(hoverPos))*20}%;transform: scale({hoverPos === 0 && clicked ? 70 : 100}%)'>
        <SocialIcon name={name} />
    </p>
    <p class='name' style='opacity:{hoverPos === 0 ? 100 : 0}%;--y:{hoverPos === 0 ? 2.5 : 1}rem;--scale:{hoverPos === 0 ? 80 : 50}%'>{name}&#8203;</p>
</div>

<style lang="scss">
    div {
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        transition: all 0.3s easeOutCirc;

        @media screen and (orientation:landscape) and (width >= 1000px)
            { transform: translate(var(--translate), 0) scale(var(--scale)); }
        @media screen and (orientation:portrait), (width < 1000px)
            { transform: scale(min(var(--scale), 150%)); }
    }

    p.icon { 
        margin: 0 auto;
        text-align: center;
        transition: transform 0.3s easeOutCirc;
        transition: all 0.6s easeOutCirc;
    }

    p.name {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, calc(-30% + var(--y))) scale(var(--scale));
        margin: 0;
        padding: 0;
        text-align: center;
        font-size: 1rem;
        width: 100%;
        transition: all 0.6s easeOutCirc;
    }
</style>