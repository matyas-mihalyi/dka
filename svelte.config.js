import adapter from '@sveltejs/adapter-auto';
import {resolve} from 'path';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: adapter(),

		// hydrate the <div id="svelte"> element in src/app.html
		target: '#svelte',
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
