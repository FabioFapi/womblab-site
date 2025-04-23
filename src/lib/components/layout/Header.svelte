<script>
	import DrawerMenu from '$lib/components/layout/DrawerMenu.svelte';

	let drawerOpen = false;

	let user = {
		name: 'Nome Cognome',
		email: 'email@example.com'
	};

	function toggleDrawer() {
		drawerOpen = !drawerOpen;
	}

	function closeDrawer() {
		drawerOpen = false;
	}
</script>

<header class="sticky top-0 z-50 flex h-14 items-center bg-white px-4 shadow-md">
	<!-- Icona hamburger -->
	<button on:click={toggleDrawer} class="ripple-effect mr-3">
		<svg
			class="h-6 w-6 text-gray-800"
			fill="none"
			stroke="currentColor"
			stroke-width="2"
			viewBox="0 0 24 24"
		>
			<path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16" />
		</svg>
	</button>

	<div class="absolute left-1/2 -translate-x-1/2 transform">
		<img src="/WombLab_favicon-32-32.png" alt="Logo" class="h-8" />
	</div>
</header>

<DrawerMenu {drawerOpen} bind:open={drawerOpen} {user} onClose={closeDrawer} />
