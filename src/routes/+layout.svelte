<script lang="ts">
	import '../app.css';
	import favicon from '$lib/assets/favicon.svg';

	import { onMount } from 'svelte';

	let { children } = $props();

	onMount(() => {
		const rootEl = document.documentElement;
		rootEl.classList.add('jsenabled');
	});
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

{@render children?.()}
