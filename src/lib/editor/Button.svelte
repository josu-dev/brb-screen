<script>
  /** @type {import('svelte/elements').HTMLButtonAttributes['type']}*/
  export let type = 'button';
  
  export let className = '';

  /** @type {any|false}*/
  export let icon = false;
</script>

{#if icon}
  <button
    {type}
    on:click
    class="py-[0.375rem] px-[0.750rem] @lg:px-4 @lg:py-2
    text-sm font-light rounded-md bg-zinc-900 text-zinc-300 hover:text-zinc-100
    ring-1 ring-blue-900 hover:ring-2 hover:ring-blue-600 {className}"
  >
    <span class="hidden sr-only @lg:not-sr-only @lg:inline-block">
      <slot />
    </span>
    <svelte:component this={icon} class=" @lg:hidden w-6 h-6 inline-block" />
  </button>
{:else}
  <button
    {type}
    on:click
    class="px-4 py-2 text-sm font-light rounded-md bg-zinc-900 text-zinc-300 hover:text-zinc-100 ring-1 ring-blue-900 hover:ring-2 hover:ring-blue-600 {className}"
  >
    <slot />
  </button>
{/if}
