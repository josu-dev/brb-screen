<script lang="ts">
  import WavyText from '$cmp/WavyText.svelte';
  import Footer from '$cmp/layout/Footer.svelte';
</script>

<main
  class="h-full flex flex-col justify-center items-center
  bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-slate-800  to-slate-950"
>
  <button
    on:click={() => {
      if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen();
      } else {
        document.exitFullscreen();
      }
    }}
    class="fixed top-0 right-0 p-4">Full</button
  >
  <div
    class="flex flex-col justify-center gap-8 lg:gap-0 lg:grid lg:grid-rows-1 lg:grid-cols-[2fr,auto] place-items-center h-full"
  >
    <WavyText
      text={['Editando variables', 'de entorno,', 'termino y regreso...']}
    />
    <img
      src="/img/wheel.png"
      alt=""
      class=" max-h-52 lg:max-h-none lg:w-auto"
    />
  </div>
  <Footer />
</main>

<style>
  main {
    font-family: RampartOne, cursive;
  }
</style>
