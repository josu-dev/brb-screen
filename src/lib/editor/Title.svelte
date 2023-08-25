<script lang="ts">
  export let type : 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' = 'p';
</script>

<header>
  <svelte:element this={type} class="text-4xl font-bold mt-[1em]">
    <slot />
  </svelte:element>
</header>
