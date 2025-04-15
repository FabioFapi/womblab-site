<script>
	export let items = [];
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';

	let mounted = false;

	onMount(() => {
		mounted = true;
	});
</script>

<div class="w-full py-12">
	<div class="relative mx-auto max-w-6xl min-w-[800px] px-8">
		<div
			class="timeline-line absolute top-[46px] right-0 left-0 z-0 h-0.5 bg-gradient-to-r from-transparent via-green-400 to-transparent"
		></div>

		<div class="relative z-10 flex items-start justify-between">
			{#each items as item, i}
				<div
					class="flex w-36 shrink-0 transform flex-col items-center transition-all duration-500 hover:-translate-y-2 hover:scale-110"
				>
					<div class="mb-4 text-center text-sm font-bold text-green-700">
						{item.year}
					</div>

					<div class="group relative mb-4">
						<div
							class="flex h-6 w-6 items-center justify-center rounded-full border-2 border-green-500 bg-white transition-all duration-300 group-hover:border-green-600 group-hover:shadow-lg"
						>
							<div
								class="h-3 w-3 rounded-full border-2 border-green-500 bg-white transition-all duration-300 group-hover:bg-green-500"
							></div>
						</div>

						<div
							class="absolute -inset-1 rounded-full bg-green-400 opacity-0 group-hover:animate-ping"
						></div>
					</div>

					{#if mounted}
						<div
							in:fade={{ delay: i * 200, duration: 400 }}
							class="text-center text-xs text-gray-700 transition-all duration-300 group-hover:text-gray-900"
						>
							{item.text}
						</div>
					{:else}
						<div class="text-center text-xs text-gray-700 group-hover:text-gray-900">
							{item.text}
						</div>
					{/if}
				</div>
			{/each}
		</div>
	</div>
</div>

<style>
	@keyframes pulse {
		0% {
			transform: scale(1);
			opacity: 1;
		}
		50% {
			transform: scale(1.2);
			opacity: 0.7;
		}
		100% {
			transform: scale(1);
			opacity: 1;
		}
	}

	@keyframes timeline-flow {
		0% {
			background-position: -200% 0;
		}
		100% {
			background-position: 300% 0;
		}
	}

	.timeline-line {
		background-size: 200% 100%;
		animation: timeline-flow 8s linear infinite;
	}

	:global(body) {
		overflow-x: hidden;
	}
</style>
