<script>
	import { onMount, onDestroy } from 'svelte';

	// Proprietà per il PDF
	export let pdfUrl = '/brochure/brochure.pdf'; 
	console.log('URL del PDF usato:', pdfUrl);


	let flipbookContainer;
	let bookWrapper;
	let currentPage = 0;
	let totalPages = 0;
	let isLoading = true;
	let loadedPages = 0;
	let isBrowser = false;
	let loadError = false;
	let errorMessage = '';
	let isDragging = false;
	let startX = 0;
	let currentX = 0;
	let pageFlipping = false;
	let activePages = [0, 1];
	let flippingPage = null;
	let flippingDirection = null;
	let flipProgress = 0;
	let loadingTimeout;

	// Variabili per PDF.js
	let pdfDoc = null;
	let pdfPages = [];
	let pdfPageCanvases = [];
	let scale = 1.5;

	// Inizializza PDF.js
	async function initPDF() {
		if (!isBrowser) return;

		try {
			console.log('Inizializzazione PDF.js...');

			// Importa PDF.js in modo compatibile con Vite
			const pdfjs = await import('pdfjs-dist/webpack');

			// Configura il worker manualmente
			if (typeof window !== 'undefined') {
				pdfjs.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';

			}

			// Carica il documento PDF
			console.log('Caricamento PDF:', pdfUrl);
			pdfDoc = await pdfjs.getDocument(pdfUrl).promise;
			totalPages = pdfDoc.numPages;
			console.log('Totale pagine PDF:', totalPages);

			// Precarica tutte le pagine
			await preloadPDFPages(pdfjs);
		} catch (error) {
			console.error('Errore durante il caricamento del PDF:', error);
			loadError = true;
			errorMessage = `Impossibile caricare il PDF. ${error.message}`;
			isLoading = false;
		}
	}

	// Precarica tutte le pagine del PDF
	async function preloadPDFPages(pdfjs) {
		if (!pdfDoc) return;

		pdfPages = new Array(totalPages);
		pdfPageCanvases = new Array(totalPages);

		const loadingPromises = [];

		for (let i = 1; i <= totalPages; i++) {
			loadingPromises.push(loadPDFPage(i, pdfjs));
		}

		try {
			await Promise.all(loadingPromises);
			console.log('Tutte le pagine PDF caricate');
			isLoading = false;

			// Inizializza il flipbook
			if (isBrowser && !loadError) {
				initFlipbook();
			}
		} catch (error) {
			console.error('Errore durante il precaricamento delle pagine PDF:', error);
			if (!errorMessage) {
				errorMessage = 'Impossibile caricare alcune pagine del PDF. Prova a ricaricare la pagina.';
			}

			// Se almeno metà delle pagine è stata caricata, procedi comunque
			if (loadedPages >= totalPages / 2) {
				isLoading = false;
				initFlipbook();
			} else {
				loadError = true;
				isLoading = false;
			}
		}
	}

	// Carica una singola pagina PDF
	async function loadPDFPage(pageNum, pdfjs) {
		try {
			// Ottieni la pagina dal documento
			const page = await pdfDoc.getPage(pageNum);
			pdfPages[pageNum - 1] = page;

			// Crea un canvas per il rendering
			const canvas = document.createElement('canvas');
			const context = canvas.getContext('2d');

			// Ottieni la viewport per scala appropriata
			const viewport = page.getViewport({ scale });
			canvas.width = viewport.width;
			canvas.height = viewport.height;

			// Render della pagina sul canvas
			await page.render({
				canvasContext: context,
				viewport: viewport
			}).promise;

			// Salva il canvas renderizzato
			pdfPageCanvases[pageNum - 1] = canvas;

			// Incrementa contatore pagine caricate
			loadedPages++;
			console.log(`Pagina PDF ${pageNum}/${totalPages} caricata`);

			return canvas;
		} catch (error) {
			console.error(`Errore caricamento pagina PDF ${pageNum}:`, error);
			throw error;
		}
	}

	// Inizializza il flipbook
	function initFlipbook() {
		if (!flipbookContainer) return;

		// Inizializza con le prime due pagine visibili
		currentPage = 1;
		activePages = [0, 1];

		// Aggiungi effetto ombra tra le pagine
		addShadowEffect();

		console.log('Flipbook inizializzato');
	}

	// Aggiungi protezione contro il caricamento infinito
	function setupLoadingTimeout() {
		if (!isBrowser) return;

		// Timeout di sicurezza - dopo 15 secondi, se le pagine non sono ancora caricate
		// mostreremo comunque il flipbook o un messaggio di errore
		loadingTimeout = setTimeout(() => {
			if (isLoading) {
				console.warn('Timeout di caricamento raggiunto');
				isLoading = false;

				if (loadedPages < totalPages / 2) {
					loadError = true;
					errorMessage =
						'Tempo di caricamento del PDF scaduto. Controlla la connessione e ricarica la pagina.';
				} else {
					// Inizializza con le pagine caricate finora
					if (isBrowser && !loadError) {
						initFlipbook();
					}
				}
			}
		}, 15000); // 15 secondi di timeout
	}

	// Aggiunge effetto ombra al centro del libro
	function addShadowEffect() {
		if (!bookWrapper) return;

		// Controlla se l'ombra esiste già
		if (!bookWrapper.querySelector('.book-shadow')) {
			const shadow = document.createElement('div');
			shadow.className = 'book-shadow';
			bookWrapper.appendChild(shadow);
		}
	}

	// Funzione per animare il voltaggio di una pagina
	function animatePageFlip(pageIndex, direction) {
		if (pageFlipping) return;

		pageFlipping = true;
		flippingPage = pageIndex;
		flippingDirection = direction;
		flipProgress = 0;

		// Animazione del flip
		const startTime = performance.now();
		const duration = 800; // durata dell'animazione in ms

		function flipStep(timestamp) {
			const elapsed = timestamp - startTime;
			flipProgress = Math.min(elapsed / duration, 1);

			if (flipProgress < 1) {
				requestAnimationFrame(flipStep);
			} else {
				// Animazione completata
				completePageFlip();
			}
		}

		requestAnimationFrame(flipStep);
	}

	// Completa il voltaggio della pagina aggiornando le pagine attive
	function completePageFlip() {
		if (flippingDirection === 'next') {
			currentPage += 2;
			activePages = [currentPage - 1, currentPage];
		} else {
			currentPage -= 2;
			activePages = [currentPage - 1, currentPage];
		}

		pageFlipping = false;
		flippingPage = null;
		flippingDirection = null;
		flipProgress = 0;
	}

	// Funzioni di navigazione
	function prevPage() {
		if (!isBrowser || loadError || pageFlipping || currentPage <= 1) return;
		animatePageFlip(currentPage - 2, 'prev');
	}

	function nextPage() {
		if (!isBrowser || loadError || pageFlipping || currentPage >= totalPages - 1) return;
		animatePageFlip(currentPage, 'next');
	}

	function goToPage(page) {
		if (!isBrowser || loadError || pageFlipping) return;

		// Assicurati che la pagina sia dispari (pagina sinistra)
		const adjustedPage = page % 2 === 0 ? page - 1 : page;

		if (adjustedPage < currentPage) {
			// Sfoglia all'indietro
			currentPage = adjustedPage;
			activePages = [currentPage - 1, currentPage];
		} else if (adjustedPage > currentPage) {
			// Sfoglia in avanti
			currentPage = adjustedPage;
			activePages = [currentPage - 1, currentPage];
		}
	}

	function goToFirst() {
		goToPage(1);
	}

	function goToLast() {
		goToPage(totalPages - (totalPages % 2 === 0 ? 2 : 1));
	}

	// Gestione eventi mouse/touch per trascinamento
	function handleMouseDown(event) {
		if (pageFlipping) return;

		isDragging = true;
		startX = event.clientX || (event.touches && event.touches[0] ? event.touches[0].clientX : 0);
		currentX = startX;

		// Previeni il comportamento di default
		event.preventDefault();
	}

	function handleMouseMove(event) {
		if (!isDragging) return;

		currentX = event.clientX || (event.touches && event.touches[0] ? event.touches[0].clientX : 0);
		const delta = currentX - startX;

		// Calcola la percentuale di avanzamento dello spostamento
		const bookWidth = flipbookContainer.offsetWidth;
		let progress = Math.max(-1, Math.min(1, delta / (bookWidth / 4)));

		// Usa il valore per applicare l'effetto di curvatura della pagina
		if (delta < 0 && currentPage < totalPages - 1) {
			// Trascina verso sinistra (pagina successiva)
			flippingDirection = 'next';
			flippingPage = currentPage;
			flipProgress = -progress;
		} else if (delta > 0 && currentPage > 1) {
			// Trascina verso destra (pagina precedente)
			flippingDirection = 'prev';
			flippingPage = currentPage - 2;
			flipProgress = progress;
		}
	}

	function handleMouseUp(event) {
		if (!isDragging) return;

		const delta = currentX - startX;

		// Determina se voltare o annullare in base alla distanza trascinata
		if (delta < -50 && currentPage < totalPages - 1) {
			// Completa il voltaggio in avanti
			nextPage();
		} else if (delta > 50 && currentPage > 1) {
			// Completa il voltaggio all'indietro
			prevPage();
		} else {
			// Annulla il voltaggio
			flippingPage = null;
			flippingDirection = null;
			flipProgress = 0;
		}

		isDragging = false;
	}

	// Ricarica la pagina
	function reloadPage() {
		if (!isBrowser) return;
		window.location.reload();
	}

	// Forza l'inizializzazione del flipbook anche se non tutte le pagine sono caricate
	function forceInitFlipbook() {
		if (!isBrowser || !isLoading) return;

		isLoading = false;
		initFlipbook();
	}

	// Gestisci le scorciatoie da tastiera
	function handleKeydown(event) {
		if (!isBrowser || loadError) return;

		switch (event.key) {
			case 'ArrowLeft':
				prevPage();
				break;
			case 'ArrowRight':
				nextPage();
				break;
			case 'Home':
				goToFirst();
				break;
			case 'End':
				goToLast();
				break;
		}
	}

	onMount(() => {
		// Imposta isBrowser a true quando il componente è montato (eseguito lato client)
		isBrowser = true;
		console.log('Componente montato, isBrowser = true');

		// Inizializza PDF
		initPDF();

		// Aggiungi listener per la tastiera e gli eventi mouse/touch
		if (isBrowser) {
			window.addEventListener('keydown', handleKeydown);

			// Aggiungi listener per gli eventi mouse/touch al documento
			document.addEventListener('mousemove', handleMouseMove);
			document.addEventListener('mouseup', handleMouseUp);
			document.addEventListener('touchmove', handleMouseMove, { passive: false });
			document.addEventListener('touchend', handleMouseUp);

			// Imposta il timeout di sicurezza
			setupLoadingTimeout();
		}
	});

	onDestroy(() => {
		if (!isBrowser) return;

		// Cancella il timeout quando il componente viene distrutto
		if (loadingTimeout) {
			clearTimeout(loadingTimeout);
		}

		// Rimuovi tutti i listener quando il componente viene distrutto
		window.removeEventListener('keydown', handleKeydown);
		document.removeEventListener('mousemove', handleMouseMove);
		document.removeEventListener('mouseup', handleMouseUp);
		document.removeEventListener('touchmove', handleMouseMove);
		document.removeEventListener('touchend', handleMouseUp);
	});
