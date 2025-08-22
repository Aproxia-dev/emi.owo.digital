<script lang="ts">
	import { onMount } from 'svelte';
	import { quintOut } from 'svelte/easing';
	import { Tween } from 'svelte/motion';

	import { page } from '$app/state';

	let tabs = [
		{ name: 'Home', href: '/' },
		{ name: 'About Me', href: '/about-me' },
		{ name: 'Blog', href: '/blog' },
		{ name: 'Projects', href: '/projects' }
	];

	let selectedTab = $derived.by(() => {
		let path = page.url.pathname.match(/\/[^/?]*/g)[0];
		return tabs.findIndex((tab) => tab.href == path);
	});

	let tabSize: number[] = $state([]);

	function getTabSizes() {
		for (let tab in tabs) {
			tabSize[tab] = document.getElementById(`tab-${tab}`)!.clientWidth;
		}
	}

	let glider = $state(undefined);

	function padTime(i: number): string {
		return i >= 10 ? `${i}` : `0${i}`;
	}

	let today = $state(new Date());
	let clockTime = $derived.by(() => {
		let h: string = padTime(((today.getHours() + 11) % 12) + 1);
		let m: string = padTime(today.getMinutes());

		return `${h}:${m}`;
	});

	let clockPeriod: string = $derived(today.getHours() <= 12 ? 'AM' : 'PM');

	onMount(() => {
		getTabSizes();
		glider = Tween.of(
			() => {
				let ret: number = 0;
				for (let i = 0; i < selectedTab; i++) {
					ret += tabSize[i];
					ret += 4;
				}

				return ret;
			},
			{
				duration: 500,
				easing: quintOut
			}
		);

		const clockInterval = setInterval(() => {
			today = new Date();
		}, 1000);
	});
</script>

<header
	class="relative z-1 mx-auto my-2 flex h-8 w-4/5 flex-row items-center justify-between rounded-lg border-2 border-lbg bg-bg px-1 py-0.5 font-mono text-fg"
>
	<p>LOGO</p>
	<nav class="relative flex items-center justify-around gap-1">
		{#each tabs as tab, i}
			<a href={tab.href} id="tab-{i}">
				<button
					class={`
						group/tab flex cursor-pointer items-center justify-center rounded-lg bg-dbg select-none
						hover:bg-lbg has-active:bg-lbg
						${selectedTab == i ? 'active' : ''}
					`}
				>
					<div
						class="grid-template-[1fr/1fr] grid h-full place-items-center *:col-[1/1] *:row-[1/1] *:h-full *:w-6 *:rounded-lg"
					>
						<div class="z-2 px-1 text-fg group-[.active]/tab:text-dbg">{i + 1}</div>
						<div
							class="bg-transparent group-hover/tab:bg-mbg noscript:group-[.active]/tab:bg-accent"
						></div>
					</div>
					<p class="px-2">
						{tab.name}
					</p>
				</button>
			</a>
		{/each}
		<span
			style:--pos={`${glider !== undefined ? glider.current : 0}px`}
			style:visibility={glider !== undefined ? 'visible' : 'hidden'}
			class="absolute left-(--pos) z-1 h-full w-6 rounded-lg bg-accent"
			aria-roledescription="presentation"
		></span>
	</nav>
	<div class="flex flex-row items-center justify-center gap-1">
		<p class="cursor-pointer rounded-lg bg-dbg px-1 font-bold text-alt hover:bg-lbg">en</p>
		<p class="cursor-pointer rounded-lg bg-dbg px-1 hover:bg-lbg">
			{clockTime}
			<span class="text-red">{clockPeriod}</span>
		</p>
	</div>
</header>
