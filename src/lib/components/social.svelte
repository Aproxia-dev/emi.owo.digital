<script lang="ts">
    import { typewriter } from '$lib/transitions.svelte';
    let { name, icon, hoverId } = $props();

    // $inspect(hoverId, name)
</script>

<div style='transform: translate({hoverId ? (3 / hoverId) : 0}rem,0) scale({(hoverId == 0 ? 180 : (5 - Math.abs(hoverId) + 1) * 20)}%)'>
    <p class='icon'>{@html icon}</p>
    <!-- <p class='name'>
        {#if hoverId === 0}
            <span in:typewriter out:typewriter>{name}</span>
        {/if}
    &#8203;</p> -->
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

        &:not(&:has(i)) {
            width:1em;
            height:1em;
            line-height:0.85em;
            margin:0 auto;
            border-radius:50%;
            color:#141b1e;
            background-color:#b3b9b8;
        }
    }

    p.name {
        margin: 0;
        padding: 0;
        text-align: center;
        font-size: 1rem;
        width: 100%;
    }
</style>