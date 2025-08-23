<script lang="ts">
	import nameTitles from '$lib/assets/nameTitles.json';

	import profilePicture from '$lib/assets/emi.webp';
	import Window from '$lib/components/window.svelte';
	import Typewriter from '$lib/typewriter.svelte';

	import { page } from '$app/state';

	import { CircleUserRound } from '@lucide/svelte';

	let { children } = $props();

	let info: { key: string; value: string }[] = [
		{ key: 'Name', value: 'Emi' },
		{ key: 'Age', value: String(calcAge('2005-01-17')) },
		{ key: 'Pronouns', value: 'they/she/it' }
	];

	let tabs: { name: string; href: string }[] = [
		{ name: 'Description', href: '/' },
		{ name: 'Skills', href: '/skills' },
		{ name: 'Setup', href: '/setup' },
		{ name: 'Socials', href: '/socials' }
	];

	let unhinged = page.url.searchParams.has('unhinged');

	let selectedTab = $derived.by(() => {
		let path = (page.url.pathname + '/').match(/\/[^/?]*/g)![1];
		return tabs.findIndex((tab) => tab.href == path);
	});

	function calcAge(birthStr: string) {
		let birthDate: Date = new Date(birthStr);
		let now: Date = new Date();

		let years = now.getFullYear() - birthDate.getFullYear();

		if (
			now.getMonth() < birthDate.getMonth() ||
			(now.getMonth() == birthDate.getMonth() && now.getDate() < birthDate.getDate())
		) {
			years--;
		}
		return years;
	}
</script>

{#snippet icon()}
	<CircleUserRound />
{/snippet}

<Window name="About Me" {icon} defaultPos={{ top: '50%', left: '50%' }} maximizable={false}>
	<div class="flex w-112 flex-col items-center justify-center gap-2 rounded-lg bg-bg p-4 text-fg">
		<div class="flex w-full flex-row items-center justify-around">
			<img
				src={profilePicture}
				alt={`${info[0]}'s profile picture`}
				class="mx-2 aspect-square size-40 rounded-lg border-2 border-mbg"
			/>
			<div class="flex w-44 flex-col items-center justify-around gap-2">
				<h1 class="text-3xl">Aproxia</h1>
				<Typewriter
					class="font-mono text-xs"
					phrases={unhinged ? nameTitles.safe.concat(nameTitles.unhinged) : nameTitles.safe}
					mode="random"
					in={{
						delay: 100,
						speed: 200
					}}
					out={{
						delay: 1500,
						speed: 'backspace'
					}}
				/>
				<div class="flex w-full flex-col items-center justify-center gap-1">
					{#each info as tidbit (tidbit.key)}
						<div class="grid grid-cols-2 gap-2 text-sm">
							<h3 class="text-right font-bold">{tidbit.key}</h3>
							<p class="text-left font-normal">{tidbit.value}</p>
						</div>
					{/each}
				</div>
			</div>
		</div>
		<div class="mt-2 flex w-full flex-row flex-nowrap items-center justify-center gap-2">
			{#each tabs as tab, i (tab.href)}
				<a
					href={`/about-me${tab.href}${unhinged ? '?unhinged=1' : ''}`}
					class={`
						group/link flex-1 cursor-pointer rounded-lg p-1 text-center
						font-bold transition-colors duration-200 ease-out-sine
						${selectedTab === i ? 'active bg-green text-lbg transition-none' : 'bg-lbg'}
					`}
				>
					<span
						class="
						relative px-[2px] text-nowrap
						after:absolute after:bottom-0
						after:left-0 after:h-[2px] after:w-full
						after:origin-bottom after:scale-x-0
						after:bg-fg after:transition-transform
						after:duration-200 after:ease-out-quint
						after:content-[''] group-hover/link:after:scale-x-100
						group-[.active]/link:after:bg-lbg
					">{tab.name}</span
					>
				</a>
			{/each}
		</div>
		<div class="w-full rounded-lg bg-lbg p-2 text-left">
			{@render children()}
		</div>
	</div>
</Window>
