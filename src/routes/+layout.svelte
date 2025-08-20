<script lang="ts">
	import '../app.css';
	import favicon from '$lib/assets/favicon.svg';
	import Nav from '$lib/components/nav.svelte';
	import { onMount } from 'svelte';

	let { children } = $props();

	onMount(() => {
		let rootEl = document.documentElement;
		rootEl.classList.add('jsenabled');
	});
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<Nav />
{@render children?.()}
