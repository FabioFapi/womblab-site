import adapter from '@sveltejs/adapter-auto';
import preprocess from 'svelte-preprocess';

const dev = process.argv.includes('dev');

export default {
	preprocess: preprocess(),
	kit: {
		adapter: adapter({
			pages: 'build',
			assets: 'build',
			fallback: 'app.html' 
		}),
		paths: {
			base: dev ? '' : '/womblab-site'
		}
	}
};
