<script>
    import UserProfileHeader from './UserProfileHeader.svelte';
    export let user;
    export let open = false;
    export let onClose = () => {};
  </script>
  
  {#if open}
    <div on:click={onClose} class="fixed inset-0 bg-black/40 z-40"></div>
  {/if}
  
  <aside class="fixed left-0 top-0 w-64 h-full bg-white z-50 shadow transform transition-transform duration-300"
    class:translate-x-0={open}
    class:-translate-x-full={!open}
    on:click|stopPropagation
  >
    <UserProfileHeader {user} />

		<!-- Navigation Links -->
		<nav class="flex flex-col space-y-4 p-4">
			<a href="/profilo" class="transition-colors hover:text-blue-500">👤 Profilo</a>
			<a href="/chi-siamo" class="transition-colors hover:text-blue-500">🧭 Chi siamo</a>
			<a href="/contatti" class="transition-colors hover:text-blue-500">✉️ Contatti</a>
		</nav>
	</aside>
