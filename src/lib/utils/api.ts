export async function fetchEvents(customFetch = fetch) {
	// Verifica subito se abbiamo dati in cache
	if (typeof localStorage !== 'undefined') {
		const cachedData = localStorage.getItem('eventsData');
		if (cachedData) {
			console.log('Restituendo dati dalla cache immediatamente');

			// Avvia un aggiornamento in background dopo aver restituito i dati in cache
			setTimeout(() => {
				fetchFreshEvents(customFetch).catch(console.error);
			}, 100);

			return JSON.parse(cachedData);
		}
	}

	// Se non ci sono dati in cache, esegui la fetch normale
	return fetchFreshEvents(customFetch);
}

// Funzione separata per eseguire il fetch e aggiornare la cache
async function fetchFreshEvents(customFetch = fetch) {
	try {
		// Imposta un timeout per la chiamata API
		const controller = new AbortController();
		const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 secondi timeout

		const res = await customFetch(
			'https://script.google.com/macros/s/AKfycbxebmZ4scTMxi1sBQy3sqZzbGvQqQfV45zG5I6IakLWAyLpk7zQS-XYajr5svMpelVFrQ/exec',
			{ signal: controller.signal }
		);

		clearTimeout(timeoutId);

		if (!res.ok) {
			console.error(`Errore API: ${res.status}`);
			// Gestione cache come backup
			if (typeof localStorage !== 'undefined') {
				const cachedData = localStorage.getItem('eventsData');
				if (cachedData) {
					console.log('Utilizzando dati in cache dopo errore API');
					return JSON.parse(cachedData);
				}
			}
			throw new Error(`Errore nel recupero eventi: ${res.status}`);
		}

		const data = await res.json();

		const formattedData = data.map((e) => ({
			id: e.id,
			title: e.titolo,
			image: e.immagine,
			description: e.presentazione,
			date: e.data,
			location: e.luogo,
			geoLocation: e.localizzazione,
			registrationStart: e.inizioIscrizioni,
			registrationEnd: e.fineIscrizioni,
			eventCode: e.codiceEvento,
			registrationFee: e.quotaIscrizione,
			ecm: e.ecm,
			professions: e.professioni,
			status: e.stato,
			type: e.tipo,
			link: e.linkIscrizione
		}));

		// Salva in cache solo nel browser
		if (typeof localStorage !== 'undefined') {
			localStorage.setItem('eventsData', JSON.stringify(formattedData));
		}

		return formattedData;
	} catch (error) {
		console.error('Errore durante il recupero degli eventi:', error);

		// Prova a usare i dati in cache se disponibili
		if (typeof localStorage !== 'undefined') {
			const cachedData = localStorage.getItem('eventsData');
			if (cachedData) {
				console.log('Utilizzando dati in cache');
				return JSON.parse(cachedData);
			}
		}

		console.log('Nessun dato disponibile, restituendo array vuoto');
		return [];
	}
}
