import { fetchEvents } from '$lib/utils/api';

export const load = async () => {
	try {
		const events = await fetchEvents();

		const relevantTypes = ['FAD', 'RES', 'campagna'];
		const filtered = events?.filter(
			(e) => relevantTypes.includes(e?.type) && e?.date && e?.title
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
