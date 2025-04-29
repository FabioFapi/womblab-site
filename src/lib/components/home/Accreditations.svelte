<script>
	import { onMount } from 'svelte';

	// Dati delle certificazioni
	const certifications = [
		{
			label: 'Il nostro certificato ISO 9001:2020',
			button: 'Scopri di più',
			link: '/pdf/Certificato-ISO-WOMBLAB-9001-2020.pdf',
			imageSrc: '/img/loghi/iso.jpg',
			imageAlt: 'ISO 9001:2020'
		},
		{
			label: 'Il nostro certificato Rating ESG',
			button: 'Scopri di più',
			link: '/pdf/ATTESTATO RATING_ESG_PUNTEGGIO.pdf',
			imageSrc: '/img/loghi/esg.png',
			imageAlt: 'Rating ESG'
		},
		{
			label: 'Il nostro Codice Etico',
			button: 'Scopri di più',
			link: '/pdf/Womblab-CODICE-ETICO.pdf',
			svgIcon: true
		}
	];

	const associations = [
		{
			title: 'Associated with',
			logos: [
				{
					img: '/img/loghi/federcongressi.jpg',
					alt: 'Federcongressi'
				},
				{
					img: '/img/loghi/cogeaps.jpg',
					alt: 'Co.Ge.A.P.S.'
				}
			]
		},
		{
			title: 'In compliance with the code of',
			logos: [
				{
					img: '/img/loghi/medtech.png',
					alt: 'MedTech Europe'
				},
				{
					img: '/img/loghi/assobiomedica.png',
					alt: 'Assobiomedica'
				},
				{
					img: '/img/loghi/agenas.png',
					alt: 'Agenas'
				}
			]
		}
	];

	let visible = false;
	let mounted = false;

	onMount(() => {
		setTimeout(() => {
			visible = true;
			mounted = true;
		}, 100);
	});

	function handleHover(event, enter) {
		const card = event.currentTarget;
		if (enter) {
			card.style.transform = 'translateY(-8px)';
		} else {
			card.style.transform = 'translateY(0)';
		}
	}
</script>

<section class="relative overflow-hidden px-6 py-24">
	<div class="absolute top-0 left-0 w-full">
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 120" class="w-full">
			<path
				fill="#f8f8f8"
				fill-opacity="1"
				d="M0,64L80,53.3C160,43,320,21,480,21.3C640,21,800,43,960,53.3C1120,64,1280,64,1360,64L1440,64L1440,0L1360,0C1280,0,1120,0,960,0C800,0,640,0,480,0C320,0,160,0,80,0L0,0Z"
			></path>
		</svg>
	</div>

	<div class="container mx-auto max-w-6xl">
		<div class="mb-20 text-center">
			<h2 class="relative mb-6 inline-block text-4xl font-extrabold text-zinc-900">
				Our Certifications
				<span class="absolute -bottom-2 left-0 h-1 w-full rounded-full bg-green-500"></span>
			</h2>

			<div class="mt-16 grid gap-8 md:grid-cols-3">
				{#each certifications as cert, i}
					<div
						class="flex transform flex-col items-center rounded-4xl
 bg-white p-8 shadow-lg transition-all duration-500 ease-in-out"
						style="opacity: {mounted ? 1 : 0}; transform: translateY({mounted
							? 0
							: '40px'}); transition-delay: {i * 150}ms;"
						on:mouseenter={(e) => handleHover(e, true)}
						on:mouseleave={(e) => handleHover(e, false)}
					>
						{#if cert.svgIcon}
							<div class="mb-6 text-green-600">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 0 24 24"
									fill="currentColor"
									class="h-16 w-16"
								>
									<path
										fill-rule="evenodd"
										d="M4.5 3.75a3 3 0 00-3 3v10.5a3 3 0 003 3h15a3 3 0 003-3V6.75a3 3 0 00-3-3h-15zm4.125 3a2.25 2.25 0 100 4.5 2.25 2.25 0 000-4.5zm-3.873 8.703a4.126 4.126 0 017.746 0 .75.75 0 01-.351.92 7.47 7.47 0 01-3.522.877 7.47 7.47 0 01-3.522-.877.75.75 0 01-.351-.92zM15 8.25a.75.75 0 000 1.5h3.75a.75.75 0 000-1.5H15zM15 10.5a.75.75 0 000 1.5h3.75a.75.75 0 000-1.5H15zM15 12.75a.75.75 0 000 1.5h3.75a.75.75 0 000-1.5H15z"
										clip-rule="evenodd"
									/>
								</svg>
							</div>
						{:else}
							<div class="mb-6">
								<img src={cert.imageSrc} alt={cert.imageAlt} class="h-16 w-auto object-contain" />
							</div>
						{/if}

						<p class="mb-6 text-lg text-zinc-700">{cert.label}</p>
						<a
							href={cert.link}
							class="group inline-flex items-center rounded-full bg-green-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-green-700"
						>
							{cert.button}
							<svg
								xmlns="http://www.w3.org/2000/svg"
								class="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1"
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
						</a>
					</div>
				{/each}
			</div>
		</div>

		{#each associations as section, i}
			<div
				class="mb-16 text-center"
				style="opacity: {mounted ? 1 : 0}; transform: translateY({mounted
					? 0
					: '30px'}); transition: all 0.5s ease; transition-delay: {500 + i * 150}ms;"
			>
				<h3 class="mb-8 text-xl font-semibold text-zinc-900 uppercase">{section.title}</h3>
				<div
					class="flex flex-wrap items-center justify-center gap-16 rounded-4xl bg-white p-8 shadow-sm"
				>
					{#each section.logos as logo}
						<div class="transition-all duration-300 hover:scale-110">
							<img src={logo.img} alt={logo.alt} class="h-16 w-auto object-contain" />
						</div>
					{/each}
				</div>
			</div>
		{/each}
	</div>

	<div class="absolute bottom-0 left-0 w-full">
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 120" class="w-full">
			<path
				fill="#f8f8f8"
				fill-opacity="1"
				d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,48C1120,43,1280,53,1360,58.7L1440,64L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z"
			></path>
		</svg>
	</div>
</section>

<style>
	section {
		background-color: #f7f7f7;
		position: relative;
	}

	h2,
	h3 {
		font-family:
			system-ui,
			-apple-system,
			BlinkMacSystemFont,
			'Segoe UI',
			Roboto,
			sans-serif;
	}

	.container {
		transition: opacity 0.5s ease-in-out;
	}
</style>
