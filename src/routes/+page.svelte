<script lang="ts">
	import Typewriter from '$lib/typewriter.svelte';
	import Window from '$lib/components/window.svelte';

	import subtitles from '$lib/assets/subtitles.json';
	import Title0 from '$lib/assets/titles/title-1.svelte';
	import Title1 from '$lib/assets/titles/title-2.svelte';
	import Title2 from '$lib/assets/titles/title-3.svelte';

	import YoutubeIcon from '$lib/assets/socials/outline/youtube.svelte';
	import FediverseIcon from '$lib/assets/socials/outline/fediverse.svelte';
	import GithubIcon from '$lib/assets/socials/outline/github.svelte';
	import DiscordIcon from '$lib/assets/socials/outline/discord.svelte';

	import { Terminal } from '@lucide/svelte';
	import type { Component } from 'svelte';

	let titles = [Title0, Title1, Title2];

	let socials: { name: string; icon: Component; href: string }[] = [
		{ name: 'YouTube', icon: YoutubeIcon, href: 'https://www.youtube.com/@howaretheygameing' },
		{ name: 'Fediverse', icon: FediverseIcon, href: 'https://social.owo.digital/@emily' },
		{ name: 'GitHub', icon: GithubIcon, href: 'https://github.com/Aproxia-dev' },
		{ name: 'Discord', icon: DiscordIcon, href: 'https://youtube.com/watch?v=dQw4w9WgXcQ' }
	];

	let maximized = $state(false);
</script>

{#snippet icon()}
	<Terminal />
{/snippet}

<Window name="Terminal" {icon} defaultPos={{ top: '50%', left: '50%' }} bind:maximized>
	<div
		class="flex h-[calc(100%-1.75rem)] flex-col items-center justify-center rounded-lg bg-bg px-8 pt-4 pb-24 text-fg"
	>
		<div class="group/title-stack flex flex-col items-center justify-center">
			{#each titles as Title, i (i)}
				<div
					style:--step={`${32 * i}px`}
					style:--len={`${(titles.length + 1) * 250}ms`}
					style:--delay={`${250 * i}ms`}
					style:--delay-reverse={`${250 * (titles.length - i - 1)}ms`}
					class="grid-template-[1fr/1fr] -mb-6 grid"
					aria-label="presentation"
				>
					<Title
						alt="yourmom"
						class="
                        invisible col-[1/1] row-[1/1]
                        animate-[load-anim_var(--len)_linear_var(--delay)_none]
                        "
					/>
					<Title
						alt="yourmom"
						class="
                        col-[1/1] row-[1/1]
                        opacity-0
                        transition-opacity delay-(--delay) duration-0 ease-[step-end]
                        group-focus-within/title-stack:opacity-100 group-focus-within/title-stack:delay-(--delay-reverse)
                        group-hover/title-stack:opacity-100 group-hover/title-stack:delay-(--delay-reverse)
                        "
					/>
				</div>
			{/each}
			<h1
				style:--len={`${(titles.length + 1) * 250}ms`}
				style:--delay={`${titles.length * 250}ms`}
				class="invisible animate-[load-anim_var(--len)_linear_var(--delay)_forwards] font-mono text-6xl font-bold"
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
			class="group/socials mt-4 grid w-112 grid-cols-(--cols) px-8"
		>
			{#each socials as { name, icon: Icon, href }, i (name)}
				<a {href} target="_blank" class="focus:outline-0">
					<div
						style:--delay={`${(titles.length * 2 + 1) * 250 + (i + 1) * 200}ms`}
						class="relative flex w-24 animate-[slide-in_500ms_linear_var(--delay)_forwards] items-center justify-center opacity-0 animation-ease-out-back"
					>
						<span><Icon alt={name} class="size-12 text-center" /></span>
						<p class="absolute top-[70%] left-[50%] -translate-x-1/2">
							{name}
						</p>
					</div>
				</a>
			{/each}
		</div>
	</div>
</Window>

<style lang="scss">
	@use 'sass:math';

	$items: 4;

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
				@for $j from 1 through $items {
					$diff: $i - $j;
					$absDiff: math.abs($diff);
					@if $absDiff == 0 {
						a:nth-child(#{$j}) div {
							span {
								transform: scale(150%);
								&:active {
									transform: scale(120%);
								}
							}
							p {
								opacity: 100%;
								transform: translateY(1.5rem);
							}
						}
					} @else {
						a:nth-child(#{$j}) div span {
							opacity: 100% - $absDiff * 20%;
							transform: scale(clamp(20%, 100% - (#{$absDiff} - 1) * 20%, 100%))
								translateX(math.div(2rem, -$diff));
						}
					}
				}
			}
		}
	}
</style>
