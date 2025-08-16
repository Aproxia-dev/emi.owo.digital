<script lang="ts">
	import Typewriter from '$lib/typewriter.svelte';

	import subtitles from '$lib/assets/subtitles.json';
	import title0 from '$lib/assets/titles/name-1.svg';
	import title1 from '$lib/assets/titles/name-2.svg';
	import title2 from '$lib/assets/titles/name-3.svg';

	let titles = [title0, title1, title2];
</script>

<div class="size-screen flex flex-col items-center justify-center">
	<div class="group/title-stack mt-[30vh] flex flex-col items-center justify-center">
		{#each titles as title, i (i)}
			<div
				style:--step={`${32 * i}px`}
				style:--len={`${(titles.length + 1) * 250}ms`}
				style:--delay={`${250 * i}ms`}
				style:--delay-reverse={`${250 * (titles.length - i - 1)}ms`}
				class="grid-template-[1fr/1fr] -mb-6 grid"
			>
				<img
					src={title}
					alt="yourmom"
					class="
                    invisible col-[1/1] row-[1/1]
                    animate-[load-anim_var(--len)_linear_var(--delay)_none]
                    "
				/>
				<img
					src={title}
					alt="yourmom"
					class="
                    col-[1/1] row-[1/1]
                    opacity-0
                    transition-opacity delay-(--delay) duration-0 ease-[step-end]
                    group-hover/title-stack:opacity-100 group-hover/title-stack:delay-(--delay-reverse)
                    "
				/>
			</div>
		{/each}
		<h1
			style:--len={`${(titles.length + 1) * 250}ms`}
			style:--delay={`${titles.length * 250}ms`}
			class="invisible animate-[load-anim_var(--len)_linear_var(--delay)_forwards] font-mono text-6xl
            font-bold
            "
		>
			Apro
		</h1>
	</div>
</div>

<p class="mt-4 text-center">
	<Typewriter
		class="text-xl"
		phrases={subtitles}
		mode="random"
		loadDelay={(titles.length * 2 + 1) * 250}
		in={{
			delay: 100,
			speed: 200
		}}
		out={{
			delay: 1500,
			speed: 'backspace'
		}}
	/>
</p>
