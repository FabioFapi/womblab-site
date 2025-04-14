<script>
	export let events = [];
	const formatDate = (dateString) => {
		const parsed = new Date(dateString);
		if (!isNaN(parsed)) {
			const options = { day: 'numeric', month: 'short', year: 'numeric' };
			return parsed.toLocaleDateString('it-IT', options);
		}
		return dateString;
	};
	const filteredEvents = events
		.filter((e) => e.tipo !== 'grandi-eventi' && !isNaN(new Date(e.date)))
		.sort((a, b) => new Date(a.date) - new Date(b.date))
		.slice(0, 3);

	// Ottiene il nome del mese corrente in italiano
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
	class="relative overflow-hidden bg-gradient-to-br from-green-50 via-white to-blue-50 px-6 py-24"
>
	<div class="mx-auto max-w-6xl">
		<div class="reveal-title mb-16 text-center">
			<h2 class="relative inline-block text-4xl font-extrabold tracking-tight text-zinc-900">
				Eventi in evidenza
				<span
					class="absolute -bottom-2 left-0 h-1.5 w-full rounded-full bg-gradient-to-r from-green-400 to-green-600"
				></span>
			</h2>
		</div>

		{#if events.length === 0}
			<div
				class="fade-in mx-auto max-w-3xl rounded-2xl border border-zinc-100 bg-white p-12 text-center text-zinc-700 shadow-xl"
			>
				<div
					class="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-green-50"
				>
					<svg
						class="h-10 w-10 text-green-500"
						xmlns="http://www.w3.org/2000/svg"
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
				<p class="text-2xl font-bold text-zinc-800">Nessun evento disponibile</p>
				<p class="mt-3 text-zinc-500">Torna presto per scoprire i nostri prossimi appuntamenti!</p>
			</div>
		{:else}
			<div class="event-grid grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
				{#each filteredEvents as event, i}
					<div
						class="group event-card flex flex-col overflow-hidden rounded-2xl bg-white shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
						style="animation-delay: {i * 120}ms"
					>
						{#if event.image}
							<div class="relative h-56 overflow-hidden">
								<img
									src={event.image}
									alt={event.title}
									class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
								/>
								<div
									class="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
								></div>
								{#if event.ecm && String(event.ecm).trim() !== '' && !isNaN(Number(event.ecm))}
									<span
										class="absolute top-4 right-4 rounded-full bg-white px-3 py-1 text-xs font-bold text-green-600 shadow-lg"
									>
										{event.ecm} ECM
									</span>
								{/if}
							</div>
						{:else}
							<div class="relative h-24 bg-gradient-to-r from-green-400 to-blue-400">
								{#if event.ecm && String(event.ecm).trim() !== '' && !isNaN(Number(event.ecm))}
									<span
										class="absolute top-4 right-4 rounded-full bg-white px-3 py-1 text-xs font-bold text-green-600 shadow-lg"
									>
										{event.ecm} ECM
									</span>
								{/if}
							</div>
						{/if}

						<div class="flex flex-1 flex-col p-6">
							<div class="mb-4 flex flex-wrap items-center gap-3 text-sm">
								<div class="flex items-center rounded-full bg-zinc-100 px-3 py-1 text-zinc-700">
									<svg
										class="mr-1.5 h-3.5 w-3.5 text-green-500"
										fill="none"
										viewBox="0 0 24 24"
										stroke="currentColor"
									>
										<path
											stroke-linecap="round"
											stroke-linejoin="round"
											stroke-width="2"
											d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
										/>
									</svg>
									{formatDate(event.date)}
								</div>
								<div class="flex items-center rounded-full bg-zinc-100 px-3 py-1 text-zinc-700">
									<svg
										class="mr-1.5 h-3.5 w-3.5 text-green-500"
										fill="none"
										viewBox="0 0 24 24"
										stroke="currentColor"
									>
										<path
											stroke-linecap="round"
											stroke-linejoin="round"
											stroke-width="2"
											d="M17.657 16.657L13.414 20.9a2 2 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
										/>
										<path
											stroke-linecap="round"
											stroke-linejoin="round"
											stroke-width="2"
											d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
										/>
									</svg>
									{event.location}
								</div>
							</div>

							<h3 class="mb-3 line-clamp-2 text-xl font-bold text-zinc-800">{event.title}</h3>

							<p class="mb-5 line-clamp-3 text-sm text-zinc-600">
								{event.description}
							</p>

							<div class="mt-auto pt-4">
								<a
									href={`/eventi/${event.id}`}
									class="group/btn flex w-full items-center justify-center rounded-full bg-gradient-to-r from-green-500 to-green-600 px-5 py-3 text-sm font-semibold text-white shadow-lg transition-all duration-300 hover:from-green-600 hover:to-green-700 hover:shadow-green-200/50"
								>
									<span class="relative z-10">Scopri di più</span>
									<svg
										class="ml-2 h-4 w-4 transform transition-transform duration-300 group-hover/btn:translate-x-1"
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
						</div>
					</div>
				{/each}
			</div>
		{/if}
	</div>

	<!-- Sezione evento del mese (completamente riprogettata) -->
	<div class="monthly-event-wrapper mx-auto mt-24 max-w-4xl">
		<div
			class="featured-spotlight relative overflow-hidden rounded-3xl bg-gradient-to-r from-green-600/90 to-blue-600/90 shadow-2xl"
		>
			<!-- Pattern decorativo -->
			<div class="absolute inset-0 opacity-10">
				<svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
					<defs>
						<pattern id="smallGrid" width="20" height="20" patternUnits="userSpaceOnUse">
							<path d="M 20 0 L 0 0 0 20" fill="none" stroke="white" stroke-width="0.5" />
						</pattern>
					</defs>
					<rect width="100%" height="100%" fill="url(#smallGrid)" />
				</svg>
			</div>

			<div class="relative z-10 flex flex-col items-center p-6 md:flex-row md:p-10">
				<!-- Icona calendario animata -->
				<div class="featured-icon mb-6 flex-shrink-0 md:mr-8 md:mb-0">
					<div
						class="calendar-icon relative h-24 w-24 overflow-hidden rounded-2xl bg-white shadow-lg md:h-32 md:w-32"
					>
						<div class="flex h-8 items-center justify-center bg-green-500 md:h-10">
							<span class="text-sm font-bold text-white md:text-base">{getCurrentMonth()}</span>
						</div>
						<div class="flex h-full items-center justify-center">
							<svg
								class="h-12 w-12 text-green-500 md:h-16 md:w-16"
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
						<div
							class="pulse-circle absolute inset-0 rounded-2xl border-4 border-white opacity-0"
						></div>
					</div>
				</div>

				<!-- Contenuto -->
				<div class="flex-1 text-center text-white md:text-left">
					<h2 class="mb-2 text-2xl font-bold md:mb-4 md:text-3xl">Ecco l'evento di questo mese</h2>
					<p class="mb-6 max-w-lg text-sm text-white/80 md:mb-8 md:text-base">
						Non perdere il nostro evento speciale di {getCurrentMonth()}. Abbiamo preparato
						contenuti esclusivi e opportunità di formazione che ti aiuteranno nel tuo percorso
						professionale.
					</p>

					<a
						href="https://womblab-landing-page.vercel.app/"
						target="_blank"
						class="featured-button inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-bold text-green-600 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:outline-none md:px-8 md:py-4 md:text-base"
					>
						<span class="flex items-center">
							Scopri l'evento
							<svg
								class="ml-2 h-5 w-5 transition-all duration-300"
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
						</span>
					</a>
				</div>
			</div>

			<!-- Elementi decorativi -->
			<div
				class="absolute top-0 right-0 h-40 w-40 translate-x-1/4 -translate-y-1/2 rounded-full bg-white/5"
			></div>
			<div
				class="absolute bottom-0 left-0 h-24 w-24 -translate-x-1/3 translate-y-1/3 rounded-full bg-white/5"
			></div>
		</div>
	</div>

	<!-- Decorazioni animate di sfondo migliorate -->
	<div
		class="animate-blob absolute -top-24 -left-16 -z-10 h-96 w-96 rounded-full bg-green-200 opacity-20 blur-3xl filter"
	></div>
	<div
		class="animate-blob animation-delay-2000 absolute top-1/2 left-1/4 -z-10 h-64 w-64 rounded-full bg-blue-300 opacity-15 blur-3xl filter"
	></div>
	<div
		class="animate-blob animation-delay-4000 absolute right-10 -bottom-16 -z-10 h-96 w-96 rounded-full bg-blue-200 opacity-20 blur-3xl filter"
	></div>
</section>

<style>
	.reveal-title {
		opacity: 0;
		transform: translateY(20px);
		animation: reveal 0.8s ease forwards;
	}
	@keyframes reveal {
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	.event-card {
		opacity: 0;
		transform: translateY(30px);
		animation: fadeUp 0.6s ease forwards;
	}
	@keyframes fadeUp {
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	.fade-in {
		opacity: 0;
		animation: fadeIn 1s ease forwards;
	}
	@keyframes fadeIn {
		to {
			opacity: 1;
		}
	}

	.monthly-event-wrapper {
		opacity: 0;
		transform: translateY(40px);
		animation: fadeUp 0.8s ease forwards 0.3s;
	}

	.featured-spotlight {
		animation: softGlow 4s infinite alternate;
	}

	@keyframes softGlow {
		0% {
			box-shadow: 0 10px 30px -5px rgba(16, 185, 129, 0.3);
		}
		100% {
			box-shadow: 0 20px 40px 0px rgba(59, 130, 246, 0.4);
		}
	}

	.featured-icon {
		animation: floatIcon 6s ease-in-out infinite;
	}

	@keyframes floatIcon {
		0%,
		100% {
			transform: translateY(0);
		}
		50% {
			transform: translateY(-10px);
		}
	}

	.pulse-circle {
		animation: pulseCircle 3s infinite;
	}

	@keyframes pulseCircle {
		0% {
			transform: scale(0.95);
			opacity: 0.7;
		}
		50% {
			transform: scale(1.1);
			opacity: 0;
		}
		100% {
			transform: scale(0.95);
			opacity: 0.7;
		}
	}

	.featured-button {
		position: relative;
		overflow: hidden;
	}

	.featured-button::after {
		content: '';
		position: absolute;
		top: 0;
		left: -100%;
		width: 100%;
		height: 100%;
		background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
		transition: 0.5s;
	}

	.featured-button:hover::after {
		left: 100%;
	}

	@keyframes blob {
		0% {
			transform: scale(1) translate(0, 0);
		}
		33% {
			transform: scale(1.1) translate(30px, -50px);
		}
		66% {
			transform: scale(0.9) translate(-20px, 20px);
		}
		100% {
			transform: scale(1) translate(0, 0);
		}
	}

	.animate-blob {
		animation: blob 20s infinite alternate;
	}

	.animation-delay-2000 {
		animation-delay: 2s;
	}

	.animation-delay-4000 {
		animation-delay: 4s;
	}
</style>
