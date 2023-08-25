<script lang="ts">
  export let className = '';
</script>

<div class="flex flex-col flex-1 overflow-hidden {className}">
  <slot />
</div>
