<script lang="ts">
	let { delay, initDelay, duration, distance, class: className = '', children } = $props();
</script>

<div
	id="root"
	class={className}
	style={`
        --delay:${delay}ms;
        --initDelay:${initDelay}ms;
        --duration:${duration}ms;
        --distance:${distance};
    `}
>
	{@render children()}
</div>

<style lang="scss">
	@keyframes slide-in {
		0% {
			opacity: 0%;
			transform: translateY(calc(var(--distance) * var(--spacing)));
		}
		100% {
			opacity: 100%;
			transform: translateY(0);
		}
	}

	:global(div#root *:not(.dont-slide *)) {
		animation: slide-in var(--duration) 1 easeOutCirc both;

		@for $i from 1 through 32 {
			&:nth-child(#{$i}) {
				animation-delay: calc(var(--initDelay) + var(--delay) * (#{$i} - 1)) !important;
			}
		}
	}
</style>
