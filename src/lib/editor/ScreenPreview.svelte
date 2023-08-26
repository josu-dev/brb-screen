<script lang="ts">
  import Debug from '$cmp/Debug.svelte';
  import WavyText from '$cmp/WavyText.svelte';
  import Footer from '$cmp/page/Footer.svelte';
  import { t } from '$lib/editor/enums';
  import toast from 'svelte-french-toast';
  import type { SafeScreenConfig } from './validation';

  export let config: SafeScreenConfig;

  export let debug = false;

  let container: HTMLElement;

  let resetKey = 0;
  export function reset() {
    resetKey += 1;
  }

  export function toggleDebug() {
    debug = !debug;
  }

  export async function fullscreen() {
    container.requestFullscreen().catch((err) => {
      toast.error('Error attempting to enter editor preview fullscreen');
      console.error(
        `[Editor] Error attempting to enter editor preview fullscreen: ${err.message} (${err.name})`
      );
    });
  }

  $: message = config.msg;
  $: messageColor = config.msg_color.trim();
  $: messageAlign = config.msg_align;
  $: imgURL = config.img_url?.trim();
  $: imgWidth = config.img_width.trim();
  $: imgHeight = config.img_height.trim();
  $: imgObjectFit = config.img_obj_fit;
  $: bgStyle = config.bg_style?.trim();
</script>

{#key resetKey}
  <section
    bind:this={container}
    class="preview-container w-full max-w-full aspect-video overflow-hidden resize relative bg-black"
  >
    {#if debug}
      <div class="absolute top-0 right-0 left-0 z-10">
        <Debug data={config} />
      </div>
    {/if}

    <div
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
            alt=""
            class="col-start-4 max-h-52 lg:max-h-none {t.objectFit[
              imgObjectFit
            ]} w-[var(--img-width)] h-[var(--img-height)] rounded"
          />
        {/if}
      </div>
    </div>

    <Footer display="absolute" />
  </section>
{/key}

<style lang="postcss">
  .preview-container {
    font-family: RampartOne, cursive;
    box-shadow: 0px 0px 0px 1px theme('colors.slate.300'), 0px 0px 0px 2px black;
  }

  .preview-container::-webkit-resizer {
    background-image: url('data:image/svg+xml,%3Csvg xmlns="http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg" width="100%" height="100%" viewBox="0 0 24 24"%3E%3Cg transform="rotate(-90 12 12)"%3E%3Cpath fill="%23cbd5e1" d="M21.92 2.62a1 1 0 0 0-.54-.54A1 1 0 0 0 21 2h-6a1 1 0 0 0 0 2h3.59L4 18.59V15a1 1 0 0 0-2 0v6a1 1 0 0 0 .08.38a1 1 0 0 0 .54.54A1 1 0 0 0 3 22h6a1 1 0 0 0 0-2H5.41L20 5.41V9a1 1 0 0 0 2 0V3a1 1 0 0 0-.08-.38Z"%2F%3E%3C%2Fg%3E%3C%2Fsvg%3E');
    background-color: black;
  }
</style>
