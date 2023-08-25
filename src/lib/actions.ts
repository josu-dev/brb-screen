import type { Action } from 'svelte/action';


export const stopPropagation = ((node, parameter = false) => {
  if (!parameter) {
    return;
  }
  let initialParameter = parameter;

  function stopPropagation(event: Event) {
    event.stopPropagation();
  }

  node.addEventListener(parameter, stopPropagation);

  return {
    update(parameter) {
      if (initialParameter !== parameter && initialParameter) {
        node.removeEventListener(initialParameter, stopPropagation);
      }
      if (!parameter) {
        return;
      }
      initialParameter = parameter;
      node.addEventListener(parameter, stopPropagation);
    },
    destroy() {
      node.removeEventListener(initialParameter, stopPropagation);
    },
  };

}) satisfies Action<HTMLElement, keyof HTMLElementEventMap | false>;

export const nojs = ((node) => {
  node.classList.add('hidden');
}) satisfies Action<HTMLElement>;
