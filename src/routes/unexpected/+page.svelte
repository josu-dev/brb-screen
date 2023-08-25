<script lang="ts">
  import WavyText from '$cmp/WavyText.svelte';
</script>

<div class="h-full bg-black">
  <main
    class="h-full flex flex-col justify-center items-center
  bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-amber-500/30 via-amber-500/15 to-black"
  >
    <div
      class="flex flex-col justify-center gap-8 lg:gap-0 lg:grid lg:grid-rows-1 lg:grid-cols-[2fr,auto] place-items-center h-full text-white"
    >
      <WavyText
        text={['Surgio un imprevisto,', 'en 5 mins', 'estoy de regreso...']}
      />
      <div class=" text-[16rem] lg:ml-24">
        <!-- <svg xmlns="http://www.w3.org/2000/svg" width="16rem" height="16rem" viewBox="0 0 512 512">
        <path fill="#FFB636" d="M12.51 470.379L234.371 16.008c6.439-13.187 25.17-13.363 31.855-.299l232.51 454.371c6.064 11.849-2.542 25.92-15.853 25.92H28.512c-13.164 0-21.778-13.791-16.002-25.621z"/>
        <path fill="#2B3B47" d="M284.332 173L272.15 336.498c-.911 12.233-11.567 21.411-23.8 20.499c-11.116-.828-19.706-9.707-20.499-20.499L215.668 173c-1.413-18.961 12.813-35.478 31.774-36.89s35.478 12.813 36.89 31.774c.124 1.662.109 3.5 0 5.116zM250 391.873c-17.432 0-31.564 14.131-31.564 31.564C218.436 440.869 232.568 455 250 455s31.564-14.131 31.564-31.564c0-17.432-14.132-31.563-31.564-31.563z"/>
      </svg> -->
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16rem"
          height="16rem"
          viewBox="0 0 512 512"
        >
          <path
            fill="#FFB636"
            stroke="black"
            stroke-width="10"
            d="M12.51 470.379L234.371 16.008c6.439-13.187 25.17-13.363 31.855-.299l232.51 454.371c6.064 11.849-2.542 25.92-15.853 25.92H28.512c-13.164 0-21.778-13.791-16.002-25.621z"
          />
          <path
            fill="rgb(2 6 23)"
            d="M284.332 173L272.15 336.498c-.911 12.233-11.567 21.411-23.8 20.499c-11.116-.828-19.706-9.707-20.499-20.499L215.668 173c-1.413-18.961 12.813-35.478 31.774-36.89s35.478 12.813 36.89 31.774c.124 1.662.109 3.5 0 5.116zM250 391.873c-17.432 0-31.564 14.131-31.564 31.564C218.436 440.869 232.568 455 250 455s31.564-14.131 31.564-31.564c0-17.432-14.132-31.563-31.564-31.563z"
          />
        </svg>
      </div>
    </div>
  </main>
</div>

<style>
  main {
    font-family: RampartOne, cursive;
  }
</style>
