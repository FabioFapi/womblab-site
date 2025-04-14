<script>
	import { fade, slide } from 'svelte/transition';
	import { onMount } from 'svelte';

	export let service;
	let openIndex = -1;
	let mounted = false;

	onMount(() => {
		mounted = true;
	});

	function toggleAccordion(index) {
		openIndex = openIndex === index ? -1 : index;
	}
</script>

<section class="mx-auto max-w-5xl px-6 py-12 md:py-24 ">
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
		<div in:fade={{ duration: 800, delay: 200 }}>
			<h1 class="text-center text-3xl font-bold text-black md:text-4xl lg:text-5xl">
				<span class="relative z-10 inline-block">
					{service.title}
					<span
						class="absolute bottom-2 left-0 -z-10 h-3 w-full -rotate-1 skew-x-3 transform bg-green-200"
					></span>
				</span>
			</h1>
			<div class="mb-8 h-1 w-24 rounded bg-green-500"></div>

			<div class="space-y-6">
				{#each service.configurations as config, i}
					<div
						class="overflow-hidden rounded-xl border border-green-500 shadow-sm transition-shadow duration-300 hover:shadow-md"
						in:fade={{ duration: 400, delay: 300 + i * 100 }}
					>
						<button
							class="flex w-full items-center justify-between bg-white px-6 py-4 text-left text-lg font-semibold transition-colors duration-300"
							on:click={() => toggleAccordion(i)}
							aria-expanded={openIndex === i}
							aria-controls={`content-${i}`}
						>
							<span class="text-green-600">{config.title}</span>
							<span
								class="text-green-600 transition-transform duration-300"
								style={openIndex === i ? 'transform: rotate(180deg)' : ''}
							>
								<svg
									class="h-5 w-5"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="2"
										d="M19 9l-7 7-7-7"
									></path>
								</svg>
							</span>
						</button>

						{#if openIndex === i}
							<div
								id={`content-${i}`}
								transition:slide={{ duration: 300 }}
								class="space-y-4 bg-white px-6 py-4 text-sm "
							>
								<div class="grid gap-4 md:grid-cols-2">
									<div class="rounded-lg bg-white p-4 ">
										<div class="mb-2 font-medium text-green-600">
											Tipo evento
										</div>
										<div>{config.tipoEvento}</div>
									</div>

									<div class="rounded-lg bg-white p-4 ">
										<div class="mb-2 font-medium text-green-600 ">
											Tempo d'installazione
										</div>
										<div>{config.tempoInstallazione}</div>
									</div>
								</div>

								<div class="rounded-lg bg-white p-4 ">
									<div class="mb-2 font-medium text-green-600 ">Descrizione</div>
									<div>{config.descrizione}</div>
								</div>

								<div class="rounded-lg bg-white p-4 ">
									<div class="mb-2 font-medium text-green-600 ">Materiale</div>
									<ul class="ml-5 list-disc space-y-1">
										{#each config.materiale as item}
											<li>{item}</li>
										{/each}
									</ul>
								</div>

								<div class="grid gap-4 md:grid-cols-2">
									<div
										class="rounded-lg bg-green-50 p-4 border-l-4 border-green-500"
									>
										<div class="mb-2 font-medium text-green-700 ">PRO</div>
										<div>{config.pro}</div>
									</div>

									<div
										class="rounded-lg bg-red-50 p-4 border-l-4 border-red-500"
									>
										<div class="mb-2 font-medium text-red-700 ">CONTRO</div>
										<div>{config.contro}</div>
									</div>
								</div>

								<div class="rounded-lg bg-white p-4 ">
									<div class="mb-2 font-medium text-gray-700 ">Note</div>
									<div>{config.note}</div>
								</div>

								<div class="mt-4 flex justify-end">
								</div>
							</div>
						{/if}
					</div>
				{/each}
			</div>
		</div>
	{/if}
</section>
