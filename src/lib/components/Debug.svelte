<script lang="ts">
  import type { ComponentProps } from 'svelte';
  import SuperDebug from 'sveltekit-superforms/client/SuperDebug.svelte';

  export let data: ComponentProps<SuperDebug>['data'];
  export let label: string | undefined = undefined;
  export let stringTruncate: number | undefined = undefined;
  export let functions = false;

  $: noLabel = !label;
</script>

<div style="display: contents" class:no-label={noLabel}>
  <SuperDebug
    {data}
    {label}
    {stringTruncate}
    {functions}
    status={false}
    theme="vscode"
  />
</div>

<style lang="postcss">
  div :global(:is(pre, span)) {
    font-family: 'JetBrains Mono', Inconsolata, Monaco, Consolas,
      'Lucida Console', 'Courier New', Courier, monospace;
  }

  .no-label :global(pre) {
    padding-top: 0 !important;
  }
</style>
