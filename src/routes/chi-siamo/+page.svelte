<!-- +page.svelte -->
<script>
	import TeamMember from '$lib/components/about/TeamMember.svelte';
	import Timeline from '$lib/components/about/Timeline.svelte';
	import Flipbook from '$lib/components/about/Flipbook.svelte';

	const team = [
		{
			name: 'Elena Sanguinetti',
			role: 'General Manager',
			image: '/img/team/elena.jpg',
			email: 'elena@womblab.com',
			linkedin: 'https://www.linkedin.com/in/elena-sanguinetti-b696931a1/'
		},
		{
			name: 'Francesca Giordano',
			role: 'Digital Projects Manager',
			image: '/img/team/francesca.jpg',
			email: 'segreteria@womblab.com',
			linkedin: 'https://www.linkedin.com/in/francescagiordano92/'
		},
		{
			name: 'Giorgia Zandonà',
			role: 'Digital Projects Manager',
			image: '/img/team/giorgia.jpg',
			email: 'trainingecm@womblab.com',
			linkedin: 'https://www.linkedin.com/in/giorgia-zandon%C3%A0-8b40b3259/'
		},
		{
			name: 'Ivan Menzio',
			role: 'Business Development<br\>Manager and Creative Consultant',
			image: '/img/team/ivan.jpg',
			email: 'events@womblab.com',
			linkedin: 'https://www.linkedin.com/in/ivanmenzio/'
		},
		{
			name: "Sofia D'onofrio",
			role: 'Senior Project Manager & Event Specialist',
			image: '/img/team/sofia.jpg',
			email: 'sofia@womblab.com',
			linkedin: 'https://www.linkedin.com/in/sofia-maria-d-onofrio-29b581144/'
		},
		{
			name: 'Greta Sibona',
			role: 'Project Manager & Event Specialist',
			image: '/img/team/greta.jpg',
			email: 'greta@womblab.com',
			linkedin: 'https://www.linkedin.com/in/greta-sibona-3114141a2/'
		},
		{
			name: 'Alice Esposito',
			role: 'Project Manager & Event Specialist',
			image: '/img/team/alice.jpg',
			email: 'alice@womblab.com',
			linkedin: 'https://www.linkedin.com/in/alice-esposito-37905a186/'
		},
		{
			name: 'Anna Finessi',
			role: 'Account Manager',
			image: '/img/team/nina.jpg',
			email: 'marketing@womblab.com',
			linkedin: 'https://www.linkedin.com/company/womblab-events-communication/posts/?feedView=all'
		},
		{
			name: 'Anna Maffione',
			role: 'Administration Specialist',
			image: '/img/team/anna.jpg',
			email: 'anna@womblab.com',
			linkedin: 'https://www.linkedin.com/in/anna-maffione-0357514b/'
		},
		{
			name: 'Gemma Paccazocco',
			role: 'Business Travel Manager',
			image: '/img/team/gemma.jpg',
			email: 'businesstravel@womblab.com',
			linkedin: 'https://www.linkedin.com/in/gemma-paccazocco-92340945/'
		},
		{
			name: 'Federico Aprile',
			role: 'Graphic Designer',
			image: '/img/team/federico.jpg',
			email: 'federico@womblab.com',
			linkedin: 'https://www.linkedin.com/in/federico-aprile-7a32ab22a/'
		},
		{
			name: 'Antonio Astorino',
			role: 'Graphic Designer',
			image: '/img/team/antonio.jpg',
			email: 'grafica@womblab.com',
			linkedin: 'https://www.linkedin.com/in/antonio-astorino-782611198/'
		},
		{
			name: 'Ginevra Pilone',
			role: 'Events Manager',
			image: '/img/team/ginni.jpg',
			email: 'ginevra@womblab.com',
			linkedin: 'https://www.linkedin.com/in/ginevra-pilone-0732492ba/'
		},
		{
			name: 'Giorgia Aluffi',
			role: 'Administration Specialist',
			image: '/img/team/aluffi.jpg',
			email: 'giorgia@womblab.com',
			linkedin: 'https://www.linkedin.com/in/giorgia-aluffi-728695149/'
		},
		{
			name: 'Silvia Bonfante',
			role: 'Business Travel',
			image: '/img/team/silvia.jpg',
			email: 'accomodation@womblab.com',
			linkedin: 'https://www.linkedin.com/in/silvia-bonfante-3b855a39/'
		}
	];

	const timeline = [
		{ year: '2012', text: 'Fondazione di Womblab' },
		{ year: '2013', text: 'Diventiamo Provider accreditato Agenas' },
		{
			year: '2014',
			text: 'Siamo la segreteria scientifica del Collegio Italiano dei Primari di Chirurgia Vascolare'
		},
		{ year: '2020', text: 'Espansione in ambito FAD e digitale' },
		{ year: '2020', text: 'Siamo la segreteria delegata del Collegio Italiano di Flebologia' },
		{ year: '2025', text: 'Entriamo nel mondo dei Grandi Eventi' }
	];
</script>

<section class="mx-auto max-w-4xl px-6 py-16 text-center">
	<h1 class="text-center text-3xl font-bold md:text-4xl lg:text-5xl">
		<span class="relative z-10 inline-block">
			Chi Siamo
			<span
				class="absolute bottom-2 left-0 -z-10 h-3 w-full -rotate-1 skew-x-3 transform bg-green-200"
			></span>
		</span>
	</h1>
	<p class="mx-auto max-w-2xl text-lg text-zinc-700">
		Siamo un'agenzia specializzata nell’organizzazione di eventi e nella comunicazione scientifica.
		Crediamo nella formazione accessibile, nella cura dei dettagli e nella forza delle relazioni.
	</p>
</section>

<!-- Timeline -->
<section class="mx-auto max-w-4xl px-6 pb-16">
	<Timeline items={timeline} />
</section>

<section class="mx-auto ">
	<Flipbook />
</section>

<!-- Team Section -->
<section class="mx-auto max-w-6xl px-6 py-16">
	<h2 class="mb-12 text-center text-3xl font-semibold">Il nostro team</h2>

	<!-- Boss on top -->
	{#if team[0]}
		<div class="mb-16 grid place-content-center">
			<div class="max-w-[400px]">
				<TeamMember
					name={team[0].name}
					role={team[0].role}
					image={team[0].image}
					email={team[0].email}
					linkedin={team[0].linkedin}
				/>
			</div>
		</div>
	{/if}

	<!-- Grid for rest -->
	<div class="grid gap-8 sm:grid-cols-2 md:grid-cols-3">
		{#each team.slice(1) as member}
			<TeamMember {...member} />
		{/each}
	</div>
</section>
