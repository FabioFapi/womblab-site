<script>
	import { onMount, tick } from 'svelte';
	import { fade, fly, slide } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';

	let nome = '';
	let email = '';
	let messaggio = '';
	let inviato = false;
	let errore = false;
	let formMounted = false;
	let focusedField = null;
	let isSubmitting = false;

	// Per le animazioni dei label
	let isFocused = {
		nome: false,
		email: false,
		messaggio: false
	};

	function validateEmail(email) {
		return /\S+@\S+\.\S+/.test(email);
	}

	function setFocus(field) {
		isFocused[field] = true;
		focusedField = field;
	}

	function unsetFocus(field) {
		// Mantieni l'effetto se c'è del testo nel campo
		if (
			(field === 'nome' && !nome) ||
			(field === 'email' && !email) ||
			(field === 'messaggio' && !messaggio)
		) {
			isFocused[field] = false;
		}
		focusedField = null;
	}

	async function handleSubmit(e) {
		e.preventDefault();
		isSubmitting = true;

		if (!nome || !email || !messaggio || !validateEmail(email)) {
			errore = true;
			isSubmitting = false;

			// Scuoti il form
			const form = e.target;
			form.classList.add('shake-animation');
			setTimeout(() => {
				form.classList.remove('shake-animation');
			}, 500);

			return;
		}

		// Simulazione invio con ritardo realistico
		await new Promise((resolve) => setTimeout(resolve, 800));

		inviato = true;
		errore = false;
		isSubmitting = false;

		// Reset campi (puoi anche integrare backend/API qui)
		nome = '';
		email = '';
		messaggio = '';

		// Reset degli stati di focus
		Object.keys(isFocused).forEach((key) => {
			isFocused[key] = false;
		});

		// Nascondi il messaggio di successo dopo 5 secondi
		setTimeout(() => {
			inviato = false;
		}, 5000);
	}

	onMount(() => {
		formMounted = true;
	});
</script>

