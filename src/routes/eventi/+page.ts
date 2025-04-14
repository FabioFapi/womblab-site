import { fetchEvents } from '$lib/utils/api';

export const load = async () => {
	try {
		const events = await fetchEvents();

		const sorted = events
			?.filter((e) => e?.date && e?.title) // evita dati corrotti
			.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

		return {
			events: sorted ?? []
		};
	} catch (error) {
		console.error('Errore nel caricamento eventi:', error);
		return {
			events: []
		};
	}
};
