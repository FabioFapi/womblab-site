<script>
	import Header from '$lib/components/layout/Header.svelte';
	import BottomNav from '$lib/components/layout/BottomNav.svelte';
	import '../app.css';
</script>

<svelte:head>
	<title>Womblab | events & communication</title>
	<meta name="description" content="Organizziamo congressi nel settore medico-scientifico. Siamo Provider ECM. Creiamo eventi ad hoc. Ci occupiamo di formazione & comunicazione." />
	<meta name="viewport" content="width=device-width, initial-scale=1" />
	<meta name="apple-mobile-web-app-capable" content="yes" />
	<meta name="apple-mobile-web-app-title" content="Womblab Events" />
	<meta name="format-detection" content="telephone=no" />
	<meta name="robots" content="max-image-preview:large" />
</svelte:head>

<div class="flex flex-col min-h-screen bg-white text-black">
	<Header />
	<main class="flex-grow ">
		<slot />
	</main>
	<BottomNav />
</div>
