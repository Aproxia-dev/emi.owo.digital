import devtoolsJson from 'vite-plugin-devtools-json';
import tailwindcss from '@tailwindcss/vite';
import { sveltekit } from '@sveltejs/kit/vite';
import postcsseasings from 'postcss-easings';
import { defineConfig } from 'vite';

export default defineConfig({
	css: {
		postcss: {
			plugins: [postcsseasings()]
		}
	},
	plugins: [tailwindcss(), sveltekit(), devtoolsJson()]
});
