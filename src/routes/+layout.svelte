<script>
  import { dev } from '$app/environment';
  import CommandPalette from '$cmp/CommandPalette.svelte';
  import Footer from '$cmp/page/Footer.svelte';
  import { onMount } from 'svelte';
  import toast, { Toaster } from 'svelte-french-toast';
  import { pwaInfo } from 'virtual:pwa-info';
  import '../app.postcss';

  onMount(async () => {
    if (pwaInfo) {
      const { registerSW } = await import('virtual:pwa-register');

      registerSW({
        immediate: true,
        onRegisteredSW(url, r) {
          if (dev) {
            console.log('SW Registered: ', url, r);
          }
          toast.success('App is ready for offline use');
        },
        onRegisterError(error) {
          if (!dev) {
            console.log('SW registration error', error);
          }
          toast.error('App failed to register for offline use');
        },
      });
    }
  });

  $: webManifestLink = pwaInfo ? pwaInfo.webManifest.linkTag : '';
</script>

<svelte:head>
  <meta name="theme-color" content="#020617" />
  {@html webManifestLink}
</svelte:head>

<CommandPalette />

<Toaster />

<slot />

<Footer />

{#await import('$lib/ReloadPrompt.svelte') then { default: ReloadPrompt }}
  <ReloadPrompt />
{/await}
