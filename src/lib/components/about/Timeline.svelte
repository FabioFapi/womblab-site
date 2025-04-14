<script>
	// Timeline.svelte - un componente che mostra la timeline dell'azienda
	export let items = [];

	let activeItem = null;

	function setActive(index) {
		activeItem = index;
	}

	function clearActive() {
		activeItem = null;
	}
</script>

<div class="relative ml-4 space-y-10 border-l-4 border-green-400 pl-6">
	{#each items as item, i}
		<div
			class="timeline-item relative"
			on:mouseenter={() => setActive(i)}
			on:mouseleave={() => clearActive()}
		>
			<!-- Cerchietto migliorato -->
			<div
				class="timeline-dot absolute top-0 -left-8 flex items-center justify-center"
				class:timeline-dot-active={activeItem === i}
				class:pulse-animation={activeItem === i}
				style="width: {activeItem === i ? '18px' : '16px'}; 
							 height: {activeItem === i ? '18px' : '16px'}; 
							 background-color: {activeItem === i ? '#059669' : '#10B981'};
							 border: 2px solid white; 
							 border-radius: 9999px;
							 z-index: 10;
							 box-shadow: 0 2px 4px rgba(0,0,0,0.1);"
			></div>

			<div class="timeline-content pb-6 pl-2" class:timeline-content-active={activeItem === i}>
				<p class="mb-1 text-sm font-bold text-green-600">{item.year}</p>
				<p class="text-zinc-800">{item.text}</p>

				{#if activeItem === i}
					<div class="mt-2 text-xs text-green-500 opacity-75">
						Un momento importante della nostra storia
					</div>
				{/if}
			</div>
		</div>
	{/each}
</div>

<style>
	.timeline-item {
		transition: all 0.3s ease;
	}

	.timeline-item:hover {
		transform: translateY(-2px);
	}

	.timeline-dot {
		transition: all 0.3s ease;
	}

	.timeline-dot-active {
		transform: scale(1.4);
	}

	.timeline-content {
		transition: all 0.3s ease;
	}

	.timeline-content-active {
		box-shadow:
			0 10px 15px -3px rgba(0, 0, 0, 0.1),
			0 4px 6px -2px rgba(0, 0, 0, 0.05);
	}

	@keyframes pulseGlow {
		0% {
			box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.4);
		}
		70% {
			box-shadow: 0 0 0 10px rgba(16, 185, 129, 0);
		}
		100% {
			box-shadow: 0 0 0 0 rgba(16, 185, 129, 0);
		}
	}

	.pulse-animation {
		animation: pulseGlow 2s infinite;
	}
</style>
