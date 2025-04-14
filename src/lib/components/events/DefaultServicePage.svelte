<script>
    import { fly } from 'svelte/transition';
    export let service;
  </script>
  
  <section class="px-6 py-24 max-w-5xl mx-auto dark:text-white">
    <div in:fly={{ y: -20, duration: 500 }}>
      <a href="/servizi" class="text-sm text-blue-500 hover:underline">← Torna ai servizi</a>
    </div>
  
    <h1 class="text-4xl font-bold mt-6 mb-4">{service.title}</h1>
    <div class="h-1 w-24 bg-blue-500 rounded mb-8"></div>
  
    <div class="bg-white dark:bg-slate-800 p-8 rounded-xl shadow">
      <p class="text-lg leading-relaxed text-gray-700 dark:text-gray-300">{service.content}</p>
    </div>
  </section>
  