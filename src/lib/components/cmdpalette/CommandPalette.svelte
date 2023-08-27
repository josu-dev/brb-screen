<script lang="ts" context="module">
  // import { writable } from 'svelte/store';

  type CommandDef = action;
  type Command = Required<Omit<CommandDef, 'description'>> &
    Pick<CommandDef, 'description'>;

  // const cmdpaletteState = writable({
  //   needsUpdate: 0,
  // });

  // const ALL_COMMANDS: CommandDef[] = [];

  function getUUID() {
    return crypto.randomUUID();
  }

  // export function forceUpdate() {
  //   cmdpaletteState.update((state) => {
  //     state.needsUpdate += 1;
  //     return state;
  //   });
  // }

  // export function registerCommands(
  //   commands: CommandDef | CommandDef[],
  //   replace = false
  // ) {
  //   if (Array.isArray(commands)) {
  //     for (const command of commands) {
  //       const commandIndex = ALL_COMMANDS.findIndex(
  //         (c) => c.actionId === command.actionId
  //       );
  //       if (commandIndex === -1) {
  //         ALL_COMMANDS.push(command);
  //         continue;
  //       }
  //       if (replace) {
  //         ALL_COMMANDS[commandIndex] = command;
  //       }
  //     }
  //   } else {
  //     const commandIndex = ALL_COMMANDS.findIndex(
  //       (c) => c.actionId === commands.actionId
  //     );
  //     if (commandIndex === -1) {
  //       ALL_COMMANDS.push(commands);
  //     } else if (replace) {
  //       ALL_COMMANDS[commandIndex] = commands;
  //     }
  //   }

  //   forceUpdate();
  // }

  // export function unregisterCommands(commands: CommandDef | CommandDef[]) {
  //   if (Array.isArray(commands)) {
  //     for (const command of commands) {
  //       const commandIndex = ALL_COMMANDS.findIndex(
  //         (c) => c.actionId === command.actionId
  //       );
  //       if (commandIndex === -1) {
  //         continue;
  //       }
  //       ALL_COMMANDS.splice(commandIndex, 1);
  //     }
  //   } else {
  //     const commandIndex = ALL_COMMANDS.findIndex(
  //       (c) => c.actionId === commands.actionId
  //     );
  //     if (commandIndex !== -1) {
  //       ALL_COMMANDS.splice(commandIndex, 1);
  //     }
  //   }

  //   forceUpdate();
  // }

  function shouldRun() {
    return true;
  }
  function doNothing() {}

  export function defineCommands(
    commands: CommandDef | CommandDef[]
  ): Command[] {
    if (!Array.isArray(commands)) {
      return [
        {
          actionId: commands.actionId ?? getUUID(),
          canActionRun: commands.canActionRun ?? shouldRun,
          title: commands.title,
          description: commands.description,
          subTitle: commands.subTitle ?? '',
          onRun: commands.onRun ?? doNothing,
          keywords: (commands.keywords = []),
          shortcut: commands.shortcut ?? '',
        },
      ];
    }

    const normalizedCommands = [];
    for (const command of commands) {
      normalizedCommands.push({
        actionId: command.actionId ?? getUUID(),
        canActionRun: command.canActionRun ?? shouldRun,
        title: command.title,
        description: command.description,
        subTitle: command.subTitle ?? '',
        onRun: command.onRun ?? doNothing,
        keywords: (command.keywords = []),
        shortcut: command.shortcut ?? '',
      });
    }
    return normalizedCommands;
  }
</script>

