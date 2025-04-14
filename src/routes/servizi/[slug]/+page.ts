// src/routes/servizi/[slug]/+page.ts
import type { PageLoad } from './$types';

const services = {
	'eventi-formazione': {
		slug: 'eventi-formazione',
		title: 'Eventi & Formazione',
		layout: 'eventi',
		sections: [
			{
				title: 'WHAT WE DO',
				content: `
Womblab nasce per ideare e organizzare eventi e congressi nel settore medico-scientifico.  
Questa è la nostra specialità, il terreno sul quale abbiamo fondato la nostra storia.

La nostra agenzia si occupa di coordinare ogni fase dell’iter organizzativo prendendosi cura di ogni dettaglio e valorizzando con competenza e creatività ogni aspetto operativo.  
Siamo un’agenzia moderna al vostro servizio.
        `.trim()
			},
			{
				title: 'PROVIDER ECM RES & FAD',
				content: `
WOMBLAB è stata inserita nell’Albo Nazionale dei Provider dell’AGENAS ed il numero assegnato è 4596.  
In qualità di Provider, la Società può organizzare eventi con crediti ECM (RES e FAD), per l’Educazione continua in medicina, in tutte le specializzazioni della medicina, senza doversi appoggiare ad altre strutture oppure, ad esempio, ASL o società terze Provider.

L’accreditamento come provider costituisce una garanzia di qualità dell’attività svolta, dal punto di vista della pianificazione, del controllo e della valutazione della formazione.  
Ci occupiamo di organizzare convegni, corsi, congressi, eventi formativi, corsi di formazione, tavole rotonde, workshop e simulazioni live sia in Italia che all’estero.

La formazione online  
La piattaforma è stata sviluppata ad hoc per l’erogazione di corsi ECM rispondenti alle specifiche descritte nella normativa AGENAS.  

TIPOLOGIE CORSI DISPONIBILI SULLA PIATTAFORMA TRAINING ECM:  
- PROGRAM TRAINING  
- E-LEARNING  
- WEBINAR  

Sfoglia il nostro catalogo per visualizzare l’offerta formativa.
        `.trim(),
				cta: {
					label: 'TrainingEcm',
					url: 'https://trainingecm.womblab.com'
				}
			}
		]
	},
	'comunicazione-branding': {
		slug: 'comunicazione-branding',
		title: 'Comunicazione & Branding',
		layout: 'comunicazione',
		description: `
    Le particolari esigenze di un congresso scientifico richiedono un know-how organizzativo, tecnico e tecnologico altamente specializzato.
    L’esperienza maturata in quest’ambito è garanzia di visione strategica, efficienza e flessibilità operativa...
  `,
		stats: [
			{ label: 'Training', value: 73 },
			{ label: 'Communication', value: 65 },
			{ label: 'Events', value: 95 },
			{ label: 'Services', value: 56 }
		],
		media: [
			{
				name: 'Infocongressi',
				url: 'https://infocongressi.com',
				logo: '/img/loghi/infocongressi.png'
			},
			{
				name: 'Medici per il Futuro',
				url: 'https://mediciperilfuturo.wordpress.com/',
				logo: '/img/loghi/mediciperilfuturo.png'
			},
			{
				name: 'Quotidiano Sanità',
				url: 'https://www.quotidianosanita.it/',
				logo: '/img/loghi/qs.png'
			}
		]
	},
	multimedia: {
		slug: 'multimedia',
		title: 'Servizi Multimediali',
		layout: 'multimedia',
		configurations: [
			{
				title: 'Centro Slide Base',
				tipoEvento: 'Massimo 4/5 relatori in una sola sala...',
				descrizione: 'N.1 PC collegato ad un mixer video...',
				materiale: [
					'N.1 PC portatile con uscita HDMI',
					'N.1 mixer VIDEO con memoria per immagini',
					'N.1 splitter HDMI',
					'Cavi, scaler per proiettore...'
				],
				pro: 'Economia, velocità di set-up.',
				contro: 'Problemi di aggiungere relazioni evento iniziato.',
				tempoInstallazione: '1 ora',
				note: 'Scarrozzamento necessario – N. 1 persona'
			},
			{
				title: 'Centro Slide Medio',
				tipoEvento: 'Sala Plenaria con molti relatori...',
				descrizione:
					'N. 2 PC in rete tra di loro collegati ad un mixer video che permette di passare tra due immagini di tappo ed una sorgente PC per le prestazioni. Il secondo PC permetterà di caricare, verificare ed eventualmente correggere le slide dei relatori anche durante una presentazione, potrà essere usato anche come backup.L/’avanzamento delle slide viene fatto tramite “presenter slide"(distanza max con PC slide 5/10mt).Due monitor per relatori posizionati a terra (o sul tavolo dei relatori).',
				materiale: [
					'N. 2 PC portatili con uscita HDMI',
					'N. 1 Mixer VIDEO con memoria per immagini tappo',
					'N.2 Presenter slide USB',
					'N.1 Monitor per controllo mixer video',
					'N.2 Monitor almeno 24"N.1 Splitter HDMI',
					'Cavi, Scaler per uscita verso proiettore.'
				],
				pro: 'Possibilità di gestione/caricamento slide durante l’evento, possibilità di backup, collegamento di un PC di un relatore.',
				contro: '/',
				tempoInstallazione: '3 Ore (dipende dalle problematiche legate al passaggio dei cavi).',
				note: 'Sopralluogo necessario – N. 2 persone'
			},
			{
				title: 'Centro Slide Avanzato',
				tipoEvento:
					'Molti relatori (situazione di sala plenaria) e gestione di file centralizzata tramite rete per altre sale con centro slide.',
				descrizione:
					'Due PC in rete tra di loro collegati ad un mixer video che permette di passare tra due immagini di tappo ed una sorgente PC per le presentazioni.Il secondo PC permetterà di caricare, verificare ed eventualmente correggere le slide dei relatori anche in corso di una presentazione,potrà essere utilizzato come backup.Predisposizione con slaler per collegamento PC/MAC dei relatori.L/’avanzamento delle slide viene fatto tramite podio con monitor integrato touch screen.Due monitor per relatori posizionati a terra o su tavolo relatori.Altri due PC portatili saranno presenti nella sala centro slide e saranno collegati in rete con le altre sale.',
				materiale: [
					'N. 2 PC portatili con uscita HDMI.',
					'N. 1 Mixer VIDEO con memoria per immagini tappo.',
					'N. 2 Presenter slide USB.',
					'N. 1 Monitor per controllo mixer video.',
					'N. 2 Monitori almeno 24" per relatori.',
					'N. 2 Splitter HDMI.',
					'Cavi, Scaler per uscita verso proiettore.',
					'N.1 podio con PC e monitor touch screen integrato.',
					'N. 2 PC portatili per raccolta slide, switch di rete con cavi (distanza massima 90/100 mt).'
				],
				pro: 'Gestione centralizzata delle slide e podio touch personalizzabile.',
				contro: 'Limite fisico per il cablaggio in rete delle sale ove non esiste in struttura.',
				tempoInstallazione: '3/4 Ore (dipende dalle problematiche legate al passaggio dei cavi).',
				note: 'Sopralluogo necessario per passaggio e lunghezza cavi, layout sala con set-up,N. 2+1 persone (raccolta slide).'
			},
			{
				title: 'Centro Slide Avanzato + Relatore live sottotitolato (con loghi)',
				tipoEvento:
					'Situazione di sala plenaria, con molti relatori. Gestione di file centralizzata tramite rete per altre sale con centro slide.',
				descrizione:
					'N. 2 PC in rete tra di loro collegati ad un mixer video che permette di passare tra due immagini di tappo ed una sorgente PC per le presentazioni.Il secondo PC permetterà di caricare, verificare ed eventualmente correggere le slide dei relatori anche in corso di una presentazione, potrà essere utilizzato come backup.Predisposizione con slaler per collegamento PC/MAC dei relatori.L/’avanzamento delle slide viene fatto tramite podio con monitor integrato touch screen.Due monitor per relatori posizionati a terra o su tavolo relatori.Altri due PC portatili saranno presenti nella sala centro slide e saranno collegati in rete con le altre sale.Uno o più monitor dedicati con live video del relatore con sottotitoli, loghi e grafica personalizzata.',
				materiale: [
					'N. 2 PC portatili con uscita HDMI.',
					'N. 1 Mixer VIDEO con memoria per immagini tappo.',
					'N. 2 Presenter slide USB.',
					'N. 1 Monitor per controllo mixer video.',
					'N. 2 Monitori almeno 24" per relatori.',
					'N. 4 Splitter HDMI.',
					'Cavi, Scaler per uscita verso proiettore.',
					'N.1 podio con PC e monitor touch screen integrato.',
					'N. 1 Monitor 50" con piantana da terra.',
					'N. 1 telecamera fissa su relatore.',
					'N. 2 PC portatili per raccolta slide, switch di rete con cavi (distanza massima 90/100 mt).'
				],
				pro: 'Impatto scenico molto forte',
				contro: 'Limite fisico per il cablaggio in rete delle sale ove non esiste in struttura.',
				tempoInstallazione: '4 Ore (dipende dalle problematiche legate al passaggio dei cavi).',
				note: 'Sopralluogo necessario per passaggio e lunghezza cavi, layout sala con set-up,N. 3+1 persone (raccolta slide).'
			},
			{
				title: 'Sala operatoria',
				tipoEvento: '	Riprese in sala operatoria',
				descrizione:
					'Le riprese in sala operatoria possono essere realizzate con una o due telecamere professionali,più il recupero dei file delle apparecchiature strumentali con la qualità degli strumenti stessi dopo previa verifica del segnale video.La trasmissione in diretta verso la regia per l/’eventuale trasmissione in streaming e la registrazione separata delle camere o del mixato.',
				materiale: [
					'Una o due telecamere professionali con aggiunta di ottica se è necessario, due cavalletti, radiomicrofono, collegamento alla regia se serve la diretta o con cavi o creazione di rete wi-fi dalla sala operatoria alla regia con mixer video,',
					'sistemi di registrazione degli strumenti in base al loro segnale, Sd pal, HDMI, SDI.',
					'N. 2 persone nella situazione più completa.',
					'N.1 persona se si utilizza una sola telecamera e registrazione degli strumenti.'
				],
				pro: 'Ottima se utilizzato il sistema completo.',
				contro: 'Limite fisico per il cablaggio in rete delle sale ove non esiste in struttura.',
				tempoInstallazione: '3/4 Ore (dipende dalle problematiche legate al passaggio dei cavi).',
				note: 'Sopralluogo necessario per passaggio e lunghezza cavi, layout sala con set-up.Prezzobase N. 1 persona N.1 Camera N.1 Strumento,medio N. 2 Camere N. 2 StrumentiExtra (Ripreventinare)N. 2/3 persone.'
			},
			{
				title: 'Live surgery',
				tipoEvento: '	Diretta e ripresa da una sala operatoria verso terzi.',
				descrizione:
					'Le riprese in sala operatoria possono essere realizzate con una o due telecamere professionali,più il recupero dei file delle apparecchiature strumentali con la qualità degli strumenti stessi dopo previa verifica del segnale video.La trasmissione in diretta verso la regia per l/’eventuale trasmissione in streaming e la registrazione separata delle camere o del mixato.Il tutto trasmesso in diretta attraverso una regia televisiva.',
				materiale: [
					'Una o due telecamere professionali con aggiunta di ottica se è necessario, due cavalletti, radiomicrofono, collegamento alla regia se serve la diretta o con cavi o creazione di rete wi-fi dalla sala operatoria alla regia con mixer video,',
					'sistemi di registrazione degli strumenti in base al loro segnale, Sd pal, HDMI, SDI.',
					'N. 2 persone nella situazione più completa.',
					'N.1 persona se si utilizza una sola telecamera e registrazione degli strumenti.',
					'N. 1 persona in regia.'
				],
				pro: 'INTERAZIONE COSTANTE CON IL CASO CLINICO',
				contro: '	/',
				tempoInstallazione: '4 Ore',
				note: 'Sopralluogo necessario,N. 3/4 persone.'
			},
			{
				title: 'Live convegni riprese relatore pubblico tavolo relatori',
				tipoEvento:
					'Valido in una situazione di sala plenaria, con molti relatori e gestione file centralizzata tramite rete per altre sale con centro slide. Con monitor dedicati per il live del relatore con sottotitoli e loghi.',
				descrizione:
					'Da una a tre telecamere professionali con controllo mixer regia e registrazione camere da remoto, più mixato comprensivo se necessario del mixato dello streaming.',
				materiale: [
					'Da una o due telecamere professionali, tre cavalletti, collegamento audio dal mixer sala, mixer video da collegare al mixer dello streaming, collegamenti con cavi o creazione di una rete wifi. Servono 2/3 persone in base all’evento (se le camere devono lavorare molto sui relatori).'
				],
				pro: 'Impatto scenico molto forte, qualità del prodotto.',
				contro: 'Limite fisico per il cablaggio in rete delle sale ove non sistente in struttura.',
				tempoInstallazione: '4 Ore (dipende da problematiche legate al passaggio dei cavi).',
				note: 'Sopralluogo necessario per passaggio e lunghezza cavi, layout sala con set-up.N. 1 persona N. 1 camera / N. 2 persone N. 2 camere'
			},
			{
				title: "Backstage o riprese in esterno per l'evento",
				tipoEvento: 'Riprese per backstage.',
				descrizione:
					'Riprese con una telecamera professionale durante l’evento per creare del materiale utile alla realizzazione di promo o materiale pubblicitario. Sistemazione di montaggio, grafica e storyboard.',
				materiale: [
					'N. 1 telecamera professionale, N. 1 radiomicrofono, N. 1 cavalletto, un eventuale boom, se serve una telecamera “OSMO" per situazioni di impatto, molto estetico.'
				],
				pro: 'Ottimo se utilizzato il sistema completo.',
				contro: '	/',
				tempoInstallazione: '30 Minuti.',
				note: '	1/2 persone necessarie.'
			},
			{
				title: 'Video Contest',
				tipoEvento:
					'Eventi online (ECM/FAD). piccoli eventi aziendali convegni fino alle più grandi sale plenarie',
				descrizione:
					'Il lavoro s basa sulla ricezione di un quiz via mail al quale l’utente risponde in maniera semplice ed immediato.',
				materiale: ['	Rete di Internet, Pc, Proiettore'],
				pro: 'Veloce, immediato, personalizzabile, sicuro.',
				contro: '	/',
				tempoInstallazione: '1 ora.',
				note: ''
			}
		]
	}
};

export const load: PageLoad = async ({ params }) => {
	const service = services[params.slug];

	if (!service) {
		throw new Error('Servizio non trovato');
	}

	return { service };
};
