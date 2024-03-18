<script lang="ts">
  import { page } from '$app/stores';
  import WavyText from '$cmp/WavyText.svelte';

  $: message = $page.params.message?.split('\n') ?? [];
</script>

<div class="h-full bg-black">
  <main
    class="h-full flex flex-col justify-center items-center
    bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-slate-950 to-black"
  >
    <div
      class="flex flex-col justify-center gap-y-8 gap-x-24 lg:grid lg:grid-rows-1 lg:grid-cols-[2fr,auto] place-items-center h-full text-white"
    >
      <WavyText text={message} />
      <img
        src="/img/logo.png"
        alt=""
        class=" max-h-52 lg:max-h-96 lg:w-auto"
      />
    </div>
  </main>
</div>

<style>
  main {
    font-family: RampartOne, cursive;
  }
</style>
