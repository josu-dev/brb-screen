<script lang="ts" context="module">
  const msgAlign = {
    [textAlign.left]: 'left',
    [textAlign.center]: 'center',
    [textAlign.right]: 'right',
  } as const;
  const objFit = {
    [objectFit.fill]: 'object-fill',
    [objectFit.contain]: 'object-contain',
    [objectFit.cover]: 'object-cover',
    [objectFit.none]: 'object-none',
    [objectFit.scaleDown]: 'object-scale-down',
  } as const;
</script>

<script lang="ts">
  import Debug from '$cmp/Debug.svelte';
  import WavyText from '$cmp/WavyText.svelte';
  import { objectFit, textAlign } from '$lib/editor/enums';

  export let data;

  $: message = data.msg ?? '';
  $: messageColor = data.msg_color;
  $: messageAlign = data.msg_align;
  $: imgURL = data.img_url;
  $: imgWidth = data.img_width;
  $: imgHeight = data.img_height;
  $: imgObjectFit = data.img_obj_fit;
  $: bgStyle = data.bg_style;
</script>

{#if false}
  <div class="fixed inset-0 z-10 overflow-auto pointer-events-none">
    <Debug {data} />
  </div>
{/if}

<div class="h-full w-full bg-black">
  <main
    class="h-full flex flex-col justify-center items-center"
    style={bgStyle ? bgStyle : undefined}
  >
    <div
      class="flex flex-col justify-center gap-8 lg:gap-0 lg:grid lg:grid-rows-1 {imgURL
        ? 'lg:grid-cols-2'
        : ''} place-items-center h-full"
      style="color: {messageColor};
      --img-width: {imgWidth};
      --img-height: {imgHeight};"
    >
      <WavyText text={message.split('\n')} textAlign={msgAlign[messageAlign]} />
      {#if imgURL}
        <img
          src={imgURL}
          alt=""
          class=" max-h-52 lg:max-h-none {objFit[
            imgObjectFit
          ]} w-[var(--img-width)] h-[var(--img-height)] rounded"
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
