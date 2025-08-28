import { sveltekit } from '@sveltejs/kit/vite';
import tailwindcss from '@tailwindcss/vite';
import { SvelteKitPWA } from '@vite-pwa/sveltekit';
import Icons from 'unplugin-icons/vite';
import { defineConfig } from 'vite';


export default defineConfig({
  plugins: [
    tailwindcss(),
    sveltekit(),
    Icons({
      compiler: 'svelte',
      autoInstall: true,
    }),
    SvelteKitPWA({
      srcDir: './src',
      // mode: 'development',
      scope: '/',
      base: '/',
      manifest: {
        short_name: 'brb-screen',
        name: 'brb-screen',
        start_url: '/',
        scope: '/',
        display: 'standalone',
        theme_color: "#020617",
        background_color: "#020617",
        icons: [
          {
            src: 'icon/pwa-64x64.png',
            sizes: '64x64',
            type: 'image/png',
          },
          {
            src: 'icon/pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: 'icon/pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any',
          },
          {
            src: 'icon/maskable-icon-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable',
          }
        ],
      },
      injectManifest: {
        globPatterns: ['client/**/*.{js,css,ico,png,svg,webp,woff,woff2}']
      },
      workbox: {
        globPatterns: ['client/**/*.{js,css,ico,png,svg,webp,woff,woff2}']
      },
      devOptions: {
        enabled: false,
        type: 'module',
        navigateFallback: '/',
      },
      // if you have shared info in svelte config file put in a separate module and use it also here
      kit: {}
    }),
  ]
});
