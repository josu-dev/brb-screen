<script lang="ts">
  import { page } from '$app/stores';
  import Debug from '$cmp/Debug.svelte';
  import ColorInput from '$cmp/form/ColorInput.svelte';
  import SelectInput from '$cmp/form/SelectInput.svelte';
  import TextAreaInput from '$cmp/form/TextAreaInput.svelte';
  import TextInput from '$cmp/form/TextInput.svelte';
  import UrlInput from '$cmp/form/URLInput.svelte';
  import CopyableText from '$lib/editor/CopyableText.svelte';
  import Section from '$lib/editor/Section.svelte';
  import { textAlign } from '$lib/editor/config.js';
  import { composeConfigParams } from '$lib/editor/functions';
  import { Pane, Splitpanes } from 'svelte-splitpanes';
  import { superForm } from 'sveltekit-superforms/client';

  export let data;

  const configSForm = superForm(data.configForm);

  const configForm = configSForm.form;

  $: message = $configForm.message || 'BRB message';
  $: imageURL =
    $configForm.img_url ?? 'https://brb-screen.vercel.app/icon/logo.png';
  $: bgStyle =
    $configForm.css_bg_style ??
    'background-image: radial-gradient(at center center, rgb(244, 114, 182), rgb(219, 39, 119))';
  $: baseUrl = $page.url.origin + '/screen';
  $: dynamicScreenUrl =
    baseUrl + composeConfigParams(message, imageURL, bgStyle);

  let inputLinkResult: HTMLInputElement;
  $: inputLinkResult && (inputLinkResult.value = dynamicScreenUrl);

  function submit() {}

  let previewEl: HTMLIFrameElement;

  let iframePreviewKey = 0;
  function reloadPreview() {
    iframePreviewKey += 1;
  }
</script>

<main class="2xl:max-w-[112rem] mx-auto flex w-full h-full text-zinc-200">
  <Splitpanes theme="brb-screen">
    <Pane size={35} minSize={25}>
      <Section let:S className="h-full">
        <S.Title type="h1">Editor</S.Title>
        <S.Content className="px-1">
          <form
            method="POST"
            action="?goto"
            on:submit|preventDefault={submit}
            class="grid gap-4 pt-4"
          >
            <div class="flex flex-col p-4 rounded-lg border border-blue-900">
              <h3 class="text-lg font-medium">Message</h3>
              <div class="flex flex-col ml-1">
                <TextAreaInput form={configSForm} field="message" label="" />
                <SelectInput
                  form={configSForm}
                  field="message_alignment"
                  label="Alignment"
                  unselectedText=""
                  options={[
                    { value: textAlign.left, text: 'Left' },
                    { value: textAlign.center, text: 'Center' },
                    { value: textAlign.right, text: 'Right' },
                  ]}
                />
                <ColorInput
                  form={configSForm}
                  field="message_color"
                  label="Color"
                />
              </div>
            </div>

            <div class="flex flex-col p-4 rounded-lg border border-blue-900">
              <h3 class="text-lg font-medium">Image</h3>
              <div class="flex flex-col ml-2">
                <UrlInput form={configSForm} field="img_url" label="URL" />
                <div class="flex gap-4">
                  <TextInput
                    form={configSForm}
                    field="img_width"
                    label="Width"
                  />
                  <TextInput
                    form={configSForm}
                    field="img_height"
                    label="Height"
                  />
                </div>
                <TextInput
                  form={configSForm}
                  field="img_object_fit"
                  label="Object fit"
                />
              </div>
            </div>
            <div class="flex flex-col p-4 rounded-lg border border-blue-900">
              <h3 class="text-lg font-medium">Background (<span class="font-normal tracking-wide">CSS</span>)</h3>
              <div class="flex flex-col ">
            <TextAreaInput
              form={configSForm}
              field="css_bg_style"
              label=""
            />
              </div>
            </div>
          </form>
          <!-- <Debug data={configForm} /> -->
        </S.Content>
      </Section>
    </Pane>

    <Pane minSize={25}>
      <Section let:S className="h-full">
        <div class="flex justify-between">
          <S.Title type="h2">Preview</S.Title>
          <button
            class="px-4 py-2 text-sm font-light self-end bg-zinc-900 ring-1 ring-blue-900 rounded-md text-zinc-300 hover:text-zinc-100 hover:ring-2 hover:ring-blue-600"
            on:click={reloadPreview}
          >
            Reset preview
          </button>
        </div>
        <S.Content className="p-4">
          {#key iframePreviewKey}
            <div
              class="w-full resize max-w-full overflow-hidden soft-border-shadow"
            >
              <iframe
                src={dynamicScreenUrl}
                frameborder="0"
                title="Screen Preview"
                class="w-full h-full aspect-video"
                bind:this={previewEl}
              />
            </div>
          {/key}
          <div class="flex flex-col mt-8 justify-around">
            <CopyableText
              field="link"
              label="Generated URL"
              value={dynamicScreenUrl}
              readonly
            />
          </div>
        </S.Content>
      </Section>
    </Pane>
  </Splitpanes>
</main>

<style lang="postcss">
  .soft-border-shadow {
    box-shadow: 0px 0px 0px 1px theme('colors.slate.300'), 0px 0px 0px 2px black;
  }

  div::-webkit-resizer {
    background-image: url('data:image/svg+xml,%3Csvg xmlns="http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg" width="100%" height="100%" viewBox="0 0 24 24"%3E%3Cg transform="rotate(-90 12 12)"%3E%3Cpath fill="%23cbd5e1" d="M21.92 2.62a1 1 0 0 0-.54-.54A1 1 0 0 0 21 2h-6a1 1 0 0 0 0 2h3.59L4 18.59V15a1 1 0 0 0-2 0v6a1 1 0 0 0 .08.38a1 1 0 0 0 .54.54A1 1 0 0 0 3 22h6a1 1 0 0 0 0-2H5.41L20 5.41V9a1 1 0 0 0 2 0V3a1 1 0 0 0-.08-.38Z"%2F%3E%3C%2Fg%3E%3C%2Fsvg%3E');
    background-color: black;
  }
</style>
