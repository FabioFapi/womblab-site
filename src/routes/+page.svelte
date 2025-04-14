<script>
	import { onMount } from 'svelte';
	import Hero from '$lib/components/home/Hero.svelte';
	import EventoDelMese from '$lib/components/home/EventoDelMese.svelte';

	// Lazy loading dei componenti non immediatamente visibili
	let ServicesPreview;
	let EventsCarousel;
	let Accreditations;
	let isComponentsLoaded = false;

	export let data;

	onMount(async () => {
		// Importa i componenti solo dopo che la pagina principale è caricata
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

<!-- Mostra sempre l'hero section immediatamente -->
<Hero />

<!-- Carica in modo condizionale gli altri componenti -->
{#if isComponentsLoaded}
	<ServicesPreview />
	<Accreditations />
	<EventsCarousel events={data.events} />
	<EventoDelMese />
{:else}
	<!-- Segnaposto leggeri per mantenere il layout mentre i componenti si caricano -->
	<div class="min-h-[200px]"></div>
	<div class="min-h-[150px]"></div>
	<div class="min-h-[300px]"></div>
{/if}
