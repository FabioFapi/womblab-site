<script>
	import { slide, fade } from 'svelte/transition';

	let isMobileMenuOpen = false;
	let activeDropdown = null;

	const toggleDropdown = (id) => {
		activeDropdown = activeDropdown === id ? null : id;
	};

	const closeDropdown = () => {
		activeDropdown = null;
	};

	// Migliorato il gestore dei click esterni per funzionare meglio su mobile
	function handleClickOutside(event) {
		if (activeDropdown && !event.target.closest('.dropdown-container') && !event.target.closest('.dropdown-button')) {
			activeDropdown = null;
		}
	}

	function closeDrawer() {
		isMobileMenuOpen = false;
	}
	
	// Funzione per gestire la navigazione su navbar bottom
	function navigateTo(path) {
		closeDrawer();
		window.location.href = path;
	}
</script>

<svelte:window
	on:click={handleClickOutside}
	on:keydown={(e) => e.key === 'Escape' && (closeDrawer(), closeDropdown())}
/>

<svelte:head>
	<style>
		@keyframes dropdown-slide {
			from {
				opacity: 0;
				transform: translateY(-10px);
			}
			to {
				opacity: 1;
				transform: translateY(0);
			}
		}
		
		@keyframes pulse-subtle {
			0% {
				box-shadow: 0 0 0 0 rgba(99, 102, 241, 0.1);
			}
			70% {
				box-shadow: 0 0 0 10px rgba(99, 102, 241, 0);
			}
			100% {
				box-shadow: 0 0 0 0 rgba(99, 102, 241, 0);
			}
		}

		/* Stile per il drawer e la navigazione mobile */
		@media (max-width: 768px) {
			body {
				padding-bottom: 64px; /* Spazio per la barra di navigazione inferiore */
			}
		}

		.drawer-transition {
			transition: transform 0.3s ease-in-out;
		}

		/* Effetto ripple per feedback tattile */
		.ripple-effect {
			position: relative;
			overflow: hidden;
		}

		.ripple-effect::after {
			content: '';
			display: block;
			position: absolute;
			width: 100%;
			height: 100%;
			top: 0;
			left: 0;
			pointer-events: none;
			background-image: radial-gradient(circle, rgba(99, 102, 241, 0.2) 10%, transparent 10.01%);
			background-repeat: no-repeat;
			background-position: 50%;
			transform: scale(10, 10);
			opacity: 0;
			transition:
				transform 0.5s,
				opacity 0.8s;
		}

		.ripple-effect:active::after {
			transform: scale(0, 0);
			opacity: 0.3;
			transition: 0s;
		}
		
		/* Animazione per la bottom navigation */
		.bottom-tab.active {
			animation: tab-active 0.3s ease;
		}
		
		@keyframes tab-active {
			0% { transform: scale(1); }
			50% { transform: scale(1.1); }
			100% { transform: scale(1); }
		}
		
		.dropdown-appear {
			animation: dropdown-slide 0.3s ease forwards;
		}
	</style>
</svelte:head>

<nav
	class="sticky top-0 z-40 border-b border-gray-100 bg-white shadow-md transition-all duration-300"
