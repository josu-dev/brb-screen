<script lang="ts">
  export let text: string | string[];
  export let textAlign: 'left' | 'center' | 'right' = 'center';
  export let className = '';

  const waveDuration = 0.4;
  const animationDelay = 0.1;
  const repeatDelay = 4;

  $: charCount =
    typeof text === 'string'
      ? text.length
      : text.reduce((acc, line) => acc + line.length, 0);

  $: animationDuration =
    waveDuration + charCount * animationDelay + repeatDelay;

  $: endPercentage = (waveDuration * 2 * 100) / animationDuration;

  $: resetPercentage = endPercentage * 0.4;

  $: keyframes = `<style>
@keyframes wavy-${charCount} {
  0%,
  ${resetPercentage}%,
  ${endPercentage}% {
    transform: translateY(0);
  }
  ${resetPercentage / 2}% {
    transform: translateY(-20px);
  }
}
@keyframes wavy-reflex-${charCount} {
  0%,
  ${resetPercentage}%,
  ${endPercentage}% {
    transform: rotateX(180deg) translateY(0);
  }
  ${resetPercentage / 2}% {
    transform: rotateX(180deg) translateY(calc(-100% + 20px));
  }
}
</style>`;
</script>

<div class={className}>
  {@html keyframes}
  {#if typeof text === 'string'}
    <div
      class="wavy"
      style="
      --wavy-text-align: {textAlign};
      --wavy-animation: wavy-{charCount};
      --wavy-reflex-animation: wavy-reflex-{charCount};
      --wavy-delay: {animationDelay}s;
      --wavy-duration: {animationDuration}s;"
    >
      <div>
        {#each text.split('') as char, charIdx (charIdx)}
          {@const i = charIdx}<span
            style="--i: {i}; --offset: 105%;"
            data-content={char}>{char}</span
          >
        {/each}
      </div>
    </div>
  {:else if Array.isArray(text)}
    <div
      class="wavy flex flex-col gap-4 lg:gap-8"
      style="
      --wavy-text-align: {textAlign};
      --wavy-animation: wavy-{charCount};
      --wavy-reflex-animation: wavy-reflex-{charCount};
      --wavy-delay: {animationDelay}s;
      --wavy-duration: {animationDuration}s;
      "
    >
      {#each text as line, lineIdx (lineIdx)}
        {@const lastLine = lineIdx === text.length - 1}
        {@const accCharCount = text.reduce(
          (acc, line, idx) => acc + (idx < lineIdx ? line.length : 0),
          0
        )}
        <div>
          {#each line.split('') as char, charIdx (charIdx + accCharCount)}
            {@const i = charIdx + accCharCount}<span
              style="--i: {i}; {lastLine ? '--offset: 105%;' : ''}"
              data-content={lastLine ? char : undefined}>{char}</span
            >
          {/each}
        </div>
      {/each}
    </div>
  {/if}
</div>

<style lang="postcss">
  .wavy {
    text-align: var(--wavy-text-align);
    @apply text-3xl lg:text-6xl uppercase text-current;
  }
  .wavy span {
    position: relative;
    display: inline-block;
    white-space: pre;
    animation: var(--wavy-animation) var(--wavy-duration) infinite;
    animation-delay: calc(var(--wavy-delay) * var(--i));
  }
  .wavy span:before {
    content: attr(data-content);
    position: absolute;
    top: var(--offset);
    transform: rotateX(180deg) translateY(0);
    animation: var(--wavy-reflex-animation) var(--wavy-duration) infinite;
    animation-delay: calc(var(--wavy-delay) * var(--i));
    mask-image: linear-gradient(
      to bottom,
      rgba(0, 0, 0, 0) 30%,
      rgba(0, 0, 0, 0.1)
    );
  }

  /* template ?
  @keyframes waviy {
    0%,
    8%,
    20% {
      transform: translateY(0);
    }
    4% {
      transform: translateY(-20px);
    }
  }
  @keyframes waviy-reflex {
    0%,
    8%,
    20% {
      transform: rotateX(180deg) translateY(0);
    }
    4% {
      transform: rotateX(180deg) translateY(calc(-100% + 20px));
    }
  } */
</style>
