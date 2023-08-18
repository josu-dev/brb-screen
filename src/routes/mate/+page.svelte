<script lang="ts">
  import Footer from '$cmp/layout/Footer.svelte';
</script>

<main
  class="h-full flex flex-col justify-center items-center
  bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-700 via-blue-900 to-slate-900"
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
    <div
      class=" waviy text-3xl lg:text-6xl reflex text-center"
      data-content={'Preparando el mate,\nya regreso...'}
    >
      {#each 'Preparando el mate,'.split('') as char, i}
        <span style="--i:{i}; --offset:280%">{char}</span>
      {/each}
      <br />
      <div class="h-12 lg:h-24 inline-block whitespace-pre" />
      {#each 'ya regreso...'.split('') as char, i}
        <span
          style="--i:{i + 'Preparando el mate,'.length}; --offset:105%"
          data-content={char}>{char}</span
        >
      {/each}
    </div>
    <img
      src="/img/mate.4.png"
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

  .waviy {
    position: relative;
    white-space: pre;
  }
  .waviy span {
    position: relative;
    display: inline-block;
    color: #fff;
    text-transform: uppercase;
    animation: waviy 5s infinite;
    animation-delay: calc(0.1s * var(--i));
  }
  .waviy span:before {
    content: attr(data-content);
    position: absolute;
    text-transform: uppercase;
    top: var(--offset);
    left: 3%;
    opacity: 1;
    transform: rotateX(180deg) translateY(0);
    animation: waviy-reflex 5s infinite;
    animation-delay: calc(0.1s * var(--i));
    mask-image: linear-gradient(
      to bottom,
      rgba(0, 0, 0, 0) 30%,
      rgba(0, 0, 0, 0.1)
    );
  }

  @keyframes waviy {
    0%,
    8%,
    20% {
      transform: translateY(0);
    }
    4% {
      transform: translateY(-20px);
    }
  }
  @keyframes waviy-reflex {
    0%,
    8%,
    20% {
      transform: rotateX(180deg) translateY(0);
    }
    4% {
      transform: rotateX(180deg) translateY(calc(-100% + 20px));
    }
  }
</style>
