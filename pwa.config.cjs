/**
 * @typedef {import('@vite-pwa/sveltekit').SvelteKitPWAOptions} SvelteKitPWAOptions
 * @typedef {Partial<SvelteKitPWAOptions>} PWAConfig
 */

/** @type {PWAConfig} */
const config = {
  srcDir: './src',
  // mode: 'development',
  scope: '/',
  base: '/',
  selfDestroying: process.env.SELF_DESTROYING_SW === 'true',
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
        src: '/pwa-192x192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/pwa-512x512.png',
        sizes: '512x512',
        type: 'image/png',
      },
      {
        src: '/pwa-512x512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any maskable',
      },
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
    suppressWarnings: process.env.SUPPRESS_WARNING === 'true',
    type: 'module',
    navigateFallback: '/',
  },
  // if you have shared info in svelte config file put in a separate module and use it also here
  kit: {}
}

module.exports = config;
