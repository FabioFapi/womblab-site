<script>
	import { onMount } from 'svelte';
	import { fade, fly } from 'svelte/transition';
	import { cubicOut } from 'svelte/easing';

	export let service;
	let mounted = false;
	let activeIndex = -1;
	let statsVisible = false;

	onMount(() => {
		mounted = true;
		setTimeout(() => {
			statsVisible = true;
		}, 500);
	});

	function animateBar(node, { duration }) {
		return {
			duration,
			css: (t) => `width: ${t * 100}%;`
		};
	}

	function handleMediaHover(index) {
		activeIndex = index;
	}

	function handleMediaLeave() {
		activeIndex = -1;
	}
</script>

<section class="mx-auto max-w-6xl bg-white px-6 py-16 text-green-600 md:py-24">
	<a
		href="/servizi"
		class="group mb-6 inline-flex items-center text-sm text-green-600 transition-colors duration-300 hover:text-green-800"
	>
		<svg
			class="mr-2 h-4 w-4 transform transition-transform duration-300 group-hover:-translate-x-1"
			fill="none"
			stroke="currentColor"
			viewBox="0 0 24 24"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"
			></path>
		</svg>
		Torna ai servizi
	</a>
	{#if mounted}
		<div in:fade={{ duration: 800 }}>
			<h1 class="text-center text-3xl font-bold md:text-4xl lg:text-5xl text-black">
				<span class="relative z-10 inline-block">
					{service.title}
					<span
						class="absolute bottom-2 left-0 -z-10 h-3 w-full -rotate-1 skew-x-3 transform bg-green-200"
					></span>
				</span>
			</h1>
			
			<div class="mt-4 mb-12 h-1 w-16 bg-green-500"></div>

			<div class="mb-16 grid grid-cols-1 gap-12 md:grid-cols-2">
				<div in:fly={{ y: 20, duration: 800, delay: 300 }}>
					<p class="text-lg leading-relaxed whitespace-pre-line text-black">
						{service.description}
					</p>
				</div>

				<div class="space-y-6 rounded-xl bg-green-50 p-6 shadow-sm">
					<div in:fade={{ duration: 400, delay: 500 }} class="mb-4">
						<h3 class="mb-4 text-lg font-medium text-green-800">Service Performance</h3>
					</div>

					{#if statsVisible}
						{#each service.stats as s, i}
							<div in:fly={{ y: 20, duration: 500, delay: 600 + i * 200 }}>
								<div class="mb-2 flex justify-between text-sm font-medium">
									<span class="text-black">{s.label}</span>
									<span class="font-semibold text-black">{s.value}%</span>
								</div>
								<div class="h-3 w-full overflow-hidden rounded-full bg-green-200">
									<div
										class="h-3 rounded-full bg-gradient-to-r from-green-500 to-green-600"
										style="width: {s.value}%"
										use:animateBar={{ duration: 1500 }}
									></div>
								</div>
							</div>
						{/each}
					{/if}
				</div>
			</div>

			<div class="border-t border-green-200 pt-12">
				<div in:fade={{ duration: 800, delay: 1000 }} class="mb-8">
					<h2 class="mb-2 text-2xl font-semibold">Media Channels</h2>
					<p class="text-black">Our trusted partners and platforms</p>
				</div>

				<div class="flex flex-wrap items-center justify-center gap-8 md:justify-start">
					{#each service.media as m, i}
						<a
							href={m.url}
							target="_blank"
							class="group relative block rounded-lg p-4 transition-all duration-300 hover:bg-zinc-100"
							on:mouseenter={() => handleMediaHover(i)}
							on:mouseleave={handleMediaLeave}
							in:fly={{ y: 20, duration: 600, delay: 1200 + i * 150 }}
						>
							<img
								src={m.logo}
								alt={m.name}
								class="h-12 object-contain transition-transform duration-300 group-hover:scale-110 md:h-16"
							/>

							{#if activeIndex === i}
								<div
									transition:fade={{ duration: 200 }}
									class="absolute -bottom-8 left-1/2 -translate-x-1/2 transform rounded bg-zinc-800 px-3 py-1 text-xs whitespace-nowrap text-white"
								>
									{m.name}
								</div>
							{/if}
						</a>
					{/each}
				</div>
			</div>

			<div class="mt-16 flex justify-center md:justify-end">
				<button
					class="flex transform items-center space-x-2 rounded-lg bg-green-600 px-6 py-3 text-white shadow-md transition-all duration-300 hover:-translate-y-1 hover:bg-blue-700 hover:shadow-lg"
					in:fade={{ duration: 600, delay: 1600 }}
				>
					<span>Contact our team</span>
					<svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M14 5l7 7m0 0l-7 7m7-7H3"
						/>
					</svg>
				</button>
			</div>
		</div>
	{/if}
</section>
