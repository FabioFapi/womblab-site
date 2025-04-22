<script>
	import { onMount } from 'svelte';
	import { spring } from 'svelte/motion';
	import { fly, fade } from 'svelte/transition';

	export let data;
	const event = data.event;

	let mounted = false;
	let imageLoaded = false;
	let activeSection = 'presentazione';
	let activeSectionBig = 'descrizione';

	let mouseX = spring(0, { stiffness: 0.1, damping: 0.9 });
	let mouseY = spring(0, { stiffness: 0.1, damping: 0.9 });

	function handleMouseMove(e) {
		const { clientX, clientY } = e;
		const { innerWidth, innerHeight } = window;
		mouseX.set((clientX / innerWidth - 0.5) * 20);
		mouseY.set((clientY / innerHeight - 0.5) * 20);
	}

	function handleImageLoad() {
		imageLoaded = true;
	}

	function setActiveSection(section) {
		activeSection = section;
	}
	function setActiveSectionBig(section) {
		activeSectionBig = section;
	}

	function getFormattedDate(dateString) {
		if (!dateString) return '';

		const match = dateString.match(/(\d{2})-(\d{2})-(\d{4})/g);
		if (match && match.length >= 1) {
			const formattedDates = match.map((d) => {
				const [day, month, year] = d.split('-');
				const parsed = new Date(`${year}-${month}-${day}`);
				return parsed.toLocaleDateString('it-IT', {
					day: 'numeric',
					month: 'short',
					year: 'numeric'
				});
			});
			return formattedDates.length === 2
				? `Dal ${formattedDates[0]} al ${formattedDates[1]}`
				: formattedDates[0];
		}

		const parsed = new Date(dateString);
		if (!isNaN(parsed)) {
			return parsed.toLocaleDateString('it-IT', {
				day: 'numeric',
				month: 'short',
				year: 'numeric'
			});
		}

		return dateString;
	}

	const eventDate = getFormattedDate(event.date);

	onMount(() => {
		mounted = true;
	});
	function formatReadableDate(dateString) {
		if (!dateString) return '';
		try {
			const onlyDate = dateString.split('T')[0];
			const [year, month, day] = onlyDate.split('-');
			return `${day}/${month}/${year}`;
		} catch (e) {
			return dateString;
		}
	}
</script>

<svelte:window on:mousemove={handleMouseMove} />

