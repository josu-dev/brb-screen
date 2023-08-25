<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import toast from 'svelte-french-toast';
  import type { Action } from 'svelte/action';
  import CopyIcon from '~icons/tabler/clipboard-copy';

  export let value: string;
  export let field: string;
  export let placeHolder = '';
  export let type: 'text' | 'password' | 'email' | 'url' | 'tel' | 'search' =
    'text';
  export let label: string;
  export let hint: string | undefined = undefined;
  export let readonly = false;
  export let autocomplete = 'off';
  export let required = false;
  export let minSize: number | undefined = undefined;
  export let maxSize: number | undefined = undefined;
  export let pattern: string | undefined = undefined;
  export let invalid = false;
  export let errors: string | undefined = undefined;
  export let spellcheck = false;

  const typeAction: Action<HTMLInputElement> = (node) => {
    node.type = type;
    return { destroy() {} };
  };

  const dispatch = createEventDispatcher<{
    copy: 'button' | 'input';
  }>();

  function copyText() {
    const url = value.replace(/\/$/, '');
    navigator.clipboard.writeText(url).then(
      () => {
        toast.success('Copied current url to clipboard');
      },
      () => {
        toast.error('Error attempting to copy current url to clipboard');
      }
    );
  }
</script>

<div class=" mt-2">
  <div class=" flex text-base">
    <label for={field} class=" max-w-fit text-zinc-100">
      {label}
    </label>
    <button
      type="button"
      on:click|preventDefault={copyText}
      on:click={() => dispatch('copy', 'button')}
      class="ml-2 sliding text-lg text-zinc-300 hover:text-zinc-100 hover:shadow-xl shadow-white transition-colors"
    >
      <CopyIcon />
    </button>
    {#if $$slots.oppositeToLabel}
      <slot name="oppositeToLabel" />
    {:else if hint}
      <span class=" text-zinc-500">{hint}</span>
    {/if}
  </div>
  <div class=" flex flex-col gap-2">
    <input
      use:typeAction
      bind:value
      on:click|preventDefault={copyText}
      on:click={() => dispatch('copy', 'input')}
      id={field}
      name={field}
      {autocomplete}
      {readonly}
      {spellcheck}
      placeholder={placeHolder}
      {required}
      min={minSize}
      max={maxSize}
      {pattern}
      aria-invalid={!!errors || !!invalid || undefined}
      {...$$restProps}
      class=" mt-2 block w-full rounded-md border-none py-1.5
      text-zinc-100 bg-zinc-900 shadow-sm
      placeholder:text-zinc-600 sm:text-sm sm:leading-6
      ring-1 ring-inset ring-blue-900"
    />
    {#if errors}
      <p class=" text-sm text-red-500">
        {errors}
      </p>
    {/if}
    {#if $$slots.belowInput}
      <slot name="belowInput" />
    {/if}
  </div>
</div>

<style lang="postcss">
  div:has(div input[required]:not(:read-only)) label::after {
    content: ' *';
    color: red;
  }

  input:read-only {
    @apply cursor-pointer bg-zinc-900 ring-zinc-800;
  }

  input:focus {
    @apply ring-2 ring-zinc-600;
  }

  input:hover {
    @apply ring-2 ring-zinc-600;
  }
  .sliding {
    position: relative;
  }
  .sliding::before {
    content: ' ';
    width: 0%;
    left: 50%;
    height: 1px;
    background-color: theme(colors.zinc.300);
    position: absolute;
    bottom: -2px;
    transition: all 0.25s ease-out;
  }
  .sliding:hover::before {
    width: 100%;
    left: 0.5px;
    background-color: theme(colors.zinc.100);
  }
</style>
