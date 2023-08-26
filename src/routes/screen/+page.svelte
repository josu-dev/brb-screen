<script lang="ts">
  import { dev } from '$app/environment';
  import Debug from '$cmp/Debug.svelte';
  import WavyText from '$cmp/WavyText.svelte';
  import { t } from '$lib/editor/enums';

  const DEBUG = dev && false;

  export let data;

  $: message = data.msg;
  $: messageColor = data.msg_color;
  $: messageAlign = data.msg_align;
  $: imgURL = data.img_url;
  $: imgWidth = data.img_width;
  $: imgHeight = data.img_height;
  $: imgObjectFit = data.img_obj_fit;
  $: bgStyle = data.bg_style;
</script>

{#if DEBUG}
  <div class="fixed top-0 right-0 left-0 z-10">
    <Debug {data} />
  </div>
{/if}

<div class="h-full w-full bg-black">
  <main
    class="h-full flex flex-col justify-center items-center"
    style={bgStyle ? bgStyle : undefined}
  >
    <div
      class="flex flex-col justify-center gap-8 lg:gap-0 lg:w-full lg:grid lg:grid-rows-1 {imgURL
        ? 'lg:grid-cols-[2fr,auto,minmax(2rem,5%),auto,2fr]'
        : ''} place-items-center h-full"
      style="
      color: {messageColor};
      --img-width: {imgWidth};
      --img-height: {imgHeight};"
    >
      <WavyText
        text={message.split('\n')}
        textAlign={t.textAlign[messageAlign]}
        className={imgURL ? 'lg:w-max lg:col-start-2' : ''}
      />
      {#if imgURL}
        <img
          src={imgURL}
          alt="a visual for the brb message"
          class="col-start-4 max-h-52 lg:max-h-none {t.objectFit[
            imgObjectFit
          ]} w-[var(--img-width)] h-[var(--img-height)] rounded
          scale-50 lg:scale-100"
        />
      {/if}
    </div>
  </main>
</div>

<style>
  main {
    font-family: RampartOne, cursive;
  }
</style>
