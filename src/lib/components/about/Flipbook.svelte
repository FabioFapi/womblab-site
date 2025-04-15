<script>
	import { onMount } from 'svelte';
  
	onMount(() => {
	  if (!document.querySelector('script[src="https://static.elfsight.com/platform/platform.js"]')) {
		const script = document.createElement('script');
		script.src = 'https://static.elfsight.com/platform/platform.js';
		script.async = true;
		document.body.appendChild(script);
	  }
	});
  </script>
  
  <div class="elfsight-app-203d58fd-0023-4f77-8cce-089cc9d7b948" data-elfsight-app-lazy></div>
  