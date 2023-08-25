<script lang="ts">
  import Content from './Content.svelte';
  import Title from './Title.svelte';

  export let className = '';
</script>

<section class="flex flex-col px-4 py-2 xl:px-8 {className}">
  <slot S={{ Title, Content }} />
</section>
