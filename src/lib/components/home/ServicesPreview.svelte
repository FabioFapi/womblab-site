<section class="relative overflow-hidden bg-gradient-to-br from-white to-green-50 px-6 py-24">
	<div class="mx-auto max-w-6xl">
		<div class="reveal-title mb-16 text-center">
			<h2 class="relative inline-block text-4xl font-extrabold tracking-tight text-zinc-900">
				Cosa facciamo
				<span class="absolute -bottom-2 left-0 h-1 w-full rounded-full bg-green-500"></span>
			</h2>
		</div>

		<div class="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
			<!-- Ogni card -->
			{#each [{ icon: 'calendar', title: 'Eventi & Formazione', description: 'Organizzazione eventi ECM, corsi FAD, RES e workshop professionali per il settore medico e scientifico.', href: '/servizi/eventi-formazione' }, { icon: 'megaphone', title: 'Comunicazione & Branding', description: 'Grafica, progetti editoriali, siti web, strategie digitali e comunicazione integrata per il tuo brand.', href: '/servizi/comunicazione-branding' }, { icon: 'video-camera', title: 'Servizi Multimediali', description: 'Live streaming, teleconferenze, slide show e regia tecnica per eventi fisici e digitali.', href: '/servizi/multimedia' }] as service, i}
				<div
					class="service-card group relative flex flex-col overflow-hidden rounded-3xl border border-zinc-100 bg-white p-8 shadow-md transition-all hover:-translate-y-1 hover:shadow-xl"
					style="animation-delay: {i * 150}ms"
				>
					<div class="mb-6">
						<div
							class="flex h-16 w-16 items-center justify-center rounded-full bg-green-50 text-green-600 transition-all duration-500 group-hover:bg-green-600 group-hover:text-white"
						>
							<!-- Icone diverse se vuoi usare svgs -->
							{#if i === 0}
								<svg
									xmlns="http://www.w3.org/2000/svg"
									class="h-8 w-8"
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
							{:else if i === 1}
								<svg
									xmlns="http://www.w3.org/2000/svg"
									class="h-8 w-8"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
								>
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="1.5"
										d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
									/>
								</svg>
							{:else}
								<svg
									xmlns="http://www.w3.org/2000/svg"
									class="h-8 w-8"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
								>
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="1.5"
										d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
									/>
								</svg>
							{/if}
						</div>
					</div>

					<h3
						class="mb-3 text-2xl font-bold text-zinc-900 transition-colors duration-500 group-hover:text-green-600"
					>
						{service.title}
					</h3>
					<p class="mb-6 text-zinc-600">{service.description}</p>

					<a
						href={service.href}
						class="mt-auto inline-flex items-center gap-2 font-medium text-green-600 transition group-hover:underline"
					>
						Scopri di più
						<svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M14 5l7 7m0 0l-7 7m7-7H3"
							/>
						</svg>
					</a>

					<!-- Pattern decorativo -->
					<div
						class="absolute -top-16 -right-16 h-32 w-32 rounded-full bg-green-100 opacity-10 blur-2xl transition-all duration-500 group-hover:scale-150 group-hover:opacity-30"
					></div>
				</div>
			{/each}
		</div>
	</div>

	<!-- Sfondo decorativo -->
	<div
		class="animate-blob absolute -bottom-20 -left-20 -z-10 h-96 w-96 rounded-full bg-green-200 opacity-10 blur-3xl filter"
	></div>
	<div
		class="animate-blob animation-delay-3000 absolute -top-24 right-0 -z-10 h-72 w-72 rounded-full bg-blue-200 opacity-10 blur-3xl filter"
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

	.service-card {
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

	@keyframes blob {
		0% {
			transform: translate(0, 0) scale(1);
		}
		33% {
			transform: translate(30px, -50px) scale(1.1);
		}
		66% {
			transform: translate(-20px, 20px) scale(0.9);
		}
		100% {
			transform: translate(0, 0) scale(1);
		}
	}

	.animate-blob {
		animation: blob 20s infinite alternate;
	}

	.animation-delay-3000 {
		animation-delay: 3s;
	}
</style>
