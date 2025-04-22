<script>
	import { goto } from '$app/navigation';
	import { fade, fly, slide } from 'svelte/transition';
	import { flip } from 'svelte/animate';
	export let data;

	let selectedType = 'tutti';
	let key = 0;

	const types = ['tutti', 'FAD', 'RES', 'campagna'];

	function selectType(type) {
		if (selectedType !== type) {
			selectedType = type;
			key++;
		}
	}

	$: filtered =
		selectedType === 'tutti' ? data.events : data.events.filter((e) => e.type === selectedType);

	const formatDate = (dateString) => {
		const parsed = new Date(dateString);
		if (!isNaN(parsed)) {
			const options = { day: 'numeric', month: 'short', year: 'numeric' };
			return parsed.toLocaleDateString('it-IT', options);
		}
		return dateString;
	};
</script>

<section
	class="relative overflow-hidden bg-gradient-to-br from-green-50 via-white to-blue-50 px-6 py-16"
>
	<div class="mx-auto max-w-6xl">
		<h1 
			in:fly={{ y: -20, duration: 600 }}
			class="mb-12 text-center text-4xl font-extrabold tracking-tight text-zinc-900"
		>
			<span class="relative inline-block">
				Settore Medico
				<span
					class="absolute -bottom-2 left-0 h-1.5 w-full rounded-full bg-gradient-to-r from-green-400 to-green-600"
				></span>
			</span>
		</h1>

		<div 
			in:fly={{ y: 20, duration: 600, delay: 200 }}
			class="mb-10 flex flex-wrap justify-center gap-2"
		>
			{#each types as type}
				<button
					on:click={() => selectType(type)}
					class="relative rounded-full px-5 py-2.5 text-sm font-medium transition-all duration-300
						{selectedType === type
						? 'bg-gradient-to-r from-green-500 to-green-600 text-white shadow-md hover:shadow-lg'
						: 'bg-white text-zinc-700 shadow hover:bg-zinc-50'}"
				>
					{#if selectedType === type}
						<span class="animate-ripple absolute inset-0 -z-10 rounded-full bg-green-400 opacity-50"
						></span>
					{/if}
					{type === 'tutti' ? 'Tutti' : type}
				</button>
			{/each}
		</div>

		{#if filtered.length === 0}
			<div
				in:fade={{ duration: 400 }}
				class="mx-auto max-w-3xl rounded-2xl border border-zinc-100 bg-white p-12 text-center text-zinc-700 shadow-xl"
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
				<p class="text-2xl font-bold text-zinc-800">Nessun evento trovato</p>
				<p class="mt-3 text-zinc-500">Prova a selezionare un'altra categoria o torna più tardi.</p>
			</div>
		{:else}
			<div class="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
				{#each filtered as event, i (event.id + key)}
					<div
						in:fly={{ y: 30, duration: 400, delay: i * 100 }}
						animate:flip={{ duration: 400 }}
						class="group flex flex-col overflow-hidden rounded-2xl bg-white shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
					>
						<a href={`/eventi/${event.id}`} class="block flex-1">
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

							<div class="flex flex-col p-6">
								<div class="mb-4 flex flex-wrap items-center gap-3 text-xs">
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
												d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
											/>
										</svg>
										{event.type}
									</div>
								</div>

								<h3 class="mb-3 line-clamp-2 text-xl font-bold text-zinc-800">{event.title}</h3>

								<p class="mb-5 line-clamp-3 text-sm text-zinc-600">
									{event.description}
								</p>
							</div>
						</a>

						<div class="p-6 pt-0">
							<a
								href={`/eventi/${event.id}`}
								class="group/btn flex w-full items-center justify-center rounded-3xl bg-gradient-to-r from-green-500 to-green-600 px-4 py-3 text-sm font-semibold text-white shadow-md transition-all hover:from-green-600 hover:to-green-700"
							>
								Scopri di più
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
				{/each}
			</div>
		{/if}
	</div>

	<div
		class="animate-blob absolute -top-24 -left-16 -z-10 h-96 w-96 rounded-full bg-green-200 opacity-20 blur-3xl filter"
	></div>
	<div
		class="animate-blob animation-delay-3000 absolute right-10 -bottom-16 -z-10 h-96 w-96 rounded-full bg-blue-200 opacity-20 blur-3xl filter"
	></div>
</section>

<style>
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

	.animation-delay-3000 {
		animation-delay: 3s;
	}

	@keyframes ripple {
		0% {
			transform: scale(0.8);
			opacity: 0.8;
		}
		100% {
			transform: scale(2);
			opacity: 0;
		}
	}

	.animate-ripple {
		animation: ripple 1s ease-out;
	}
</style>