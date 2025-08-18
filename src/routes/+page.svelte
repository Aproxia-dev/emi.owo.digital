<script lang="ts">
	import Typewriter from '$lib/typewriter.svelte';

	import subtitles from '$lib/assets/subtitles.json';
	import title0 from '$lib/assets/titles/name-1.svg';
	import title1 from '$lib/assets/titles/name-2.svg';
	import title2 from '$lib/assets/titles/name-3.svg';

	import youtubeIcon from '$lib/assets/socials/outline/youtube.svg';
	import fediverseIcon from '$lib/assets/socials/outline/fediverse.svg';
	import githubIcon from '$lib/assets/socials/outline/github.svg';
	import discordIcon from '$lib/assets/socials/outline/discord.svg';

	let titles = [title0, title1, title2];

	let socials: { name: string; icon: string; href: string }[] = [
		{ name: 'YouTube', icon: youtubeIcon, href: 'https://www.youtube.com/@howaretheygameing' },
		{ name: 'Fediverse', icon: fediverseIcon, href: 'https://social.owo.digital/@emily' },
		{ name: 'GitHub', icon: githubIcon, href: 'https://github.com/Aproxia-dev' },
		{ name: 'Discord', icon: discordIcon, href: 'https://youtube.com/watch?v=dQw4w9WgXcQ' }
	];
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

	<div
		style:--cols={`repeat(${socials.length}, minmax(0, 1fr))`}
		class="group/socials grid w-[30vw] grid-cols-(--cols) p-8"
	>
		{#each socials as social, index (social.name)}
			<a href={social.href} target="_blank" class="group/social-self">
				<div class="grid-template-[1fr/1fr] relative grid items-center justify-self-center">
					<img
						src={social.icon}
						alt={social.name}
						class="col-[1/1] row-[1/1] size-12 text-center"
					/>
					<p class="absolute top-[70%] left-[50%] col-[1/1] row-[1/1] -translate-x-1/2">
						{social.name}
					</p>
				</div>
			</a>
		{/each}
	</div>
</div>

<style lang="scss">
	@use 'sass:math';

	$items: 4;
	$max-diff: 4; // how far the effect reaches

	$easeOutCirc: cubic-bezier(0, 0.55, 0.45, 1);

	.group\/socials {
		a div {
			&,
			* {
				transition:
					transform 160ms $easeOutCirc,
					opacity 160ms $easeOutCirc;
				transform-origin: center;
			}
			p {
				opacity: 0%;
				transform: scale(50%);
			}
		}

		// generate rules for each possible hovered index
		@for $i from 1 through $items {
			// parent matches when child $i is hovered / focused
			&:has(a:nth-child(#{$i}):is(:hover, :focus-within)) {
				// explicit rule for hovered item (diff=0)
				a:nth-child(#{$i}) div {
					img {
						transform: scale(150%);
					}
					p {
						opacity: 100%;
						transform: translateY(1.5rem);
					}
				}

				// neighbours
				@for $j from 1 through $items {
					$diff: $i - $j;
					$absDiff: math.abs($diff);
					@if $absDiff > 0 and $absDiff <= $max-diff {
						a:nth-child(#{$j}) div {
							transform: translateX(math.div(2.5rem, -$diff));
							img {
								opacity: 100% - $absDiff * 20%;
								transform: scale(clamp(20%, 100% - (#{$absDiff} - 1) * 20%, 100%));
							}
						}
					}
				}
			}
		}
	}
</style>
