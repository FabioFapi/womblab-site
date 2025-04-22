<script>
	import { onMount } from 'svelte';
	import { fade, fly } from 'svelte/transition';
	import { spring } from 'svelte/motion';
	import { goto } from '$app/navigation';

	function goToContact() {
		goto('/contatti');
	}

	let visible = false;

	const coords = spring(
		{ y: 20, opacity: 0 },
		{
			stiffness: 0.1,
			damping: 0.4
		}
	);

	onMount(() => {
		visible = true;
		coords.set({ y: 0, opacity: 1 });
	});
</script>

<section class="hero-section relative overflow-hidden px-4 py-24 md:py-32">
	<!-- Background image -->
	<div class="absolute inset-0 z-0">
		<img src="/img/Header_oldsite.jpg" alt="Background" class="h-full w-full object-cover" />
		<div class="absolute inset-0 bg-gradient-to-b from-black/50 to-green-900/70"></div>
	</div>

	<!-- Floating circles -->
	<div class="absolute inset-0 z-0">
		{#if visible}
			<div
				class="floating-circle absolute -top-20 -left-20 h-64 w-64 rounded-full bg-white/10"
				transition:fade={{ duration: 1000 }}
			></div>
			<div
				class="floating-circle absolute -right-20 -bottom-40 h-96 w-96 rounded-full bg-white/10"
				transition:fade={{ duration: 1000, delay: 300 }}
			></div>
		{/if}
	</div>

	<!-- Content -->
	<div class="relative z-10 mx-auto max-w-4xl">
		{#if visible}
			<h2
				transition:fly={{ y: 30, duration: 800 }}
				class="mb-6 text-center text-4xl font-bold text-white md:text-5xl lg:text-6xl"
			>
				Eventi, Formazione e Comunicazione nel Settore Medico
			</h2>

			<p
				style="transform: translateY({$coords.y}px); opacity: {$coords.opacity}"
				class="mx-auto max-w-2xl text-center text-lg leading-relaxed text-white/90 md:text-xl"
			>
				Womblab supporta aziende e associazioni scientifiche nella realizzazione di eventi,
				congressi e percorsi formativi su misura.
			</p>

			<div
				transition:fly={{ y: 30, duration: 800, delay: 400 }}
				class="mt-10 flex flex-col justify-center space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4"
			>
				<a
					href="https://trainingecm.womblab.com/"
					class="flex transform items-center justify-center rounded-3xl bg-white px-6 py-3 font-medium text-green-800 shadow-lg transition hover:-translate-y-1 hover:bg-green-50"
				>
					Scopri di più
				</a>

				<button
					on:click={goToContact}
					class="flex transform items-center justify-center rounded-3xl border-2 border-white px-6 py-3 font-medium text-white transition hover:-translate-y-1 hover:bg-white/10"
				>
					Contattaci
				</button>
			</div>
		{/if}
	</div>

	<!-- Animated Wave -->
	<div class="absolute right-0 bottom-0 left-0 z-0 overflow-hidden leading-[0]">
		<svg
			class="wave relative block h-[100px] w-full"
			viewBox="0 0 1440 120"
			preserveAspectRatio="none"
		>
			<path
				fill="#ffffff"
				fill-opacity="1"
				d="M0,64L60,69.3C120,75,240,85,360,80C480,75,600,53,720,48C840,43,960,53,1080,58.7C1200,64,1320,64,1380,64L1440,64L1440,120L1380,120C1320,120,1200,120,1080,120C960,120,840,120,720,120C600,120,480,120,360,120C240,120,120,120,60,120L0,120Z"
			></path>
		</svg>
	</div>
</section>

<style>
	.floating-circle {
		animation: float 8s ease-in-out infinite;
	}
	.floating-circle:nth-child(2) {
		animation: float 12s ease-in-out infinite;
		animation-delay: -4s;
	}

	@keyframes float {
		0%,
		100% {
			transform: translate(0, 0);
		}
		50% {
			transform: translate(10px, -20px);
		}
	}

	.hero-section {
		min-height: 600px;
		display: flex;
		align-items: center;
	}

	/* Wave animation */
	.wave path {
		animation: waveShift 2s ease-in-out infinite alternate;
		transform-origin: center;
	}

	@keyframes waveShift {
		from {
			transform: scaleX(1) translateY(0px);
		}
		to {
			transform: scaleX(1.02) translateY(5px);
		}
	}
</style>
