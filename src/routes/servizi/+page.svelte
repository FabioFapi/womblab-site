<script>
	import { onMount } from 'svelte';
	import { fly } from 'svelte/transition';
	import { browser } from '$app/environment';

	const services = [
		{
			slug: 'eventi-formazione',
			title: 'Eventi & Formazione',
			description: 'Organizzazione eventi ECM, corsi FAD e RES.',
			image: '/img/servizi/eventi.png',
			icon: 'calendar'
		},
		{
			slug: 'comunicazione-branding',
			title: 'Comunicazione & Branding',
			description: 'Grafica, progetti editoriali e strategie digitali.',
			image: '/img/servizi/comunicazione.png',
			icon: 'megaphone'
		},
		{
			slug: 'multimedia',
			title: 'Servizi Multimediali',
			description: 'Live streaming, teleconferenze e regia tecnica.',
			image: '/img/servizi/multimedia.png',
			icon: 'video-camera'
		}
	];

	let visible = false;
	let container;
	let observer;

	onMount(() => {
		if (browser) {
			observer = new IntersectionObserver(
				(entries) => {
					if (entries[0].isIntersecting) {
						visible = true;
						observer.disconnect();
					}
				},
				{ threshold: 0.2 }
			);

			if (container) {
				observer.observe(container);
			}
			setupCardAnimations();
		}

		return () => {
			if (observer) observer.disconnect();
		};
	});

	function setupCardAnimations() {
		const cards = document.querySelectorAll('.service-card');
		const cardsObserver = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry, i) => {
					if (entry.isIntersecting) {
						setTimeout(() => {
							entry.target.classList.add('opacity-100', 'translate-y-0');
							entry.target.classList.remove('opacity-0', 'translate-y-8');
						}, i * 150);
						cardsObserver.unobserve(entry.target);
					}
				});
			},
			{ threshold: 0.1 }
		);

		cards.forEach((card) => {
			cardsObserver.observe(card);
		});
	}
</script>

<svelte:head>
	<script type="application/ld+json">
		{
			"@context": "https://schema.org",
			"@type": "WebPage",
			"name": "Servizi",
			"url": "https://womblab-events.vercel.app/servizi",
			"description": "I servizi offerti da Womblab includono eventi ECM, comunicazione e soluzioni multimediali.",
			"mainEntity": {
				"@type": "ItemList",
				"itemListElement": [
					{
						"@type": "Service",
						"name": "Eventi & Formazione",
						"description": "Organizzazione eventi ECM, corsi FAD e RES.",
						"url": "https://womblab-events.vercel.app/servizi/eventi-formazione"
					},
					{
						"@type": "Service",
						"name": "Comunicazione & Branding",
						"description": "Grafica, progetti editoriali e strategie digitali.",
						"url": "https://womblab-events.vercel.app/servizi/comunicazione-branding"
					},
					{
						"@type": "Service",
						"name": "Servizi Multimediali",
						"description": "Live streaming, teleconferenze e regia tecnica.",
						"url": "https://womblab-events.vercel.app/servizi/multimedia"
					}
				]
			}
		}
	</script>
</svelte:head>

<section
	class="relative mx-auto max-w-6xl overflow-hidden bg-white px-6 py-24 text-green-700"
	bind:this={container}
>
	{#if visible}
		<div in:fly={{ y: 30, duration: 800, delay: 200 }}>
			<h1 class="text-center text-3xl font-bold text-black md:text-4xl lg:text-5xl">
				<span class="relative z-10 inline-block">
					Servizi
					<span
						class="absolute bottom-2 left-0 -z-10 h-3 w-full -rotate-1 skew-x-3 transform bg-green-200"
					></span>
				</span>
			</h1>
			<div class="mx-auto mb-16 h-1 w-24 rounded-full"></div>
		</div>
	{/if}

	<div class="grid gap-8 sm:grid-cols-2 md:grid-cols-3">
		{#each services as service, i}
			<a
				href={`/servizi/${service.slug}`}
				class="service-card block translate-y-8 transform overflow-hidden rounded-xl border border-gray-100 bg-white opacity-0 shadow-sm transition-all duration-500 ease-out hover:-translate-y-2 hover:shadow-lg"
			>
				<div class="relative overflow-hidden">
					{#if service.image}
						<div
							class="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
						></div>
						<img
							src={service.image}
							alt={service.title}
							class="h-56 w-full transform object-cover transition-transform duration-700 ease-in-out hover:scale-110"
						/>
						<div
							class="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 hover:opacity-100"
						>
							<div
								class="backdrop-green-md flex h-16 w-16 items-center justify-center rounded-full bg-white/70"
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									class="h-8 w-8 text-green-600"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
								>
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="2"
										d="M9 5l7 7-7 7"
									/>
								</svg>
							</div>
						</div>
					{/if}
				</div>

				<div class="bg-white p-6">
					<h3
						class="mb-3 text-xl font-bold transition-colors duration-300 group-hover:text-green-600"
					>
						{service.title}
					</h3>
					<p class="mb-4 text-gray-600">{service.description}</p>
					<div class="flex items-center font-medium text-green-600">
						<span>Scopri di più</span>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							class="ml-2 h-5 w-5 transform transition-transform group-hover:translate-x-1"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M14 5l7 7m0 0l-7 7m7-7H3"
							/>
						</svg>
					</div>
				</div>
			</a>
		{/each}
	</div>
</section>

<style global>
	@keyframes blob {
		0% {
			transform: translate(0px, 0px) scale(1);
		}
		33% {
			transform: translate(30px, -50px) scale(1.1);
		}
		66% {
			transform: translate(-20px, 20px) scale(0.9);
		}
		100% {
			transform: translate(0px, 0px) scale(1);
		}
	}

	.animate-blob {
		animation: blob 12s infinite alternate;
	}

	.animation-delay-2000 {
		animation-delay: 2s;
	}
	.animation-delay-4000 {
		animation-delay: 4s;
	}
</style>
