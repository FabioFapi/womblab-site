<script>
	import DefaultServicePage from '$lib/components/events/DefaultServicePage.svelte';
	import MultimediaServicePage from '$lib/components/events/MultimediaServicePage.svelte';
	import ComunicazioneServicePage from '$lib/components/events/ComunicazioneServicePage.svelte';
	import EventiServicePage from '$lib/components/events/EventiServicePage.svelte';
	export let data;
  const { service } = data;
</script>

{#if service.layout === 'multimedia'}
  <MultimediaServicePage {service} />
{:else if service.layout === 'comunicazione'}
  <ComunicazioneServicePage {service} />
{:else if service.layout === 'eventi'}
  <EventiServicePage {service} />
{:else}
  <DefaultServicePage {service} />
{/if}