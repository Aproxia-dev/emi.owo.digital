<script>
	import Slidein from '$lib/components/slidein.svelte';
</script>

<main>
	<Slidein
		delay="150"
		initDelay="50"
		duration="400"
		distance="2"
		class="align-start flex h-fit w-full flex-col justify-center gap-2"
	>
		<p>
			Heyo! My name's Emi, but I usually go by Aproxia. Welcome to my cozy little spot on the
			internet!
		</p>
		<p>
			I'm a self-taught software developer, designer, sysadmin and artist who simply enjoys making
			things!
		</p>
		<p>
			I am non-binary and use
			<a
				href="https://en.pronouns.page/@Aproxia"
				class="
					relative -mx-[2px] px-[2px] text-nowrap text-blue
					after:absolute after:bottom-0
					after:left-0 after:h-[2px] after:w-full
					after:origin-bottom after:scale-x-0
					after:bg-blue after:transition-transform
					after:duration-200 after:ease-out-quint
					after:content-[''] hover:after:scale-x-100
               ">they/she/it/vi pronouns</a
			>, and consider myself a voidpunk fox therian.
		</p>
	</Slidein>
</main>
