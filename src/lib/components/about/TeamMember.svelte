<script>
	export let name;
	export let role;
	export let image;
	export let email = null;
	export let linkedin = null;
</script>

<div class="text-center group bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300">
	<div class="aspect-[3/4] overflow-hidden relative">
		<img
			src={image}
			alt={name}
			class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
		/>
		<div class="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
	</div>

	<div class="p-4">
		<h3 class="text-lg font-semibold text-zinc-800 group-hover:text-green-600 transition-colors">{name}</h3>
		<p class="text-sm text-zinc-500 mt-1">{@html role}</p>

		<div class="mt-3 flex justify-center gap-4">
			{#if email}
				<a 
					href={`mailto:${email}`} 
					class="text-zinc-400 hover:text-green-600 transition-colors duration-300 flex items-center justify-center h-8 w-8 rounded-full hover:bg-green-50"
					title="Invia email"
				>

					<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
						<path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
						<polyline points="22,6 12,13 2,6"></polyline>
					</svg>
				</a>
			{/if}
			{#if linkedin}
				<a 
					href={linkedin} 
					target="_blank" 
					rel="noopener noreferrer" 
					class="text-zinc-400 hover:text-blue-600 transition-colors duration-300 flex items-center justify-center h-8 w-8 rounded-full hover:bg-blue-50"
					title="Profilo LinkedIn"
				>

					<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
						<path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
					</svg>
				</a>
			{/if}
		</div>
	</div>
</div>