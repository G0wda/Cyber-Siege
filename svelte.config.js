import adapter from '@sveltejs/adapter-vercel';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  preprocess: vitePreprocess(),
  kit: {
    adapter: adapter({
      // This tells the adapter "I know what I'm doing, use Node 24"
      runtime: 'nodejs24.x' 
    })
  }
};

export default config;