<script>
	import { page } from '$app/stores';
	$: path = $page.url.pathname;
</script>

<nav class="fixed right-0 bottom-0 left-0 z-50 border-t border-gray-200 bg-white shadow md:hidden">
	<div class="flex justify-around text-center text-sm text-gray-500">
		<a
			href="/"
			class="flex w-full flex-col items-center justify-center py-2"
			class:bottom-tab-active={path === '/'}
		>
			<svg
				class="mb-1 h-6 w-6"
				fill="none"
				stroke="currentColor"
				stroke-width="2"
				viewBox="0 0 24 24"
			>
				<path stroke-linecap="round" stroke-linejoin="round" d="M3 12l9-9 9 9M4 10v10h16V10" />
			</svg>
			<span class="text-xs">Home</span>
		</a>

		<a
			href="/eventi"
			class="flex w-full flex-col items-center justify-center py-2"
			class:bottom-tab-active={path.startsWith('/eventi')}
		>
			<svg
				class="mb-1 h-6 w-6"
				fill="none"
				stroke="currentColor"
				stroke-width="2"
				viewBox="0 0 24 24"
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
				/>
			</svg>
			<span class="text-xs">Eventi</span>
		</a>

		<a
			href="/servizi"
			class="flex w-full flex-col items-center justify-center py-2"
			class:bottom-tab-active={path.startsWith('/servizi')}
		>
			<svg
				class="mb-1 h-6 w-6"
				fill="none"
				stroke="currentColor"
				stroke-width="2"
				viewBox="0 0 24 24"
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0a9 9 0 01-18 0"
				/>
			</svg>
			<span class="text-xs">Servizi</span>
		</a>
	</div>
</nav>

<style>
	.bottom-tab-active {
		color: #059669;
	}
</style>
