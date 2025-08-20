<script lang="ts">
	import { onMount } from 'svelte';

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
		const clockInterval = setInterval(() => {
			today = new Date();
		}, 1000);
	});
</script>

<header
	class="relative z-1 mx-auto my-2 flex h-8 w-4/5 flex-row items-center justify-between rounded-lg border-2 border-lbg bg-bg px-2 py-0.5 text-fg"
>
	<p>LOGO</p>
	<nav></nav>
	<p>{clockTime} <span class="text-red">{clockPeriod}</span></p>
</header>
