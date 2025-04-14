<script>
	const getCurrentMonth = () => {
		const months = [
			'Gennaio',
			'Febbraio',
			'Marzo',
			'Aprile',
			'Maggio',
			'Giugno',
			'Luglio',
			'Agosto',
			'Settembre',
			'Ottobre',
			'Novembre',
			'Dicembre'
		];
		return months[new Date().getMonth()];
	};
</script>

<section
	class="relative mb-0 w-full overflow-hidden bg-gradient-to-r from-green-500 via-teal-500 to-blue-500 pb-0 text-white"
>
	<div class="absolute top-0 left-0 w-full overflow-hidden">
		<svg
			class="relative block h-10 w-full"
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 1440 320"
			preserveAspectRatio="none"
		>
			<path
				fill="white"
				fill-opacity="1"
				d="M0,192L120,202.7C240,213,480,235,720,224C960,213,1200,171,1320,149.3L1440,128L1440,0L1320,0C1200,0,960,0,720,0C480,0,240,0,120,0L0,0Z"
			></path>
		</svg>
	</div>

	<div class="relative z-10 mx-auto max-w-5xl px-4 py-12 text-center">
		<div
			class="mb-6 inline-block transform rounded-2xl bg-white/95 p-3 shadow-xl transition-transform duration-300 hover:scale-105"
		>
			<div class="text-base font-bold text-green-600">{getCurrentMonth()}</div>
			<svg
				class="mx-auto mt-1 h-10 w-10 text-green-600"
				fill="none"
				viewBox="0 0 24 24"
				stroke="currentColor"
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="1.5"
					d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
				/>
			</svg>
		</div>

		<h2 class="mb-3 text-3xl font-bold text-white drop-shadow-md">Ecco l'evento di questo mese</h2>
		<p class="mx-auto mb-6 max-w-2xl text-base text-white">
			Non perdere il nostro evento speciale di <span class="font-semibold">{getCurrentMonth()}</span
			>. Abbiamo preparato contenuti esclusivi e opportunità di formazione che ti aiuteranno nel tuo
			percorso professionale.
		</p>

		<a
			href="https://womblab-landing-page.vercel.app/"
			target="_blank"
			class="inline-block transform rounded-full bg-white px-6 py-2 text-base font-bold text-green-600 shadow-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
		>
			Scopri l'evento
		</a>
	</div>
</section>

<style>
	section {
		margin-bottom: 0 !important;
		padding-bottom: 20px !important;
	}

	:global(body) {
		overflow-x: hidden;
		margin: 0;
		padding: 0;
	}

	:global(footer),
	:global(.footer) {
		margin-top: 0 !important;
	}
</style>
