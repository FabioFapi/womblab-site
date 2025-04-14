import { fetchEvents } from '$lib/utils/api';

export const load = async ({ params }) => {
	const events = await fetchEvents();
	const event = events.find(e => e.id == params.id);

	if (!event) {
		throw new Error(`Evento con ID ${params.id} non trovato`);
	}

	return {
		event
	};
};