>
	<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		<div class="flex h-16 items-center">
			<!-- LOGO -->
			<a href="/" class="flex items-center gap-2">
				<img
					src="/img/logo_womblab.png"
					alt="Womblab logo"
					class="h-10 w-auto"
					width="40"
					height="40"
					loading="eager"
				/>
			</a>

			<!-- NAV DESKTOP -->
			<ul class="hidden ml-auto items-center gap-8 font-medium text-gray-800 md:flex">
				<li class="flex h-full items-center">
					<a
						href="/chi-siamo"
						class="relative px-2 py-6 transition-colors duration-300 after:absolute after:bottom-4 after:left-0 after:h-0.5 after:w-0 after:bg-green-600 after:transition-all hover:text-green-600 hover:after:w-full"
					>
						Chi Siamo
					</a>
				</li>
				<li>
					<a
						href="/servizi"
						class="relative px-2 py-6 transition-colors duration-300 after:absolute after:bottom-4 after:left-0 after:h-0.5 after:w-0 after:bg-green-600 after:transition-all hover:text-green-600 hover:after:w-full"
					>
						Servizi
					</a>
				</li>

				<!-- EVENTI DESKTOP DROPDOWN -->
				<li class="dropdown-container relative">
					<button
						on:click={() => toggleDropdown('eventi')}
						aria-expanded={activeDropdown === 'eventi'}
						aria-haspopup="true"
						class="dropdown-button relative flex items-center gap-1.5 px-2 py-6 transition-colors duration-300 after:absolute after:bottom-4 after:left-0 after:h-0.5 after:w-0 after:bg-green-600 after:transition-all hover:text-green-600 hover:after:w-full"
					>
						Eventi
						<svg
							class="h-4 w-4 transition-transform duration-300"
							class:rotate-180={activeDropdown === 'eventi'}
							viewBox="0 0 20 20"
							fill="currentColor"
						>
							<path
								fill-rule="evenodd"
								d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.25 8.29a.75.75 0 01-.02-1.06z"
								clip-rule="evenodd"
							/>
						</svg>
					</button>

					{#if activeDropdown === 'eventi'}
						<div
							class="absolute left-0 z-50 mt-1 w-56 rounded-lg border border-gray-100 bg-white py-3 shadow-lg dropdown-appear"
							on:mouseleave={closeDropdown}
						>
							<a
								href="/eventi"
								class="block px-5 py-3 text-gray-800 transition-colors hover:bg-green-50"
								>Tutti gli eventi</a
							>
							<a
								href="/eventi/grandi-eventi"
								class="block px-5 py-3 text-gray-800 transition-colors hover:bg-green-50"
								>Grandi Eventi</a
							>
							<a
								href="/eventi/settore-medico"
								class="block px-5 py-3 text-gray-800 transition-colors hover:bg-green-50"
								>Settore Medico</a
							>
						</div>
					{/if}
				</li>

				<li>
					<a
						href="/contatti"
						class="relative px-2 py-6 transition-colors duration-300 after:absolute after:bottom-4 after:left-0 after:h-0.5 after:w-0 after:bg-green-600 after:transition-all hover:text-green-600 hover:after:w-full"
					>
						Contatti
					</a>
				</li>
			</ul>

			<!-- HAMBURGER BUTTON MOBILE -->
			<div class="flex items-center ml-auto">
				<button
					on:click={() => (isMobileMenuOpen = !isMobileMenuOpen)}
					aria-expanded={isMobileMenuOpen}
					class="flex h-10 w-10 items-center justify-center rounded-md transition-all duration-300 hover:bg-green-50 md:hidden ripple-effect"
					aria-label="Menu di navigazione"
				>
					<div class="relative h-5 w-6">
						<span
							class="absolute top-0 h-0.5 w-6 bg-green-700 transition-all duration-300"
							class:top-2={isMobileMenuOpen}
							class:rotate-45={isMobileMenuOpen}
						></span>
						<span
							class="absolute top-2 h-0.5 w-6 bg-green-700 transition-all duration-300"
							class:opacity-0={isMobileMenuOpen}
						></span>
						<span
							class="absolute top-4 h-0.5 w-6 bg-green-700 transition-all duration-300"
							class:top-2={isMobileMenuOpen}
							class:-rotate-45={isMobileMenuOpen}
						></span>
					</div>
				</button>
			</div>
		</div>
	</div>
</nav>

<!-- OVERLAY -->
{#if isMobileMenuOpen}
	<div
		class="fixed inset-0 z-40 bg-black/40"
		on:click={closeDrawer}
		transition:fade={{ duration: 300 }}
	></div>
{/if}

<!-- DRAWER MOBILE-->
<div
	class="fixed top-0 right-0 z-50 h-full w-72 transform bg-white shadow-xl transition-transform duration-300 ease-in-out md:hidden"
	class:translate-x-0={isMobileMenuOpen}
	class:translate-x-full={!isMobileMenuOpen}
>
	<div class="flex h-full flex-col">
		<!-- Header -->
		<div class="flex items-center justify-between border-b border-gray-200 p-4">
			<div class="flex items-center gap-2">
			</div>
			<button on:click={closeDrawer} class="p-2 rounded-full hover:bg-gray-100" aria-label="Chiudi menu">
				<svg class="h-5 w-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M6 18L18 6M6 6l12 12"
					/>
				</svg>
			</button>
		</div>

		<!-- Links -->
		<nav class="flex flex-col space-y-1 px-4 py-2">
			<a 
				href="/chi-siamo" 
				on:click={closeDrawer} 
				class="rounded px-4 py-3 hover:bg-green-50 ripple-effect flex items-center gap-3"
			>
				<svg class="h-5 w-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
				</svg>
				Chi Siamo
			</a>
			<a 
				href="/servizi" 
				on:click={closeDrawer} 
				class="rounded px-4 py-3 hover:bg-green-50 ripple-effect flex items-center gap-3"
			>
				<svg class="h-5 w-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
				</svg>
				Servizi
			</a>

			<!-- Eventi dropdown mobile -->
			<div class="flex flex-col">
				<button
					on:click={() => toggleDropdown('mobile-eventi')}
					class="dropdown-button flex items-center justify-between rounded px-4 py-3 hover:bg-green-50 ripple-effect"
				>
					<div class="flex items-center gap-3">
						<svg class="h-5 w-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
						</svg>
						<span>Eventi</span>
					</div>
					<svg
						class="h-4 w-4 transition-transform duration-300"
						class:rotate-180={activeDropdown === 'mobile-eventi'}
						viewBox="0 0 20 20"
						fill="currentColor"
					>
						<path
							fill-rule="evenodd"
							d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.25 8.29a.75.75 0 01-.02-1.06z"
							clip-rule="evenodd"
						/>
					</svg>
				</button>

				{#if activeDropdown === 'mobile-eventi'}
					<div 
						class="mt-1 ml-4 flex flex-col space-y-1 border-l border-green-600 pl-4"
						transition:slide={{ duration: 200 }}
					>
						<a 
							href="/eventi" 
							on:click={closeDrawer} 
							class="rounded px-3 py-2 hover:bg-indigo-50 ripple-effect"
						>
							Tutti gli eventi
						</a>
						<a
							href="/eventi/grandi-eventi"
							on:click={closeDrawer}
							class="rounded px-3 py-2 hover:bg-indigo-50 ripple-effect"
						>
							Grandi Eventi
						</a>
						<a
							href="/eventi/settore-medico"
							on:click={closeDrawer}
							class="rounded px-3 py-2 hover:bg-indigo-50 ripple-effect"
						>
							Settore Medico
						</a>
					</div>
				{/if}
			</div>

			<a 
				href="/contatti" 
				on:click={closeDrawer} 
				class="rounded px-4 py-3 hover:bg-green-50 ripple-effect flex items-center gap-3"
			>
				<svg class="h-5 w-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
				</svg>
				Contatti
			</a>
		</nav>
	</div>
</div>