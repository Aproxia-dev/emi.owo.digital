<script lang="ts">
    import title0 from '$lib/assets/titles/name-1.svg';
    import title1 from '$lib/assets/titles/name-2.svg';
    import title2 from '$lib/assets/titles/name-3.svg';

    let title = [title0, title1, title2];
</script>

<div class='group/title-stack w-full mt-[40vh] h-50 flex flex-col justify-center items-center'>
    {#each title as _, i}
        <div
            style:--step={`${32*i}px`}
            style:--len={`${(title.length+1)*250}ms`}
            style:--delay={`${250*i}ms`}
            style:--delay-reverse={`${250*(title.length-i-1)}ms`}
            class='grid grid-template-[1fr/1fr] -mb-6'
        >
            <img
                src={title[i]}
                alt='yourmom'
                class="
                    invisible row-[1/1] col-[1/1]
                    animate-[load-anim_var(--len)_linear_var(--delay)_none]
                "
            >
            <img
                src={title[i]}
                alt='yourmom'
                class="
                    opacity-0 row-[1/1] col-[1/1]
                    group-hover/title-stack:opacity-100 ease-[step-end] duration-0 transition-opacity delay-(--delay) group-hover/title-stack:delay-(--delay-reverse)
                "
            >
        </div>
    {/each}
    <h1
        style:--len={`${(title.length+1)*250}ms`}
        style:--delay={`${(title.length)*250}ms`}
        class="text-6xl text-bold font-mono invisible
            animate-[load-anim_var(--len)_linear_var(--delay)_forwards]
        "
    >Apro</h1>
</div>

