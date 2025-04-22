<script>
	export let items = [];
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';

	let mounted = false;
	let windowWidth;

	onMount(() => {
		mounted = true;
	});
</script>

<svelte:window bind:innerWidth={windowWidth} />

<div class="w-full py-6 md:py-12">
	<div class="relative mx-auto max-w-6xl px-4 md:px-8">
		{#if windowWidth >= 768}
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
		{:else}
			<div class="relative z-10">
				<div
					class="timeline-line-vertical absolute top-0 bottom-0 left-8 z-0 w-0.5 bg-gradient-to-b from-transparent via-green-400 to-transparent"
				></div>

				{#each items as item, i}
					<div
						class="relative mb-8 flex transform items-start transition-all duration-500 hover:translate-x-1"
					>
						<div class="group absolute top-1.5 left-8 -translate-x-1/2 transform">
							<div
								class="flex h-5 w-5 items-center justify-center rounded-full border-2 border-green-500 bg-white transition-all duration-300 group-hover:border-green-600 group-hover:shadow-lg"
							>
								<div
									class="h-2.5 w-2.5 rounded-full border-2 border-green-500 bg-white transition-all duration-300 group-hover:bg-green-500"
								></div>
							</div>
							<div
								class="absolute -inset-1 rounded-full bg-green-400 opacity-0 group-hover:animate-ping"
							></div>
						</div>

						<div class="pl-16">
							<div class="mb-1 text-sm font-bold text-green-700">
								{item.year}
							</div>

							{#if mounted}
								<div
									in:fade={{ delay: i * 100, duration: 300 }}
									class="text-xs text-gray-700 transition-all duration-300 group-hover:text-gray-900"
								>
									{item.text}
								</div>
							{:else}
								<div class="text-xs text-gray-700 group-hover:text-gray-900">
									{item.text}
								</div>
							{/if}
						</div>
					</div>
				{/each}
			</div>
		{/if}
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

	@keyframes timeline-flow-vertical {
		0% {
			background-position: 0 -200%;
		}
		100% {
			background-position: 0 300%;
		}
	}

	.timeline-line {
		background-size: 200% 100%;
		animation: timeline-flow 8s linear infinite;
	}

	.timeline-line-vertical {
		background-size: 100% 200%;
		animation: timeline-flow-vertical 8s linear infinite;
	}
	.timeline-line,
	.timeline-line-vertical {
		box-shadow: 0 0 4px rgba(16, 185, 129, 0.3);
	}
</style>
