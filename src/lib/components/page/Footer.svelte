<script>
  import { REPOSITORY_URL } from '$lib/config';
  import IconGithub from '~icons/mdi/github';

  /** @type {'fixed'|'absolute'|'block'}*/
  export let display = 'fixed';
</script>

<footer
  class="{display} bottom-0 left-0 p-2 text-sm tracking-wider font-light text-gray-100 font-[Inter]"
>
  <a
    href={REPOSITORY_URL}
    target="_blank"
    rel="noopener noreferrer"
    class="hover:text-gray-300 hover:underline underline-offset-2"
  >
    <IconGithub class="inline-block -mt-[2px]" /> brb-screen
  </a>
</footer>