<section class="relative mx-auto max-w-5xl px-6 py-8">
	{#if event.type === 'grandi-eventi'}
		{#if mounted}
			<div in:fly={{ y: -10, duration: 300 }}>
				<button
					on:click={() => window.history.back()}
					class="mb-6 inline-flex items-center gap-2 text-sm text-green-600 hover:text-green-700"
				>
					<svg
						width="16"
						height="16"
						fill="none"
						stroke="currentColor"
						stroke-width="2"
						viewBox="0 0 24 24"
					>
						<path d="M19 12H5M5 12L12 19M5 12L12 5" />
					</svg>
					Torna indietro
				</button>
			</div>

			<div
				in:fly={{ y: 10, duration: 400 }}
				class="mb-8 flex flex-col md:flex-row md:items-start md:gap-6"
			>
				<div class="flex-grow">
					<h1 class="mb-4 text-2xl font-bold tracking-wide text-gray-800 uppercase md:text-3xl">
						{event.title}
					</h1>

					<div class="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-gray-600">
						<div class="flex items-center">
							<svg class="mr-1 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
								></path>
							</svg>
							{event.date || 'Data da definire'}
						</div>
						<div class="flex items-center">
							<svg class="mr-1 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
								></path>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
								></path>
							</svg>
							{event.location || 'Bergamo'}
						</div>
					</div>
				</div>
			</div>

			<div class="grid gap-8 md:grid-cols-3">
				<div class="md:col-span-2">
					<div
						in:fly={{ y: 20, duration: 500 }}
						class="bg-white-100 relative mb-8 aspect-video overflow-hidden rounded-md"
					>
						{#if !imageLoaded}
							<div class="absolute inset-0 flex items-center justify-center">
								<div
									class="h-10 w-10 animate-spin rounded-full border-t-2 border-b-2 border-green-600"
								></div>
							</div>
						{/if}
						<img
							src={event.image}
							alt={event.title}
							on:load={handleImageLoad}
							style="transform: translate({$mouseX}px, {$mouseY}px) scale(1.05);"
							class="h-full w-full object-cover transition-all duration-500 {imageLoaded
								? 'opacity-100'
								: 'opacity-0'}"
						/>
					</div>

					<div class="mb-6 border-b">
						<div class="flex space-x-6 text-sm">
							<button
								class="border-b-2 pb-2 transition-all {activeSectionBig === 'descrizione'
									? 'border-green-500 font-medium text-green-600'
									: 'border-transparent text-gray-600 hover:text-gray-800'}"
								on:click={() => setActiveSectionBig('descrizione')}
							>
								DESCRIZIONE
							</button>
							<button
								class="border-b-2 pb-2 transition-all {activeSectionBig === 'localizzazione'
									? 'border-green-500 font-medium text-green-600'
									: 'border-transparent text-gray-600 hover:text-gray-800'}"
								on:click={() => setActiveSectionBig('localizzazione')}
							>
								LOCALIZZAZIONE
							</button>
						</div>
					</div>

					{#if activeSectionBig === 'descrizione'}
						<div in:fade={{ duration: 300 }} class="prose prose-slate max-w-none">
							<h2 class="mb-4 text-xl font-semibold text-gray-800">DESCRIZIONE</h2>
							<p class="mb-4 text-gray-700">
								{event.description || 'Nessuna descrizione disponibile'}
							</p>
						</div>
					{:else if activeSectionBig === 'localizzazione'}
						<div in:fade={{ duration: 300 }} class="prose prose-slate max-w-none">
							<h2 class="mb-4 text-xl font-semibold text-gray-800">LOCALIZZAZIONE</h2>
							<p class="mb-4 text-gray-700">
								{event.geoLocation || 'Informazioni sulla localizzazione non disponibili'}
							</p>
						</div>
					{/if}
				</div>

				<div class="md:col-span-1">
					<div
						in:fly={{ x: 20, duration: 500 }}
						class="sticky top-6 rounded-lg bg-gray-50 p-6 shadow-sm"
					>
						<h2 class="mb-4 border-b border-gray-200 pb-2 text-lg font-semibold text-gray-800">
							Dettagli evento
						</h2>

						<div class="mb-6 space-y-4 text-sm">
							<div>
								<span class="block text-gray-500">Data</span>
								<span class="font-medium text-gray-800">{event.date}</span>
							</div>
							<div>
								<span class="block text-gray-500">Luogo</span>
								<span class="font-medium text-gray-800">{event.location || 'Bergamo'}</span>
							</div>
							<div>
								<span class="block text-gray-500">Tipo evento</span>
								<span class="font-medium text-gray-800">{event.type || 'Conferenza'}</span>
							</div>

							<div>
								<span class="block text-gray-500">Stato</span>
								<div class="mt-1">
									<span
										class="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium
                                {event.status === 'attivo'
											? 'bg-green-100 text-green-800'
											: event.status === 'in arrivo'
												? 'bg-blue-100 text-blue-800'
												: 'bg-gray-100 text-gray-800'}"
									>
										{event.status || 'Concluso'}
									</span>
								</div>
							</div>
						</div>

						<div class="space-y-3">
							<a
								href={event.link}
								class="flex w-full items-center justify-center rounded-3xl bg-green-600 px-4 py-3 font-medium text-white shadow-md transition-all hover:-translate-y-1 hover:bg-green-700 hover:shadow-lg"
							>
								Link dell'Evento
							</a>
						</div>
					</div>
				</div>
			</div>
		{/if}
	{:else if mounted}
		<div in:fly={{ y: -10, duration: 300 }}>
			<button
				on:click={() => window.history.back()}
				class="mb-6 inline-flex items-center gap-2 text-sm text-green-600 hover:text-green-700"
			>
				<svg
					width="16"
					height="16"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
					viewBox="0 0 24 24"
				>
					<path d="M19 12H5M5 12L12 19M5 12L12 5" />
				</svg>
				Torna indietro
			</button>
		</div>

		<div
			in:fly={{ y: 10, duration: 400 }}
			class="mb-8 flex flex-col md:flex-row md:items-start md:gap-6"
		>
			<div class="flex-grow">
				<h1 class="mb-4 text-2xl font-bold tracking-wide text-gray-800 uppercase md:text-3xl">
					{event.title}
				</h1>

				<div class="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-gray-600">
					<div class="flex items-center">
						<svg class="mr-1 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
							></path>
						</svg>
						{getFormattedDate(event.date) || ''}
					</div>
					<div class="flex items-center">
						<svg class="mr-1 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
							></path>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
							></path>
						</svg>
						{event.location || 'Bergamo'}
					</div>
				</div>
			</div>
		</div>

		<div class="grid gap-8 md:grid-cols-3">
			<div class="md:col-span-2">
				<div
					in:fly={{ y: 20, duration: 500 }}
					class="relative mb-8 aspect-video overflow-hidden rounded-md bg-green-100"
				>
					{#if !imageLoaded}
						<div class="absolute inset-0 flex items-center justify-center">
							<div
								class="h-10 w-10 animate-spin rounded-full border-t-2 border-b-2 border-green-600"
							></div>
						</div>
					{/if}
					<img
						src={event.image}
						alt={event.title}
						on:load={handleImageLoad}
						style="transform: translate({$mouseX}px, {$mouseY}px) scale(1.05);"
						class="h-full w-full object-cover transition-all duration-500 {imageLoaded
							? 'opacity-100'
							: 'opacity-0'}"
					/>
				</div>

				<div class="mb-6 border-b">
					<div class="flex space-x-6 text-sm">
						<button
							class="border-b-2 pb-2 transition-all {activeSection === 'presentazione'
								? 'border-green-500 font-medium text-green-600'
								: 'border-transparent text-gray-600 hover:text-gray-800'}"
							on:click={() => setActiveSection('presentazione')}
						>
							PRESENTAZIONE
						</button>
						<button
							class="border-b-2 pb-2 transition-all {activeSection === 'professioni'
								? 'border-green-500 font-medium text-green-600'
								: 'border-transparent text-gray-600 hover:text-gray-800'}"
							on:click={() => setActiveSection('professioni')}
						>
							PROFESSIONI
						</button>
						<button
							class="border-b-2 pb-2 transition-all {activeSection === 'localizzazione'
								? 'border-green-500 font-medium text-green-600'
								: 'border-transparent text-gray-600 hover:text-gray-800'}"
							on:click={() => setActiveSection('localizzazione')}
						>
							LOCALIZZAZIONE
						</button>
					</div>
				</div>

				{#if activeSection === 'presentazione'}
					<div in:fade={{ duration: 300 }} class="prose prose-slate max-w-none">
						<h2 class="mb-4 text-xl font-semibold text-gray-800">PRESENTAZIONE</h2>
						<p class="mb-4 text-gray-700">
							{event.description || ''}
						</p>
					</div>
				{:else if activeSection === 'professioni'}
					<div in:fade={{ duration: 300 }} class="prose prose-slate max-w-none">
						<h2 class="mb-4 text-xl font-semibold text-gray-800">
							ELENCO DELLE PROFESSIONI E DISCIPLINE
						</h2>
						<p class="mb-4 text-gray-700">
							{event.professions || ''}
						</p>
					</div>
				{:else if activeSection === 'localizzazione'}
					<div in:fade={{ duration: 300 }} class="prose prose-slate max-w-none">
						<h2 class="mb-4 text-xl font-semibold text-gray-800">LOCALIZZAZIONE</h2>
						<p class="mb-4 text-gray-700">
							{event.geoLocation || ''}
						</p>
					</div>
				{/if}
			</div>

			<div class="md:col-span-1">
				<div
					in:fly={{ x: 20, duration: 500 }}
					class="sticky top-6 rounded-lg bg-gray-50 p-6 shadow-sm"
				>
					<h2 class="mb-4 border-b border-gray-200 pb-2 text-lg font-semibold text-gray-800">
						Informazioni evento
					</h2>

					<div class="mb-6 space-y-3 text-sm">
						<div>
							<span class="block text-gray-500">Data evento</span>
							<span class="font-medium text-gray-800">{getFormattedDate(event.date) || ''}</span>
						</div>

						<div>
							<span class="block text-gray-500">Inizio iscrizioni</span>
							<span class="font-medium text-gray-800"
								>{formatReadableDate(event.registrationStart)}
							</span>
						</div>

						<div>
							<span class="block text-gray-500">Fine iscrizione</span>
							<span class="font-medium text-gray-800"
								>{formatReadableDate(event.registrationEnd)}</span
							>
						</div>

						<div>
							<span class="block text-gray-500">Crediti ECM</span>
							<span class="font-medium text-gray-800">{event.ecm || '0'}</span>
						</div>

						<div>
							<span class="block text-gray-500">Codice evento</span>
							<span class="font-medium text-gray-800">{event.eventCode || '0'}</span>
						</div>

						<div>
							<span class="block text-gray-500">Quota di iscrizione</span>
							<span class="font-medium text-gray-800">{event.registrationFee || '0 euro'}</span>
						</div>

						<div>
							<span class="block text-gray-500">Tipo evento</span>
							<span class="font-medium text-gray-800">{event.type || 'evento'}</span>
						</div>

						<div>
							<span class="block text-gray-500">Stato</span>
							<span class="font-medium text-gray-800">{event.status || 'finito'}</span>
						</div>
					</div>

					<a
						href={event.link}
						class="flex w-full items-center justify-center rounded-3xl bg-green-600 px-4 py-3 font-medium text-white shadow-md transition-all hover:-translate-y-1 hover:bg-green-700 hover:shadow-lg"
					>
						Iscriviti
					</a>
				</div>
			</div>
		</div>
	{/if}
</section>

<style>
	section {
		animation: fadeIn 0.6s ease-in-out;
	}

	.date-box {
		width: 100px;
		height: 100px;
		border-radius: 4px;
		overflow: hidden;
		box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
		margin-bottom: 16px;
	}

	.date-container {
		display: flex;
		flex-direction: column;
		height: 100%;
		background-color: #00a99d; /* Colore teal come nell'immagine */
		color: white;
		text-align: center;
	}

	.date-label {
		background-color: #00a99d;
		padding: 2px;
		font-size: 16px;
		font-weight: 500;
		text-transform: uppercase;
	}

	.date-number {
		font-size: 36px;
		font-weight: 700;
		line-height: 1;
		padding: 8px 0 4px;
	}

	.date-month-year {
		display: flex;
		flex-direction: column;
		background-color: #008c82;
		padding: 4px 0;
		font-size: 14px;
		flex-grow: 1;
	}

	.date-month {
		font-weight: 600;
	}

	.date-year {
		font-size: 13px;
		opacity: 0.9;
	}

	@keyframes fadeIn {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}

	:global(html) {
		scroll-behavior: smooth;
	}
</style>
