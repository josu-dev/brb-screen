<script lang="ts">
  import { dev } from '$app/environment';
  import { page } from '$app/stores';
  import ColorInput from '$cmp/form/ColorInput.svelte';
  import SelectInput from '$cmp/form/SelectInput.svelte';
  import TextAreaInput from '$cmp/form/TextAreaInput.svelte';
  import TextInput from '$cmp/form/TextInput.svelte';
  import UrlInput from '$cmp/form/URLInput.svelte';
  import { nojs } from '$lib/actions';
  import CopyableText from '$lib/editor/CopyableText.svelte';
  import ScreenPreview from '$lib/editor/ScreenPreview.svelte';
  import Section from '$lib/editor/Section.svelte';
  import { objectFit, textAlign } from '$lib/editor/enums';
  import { encodeEditorConfig } from '$lib/editor/validation';
  import { Pane, Splitpanes } from 'svelte-splitpanes';
  import { superForm } from 'sveltekit-superforms/client';
  import DebugIcon from '~icons/carbon/debug';
  import ReloadIcon from '~icons/tabler/reload';

  const ENABLE_DEBUG = dev && true;

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

  let screenPreview: ScreenPreview;

  function reloadPreview() {
    screenPreview.reset();
  }

  function togglePreviewDebug() {
    screenPreview.toggleDebug();
  }
</script>

<main
  class="2xl:max-w-[112rem] mx-auto flex w-full h-full max-h-full text-zinc-200 bg-slate-950"
>
  <Splitpanes theme="brb-screen">
    <Pane size={35} minSize={25}>
      <Section let:S className="h-full">
        <S.Title type="h1">Editor</S.Title>
        <S.Content className="px-1 overflow-y-auto scrollbar-hidden pb-8">
          <form
            method="POST"
            action="?/gotourl"
            on:submit|preventDefault
            class="grid gap-4 pt-4"
          >
            <div class="flex flex-col p-4 rounded-lg border border-blue-900">
              <h3 class="text-lg font-medium">Message</h3>
              <div class="flex flex-col ml-1">
                <TextAreaInput
                  form={configSForm}
                  field="msg"
                  label=""
                  stopKeydownPropagation
                />
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
                  stopKeydownPropagation
                />
              </div>
            </div>
            <button
              type="submit"
              use:nojs
              class="px-4 py-2 mx-auto text-sm font-light self-end bg-zinc-900 ring-1 ring-blue-900 rounded-md text-zinc-300 hover:text-zinc-100 hover:ring-2 hover:ring-blue-600"
            >
              Go to generated screen
            </button>
          </form>
        </S.Content>
      </Section>
    </Pane>

    <Pane minSize={25}>
      <Section let:S className="h-full">
        <div class="flex justify-between @container">
          <S.Title type="h2">Preview</S.Title>
          <div class=" flex gap-2 @md:gap-4 self-end">
            <button
              class="px-4 py-2 text-sm font-light self-end bg-zinc-900 ring-1 ring-blue-900 rounded-md text-zinc-300 hover:text-zinc-100 hover:ring-2 hover:ring-blue-600"
              on:click={reloadPreview}
            >
              <span class="hidden sr-only @md:not-sr-only @md:inline-block"
                >Reset preview</span
              >
              <ReloadIcon class=" @md:hidden w-4 h-4 inline-block" />
            </button>
            {#if ENABLE_DEBUG}
              <button
                class="px-4 py-2 text-sm font-light self-end bg-zinc-900 ring-1 ring-blue-900 rounded-md text-zinc-300 hover:text-zinc-100 hover:ring-2 hover:ring-blue-600"
                on:click={togglePreviewDebug}
              >
                <span class="hidden sr-only @md:not-sr-only @md:inline-block"
                  >Debug info</span
                >
                <DebugIcon class=" @md:hidden w-4 h-4 inline-block" />
              </button>
            {/if}
          </div>
        </div>
        <S.Content className="p-4">
          <ScreenPreview
            config={{
              msg: $configForm.msg ?? '',
              msg_color: $configForm.msg_color?.trim() ?? '',
              msg_align: $configForm.msg_align ?? 'C',
              img_url: $configForm.img_url?.trim() ?? '',
              img_width: $configForm.img_width?.trim() ?? '',
              img_height: $configForm.img_height?.trim() ?? '',
              img_obj_fit: $configForm.img_obj_fit ?? 'D',
              bg_style: $configForm.bg_style?.trim() ?? '',
            }}
            bind:this={screenPreview}
          />
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
<!-- 
<style lang="postcss">
  .iframe-container {
    box-shadow: 0px 0px 0px 1px theme('colors.slate.300'), 0px 0px 0px 2px black;
  }

  .iframe-container::-webkit-resizer {
    background-image: url('data:image/svg+xml,%3Csvg xmlns="http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg" width="100%" height="100%" viewBox="0 0 24 24"%3E%3Cg transform="rotate(-90 12 12)"%3E%3Cpath fill="%23cbd5e1" d="M21.92 2.62a1 1 0 0 0-.54-.54A1 1 0 0 0 21 2h-6a1 1 0 0 0 0 2h3.59L4 18.59V15a1 1 0 0 0-2 0v6a1 1 0 0 0 .08.38a1 1 0 0 0 .54.54A1 1 0 0 0 3 22h6a1 1 0 0 0 0-2H5.41L20 5.41V9a1 1 0 0 0 2 0V3a1 1 0 0 0-.08-.38Z"%2F%3E%3C%2Fg%3E%3C%2Fsvg%3E');
    background-color: black;
  }
</style> -->
