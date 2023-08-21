<script lang="ts">
  import { goto } from '$app/navigation';
  import { page } from '$app/stores';
  import { DEPLOY_DOMAIN, REPOSITORY_URL } from '$lib/config';
  import { onDestroy, onMount } from 'svelte';
  import CommandPalette, {
    createStoreMethods,
    defineActions,
    paletteStore,
  } from 'svelte-command-palette';
  import toast from 'svelte-french-toast';

  const paletteMethods = createStoreMethods();

  function openRepository() {
    window.open(REPOSITORY_URL, '_blank', 'noopener,noreferrer');
  }

  const actions = defineActions([
    {
      title: 'Home',
      subTitle: 'Go to the home page',
      onRun: () => {
        goto('/');
      },
    },
    {
      title: 'Screen Mate',
      subTitle: 'Go to the mate brb screen',
      onRun: () => {
        goto('/mate');
      },
    },
    {
      title: 'Screen Bath',
      subTitle: 'Go to the bath brb screen',
      onRun: () => {
        goto('/bath');
      },
    },
    {
      title: 'Screen Start',
      subTitle: 'Go to the start brb screen',
      onRun: () => {
        goto('/start');
      },
    },
    {
      title: 'Screen Unexpected',
      subTitle: 'Go to the unexpected brb screen',
      onRun: () => {
        goto('/unexpected');
      },
    },
    {
      title: 'Screen Env',
      subTitle: 'Go to the env brb screen',
      onRun: () => {
        goto('/env');
      },
    },
    {
      title: 'Repository',
      subTitle: 'Open the GitHub repository for this project',
      onRun: () => {
        openRepository();
      },
    },
  ]);

  let unsubscribeKeyListiners: () => void;

  onMount(async () => {
    const { tinykeys } = await import('tinykeys');
    paletteMethods.closePalette();

    unsubscribeKeyListiners = tinykeys(window, {
      '$mod+KeyP': (event) => {
        event.preventDefault();
        if ($paletteStore.isVisible) {
          paletteMethods.closePalette();
        } else {
          paletteMethods.openPalette();
        }
      },
      '$mod+Space $mod+KeyR': (event) => {
        event.preventDefault();
        openRepository();
      },
      '$mod+Space $mod+KeyC': (event) => {
        event.preventDefault();
        navigator.clipboard.writeText(
          DEPLOY_DOMAIN + $page.url.pathname + $page.url.search
        );
        toast.success('Copied current url to clipboard');
      },
    });
  });

  onDestroy(() => {
    if (unsubscribeKeyListiners) {
      unsubscribeKeyListiners();
    }
  });
</script>

<CommandPalette commands={actions} />
