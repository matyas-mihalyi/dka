import sveltePreprocess from 'svelte-preprocess';
import { resolve } from 'path';
import adapter from '@sveltejs/adapter-auto';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: sveltePreprocess(
		{
			less: true
		}
	),

	kit: {
		// hydrate the <div id="svelte"> element in src/app.html
		target: '#svelte',
		adapter: adapter(),
		vite : {
			resolve: {
				alias: {
					$remixicon: resolve('./node_modules/remixicon')
				}
			}
		}
	}
};


export default config;
