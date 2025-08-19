<script lang="ts">
	import { onMount, type Snippet } from 'svelte';
	import { browser } from '$app/environment';
	import type { Warning } from 'svelte/types/compiler/interfaces';

	let {
		name,
		icon,
		class: className = '',
		defaultPos = {
			top: '0px',
			left: '0px'
		},
		children
	}: {
		name: string;
		icon: Snippet;
		class: string;
		defaultPos: {
			top: string;
			left: string;
		};
		children: Snippet;
	} = $props();

	let app: {
		top: number;
		left: number;
		grabbed: boolean;
	} = $state({
		top: 0,
		left: 0,
		grabbed: false
	});

	function onmousedown() {
		app.grabbed = true;
		rootEl?.classList.add('cursor-grabbing');
	}

	function onmouseup() {
		app.grabbed = false;
		rootEl?.classList.remove('cursor-grabbing');
	}

	function onmousemove(e: MouseEvent) {
		if (app.grabbed) {
			requestAnimationFrame(() => {
				app.left += e.movementX;
				app.top += e.movementY;
			});
		}
	}

	let window: HTMLDivElement | undefined = $state(undefined);
	let rootEl = browser ? document.documentElement : undefined;
	let mounted: boolean = $state(false);

	onMount(() => {
		mounted = true;
		app.top = -window!.offsetHeight / 2;
	});
</script>

<div
	class={`absolute top-(--top) left-(--left) z-0 m-2 rounded-xl bg-accent p-1 ${mounted ? '-translate-x-1/2' : '-translate-1/2'} ${className}`}
	style:--top={`calc(${defaultPos.top} + ${app.top}px)`}
	style:--left={`calc(${defaultPos.left} + ${app.left}px)`}
	bind:this={window}
>
	<div
		{onmousedown}
		role="presentation"
		class="grid w-full grid-cols-3 items-center justify-self-center p-1 pt-0 select-none"
	>
		<div>
			{@render icon()}
		</div>
		<p class="text-center">{name}</p>
		<div class="flex flex-row items-center justify-end gap-1">
			<div class="diamond size-4 bg-green"></div>
			<div class="diamond size-4 bg-yellow"></div>
			<div class="diamond size-4 bg-red"></div>
		</div>
	</div>
	{@render children()}
</div>

<svelte:window {onmouseup} {onmousemove} />

<style>
	.diamond {
		clip-path: polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%);
	}
</style>
