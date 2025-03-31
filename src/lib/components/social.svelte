<script lang="ts">
    import { fly } from 'svelte/transition';
    import SocialIcon from '$lib/assets/social-icons-outline.svelte';
    // import SocialIcon from '$lib/assets/social-icons-filled.svelte';
    let { name, hoverPos, clicked } = $props();

    // $inspect(hoverPos, clicked, name)
</script>

    <div style='transform: translate({hoverPos ? 2 >= hoverPos && hoverPos >= -2 ? 3 / hoverPos : 0 : 0}rem,0) scale({(hoverPos == 0 ? 180 : (5 - Math.abs(hoverPos) + 1) * 20)}%)'>
    <p class='icon' style='opacity:{(5-Math.abs(hoverPos))*20}%;transform: scale({hoverPos === 0 && clicked ? 70 : 100}%)'>
        <SocialIcon name={name} />
    </p>
    <p class='name' style='opacity:{hoverPos === 0 ? 100 : 0}%;--y:{hoverPos === 0 ? 1.5 : 0}rem;--scale:{hoverPos === 0 ? 80 : 50}%'>{name}&#8203;</p>
</div>

<style lang="scss">
    div {
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        transition: all 0.3s cubic-bezier(0, 0.55, 0.45, 1);
    }

    p.icon { 
        margin: 0 auto;
        text-align: center;
        transition: all 0.6s cubic-bezier(0, 0.55, 0.45, 1);
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
        transition: all 0.6s cubic-bezier(0, 0.55, 0.45, 1);
    }
</style>