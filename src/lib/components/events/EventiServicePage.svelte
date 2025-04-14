<script>
	export let service = {};
</script>

<section class="relative mx-auto max-w-6xl px-6 py-20 text-zinc-800">
	<a
		href="/servizi"
		class="group mb-6 inline-flex items-center text-sm text-green-600 transition-colors duration-300 hover:text-green-800"
	>
		<svg
			class="mr-2 h-4 w-4 transform transition-transform duration-300 group-hover:-translate-x-1"
			fill="none"
			stroke="currentColor"
			viewBox="0 0 24 24"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"
			></path>
		</svg>
		Torna ai servizi
	</a>
	<!-- Banner decorativo superiore -->
	<div
		class="absolute top-0 right-0 left-0 -z-10 h-32 bg-gradient-to-r from-green-50 to-transparent"
	></div>

	<div class="mb-14 text-center">
		<h1 class="text-center text-3xl font-bold text-black md:text-4xl lg:text-5xl">
      <span class="relative z-10 inline-block">
        {service.title}
        <span
          class="absolute bottom-2 left-0 -z-10 h-3 w-full -rotate-1 skew-x-3 transform bg-green-200"
        ></span>
      </span>
    </h1>
		<p class="mx-auto mt-4 max-w-3xl text-lg text-zinc-600">
			Professionalità, competenza e innovazione nei servizi di organizzazione eventi e formazione
		</p>
	</div>

	<div class="grid grid-cols-1 items-start gap-10 md:grid-cols-2">
		<!-- Colonna sinistra -->
		<div class="card">
			<div class="card-header">
				<h2 class="text-2xl font-bold text-green-800">{service.sections?.[0]?.title || ''}</h2>
			</div>
			<div class="card-body">
				{#if service.sections?.[0]?.content}
					{#each service.sections[0].content.split('\n\n') as paragraph, i}
						<p class="mb-4">
							{#if i === 0}
								<span class="accent-text">{paragraph.split('.')[0]}.</span>
								{paragraph.split('.').slice(1).join('.')}
							{:else}
								{paragraph}
							{/if}
						</p>
						{#if i === 0}
							<div class="section-divider"></div>
						{/if}
					{/each}
				{/if}
			</div>
		</div>

		<!-- Colonna destra -->
		<div class="card">
			<div class="card-header">
				<h2 class="text-2xl font-bold text-green-800">{service.sections?.[1]?.title || ''}</h2>
			</div>
			<div class="card-body">
				{#if service.sections?.[1]?.content}
					{#each service.sections[1].content.split('\n\n') as paragraph, i}
						{#if paragraph.includes('- ')}
							<div class="mb-4">
								{#each paragraph.split('\n') as line}
									{#if line.trim().startsWith('- ')}
										<div class="list-item">{line.replace('- ', '')}</div>
									{:else}
										<p class="mb-2">{line}</p>
									{/if}
								{/each}
							</div>
						{:else if i === 0}
							<p class="mb-4">
								<span class="highlight">{paragraph.split('.')[0]}.</span>
								{paragraph.split('.').slice(1).join('.')}
							</p>
							<div class="section-divider"></div>
						{:else}
							<p class="mb-4">{paragraph}</p>
						{/if}
					{/each}
				{/if}

				{#if service.sections?.[1]?.cta}
					<div class="mt-6 text-center ">
						<a href={service.sections[1].cta.url} target="_blank" class="cta-link ">
							{service.sections[1].cta.label}
						</a>
					</div>
				{/if}
			</div>
		</div>
	</div>
</section>

<style>
	.page-title {
		background: linear-gradient(120deg, #155e3a 0%, #22c55e 100%);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
		margin-bottom: 2rem;
		position: relative;
		display: inline-block;
	}

	.title-decorator {
		position: absolute;
		bottom: -0.5rem;
		left: -0.25rem;
		width: 60%;
		height: 0.75rem;
		background-color: rgba(34, 197, 94, 0.2);
		transform: rotate(-1deg) skewX(15deg);
		z-index: -1;
		border-radius: 2px;
		transition: all 0.4s ease;
	}

	.title-decorator:hover {
		width: 80%;
		transform: rotate(-2deg) skewX(5deg);
	}

	.card {
		background-color: white;
		border-radius: 1rem;
		box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
		overflow: hidden;
		position: relative;
		transition: all 0.3s ease;
	}

	.card:hover {
		transform: translateY(-8px);
		box-shadow:
			0 20px 25px -5px rgba(0, 0, 0, 0.1),
			0 10px 10px -5px rgba(0, 0, 0, 0.04);
	}

	.card-header {
		position: relative;
		padding: 1.5rem;
		border-bottom: 1px solid rgba(220, 252, 231, 0.5);
		background: linear-gradient(to right, #f0fdf4, white);
	}

	.card-header h2 {
		position: relative;
		display: inline-block;
		margin-bottom: 0;
	}

	.card-header h2::after {
		content: '';
		position: absolute;
		bottom: -6px;
		left: 0;
		width: 0;
		height: 3px;
		background-color: #16a34a;
		transition: width 0.4s ease;
	}

	.card:hover .card-header h2::after {
		width: 100%;
	}

	.card-body {
		padding: 1.5rem;
		line-height: 1.7;
	}

	.cta-link {
		display: inline-block;
		padding: 0.75rem 1.5rem;
		background-color: #16a34a;
		color: white;
		font-weight: 500;
		border-radius: 1.5rem;
		text-decoration: none;
		transition: all 0.3s ease;
		margin-top: 1rem;
		position: relative;
		overflow: hidden;
	}

	.cta-link::before {
		content: '';
		position: absolute;
		top: 0;
		left: -100%;
		width: 100%;
		height: 100%;
		background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
		transition: all 0.6s ease;
	}

	.cta-link:hover {
		background-color: #15803d;
		transform: translateY(-2px);
		box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
	}

	.cta-link:hover::before {
		left: 100%;
	}

	.highlight {
		background-color: rgba(34, 197, 94, 0.1);
		padding: 0.25rem 0.5rem;
		border-radius: 0.25rem;
		font-weight: 500;
	}

	.list-item {
		position: relative;
		padding-left: 1.5rem;
		margin-bottom: 0.75rem;
	}

	.list-item::before {
		content: '•';
		position: absolute;
		left: 0.25rem;
		color: #16a34a;
		font-size: 1.2rem;
		line-height: 1;
		font-weight: bold;
		opacity: 0.8;
		transition: all 0.3s ease;
	}

	.card:hover .list-item::before {
		transform: scale(1.2);
		color: #15803d;
	}

	.accent-text {
		color: #16a34a;
		font-weight: 500;
	}

	.section-divider {
		height: 5px;
		width: 15%;
		background: linear-gradient(to right, #16a34a, transparent);
		margin: 1rem 0;
		border-radius: 1rem;
	}
</style>
