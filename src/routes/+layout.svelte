<script>
	import Header from '$lib/components/layout/Header.svelte';
	import Footer from '$lib/components/layout/Footer.svelte';
	import '../app.css';
</script>

<svelte:head>
	<title>Womblab | events & communication</title>
	<meta
		name="description"
		content="Organizziamo congressi nel settore medico-scientifico. Siamo Provider ECM. Creiamo eventi ad hoc. Ci occupiamo di formazione & comunicazione."
	/>
	<meta name="author" content="https://github.com/FabioFapi" />
	<link rel="canonical" href="https://www.womblab.com/" />
	<link rel="apple-touch-icon" sizes="180x180" href="/WombLab_favicon-32-32.png">
	<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
	<meta name="google-site-verification" content="abc123xyz..." />
	<meta name="apple-mobile-web-app-capable" content="yes">
	<meta name="apple-mobile-web-app-title" content="Womblab Events">
	<meta name="robots" content="max-image-preview:large" />
	<meta name="format-detection" content="telephone=no">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<meta
		name="keywords"
		content="PROMOZIONE, PROGETTAZIONE, ORGANIZZAZIONE ED EROGAZIONE DI ATTIVITÀ FORMATIVA ATTRAVERSO EVENTI, CONGRESSI E E CORSI FORMATIVI IN GENERALE ANCHE IN FORMA FAD,FORMAZIONE IN MEDICINA"
	/>
	<meta property="og:title" content="Womblab | events & communication" />
	<meta
		property="og:description"
		content="Organizziamo congressi nel settore medico-scientifico. Siamo Provider ECM. Creiamo eventi ad hoc. Ci occupiamo di formazione & comunicazione."
	/>
	<meta property="og:url" content="https://www.womblab.com/" />
	<meta property="og:type" content="website" />
	<meta property="og:site_name" name="og:site_name" content="Womblab" />
	<meta property="og:locale" name="og:locale" content="it" />
	<meta property="og:image" content="https://www.womblab.com/ogImage.png" />
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content="Womblab | events & communication" />
	<meta name="twitter:image" content="https://www.womblab.com/ogImage.png" />
	<meta
		name="twitter:description"
		content="Organizziamo congressi nel settore medico-scientifico. Siamo Provider ECM. Creiamo eventi ad hoc. Ci occupiamo di formazione & comunicazione."
	/>
</svelte:head>

<div class="flex min-h-screen flex-col bg-white text-black">
	<Header />

	<main class="flex-grow">
		<slot />
	</main>

	<Footer />
</div>
