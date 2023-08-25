<script lang="ts">
  import type { FormPathLeaves, ZodValidation } from 'sveltekit-superforms';
  import type { SuperForm } from 'sveltekit-superforms/client';
  import { formFieldProxy } from 'sveltekit-superforms/client';
  import type { AnyZodObject, z } from 'zod';

  type T = $$Generic<AnyZodObject>;

  export let form: SuperForm<ZodValidation<T>, unknown>;
  export let field: FormPathLeaves<z.infer<T>>;

  export let label: string;
  export let hint: string | undefined = undefined;
  export let readonly = false;
  export let autocomplete = 'off';
  export let spellcheck = false;
  export let textAreaMaxHeight = '140px';

  const { value, errors, constraints } = formFieldProxy(form, field);
</script>

<div class=" mt-2">
  <div class=" flex justify-between text-sm font-medium">
    <label for={field} class=" max-w-fit text-zinc-100">
      {label}
    </label>
    {#if $$slots.oppositeToLabel}
      <slot name="oppositeToLabel" />
    {:else if hint}
      <span class=" text-zinc-500">{hint}</span>
    {/if}
  </div>
  <div class=" flex flex-col gap-2">
    <textarea
      id={field}
      name={field}
      {autocomplete}
      {readonly}
      {spellcheck}
      bind:value={$value}
      aria-invalid={!!$errors || undefined}
      {...$constraints}
      {...$$restProps}
      class=" mt-2 block w-full rounded-md min-h-[80px] border-none py-1.5
      text-zinc-100 bg-zinc-900 shadow-sm
      placeholder:text-zinc-600 sm:text-sm sm:leading-6
      ring-1 ring-inset ring-blue-900"
      style="max-height: {textAreaMaxHeight};"
    />
    {#if $errors}
      <p class=" text-sm text-red-500">
        {$errors}
      </p>
    {/if}
    {#if $$slots.belowInput}
      <slot name="belowInput" />
    {/if}
  </div>
</div>

<style lang="postcss">
  div:has(div textarea[required]:not(:read-only)) label::after {
    content: ' *';
    color: red;
  }

  textarea:focus {
    @apply ring-2 ring-blue-600;
  }
  textarea:read-only {
    @apply cursor-not-allowed bg-zinc-900 ring-zinc-800;
  }
</style>
