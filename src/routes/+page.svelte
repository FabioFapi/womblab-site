<script>
	import { onMount } from 'svelte';
	import Hero from '$lib/components/home/Hero.svelte';
	import EventoDelMese from '$lib/components/home/EventoDelMese.svelte';

	let ServicesPreview;
	let EventsCarousel;
	let Accreditations;
	let isComponentsLoaded = false;

	export let data;

	onMount(async () => {
		const [servicesModule, eventsModule, accModule] = await Promise.all([
			import('$lib/components/home/ServicesPreview.svelte'),
			import('$lib/components/home/EventsCarousel.svelte'),
			import('$lib/components/home/Accreditations.svelte'),
			import('$lib/components/home/EventoDelMese.svelte')
		]);

		ServicesPreview = servicesModule.default;
		EventsCarousel = eventsModule.default;
		Accreditations = accModule.default;
		isComponentsLoaded = true;
	});
</script>

<svelte:head>
	<script type="application/ld+json">
		{
			"@context": "https://schema.org",
			"@type": "WebSite",
			"name": "Womblab Events",
			"url": "https://womblab-events.vercel.app/",
			"publisher": {
				"@type": "Organization",
				"name": "Womblab",
				"url": "https://womblab-events.vercel.app",
				"logo": {
					"@type": "ImageObject",
					"url": "https://womblab-events.vercel.app/logo.png",
					"width": 300,
					"height": 100
				}
			},
			"potentialAction": {
				"@type": "SearchAction",
				"target": "https://womblab-events.vercel.app/search?q={search_term_string}",
				"query-input": "required name=search_term_string"
			}
		}
	</script>

	<script type="application/ld+json">
		{
			"@context": "https://schema.org",
			"@type": "Organization",
			"name": "Womblab",
			"url": "https://womblab-events.vercel.app",
			"logo": "https://womblab-events.vercel.app/logo.png",
			"contactPoint": {
				"@type": "ContactPoint",
				"telephone": "+39 011 4336307",
				"contactType": "customer service",
				"areaServed": "IT",
				"availableLanguage": ["Italian", "English"]
			},
			"sameAs": [
				"https://www.facebook.com/womblabto?locale=it_IT",
				"https://www.instagram.com/womblab?igsh=MWw5MzJkZHV3eWlvZA==",
				"https://www.linkedin.com/company/womblab-events-communication/"
			]
		}
	</script>
</svelte:head>

<Hero />

{#if isComponentsLoaded}
	<ServicesPreview />
	<Accreditations />
	<EventsCarousel events={data.events} />
	<EventoDelMese />
{:else}
	<div class="min-h-[200px]"></div>
	<div class="min-h-[150px]"></div>
	<div class="min-h-[300px]"></div>
{/if}
