<script lang="ts">
  import { page } from '$app/stores';
  import ColorInput from '$cmp/form/ColorInput.svelte';
  import SelectInput from '$cmp/form/SelectInput.svelte';
  import TextAreaInput from '$cmp/form/TextAreaInput.svelte';
  import TextInput from '$cmp/form/TextInput.svelte';
  import UrlInput from '$cmp/form/URLInput.svelte';
  import CopyableText from '$lib/editor/CopyableText.svelte';
  import Section from '$lib/editor/Section.svelte';
  import { objectFit, textAlign } from '$lib/editor/enums';
  import { encodeEditorConfig } from '$lib/editor/validation';
  import { Pane, Splitpanes } from 'svelte-splitpanes';
  import { superForm } from 'sveltekit-superforms/client';

  export let data;

  if (!data.configForm.data.msg_color) {
    data.configForm.data.msg_color = '#ffffff';
  }

  const configSForm = superForm(data.configForm);

  const configForm = configSForm.form;

  $: baseURL = $page.url.origin + '/screen';
  $: generatedURL =
    baseURL +
    encodeEditorConfig(
      $configForm.msg ?? '',
      $configForm.msg_color ?? '',
      $configForm.msg_align ?? '',
      $configForm.img_url ?? '',
      $configForm.img_width ?? '',
      $configForm.img_height ?? '',
      $configForm.img_obj_fit ?? '',
      $configForm.bg_style ?? ''
    );

  let inputLinkResult: HTMLInputElement;
  $: inputLinkResult && (inputLinkResult.value = generatedURL);

  function submit() {}

  let previewEl: HTMLIFrameElement;

  let iframePreviewKey = 0;
  function reloadPreview() {
    iframePreviewKey += 1;
  }
</script>

<main
  class="2xl:max-w-[112rem] mx-auto flex w-full h-full max-h-full text-zinc-200"
>
  <Splitpanes theme="brb-screen">
    <Pane size={35} minSize={25}>
      <Section let:S className="h-full">
        <S.Title type="h1">Editor</S.Title>
        <S.Content className="px-1 overflow-y-auto scrollbar-hidden pb-8">
          <form
            method="POST"
            action="?goto"
            on:submit|preventDefault={submit}
            class="grid gap-4 pt-4"
          >
            <div class="flex flex-col p-4 rounded-lg border border-blue-900">
              <h3 class="text-lg font-medium">Message</h3>
              <div class="flex flex-col ml-1">
                <TextAreaInput form={configSForm} field="msg" label="" />
                <div class="flex flex-wrap gap-x-8 max-w-sm">
                  <SelectInput
                    form={configSForm}
                    field="msg_align"
                    label="Alignment"
                    unselectedText=""
                    options={[
                      { value: textAlign.left, text: 'Left' },
                      { value: textAlign.center, text: 'Center' },
                      { value: textAlign.right, text: 'Right' },
                    ]}
                    className="w-[12ch]"
                  />
                  <ColorInput
                    form={configSForm}
                    field="msg_color"
                    label="Color"
                    className="min-w-[1rem] max-w-[10rem]"
                    classInputText=" w-[12ch]"
                  />
                </div>
              </div>
            </div>

            <div class="flex flex-col p-4 rounded-lg border border-blue-900">
              <h3 class="text-lg font-medium">Image</h3>
              <div class="flex flex-col ml-2">
                <UrlInput form={configSForm} field="img_url" label="URL" />
                <div class="flex flex-wrap gap-x-8 max-w-md">
                  <TextInput
                    form={configSForm}
                    field="img_width"
                    label="Width"
                    className="w-[12ch]"
                  />
                  <TextInput
                    form={configSForm}
                    field="img_height"
                    label="Height"
                    className="w-[12ch]"
                  />
                  <SelectInput
                    form={configSForm}
                    field="img_obj_fit"
                    label="Object fit"
                    unselectedText=""
                    options={[
                      { value: objectFit.cover, text: 'Cover' },
                      { value: objectFit.contain, text: 'Contain' },
                      { value: objectFit.fill, text: 'Fill' },
                      { value: objectFit.none, text: 'None' },
                      { value: objectFit.scaleDown, text: 'Scale down' },
                    ]}
                    className="w-[14ch]"
                  />
                </div>
              </div>
            </div>
            <div class="flex flex-col p-4 rounded-lg border border-blue-900">
              <h3 class="text-lg font-medium">
                Background (<span class="font-normal tracking-wide">CSS</span>)
              </h3>
              <div class="flex flex-col">
                <TextAreaInput
                  form={configSForm}
                  field="bg_style"
                  label=""
                  textAreaMaxHeight="180px"
                />
              </div>
            </div>
          </form>
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
              class="w-full resize max-w-full overflow-hidden iframe-container"
            >
              <iframe
                src={generatedURL}
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
              value={generatedURL}
              readonly
            />
          </div>
        </S.Content>
      </Section>
    </Pane>
  </Splitpanes>
</main>

<style lang="postcss">
  .iframe-container {
    box-shadow: 0px 0px 0px 1px theme('colors.slate.300'), 0px 0px 0px 2px black;
  }

  .iframe-container::-webkit-resizer {
    background-image: url('data:image/svg+xml,%3Csvg xmlns="http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg" width="100%" height="100%" viewBox="0 0 24 24"%3E%3Cg transform="rotate(-90 12 12)"%3E%3Cpath fill="%23cbd5e1" d="M21.92 2.62a1 1 0 0 0-.54-.54A1 1 0 0 0 21 2h-6a1 1 0 0 0 0 2h3.59L4 18.59V15a1 1 0 0 0-2 0v6a1 1 0 0 0 .08.38a1 1 0 0 0 .54.54A1 1 0 0 0 3 22h6a1 1 0 0 0 0-2H5.41L20 5.41V9a1 1 0 0 0 2 0V3a1 1 0 0 0-.08-.38Z"%2F%3E%3C%2Fg%3E%3C%2Fsvg%3E');
    background-color: black;
  }
</style>
