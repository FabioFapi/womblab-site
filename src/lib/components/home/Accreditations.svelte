<script>
	import { fade, fly, scale } from 'svelte/transition';
	import { spring } from 'svelte/motion';

	const items = [
		{
			title: 'Associated with',
			logo: '/img/loghi/federcongressi.jpg',
			text: 'Associazione nazionale delle imprese pubbliche, private e dei professionisti della meeting industry italiana.'
		},
		{
			title: '',
			logo: '/img/loghi/cogeaps.jpg',
			text: 'Per poter visualizzare la propria posizione ECM, è possibile consultare il sito Co.Ge.A.P.S.'
		},
		{
			title: 'In the respect of the code of',
			logo: '/img/loghi/assobiomedica.png',
			text: 'Womblab opera secondo il nuovo CODICE ETICO di Assobiomedica nel rispetto dei requisiti organizzativi degli eventi formativi: sobrietà, trasparenza e integrità. Visualizza il documento del SISTEMA DI VALUTAZIONE delle CONFERENZE e il CODICE ETICO: <a href="https://svc.assobiomedica.it" class="text-green-600 underline hover:text-green-800 transition-colors">svc.assobiomedica.it</a>'
		},
		{
			title: '',
			logo: '/img/loghi/medtech.png',
			text: 'MedTech Europe – from diagnosis to cure'
		}
	];

	// Variabile per animazione al caricamento
	let visible = false;

	// Configurazione spring per effetto hover
	const scaleHover = spring({ x: 1, y: 1 });

	// Simulare il mounting del componente
	setTimeout(() => {
		visible = true;
	}, 100);
</script>

<section class="bg-white px-6 py-24">
	<div class="mx-auto max-w-6xl text-center">
		<h2
			class="relative mb-24 inline-block text-4xl font-extrabold tracking-tight text-zinc-900"
			in:fade={{ delay: 150, duration: 700 }}
		>
			Accreditamenti e Associazioni
			<span class="absolute -bottom-2 left-0 h-1 w-full rounded-full bg-green-500"></span>
		</h2>

		<div class="mt-16 grid grid-cols-1 gap-12 text-sm text-zinc-700 md:grid-cols-2">
			{#each items as item, i}
				{#if visible}
					<div
						class="card space-y-4 rounded-lg bg-zinc-50/50 px-6 py-6"
						in:fly={{
							y: 30,
							delay: 200 + i * 150,
							duration: 700,
							easing: (t) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t))
						}}
					>
						{#if item.title}
							<h4
								class="text-sm font-medium tracking-wide text-zinc-500 uppercase"
								in:fade={{ delay: 350 + i * 150, duration: 500 }}
							>
								{item.title}
							</h4>
						{/if}

						{#if item.logo}
							<div class="logo-container">
								<img
									src={item.logo}
									alt={item.title}
									class="mx-auto max-h-12 object-contain transition-all duration-500 hover:scale-110"
									in:scale={{
										delay: 450 + i * 150,
										duration: 500,
										start: 0.9,
										opacity: 0
									}}
								/>
							</div>
						{/if}

						<div class="divider mx-auto h-0.5 w-8 bg-zinc-200"></div>

						<p
							class="text-sm leading-relaxed text-zinc-600"
							in:fade={{ delay: 550 + i * 150, duration: 500 }}
						>
							{@html item.text}
						</p>
					</div>
				{/if}
			{/each}
		</div>
	</div>
</section>

<style>
	.card {
		transition:
			transform 0.3s ease,
			box-shadow 0.3s ease;
	}

	.card:hover {
		transform: translateY(-5px);
		box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1);
	}

	.logo-container {
		height: 80px;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.divider {
		transition: width 0.3s ease;
	}

	.card:hover .divider {
		width: 60px;
	}
</style>
