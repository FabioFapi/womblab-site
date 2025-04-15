<script>
	export let items = [];
</script>

<div class="relative py-12">
	<div class="absolute top-1/2 right-0 left-0 h-0.5 -translate-y-1/2 bg-green-400"></div>

	<div class="relative flex justify-between px-4">
		{#each items as item, i}
			<div class="flex flex-col items-center">
				<div class="mb-6 text-center">
					<p class="text-sm font-bold text-green-600">{item.year}</p>
				</div>

				<div
					class="relative z-10 h-4 w-4 rounded-full border-2 border-white bg-green-500 shadow-md"
				></div>

				<div class="mt-6 w-32 text-center">
					<p class="text-xs text-zinc-800">{item.text}</p>
				</div>
			</div>
		{/each}
	</div>
</div>
