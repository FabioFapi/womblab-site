<script>
	import { onMount } from 'svelte';
	import { fade, fly, slide } from 'svelte/transition';
	import ContactForm from '$lib/components/form/ContactForm.svelte';

	let isVisible = false;
	let mapLoaded = false;

	// Intersezione Observer per animazioni on-scroll
	onMount(() => {
		isVisible = true;

		// Piccolo ritardo per assicurarsi che il DOM sia caricato
		setTimeout(() => {
			// Setup dell'observer per la mappa
			const observer = new IntersectionObserver(
				(entries) => {
					entries.forEach((entry) => {
						if (entry.isIntersecting) {
							mapLoaded = true;
							observer.unobserve(entry.target);
						}
					});
				},
				{ threshold: 0.2 }
			);

			const mapContainer = document.getElementById('map-container');
			if (mapContainer) {
				observer.observe(mapContainer);
			}
		}, 100);
	});
</script>

<section class="contact-section mx-auto max-w-5xl bg-white px-6 py-16 text-zinc-800 md:py-24">
	{#if isVisible}
		<div in:fly={{ y: 20, duration: 800 }} class="relative mb-16">
			<h1 class="text-center text-3xl font-bold md:text-4xl lg:text-5xl">
				<span class="relative z-10 inline-block">
					Contattaci
					<span
						class="absolute bottom-2 left-0 -z-10 h-3 w-full -rotate-1 skew-x-3 transform bg-green-200"
					></span>
				</span>
			</h1>
			<p class="mx-auto mt-4 max-w-xl text-center text-black">
				Siamo a tua disposizione per qualsiasi informazione o richiesta. Compila il form sottostante
				o contattaci utilizzando i recapiti diretti.
			</p>
		</div>

		<div class="grid items-start gap-12 md:grid-cols-2">
			<div
				in:fly={{ x: -20, duration: 800, delay: 200 }}
				class="contact-info-card relative overflow-hidden rounded-xl border border-green-100 bg-white p-8 shadow-md"
			>
				<div
					class="absolute top-0 right-0 z-0 -mt-20 -mr-20 h-40 w-40 rounded-full bg-green-100"
				></div>
				<div class="relative z-10">
					<h2 class="mb-6 flex items-center text-xl font-semibold">
						<span class="mr-3 flex h-10 w-10 items-center justify-center rounded-full bg-green-100">
							<svg class="h-5 w-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
								<path
									d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"
								/>
							</svg>
						</span>
						Informazioni di contatto
					</h2>

					<div class="space-y-6">
						<div class="contact-item animate-item flex items-start">
							<div
								class="icon-container mr-4 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-green-100"
							>
								<svg class="h-5 w-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
									<path
										fill-rule="evenodd"
										d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
										clip-rule="evenodd"
									></path>
								</svg>
							</div>
							<div>
								<h3 class="text-sm font-medium text-black">Indirizzo</h3>
								<p class="mt-1">Corso Vittorio Emanuele II, 103<br />10128 Torino</p>
							</div>
						</div>

						<div class="contact-item animate-item flex items-start">
							<div
								class="icon-container mr-4 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-green-100"
							>
								<svg class="h-5 w-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
									<path
										d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"
									></path>
								</svg>
							</div>
							<div>
								<h3 class="text-sm font-medium text-black">Telefono</h3>
								<p class="mt-1 transition-colors hover:text-green-600">
									<a href="tel:+390111234567">+39 011 4336307</a>
								</p>
							</div>
						</div>

						<div class="contact-item animate-item flex items-start">
							<div
								class="icon-container mr-4 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-green-100"
							>
								<svg class="h-5 w-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
									<path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"
									></path>
									<path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path>
								</svg>
							</div>
							<div>
								<h3 class="text-sm font-medium text-black">Email</h3>
								<p class="mt-1">
									<a
										href="mailto:segreteria@womblab.com"
										class="text-black transition-all hover:text-green-600"
									>
									segreteria@womblab.com
									</a>
								</p>
							</div>
						</div>

						<div class="contact-item animate-item flex items-start">
							<div
								class="icon-container mr-4 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-green-100"
							>
								<svg class="h-5 w-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
									<path
										fill-rule="evenodd"
										d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
										clip-rule="evenodd"
									></path>
								</svg>
							</div>
							<div>
								<h3 class="text-sm font-medium text-black">Orari</h3>
								<p class="mt-1">Lun - Ven: 9:00 - 18:00<br />Sab - Dom: Chiuso</p>
							</div>
						</div>

						<div class="flex space-x-4 pt-4">
							<a
								href="https://www.facebook.com/womblabto?locale=it_IT"
								class="social-link flex h-10 w-10 items-center justify-center rounded-full bg-zinc-100 text-zinc-600 transition-all hover:bg-green-100 hover:text-green-600"
							>
								<svg class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
									<path
										d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z"
									/>
								</svg>
							</a>
							<a
								href="#"
								class="social-link flex h-10 w-10 items-center justify-center rounded-full bg-zinc-100 text-zinc-600 transition-all hover:bg-green-100 hover:text-green-600"
							>
								<svg class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
									<path
										d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"
									/>
								</svg>
							</a>
							<a
								href="https://www.linkedin.com/company/womblab-events-communication/people/"
								class="social-link flex h-10 w-10 items-center justify-center rounded-full bg-zinc-100 text-zinc-600 transition-all hover:bg-green-100 hover:text-green-600"
							>
								<svg class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
									<path
										d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"
									/>
								</svg>
							</a>
						</div>
					</div>
				</div>
			</div>

			<div in:fly={{ x: 20, duration: 800, delay: 400 }} class="form-container">
				<!-- Componente del form modificato per tema chiaro -->
				<div class="rounded-xl border border-green-100 bg-white p-8 shadow-md">
					<h3 class="mb-6 text-xl font-semibold">Scrivici</h3>
					<form class="space-y-4">
						<div>
							<label for="name" class="mb-1 block text-sm font-medium text-gray-700">Nome</label>
							<input
								type="text"
								id="name"
								name="name"
								class="w-full rounded-md border border-gray-300 px-4 py-2 focus:border-green-500 focus:ring-2 focus:ring-green-500"
								placeholder="Il tuo nome"
							/>
						</div>
						<div>
							<label for="email" class="mb-1 block text-sm font-medium text-gray-700">Email</label>
							<input
								type="email"
								id="email"
								name="email"
								class="w-full rounded-md border border-gray-300 px-4 py-2 focus:border-green-500 focus:ring-2 focus:ring-green-500"
								placeholder="La tua email"
							/>
						</div>
						<div>
							<label for="message" class="mb-1 block text-sm font-medium text-gray-700"
								>Messaggio</label
							>
							<textarea
								id="message"
								name="message"
								rows="4"
								class="w-full rounded-md border border-gray-300 px-4 py-2 focus:border-green-500 focus:ring-2 focus:ring-green-500"
								placeholder="Il tuo messaggio"
							></textarea>
						</div>
						<div class="pt-2">
							<button
								type="submit"
								class="w-full rounded-md bg-green-600 px-4 py-2 font-medium text-white transition-colors hover:bg-green-800"
							>
								Invia messaggio
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>

		<!-- Modificato il container della mappa per assicurarsi che sia sempre presente nel DOM -->
		<div id="map-container" class="mt-16">
			<!-- Questo div sarà sempre presente nel DOM e l'observer può rilevarlo -->
			{#if mapLoaded}
				<div in:fade={{ duration: 1000 }} class="map-wrapper relative">
					<div
						class="absolute -inset-0.5 rounded-xl bg-gradient-to-r from-blue-200 to-blue-300 opacity-50 blur"
					></div>
					<div class="relative rounded-xl bg-white p-2 shadow-md">
						<iframe
							src="https://maps.google.com/maps?q=Corso+Vittorio+Emanuele+II+103+Torino&t=&z=15&ie=UTF8&iwloc=&output=embed"
							width="100%"
							height="450"
							style="border:0;"
							allowfullscreen=""
							loading="lazy"
							referrerpolicy="no-referrer-when-downgrade"
							title="Mappa della nostra sede"
						></iframe>
					</div>
				</div>
			{:else}
				<div class="flex h-80 w-full items-center justify-center rounded-xl bg-gray-100 md:h-96">
					<div class="text-gray-400">Caricamento mappa...</div>
				</div>
			{/if}
		</div>
	{/if}
</section>

<style>
	.contact-section {
		overflow-x: hidden;
	}

	/* Animazione per gli elementi informativi */
	.animate-item {
		animation: fadeSlideUp 0.5s forwards;
		opacity: 0;
		transform: translateY(10px);
	}

	.contact-item:nth-child(1) {
		animation-delay: 0.3s;
	}
	.contact-item:nth-child(2) {
		animation-delay: 0.5s;
	}
	.contact-item:nth-child(3) {
		animation-delay: 0.7s;
	}
	.contact-item:nth-child(4) {
		animation-delay: 0.9s;
	}

	@keyframes fadeSlideUp {
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	/* Effetto hover sulla social icon */
	.social-link {
		transition: all 0.3s ease;
	}

	.social-link:hover {
		transform: translateY(-3px);
	}

	/* Effetto gradient sulla mappa */
	.map-wrapper {
		transition: all 0.5s ease;
	}

	.map-wrapper:hover .blur {
		opacity: 0.6;
		filter: blur(8px);
	}
</style>
