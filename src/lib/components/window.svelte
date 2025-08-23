<script lang="ts">
	import { onMount, type Snippet } from 'svelte';
	import { page } from '$app/state';
	import { browser } from '$app/environment';

	let {
		name,
		icon,
		maximizable = true,
		maximized = $bindable(false),
		class: className = '',
		defaultPos = {
			top: '0px',
			left: '0px'
		},
		children
	}: {
		name: string;
		icon: Snippet;
		maximizable?: boolean;
		maximized?: boolean;
		class?: string;
		defaultPos: {
			top?: string;
			left?: string;
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
		if (!maximized) {
			app.grabbed = true;
			rootEl?.classList.add('cursor-grabbing');
		}
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
	class={`absolute top-(--top) left-(--left) z-0 rounded-xl bg-accent p-1 ${mounted || maximized ? '-translate-x-1/2' : '-translate-1/2'} ${maximized ? '!top-12 !left-1/2 !h-[calc(100vh-3.5rem)] !w-[calc(100vw-1rem)]' : 'size-fit'} ${className}`}
	style:--top={`calc(${defaultPos.top} + ${app.top}px)`}
	style:--left={`calc(${defaultPos.left} + ${app.left}px)`}
	bind:this={window}
>
	<div
		{onmousedown}
		role="presentation"
		class="grid h-7 w-full grid-cols-3 items-center justify-self-center px-1 select-none"
	>
		<div>
			{@render icon()}
		</div>
		<p class="text-center">{name}</p>
		<div class="flex flex-row items-center justify-end gap-1">
			<button
				class={`diamond size-4 ${maximizable ? 'bg-green hover:cursor-pointer hover:brightness-80' : 'bg-mfg'}`}
				aria-label="maximize"
				onclick={() => {
					if (maximizable === true) maximized = !maximized;
				}}
			>
				{#if maximizable}
					<a
						class="hidden size-full noscript:block"
						href={`?maximized=${maximized ? '0' : '1'}${page.url.searchParams.get('unhinged') == '1' ? '&unhinged=1' : ''}`}
					></a>
				{/if}
			</button>
			<button
				class="diamond size-4 bg-yellow hover:cursor-pointer hover:brightness-80"
				aria-label="minimize (decoration only)"
			></button>
			<button
				class="diamond size-4 bg-red hover:cursor-pointer hover:brightness-80"
				aria-label="close (decoration only)"
			></button>
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
