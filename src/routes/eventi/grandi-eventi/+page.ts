import { fetchEvents } from '$lib/utils/api';

export const load = async () => {
	try {
		const events = await fetchEvents();

		const filtered = events?.filter(
			(e) => e?.type === 'grandi-eventi' && e?.date && e?.title
		);

		const sorted = filtered.sort(
			(a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
		);

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