<script lang="ts">
  import { goto } from '$app/navigation';
  import { page } from '$app/stores';
  import { DEPLOY_DOMAIN, REPOSITORY_URL } from '$lib/config';
  import { onDestroy, onMount } from 'svelte';
  import CommandPalette, {
    createStoreMethods,
    paletteStore,
  } from 'svelte-command-palette';
  import type { action } from 'svelte-command-palette/types';
  import toast from 'svelte-french-toast';
  import { useRegisterSW } from 'virtual:pwa-register/svelte';
  import './CommandPalette.postcss';

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

  async function requestBodyFullscreen() {
    if (document.fullscreenElement) {
      if (document.fullscreenElement === document.body) {
        return;
      }
      await document.exitFullscreen();
    }

    window.document.body.requestFullscreen().catch((err) => {
      toast.error('Error attempting to enable fullscreen mode');
      console.error(
        `[CommandPalette] Error attempting to enable fullscreen mode: ${err.message} (${err.name})`
      );
    });
  }

  let updateServiceWorker: ReturnType<
    typeof useRegisterSW
  >['updateServiceWorker'];

  const globalCommands = defineCommands([
    {
      actionId: 'navigate-home',
      title: 'Home',
      subTitle: 'Go to the home page',
      onRun: () => {
        goto('/');
      },
    },
    {
      actionId: 'navigate-brb-screen-mate',
      title: 'BRB Mate',
      subTitle: 'Go to the mate brb screen',
      onRun: () => {
        goto('/mate').then(requestBodyFullscreen);
      },
    },
    {
      actionId: 'navigate-brb-screen-bath',
      title: 'BRB Bath',
      subTitle: 'Go to the bath brb screen',
      onRun: () => {
        goto('/bath').then(requestBodyFullscreen);
      },
    },
    {
      actionId: 'navigate-brb-screen-start',
      title: 'BRB Start',
      subTitle: 'Go to the start brb screen',
      onRun: () => {
        goto('/start').then(requestBodyFullscreen);
      },
    },
    {
      actionId: 'navigate-brb-screen-unexpected',
      title: 'BRB Unexpected',
      subTitle: 'Go to the unexpected brb screen',
      onRun: () => {
        goto('/unexpected').then(requestBodyFullscreen);
      },
    },
    {
      actionId: 'navigate-brb-screen-env',
      title: 'BRB Env',
      subTitle: 'Go to the env brb screen',
      onRun: () => {
        goto('/env').then(requestBodyFullscreen);
      },
    },
    {
      actionId: 'navigate-editor',
      title: 'Editor',
      subTitle: 'Open the built-in screen editor',
      onRun: () => {
        goto('/editor');
      },
    },
    {
      actionId: 'global-fullscreen',
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
      actionId: 'global-share-current-page',
      title: 'Share current page',
      subTitle: 'Copy a shareable link of the current page to clipboard',
      onRun: copyCurrentUrl,
    },
    {
      actionId: 'global-share-repository',
      title: 'Repository',
      subTitle: 'Open the GitHub repository for this project',
      onRun: () => {
        openRepository();
      },
    },
    {
      actionId: 'global-reload-window',
      title: 'Reload window',
      subTitle: 'Reload the window',
      onRun: () => {
        window.location.reload();
      },
    },
    {
      actionId: 'global-admin-mode',
      title: 'Admin mode',
      subTitle: 'Toggle the admin mode',
      onRun: () => {
        document.body.contentEditable =
          document.body.contentEditable === 'true' ? 'false' : 'true';
      },
    },
  ]);

  let unsubscribeKeyListeners: () => void;

  onMount(async () => {
    // registerCommands(globalCommands, true);

    const { updateServiceWorker: update } = useRegisterSW({});
    updateServiceWorker = update;

    const { tinykeys } = await import('tinykeys');

    unsubscribeKeyListeners = tinykeys(window, {
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
    // unregisterCommands(globalCommands);

    if (unsubscribeKeyListeners) {
      unsubscribeKeyListeners();
    }
  });
</script>

<!-- {#key $cmdpaletteState.needsUpdate} -->
<CommandPalette
  commands={globalCommands}
  unstyled
  placeholder="Search for a command..."
  overlayClass="command-palette fixed inset-0 flex z-10 [&>div]:shadow-none [&>div]:contents"
  paletteWrapperInnerClass="m-auto border border-zinc-500/25 mt-[10vh] flex flex-col rounded bg-zinc-900 max-h-[80vh] w-[90vw] sm:w-[80vw] sm:max-w-screen-sm overflow-y-hidden shadow-2xl shadow-black [&>form]:py-3 [&>form]:px-2"
  inputClass="px-2 py-1 w-full text-base text-zinc-200 bg-zinc-800 rounded-sm outline-none focus:outline-none focus:ring-1 ring-cyan-600"
  resultsContainerClass="sm:max-h-[40vh] mb-3 overflow-y-auto scrollbar"
  resultContainerClass="px-3 py-2 rounded text-zinc-200 opacity-75 cursor-pointer"
  optionSelectedClass="bg-cyan-950/50 opacity-100"
  titleClass="text-zinc-100 text-base"
  subtitleClass="text-zinc-200 font-light text-sm"
  descriptionClass="text-zinc-200 font-light text-sm"
  keyboardButtonClass="hidden"
/>
<!-- {/key} -->
