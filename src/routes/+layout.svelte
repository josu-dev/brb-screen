<script>
  import '../app.postcss';
  import { onMount } from 'svelte';
  import { pwaInfo } from 'virtual:pwa-info';

  onMount(async () => {
    if (pwaInfo) {
      const { registerSW } = await import('virtual:pwa-register');

      registerSW({
        immediate: true,
        onRegistered(r) {
          // uncomment following code if you want check for updates
          // r && setInterval(() => {
          //    console.log('Checking for sw update')
          //    r.update()
          // }, 20000 /* 20s for testing purposes */)
          console.log(`SW Registered: ${r}`);
        },
        onRegisterError(error) {
          console.log('SW registration error', error);
        },
      });
    }
  });

  $: webManifestLink = pwaInfo ? pwaInfo.webManifest.linkTag : '';
</script>

<svelte:head>
  {@html webManifestLink}
  <title>BRB Screen</title>
</svelte:head>

<slot />

<div
  class="fixed bottom-0 left-0 right-0 flex items-center justify-center gap-4 text-lg text-white"
>
  <a href="/start">Start </a>
  <a href="/bath">Bath </a>
  <a href="/mate">Mate </a>
  <a href="/unexpected">Unexpected </a>
  <a href="/env">Env</a>
</div>

{#await import('$lib/ReloadPrompt.svelte') then { default: ReloadPrompt }}
  <ReloadPrompt />
{/await}

<style lang="postcss">
  :global(body) {
    @apply bg-slate-950;
  }
</style>
