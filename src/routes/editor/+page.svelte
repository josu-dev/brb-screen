<script lang="ts">
  import { dev } from '$app/environment';
  import { page } from '$app/stores';
  import { helpers } from '$cmp/CommandPalette.svelte';
  import ColorInput from '$cmp/form/ColorInput.svelte';
  import SelectInput from '$cmp/form/SelectInput.svelte';
  import TextAreaInput from '$cmp/form/TextAreaInput.svelte';
  import TextInput from '$cmp/form/TextInput.svelte';
  import UrlInput from '$cmp/form/URLInput.svelte';
  import { nojs } from '$lib/actions';
  import Button from '$lib/editor/Button.svelte';
  import CopyableText from '$lib/editor/CopyableText.svelte';
  import ScreenPreview from '$lib/editor/ScreenPreview.svelte';
  import Section from '$lib/editor/Section.svelte';
  import { objectFit, textAlign } from '$lib/editor/enums';
  import { encodeEditorConfig } from '$lib/editor/validation';
  import { onMount } from 'svelte';
  import toast from 'svelte-french-toast';
  import { defineCommand } from 'svelte-hypercommands/HyperPalette.svelte';
  import { Pane, Splitpanes } from 'svelte-splitpanes';
  import { superForm } from 'sveltekit-superforms/client';
  import DebugIcon from '~icons/carbon/debug';
  import FullscreenIcon from '~icons/mdi/fullscreen';
  import ReloadIcon from '~icons/tabler/reload';
  import './splitpanesreset.postcss';

  const ENABLE_DEBUG = dev && true;

  export let data;

  const configSForm = superForm(data.configForm);
  const configForm = configSForm.form;

  $: generatedURL =
    $page.url.origin +
    '/screen?' +
    encodeEditorConfig(
      $configForm.msg ?? '',
      $configForm.msg_color ?? '',
      $configForm.msg_align ?? '',
      $configForm.img_url ?? '',
      $configForm.img_width ?? '',
      $configForm.img_height ?? '',
      $configForm.img_obj_fit ?? '',
      $configForm.bg_style ?? '',
    );

  $: previewConfig = {
    msg: $configForm.msg ?? '',
    msg_color: $configForm.msg_color ?? '',
    msg_align: $configForm.msg_align ?? 'C',
    img_url: $configForm.img_url,
    img_width: $configForm.img_width ?? '',
    img_height: $configForm.img_height ?? '',
    img_obj_fit: $configForm.img_obj_fit ?? 'D',
    bg_style: $configForm.bg_style,
  };

  let screenPreview: ScreenPreview;

  function previewReload() {
    screenPreview.reset();
    toast.success('Preview reseted');
  }

  function previewToggleDebug() {
    screenPreview.toggleDebug();
  }

  function previewFullscreen() {
    screenPreview.fullscreen();
  }

  onMount(() => {
    const unregisterCommands = helpers.registerCommand(
      defineCommand(
        {
          name: 'Copy generated URL',
          description: 'Copy the generated Screen URL to the clipboard',
          onAction: () => {
            navigator.clipboard.writeText(generatedURL).then(
              () => {
                toast.success('Copied generated screen URL to clipboard');
              },
              () => {
                toast.error(
                  'Error attempting to copy the generated screen URL to clipboard',
                );
              },
            );
          },
        },
        {
          name: 'Reset preview',
          description: 'Reset the screen preview to the default state',
          onAction: previewReload,
        },
        {
          name: 'Toggle debug info',
          description: 'Toggle the debug info in the screen preview',
          onAction: previewToggleDebug,
        },
        {
          name: 'Fullscreen preview',
          description: 'Toggle fullscreen mode for the screen preview',
          onAction: previewFullscreen,
        },
      ),
    );

    return unregisterCommands;
  });
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

            <div use:nojs class="mx-auto">
              <Button type="submit">Generate and go to screen</Button>
            </div>
          </form>
        </S.Content>
      </Section>
    </Pane>

    <Pane minSize={25}>
      <Section let:S className="h-full">
        <div class="flex justify-between @container">
          <S.Title type="h2">Preview</S.Title>
          <div class=" flex gap-2 @lg:gap-4 self-end">
            <Button
              on:click={previewFullscreen}
              icon={FullscreenIcon}
              className="self-end"
            >
              Fullscreen
            </Button>
            <Button
              on:click={previewReload}
              icon={ReloadIcon}
              className="self-end"
            >
              Reset preview
            </Button>
            {#if ENABLE_DEBUG}
              <Button
                on:click={previewToggleDebug}
                icon={DebugIcon}
                className="self-end"
              >
                Debug info
              </Button>
            {/if}
          </div>
        </div>
        <S.Content className="p-4">
          <ScreenPreview config={previewConfig} bind:this={screenPreview} />
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
