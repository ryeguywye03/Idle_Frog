import tailwindcss from '@tailwindcss/vite';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [sveltekit()],
	logLevel: 'info', // You can also try 'debug'
	server: {
	  fs: {
		strict: false
	  }
	}
});
