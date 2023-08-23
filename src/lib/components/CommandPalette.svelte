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
  import { useRegisterSW } from 'virtual:pwa-register/svelte';

  export let startOpen = false;

  const paletteMethods = createStoreMethods();

  function openRepository() {
    window.open(REPOSITORY_URL, '_blank', 'noopener,noreferrer');
  }
  function copyCurrentUrl() {
    const url = DEPLOY_DOMAIN + $page.url.pathname + $page.url.search;
    navigator.clipboard.writeText(url.replace(/\/$/, '')).then(
      () => {
        toast.success('Copied current url to clipboard');
      },
      () => {
        toast.error('Error attempting to copy current url to clipboard');
      }
    );
  }

  let updateServiceWorker: ReturnType<
    typeof useRegisterSW
  >['updateServiceWorker'];

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
      title: 'Fullscreen',
      subTitle: 'Toggle fullscreen',
      onRun: () => {
        if (document.fullscreenElement) {
          document.exitFullscreen();
          return;
        }

        window.document.body.requestFullscreen().catch((err) => {
          toast.error('Error attempting to enable fullscreen mode');
          console.error(
            `[CommandPalette] Error attempting to enable fullscreen mode: ${err.message} (${err.name})`
          );
        });
      },
    },
    {
      title: 'Share current page',
      subTitle: 'Copy a shareable link of the current page to clipboard',
      onRun: copyCurrentUrl,
    },
    {
      title: 'Repository',
      subTitle: 'Open the GitHub repository for this project',
      onRun: () => {
        openRepository();
      },
    },
    {
      title: 'Reload window',
      subTitle: 'Reload the window',
      onRun: () => {
        window.location.reload();
      },
    },
    {
      title: 'Admin mode',
      subTitle: 'Toggle the admin mode',
      onRun: () => {
        document.body.contentEditable =
          document.body.contentEditable === 'true' ? 'false' : 'true';
      },
    },
  ]);

  let unsubscribeKeyListiners: () => void;

  onMount(async () => {
    const { updateServiceWorker: update } = useRegisterSW({});
    updateServiceWorker = update;

    const { tinykeys } = await import('tinykeys');

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
        copyCurrentUrl();
      },
    });

    if (startOpen) {
      paletteMethods.openPalette();
    }
  });

  onDestroy(() => {
    if (unsubscribeKeyListiners) {
      unsubscribeKeyListiners();
    }
  });
</script>

<CommandPalette
  commands={actions}
  unstyled
  placeholder="Search for a command..."
  overlayClass="fixed inset-0 flex z-1 [&>div]:shadow-none [&>div]:contents"
  paletteWrapperInnerClass="m-auto border border-zinc-500/25 mt-[10vh] flex flex-col rounded bg-zinc-900 max-h-[80vh] w-[90vw] sm:w-[80vw] sm:max-w-screen-sm overflow-y-hidden shadow-2xl shadow-black [&>form]:py-3 [&>form]:px-2"
  inputClass="px-2 py-1 w-full text-base text-zinc-200 bg-zinc-800 rounded-sm outline-none focus:outline-none focus:ring-1 ring-cyan-600"
  resultsContainerClass=" sm:max-h-[40vh] mb-3 overflow-y-auto scrollbar"
  resultContainerClass="px-3 py-2 rounded text-zinc-200 opacity-75"
  optionSelectedClass="bg-cyan-950/50 opacity-100"
  titleClass="text-zinc-100 text-base"
  subtitleClass="text-zinc-200 font-light text-sm"
  descriptionClass="text-zinc-200 font-light text-sm"
  keyboardButtonClass="hidden"
/>

<style lang="postcss">
  :global(.scrollbar) {
    @apply ml-2;
    scrollbar-gutter: stable;
  }
  :global(.scrollbar::-webkit-scrollbar) {
    @apply w-4 sm:w-3;
  }
  :global(.scrollbar:hover::-webkit-scrollbar-track) {
    @apply bg-transparent;
  }
  :global(.scrollbar:hover::-webkit-scrollbar-thumb) {
    @apply bg-cyan-900/50;
  }
  :global(.scrollbar:hover::-webkit-scrollbar-thumb:hover) {
    @apply bg-cyan-900/90;
  }
</style>