</script>

<div class="flipbook-container">
	{#if isLoading}
		<div class="loading-spinner" role="status" aria-live="polite">
			<div class="spinner"></div>
			<p>Caricamento PDF... {loadedPages}/{totalPages || '?'}</p>
			<button class="force-load-btn" on:click={forceInitFlipbook} disabled={!totalPages}>
				Continua senza aspettare
			</button>
		</div>
	{:else if loadError}
		<div class="error-message" role="alert">
			<p>{errorMessage}</p>
			<button class="reload-btn" on:click={reloadPage} aria-label="Ricarica la pagina">
				Ricarica
			</button>
		</div>
	{:else}
		<div class="book-wrapper" bind:this={bookWrapper} class:hidden={isLoading || loadError}>
			<div
				class="flipbook"
				bind:this={flipbookContainer}
				on:mousedown={handleMouseDown}
				on:touchstart={handleMouseDown}
				aria-label="Flipbook del PDF"
				role="region"
			>
				{#each Array(totalPages) as _, i}
					<div
						class="page"
						class:active={activePages.includes(i)}
						class:flipping={flippingPage === i}
						class:flipping-prev={flippingDirection === 'prev' && flippingPage === i}
						class:flipping-next={flippingDirection === 'next' && flippingPage === i}
						style={flippingPage === i
							? `--flip-progress: ${flipProgress}; 
							 transform: rotateY(${
									flippingDirection === 'next' ? -180 * flipProgress : 180 * (1 - flipProgress)
								}deg);`
							: ''}
					>
						<div class="page-content">
							{#if pdfPageCanvases[i]}
								<img
									src={pdfPageCanvases[i].toDataURL('image/jpeg')}
									alt={`Pagina PDF ${i + 1}`}
									class="page-img"
									draggable="false"
								/>
							{:else}
								<div class="page-placeholder">
									<p>Pagina {i + 1} non disponibile</p>
								</div>
							{/if}
						</div>
						<div class="page-back"></div>
					</div>
				{/each}
			</div>
		</div>

		<div class="controls" role="toolbar" aria-label="Controlli di navigazione del flipbook">
			<button
				class="control-btn"
				on:click={goToFirst}
				disabled={currentPage <= 1 || pageFlipping}
				aria-label="Prima pagina"
			>
				<span aria-hidden="true">⏮️</span>
			</button>
			<button
				class="control-btn"
				on:click={prevPage}
				disabled={currentPage <= 1 || pageFlipping}
				aria-label="Pagina precedente"
			>
				<span aria-hidden="true">◀️</span>
			</button>
			<span class="page-indicator" aria-live="polite">Pagina {currentPage} di {totalPages}</span>
			<button
				class="control-btn"
				on:click={nextPage}
				disabled={currentPage >= totalPages - 1 || pageFlipping}
				aria-label="Pagina successiva"
			>
				<span aria-hidden="true">▶️</span>
			</button>
			<button
				class="control-btn"
				on:click={goToLast}
				disabled={currentPage >= totalPages - 1 || pageFlipping}
				aria-label="Ultima pagina"
			>
				<span aria-hidden="true">⏭️</span>
			</button>
		</div>

		<div class="instructions">
			<p>Usa i tasti freccia ← → per navigare o trascina le pagine con il mouse</p>
		</div>
	{/if}
</div>

<style>
	.flipbook-container {
		display: flex;
		flex-direction: column;
		align-items: center;
		margin: 20px auto;
		max-width: 100%;
		position: relative;
	}

	.book-wrapper {
		perspective: 2000px;
		transform-style: preserve-3d;
		width: 800px;
		height: 600px;
		margin: auto;
		position: relative;
	}

	.flipbook {
		width: 100%;
		height: 100%;
		position: relative;
		transform-style: preserve-3d;
		transform: translateZ(0);
		box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
		background-color: #f9f7f1;
		border-radius: 5px;
		user-select: none;
		cursor: pointer;
	}

	.book-shadow {
		position: absolute;
		top: 0;
		left: 50%;
		width: 20px;
		height: 100%;
		transform: translateX(-50%);
		background: radial-gradient(rgba(0, 0, 0, 0.2) 0%, rgba(0, 0, 0, 0.05) 80%, transparent 100%);
		z-index: 5;
		pointer-events: none;
	}

	.page {
		position: absolute;
		width: 50%;
		height: 100%;
		top: 0;
		transform-style: preserve-3d;
		transform-origin: left center;
		transition: transform 0s;
		backface-visibility: hidden;
		transform: rotateY(0deg);
		display: none;
		overflow: hidden;
	}

	.page.active {
		display: block;
	}

	.page.flipping {
		transition: transform 0s;
		z-index: 100;
	}

	.page.flipping-next {
		transform-origin: left center;
	}

	.page.flipping-prev {
		transform-origin: right center;
	}

	/* Prima pagina (sinistra) */
	.page.active:nth-child(odd) {
		left: 0;
		z-index: 1;
	}

	/* Seconda pagina (destra) */
	.page.active:nth-child(even) {
		left: 50%;
		z-index: 1;
	}

	.page-content {
		position: absolute;
		width: 100%;
		height: 100%;
		backface-visibility: hidden;
		transform-style: preserve-3d;
	}

	.page-back {
		position: absolute;
		width: 100%;
		height: 100%;
		top: 0;
		left: 0;
		transform: rotateY(180deg) translateZ(1px);
		backface-visibility: hidden;
		background-color: #f9f7f1;
		box-shadow: inset -10px 0 20px rgba(0, 0, 0, 0.1);
	}

	/* Effetto ombra per il bordo della pagina */
	.page.active:nth-child(odd)::after {
		content: '';
		position: absolute;
		right: 0;
		top: 0;
		width: 30px;
		height: 100%;
		background: linear-gradient(to right, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.2));
		z-index: 2;
		pointer-events: none;
	}

	.page.active:nth-child(even)::before {
		content: '';
		position: absolute;
		left: 0;
		top: 0;
		width: 30px;
		height: 100%;
		background: linear-gradient(to left, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.1));
		z-index: 2;
		pointer-events: none;
	}

	.page-img {
		width: 100%;
		height: 100%;
		object-fit: contain;
		user-select: none;
		pointer-events: none;
		box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.1);
		background-color: white;
	}

	.page-placeholder {
		width: 100%;
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		background-color: #f0f0f0;
		color: #999;
		font-style: italic;
	}

	.controls {
		display: flex;
		justify-content: center;
		align-items: center;
		margin-top: 20px;
		gap: 10px;
	}

	.control-btn,
	.reload-btn,
	.force-load-btn {
		background-color: #f0f0f0;
		border: 1px solid #ddd;
		border-radius: 4px;
		padding: 8px 12px;
		cursor: pointer;
		transition: all 0.2s ease;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.control-btn:hover:not(:disabled),
	.reload-btn:hover,
	.force-load-btn:hover {
		background-color: #e0e0e0;
	}

	.control-btn:disabled {
		opacity: 0.5;
		cursor: not-allowed;
	}

	.reload-btn {
		background-color: #4caf50;
		color: white;
		border: none;
		margin-top: 10px;
		padding: 10px 20px;
	}

	.reload-btn:hover {
		background-color: #45a049;
	}

	.force-load-btn {
		background-color: #3498db;
		color: white;
		border: none;
		margin-top: 15px;
		padding: 8px 16px;
		font-size: 14px;
	}

	.force-load-btn:disabled {
		background-color: #95a5a6;
		cursor: not-allowed;
	}

	.force-load-btn:hover:not(:disabled) {
		background-color: #2980b9;
	}

	.page-indicator {
		margin: 0 15px;
		font-size: 14px;
	}

	.instructions {
		margin-top: 10px;
		font-size: 12px;
		color: #666;
		text-align: center;
	}

	.loading-spinner {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		height: 600px;
		width: 100%;
	}

	.error-message {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		height: 600px;
		width: 100%;
		background-color: #f8d7da;
		border: 1px solid #f5c6cb;
		color: #721c24;
		border-radius: 4px;
		padding: 20px;
		text-align: center;
	}

	.spinner {
		border: 4px solid rgba(0, 0, 0, 0.1);
		border-radius: 50%;
		border-top: 4px solid #3498db;
		width: 40px;
		height: 40px;
		animation: spin 1s linear infinite;
		margin-bottom: 10px;
	}

	@keyframes spin {
		0% {
			transform: rotate(0deg);
		}
		100% {
			transform: rotate(360deg);
		}
	}

	.hidden {
		display: none;
	}

	/* Aggiungi effetti 3D per simulare le pagine curve durante lo sfogliamento */
	.page.flipping::after {
		content: '';
		position: absolute;
		top: 0;
		width: 100%;
		height: 100%;
		background: linear-gradient(
			to right,
			rgba(0, 0, 0, 0.05) 0%,
			rgba(0, 0, 0, 0.01) 20%,
			rgba(0, 0, 0, 0.05) 50%,
			rgba(0, 0, 0, 0.2) 100%
		);
		z-index: 3;
		pointer-events: none;
		opacity: calc(var(--flip-progress) * 2);
	}

	/* Aggiungi effetto di incurvamento alla pagina durante lo sfogliamento */
	.page.flipping .page-content {
		box-shadow: calc(var(--flip-progress) * -30px) 0 30px rgba(0, 0, 0, 0.15);
	}

	.page.flipping .page-back {
		box-shadow: calc(var(--flip-progress) * 30px) 0 30px rgba(0, 0, 0, 0.15);
	}
</style>
