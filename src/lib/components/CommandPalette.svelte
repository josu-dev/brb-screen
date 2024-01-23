<script context="module">
  export { defineCommand } from 'svelte-hypercommands';
  export {
    elements,
    helpers,
    states,
  } from 'svelte-hypercommands/CommandPalette.svelte';
</script>

<script>
  import { goto } from '$app/navigation';
  import { page } from '$app/stores';
  import { DEPLOY_DOMAIN, REPOSITORY_URL } from '$lib/config';
  import toast from 'svelte-french-toast';
  import { defineCommand, definePage } from 'svelte-hypercommands';
  import CommandPalette from 'svelte-hypercommands/CommandPalette.svelte';

  const globalPages = definePage([
    {
      name: 'Bath',
      url: '/bath',
      description: 'Bath screen',
    },
    {
      name: 'Screen editor',
      url: '/editor',
      description: 'Live screen editor',
    },
    {
      name: 'Enviroment',
      url: '/env',
      description: 'Managing enviroment variables screen',
    },
    {
      name: 'Home',
      url: '/',
      description: 'Application home',
    },
    {
      name: 'Mate',
      url: '/mate',
      description: 'Prepating mate screen',
    },
    {
      name: 'Start',
      url: '/start',
      description: 'Stream starting soon screen',
    },
    {
      name: 'Unexpected',
      url: '/unexpected',
      description: 'Something unexpected happened screen',
    },
  ]);

  const globalCommands = defineCommand([
    {
      id: 'global:navigate_home',
      name: 'Home',
      description: 'Navigate to the home page',
      shortcut: '$mod+Shift+H',
      action: () => {
        goto('/');
      },
    },
    {
      id: 'global:navigate_editor',
      name: 'Editor',
      description: 'Navigate to the editor page',
      shortcut: '$mod+Shift+E',
      action: () => {
        goto('/editor');
      },
    },
    {
      id: 'global:fullscreen',
      name: 'Fullscreen',
      description: 'Toggle fullscreen mode',
      shortcut: '$mod+Shift+F',
      action: () => {
        if (document.fullscreenElement) {
          document.exitFullscreen();
          return;
        }

        window.document.body.requestFullscreen().catch((err) => {
          toast.error('Error attempting to enable fullscreen mode');
          console.error(
            `[CommandPalette] Error attempting to enable fullscreen mode: ${err.message} (${err.name})`,
          );
        });
      },
    },
    {
      id: 'global:copy_current_url',
      name: 'Copy Current URL',
      description: 'Copy the current URL to the clipboard',
      shortcut: '$mod+Shift+C',
      action: () => {
        const url = DEPLOY_DOMAIN + $page.url.pathname + $page.url.search;
        navigator.clipboard.writeText(url.replace(/\/$/, '')).then(
          () => {
            toast.success('Copied current url to clipboard');
          },
          () => {
            toast.error('Error attempting to copy current url to clipboard');
          },
        );
      },
    },
    {
      id: 'global:open_repository',
      name: 'Open Repository',
      description: 'Open the repository in a new tab',
      action: () => {
        window.open(REPOSITORY_URL, '_blank', 'noopener,noreferrer');
      },
    },
    {
      id: 'global:reload_window',
      name: 'Reload Window',
      description: 'Reload the window',
      shortcut: '$mod+Shift+R',
      action: () => {
        window.location.reload();
      },
    },
    {
      id: 'global:admin_mode',
      name: 'Admin Mode',
      description: 'Toggle admin mode',
      shortcut: '$mod+Shift+A',
      action: () => {
        document.body.contentEditable =
          document.body.contentEditable === 'true' ? 'false' : 'true';
      },
    },
  ]);
</script>

<div>
  <CommandPalette commands={globalCommands} pages={globalPages} />
</div>

<style>
  div :global(.palette-container) {
    z-index: 1000;
    background-color: red;
  }
</style>