<div class="form-container mx-auto max-w-lg">
	{#if inviato}
		<div
			in:fly={{ y: -20, duration: 400, easing: quintOut }}
			out:fade={{ duration: 300 }}
			class="success-message mb-6 flex items-center rounded border-l-4 border-green-500 bg-green-50 p-4 shadow-sm dark:bg-green-900/30"
		>
			<svg
				class="mr-3 h-5 w-5 flex-shrink-0 text-green-500"
				fill="currentColor"
				viewBox="0 0 20 20"
			>
				<path
					fill-rule="evenodd"
					d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
					clip-rule="evenodd"
				></path>
			</svg>
			<p class="text-green-700 dark:text-green-300">
				Messaggio inviato con successo! Ti risponderemo presto.
			</p>
		</div>
	{/if}

	{#if errore}
		<div
			in:fly={{ y: -20, duration: 400, easing: quintOut }}
			out:fade={{ duration: 300 }}
			class="error-message mb-6 flex items-center rounded border-l-4 border-red-500 bg-red-50 p-4 shadow-sm dark:bg-red-900/30"
		>
			<svg class="mr-3 h-5 w-5 flex-shrink-0 text-red-500" fill="currentColor" viewBox="0 0 20 20">
				<path
					fill-rule="evenodd"
					d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
					clip-rule="evenodd"
				></path>
			</svg>
			<p class="text-red-700 dark:text-red-300">Compila tutti i campi correttamente.</p>
		</div>
	{/if}

	<form
		on:submit={handleSubmit}
		class="space-y-6 rounded-lg border border-zinc-100 bg-white p-6 shadow-lg dark:border-zinc-700 dark:bg-zinc-800"
	>
		{#if formMounted}
			<h2
				in:fly={{ y: 20, duration: 500 }}
				class="mb-6 text-2xl font-semibold text-zinc-800 dark:text-zinc-200"
			>
				Contattaci
			</h2>

			<div in:fly={{ y: 20, duration: 500, delay: 100 }} class="form-field relative">
				<label
					for="nome"
					class="text-sm text-zinc-600 transition-all duration-300 dark:text-zinc-400 {isFocused.nome
						? 'text-blue-600 dark:text-blue-400'
						: ''}"
					class:label-float={isFocused.nome}
				>
					Nome
				</label>
				<input
					id="nome"
					bind:value={nome}
					on:focus={() => setFocus('nome')}
					on:blur={() => unsetFocus('nome')}
					required
					class="w-full border-b-2 border-zinc-200 bg-transparent px-4 py-3 transition-all outline-none focus:border-blue-500 dark:border-zinc-600 dark:focus:border-blue-400"
				/>
				<div
					class="input-highlight absolute bottom-0 left-0 h-0.5 w-0 bg-blue-500 transition-all duration-300 {isFocused.nome
						? 'w-full'
						: ''}"
				></div>
			</div>

			<div in:fly={{ y: 20, duration: 500, delay: 200 }} class="form-field relative">
				<label
					for="email"
					class="text-sm text-zinc-600 transition-all duration-300 dark:text-zinc-400 {isFocused.email
						? 'text-blue-600 dark:text-blue-400'
						: ''}"
					class:label-float={isFocused.email}
				>
					Email
				</label>
				<input
					id="email"
					type="email"
					bind:value={email}
					on:focus={() => setFocus('email')}
					on:blur={() => unsetFocus('email')}
					required
					class="w-full border-b-2 border-zinc-200 bg-transparent px-4 py-3 transition-all outline-none focus:border-blue-500 dark:border-zinc-600 dark:focus:border-blue-400"
				/>
				<div
					class="input-highlight absolute bottom-0 left-0 h-0.5 w-0 bg-blue-500 transition-all duration-300 {isFocused.email
						? 'w-full'
						: ''}"
				></div>
			</div>

			<div in:fly={{ y: 20, duration: 500, delay: 300 }} class="form-field relative">
				<label
					for="messaggio"
					class="text-sm text-zinc-600 transition-all duration-300 dark:text-zinc-400 {isFocused.messaggio
						? 'text-blue-600 dark:text-blue-400'
						: ''}"
					class:label-float={isFocused.messaggio}
				>
					Messaggio
				</label>
				<textarea
					id="messaggio"
					bind:value={messaggio}
					on:focus={() => setFocus('messaggio')}
					on:blur={() => unsetFocus('messaggio')}
					required
					rows="4"
					class="w-full resize-none border-b-2 border-zinc-200 bg-transparent px-4 py-3 transition-all outline-none focus:border-blue-500 dark:border-zinc-600 dark:focus:border-blue-400"
				></textarea>
				<div
					class="input-highlight absolute bottom-0 left-0 h-0.5 w-0 bg-blue-500 transition-all duration-300 {isFocused.messaggio
						? 'w-full'
						: ''}"
				></div>
			</div>

			<div in:fly={{ y: 20, duration: 500, delay: 400 }} class="flex justify-end">
				<button
					type="submit"
					class="relative flex transform items-center overflow-hidden rounded-lg bg-blue-600 px-6 py-3 text-white shadow-md transition-all hover:-translate-y-1 hover:bg-blue-700 hover:shadow-lg active:translate-y-0 active:bg-blue-800 disabled:opacity-70"
					disabled={isSubmitting}
				>
					{#if isSubmitting}
						<span class="flex items-center">
							<svg
								class="mr-3 -ml-1 h-5 w-5 animate-spin text-white"
								fill="none"
								viewBox="0 0 24 24"
							>
								<circle
									class="opacity-25"
									cx="12"
									cy="12"
									r="10"
									stroke="currentColor"
									stroke-width="4"
								></circle>
								<path
									class="opacity-75"
									fill="currentColor"
									d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
								></path>
							</svg>
							Invio in corso...
						</span>
					{:else}
						<span class="relative z-10">Invia messaggio</span>
						<span
							class="absolute top-0 left-0 z-0 h-0 w-full bg-blue-800 transition-all duration-300 group-hover:h-full"
						></span>
					{/if}
				</button>
			</div>
		{/if}
	</form>
</div>

<style>
	/* Stile per far fluttuare le label */
	.label-float {
		transform: translateY(-20px) scale(0.85);
		color: #3b82f6; /* blue-500 */
	}

	/* Animazione per gli errori */
	.shake-animation {
		animation: shake 0.5s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
		transform: translate3d(0, 0, 0);
	}

	@keyframes shake {
		10%,
		90% {
			transform: translate3d(-1px, 0, 0);
		}
		20%,
		80% {
			transform: translate3d(2px, 0, 0);
		}
		30%,
		50%,
		70% {
			transform: translate3d(-3px, 0, 0);
		}
		40%,
		60% {
			transform: translate3d(3px, 0, 0);
		}
	}

	/* Animazione in entrata e uscita delle label */
	label {
		position: absolute;
		left: 16px;
		top: 14px;
		pointer-events: none;
	}

	/* Effetto ripple per il bottone */
	button {
		position: relative;
		overflow: hidden;
	}

	button::after {
		content: '';
		position: absolute;
		width: 100%;
		height: 100%;
		top: 0;
		left: 0;
		pointer-events: none;
		background-image: radial-gradient(circle, #fff 10%, transparent 10.01%);
		background-repeat: no-repeat;
		background-position: 50%;
		transform: scale(10, 10);
		opacity: 0;
		transition:
			transform 0.5s,
			opacity 1s;
	}

	button:active::after {
		transform: scale(0, 0);
		opacity: 0.3;
		transition: 0s;
	}

	/* Stile per input quando hanno contenuto */
	input:not(:placeholder-shown) + .input-highlight,
	textarea:not(:placeholder-shown) + .input-highlight {
		width: 100%;
	}

	/* Campo in focus */
	.form-field:focus-within label {
		color: #3b82f6; /* blue-500 */
	}
</style>
