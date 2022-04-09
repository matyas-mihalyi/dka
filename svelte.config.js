import sveltePreprocess from 'svelte-preprocess';
import vercel from '@sveltejs/adapter-vercel';
import {resolve} from 'path';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: [
		sveltePreprocess({
			less: {
				prependData: `@import 'src/styles/variables.less';`
			}

		})
	], 

	kit: {
		// hydrate the <div id="svelte"> element in src/app.html
		target: '#svelte',
		adapter: vercel(),
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
