<script lang="ts">
	import { onMount } from 'svelte';

	/* eslint-disable svelte/no-unused-props */
	let {
		phrases,
		class: className = '',
		mode,
		animating = $bindable(true),
		loadDelay = 0,
		in: inOpts,
		out: outOpts
	}: {
		phrases: string[];
		class?: string;
		mode: 'sequential' | 'random';
		animating?: boolean;
		loadDelay?: number;
		in: {
			delay: number;
			speed: number;
		};
		out: {
			delay: number;
			speed: number | 'backspace';
		};
	} = $props();
	/* eslint-enable svelte/no-unused-props */

	let index: number = $state(mode == 'sequential' ? 0 : Math.floor(Math.random() * phrases.length));
	let displayed = $state('');
	let isDeleting = $state(false);

	const wait = (ms: number) => new Promise((r) => setTimeout(r, ms));

	function randomNonRepeating(range: number, skip: number) {
		let random = Math.floor(Math.random() * (range - 1));
		return random < skip ? random : random + 1;
	}

	onMount(async () => {
		await wait(loadDelay);
		while (true) {
			if (animating) {
				if (!isDeleting) {
					if (displayed.length < phrases[index].length) {
						displayed += phrases[index][displayed.length];
						await wait(12000 / inOpts.speed);
						continue;
					}
					await wait(outOpts.delay);
					isDeleting = true;
				} else if (isDeleting) {
					if (displayed.length > 0) {
						displayed = displayed.slice(0, -1);
						await wait(
							outOpts.speed !== 'backspace'
								? 12000 / outOpts.speed
								: displayed.length === phrases[index].length - 1
									? 200
									: 30
						);
						continue;
					}
					isDeleting = false;
					index =
						mode == 'sequential'
							? (index + 1) % phrases.length
							: randomNonRepeating(phrases.length, index);
					await wait(inOpts.delay);
				}
			}
		}
	});
</script>

<span class={className}
	><span class="inline noscript:hidden">{displayed}</span><span
		style:--delay={`${loadDelay}ms`}
		class="
            hidden opacity-0 noscript:inline
            noscript:animate-[fade-in_500ms_linear_var(--delay)_forwards]
        ">{phrases[index]}</span
	>&#8203;</span
>
