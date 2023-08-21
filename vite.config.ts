import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import Icons from 'unplugin-icons/vite';
import { SvelteKitPWA } from '@vite-pwa/sveltekit';


export default defineConfig({
  plugins: [
    sveltekit(),
    Icons({
      compiler: 'svelte',
      autoInstall: true,
    }),
    SvelteKitPWA(require('./pwa.config.cjs')),
  ]
});
