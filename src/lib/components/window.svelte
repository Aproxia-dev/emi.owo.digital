<script lang="ts">
	let { name, icon, class: className, children } = $props();

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
	}

	function onmouseup() {
		app.grabbed = false;
	}

	function onmousemove(e: MouseEvent) {
		if (app.grabbed) {
			app.left += e.movementX;
			app.top += e.movementY;
		}
	}
</script>

<div
	class="absolute top-(--top) left-(--left) z-0 m-2 rounded-xl bg-accent p-1"
	style:--top={`${app.top}px`}
	style:--left={`${app.left}px`}
>
	<div
		{onmousedown}
		role="presentation"
		class="grid w-full grid-cols-3 items-center justify-self-center p-1 pt-0"
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
