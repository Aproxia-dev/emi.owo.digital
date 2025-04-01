<script lang='ts'>
    let { delay, initDelay, duration, distance, children } = $props();
</script>

<div id='slide-enter' style="{`--delay:${delay}ms; --initDelay:${initDelay}ms; --duration:${duration}ms; --distance:${distance}px;`}">
    {@render children()}
</div>

<style lang='scss'>
    @keyframes slide-enter {
        from {
            opacity: 0%;
            transform: translateY(var(--distance));
        } to {
            opacity: 100%;
            transform: translateY(0);
        }
    }

    :global(div#slide-enter > *),
    :global(div#slide-enter *:not(.slident) *)
    {
        --step: 0;
        animation-name: slide-enter;
        animation-duration: var(--duration);
        animation-iteration-count: 1;
        animation-timing-function: easeOutCirc;
        animation-fill-mode: both;
        animation-delay: calc(var(--initDelay) + var(--delay) * var(--step));

        @for $i from 1 through 32 {
            &:nth-child(#{$i})  { --step: calc(#{$i} - 1)  !important; }
        }
    }
</style>