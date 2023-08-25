<script lang="ts">
  import Debug from '$cmp/Debug.svelte';
  import WavyText from '$cmp/WavyText.svelte';

  export let data;

  const defaultValue = {
    message: 'BRB message',
    img_url: 'https://brb-screen.vercel.app/icon/logo.png',
    css_bg_style:
      'background-image: radial-gradient(at center center, rgb(244, 114, 182), rgb(219, 39, 119))',
  } as const;

  let message: string;
  let imageURL: string;
  let bgStyle: string;

  $: if (data.json) {
    message = data.json.message || defaultValue.message;
    imageURL = data.json.img_url || defaultValue.img_url;
    bgStyle = data.json.css_bg_style || defaultValue.css_bg_style;
  } else {
    if (data.message) message = data.message || defaultValue.message;
    if (data.img_url) imageURL = data.img_url || defaultValue.img_url;
    if (data.css_bg_style)
      bgStyle = data.css_bg_style || defaultValue.css_bg_style;
  }
</script>

<div class="h-full bg-black">
  {#if false}
    <div class="fixed inset-0">
      <Debug {data} />
    </div>
  {/if}
  <main
    class="h-full flex flex-col justify-center items-center text-yellow-100
  {!bgStyle
      ? 'bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[hsl(242,47%,25%)] via-[hsl(244,47%,15%)] to-slate-950'
      : ''}"
    style={bgStyle ? bgStyle : undefined}
  >
    <div
      class="flex flex-col justify-center gap-8 lg:gap-0 lg:grid lg:grid-rows-1 lg:grid-cols-2 place-items-center h-full text-black"
    >
      <WavyText text={message.split('\n')} />
      {#if imageURL}
        <img
          src={imageURL}
          alt=""
          class=" max-h-52 lg:max-h-none lg:w-auto max-w-[25%]"
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
