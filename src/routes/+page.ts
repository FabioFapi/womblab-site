import { fetchEvents } from '$lib/utils/api';

export const load = async () => {
	const events = await fetchEvents();
	console.log('👉 Eventi dopo mapping:', events); // AGGIUNTO

	return {
		events
	};
};
