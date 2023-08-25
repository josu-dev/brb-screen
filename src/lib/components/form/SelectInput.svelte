<script lang="ts">
  import type { FormPathLeaves, ZodValidation } from 'sveltekit-superforms';
  import type { SuperForm } from 'sveltekit-superforms/client';
  import { formFieldProxy } from 'sveltekit-superforms/client';
  import type { AnyZodObject, z } from 'zod';

  type T = $$Generic<AnyZodObject>;

  type Option = { value: string; text: string };

  export let form: SuperForm<ZodValidation<T>, unknown>;
  export let field: FormPathLeaves<z.infer<T>>;

  export let label: string;
  export let hint: string | undefined = undefined;
  export let readonly = false;
  export let unselectedText = 'Unselected';
  /**
   * If an option is pre-selected, this must be the value of the option.
   */
  export let preSelected: string | undefined = undefined;
  export let options: Option[] | undefined = undefined;

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
    <select
      id={field}
      name={field}
      autocomplete="off"
      disabled={readonly}
      bind:value={$value}
      aria-invalid={!!$errors || undefined}
      {...$constraints}
      {...$$restProps}
      class=" mt-2 block w-full rounded-md border-none py-1.5
      text-zinc-100 bg-zinc-900 shadow-sm
      placeholder:text-zinc-600 sm:text-sm sm:leading-6
      ring-1 ring-inset ring-blue-900"
    >
      {#if unselectedText}
        <option value="">{unselectedText}</option>
      {/if}
      {#if $$slots.options}
        <slot name="options" />
      {:else if options}
        {#each options as option}
          <option value={option.value} selected={option.value === preSelected}>
            {option.text}
          </option>
        {/each}
      {/if}
    </select>
    {#if $errors}
      <p class="text-sm text-red-500">
        {$errors}
      </p>
    {/if}
    {#if $$slots.belowInput}
      <slot name="belowInput" />
    {/if}
  </div>
</div>

<style lang="postcss">
  div:has(div select[required]:enabled) label::after {
    content: ' *';
    color: red;
  }

  select:focus {
    @apply ring-2 ring-blue-600;
  }
  select:disabled {
    @apply cursor-text bg-zinc-900 ring-zinc-800;
  }
</style>
