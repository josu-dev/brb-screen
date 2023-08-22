<script lang="ts">
  import { page } from '$app/stores';

  export let siteName: string;
  export let canonical: 'current' | ({} & string) | undefined = undefined;
  export let url: 'current' | ({} & string);
  export let pageTitle: string;
  export let description: string;
  export let type: 'article' | 'website' = 'website';
  export let image: { url: string; alt: string } | undefined = undefined;

  $: currentURL = ($page.url.origin + $page.url.pathname).replace(/\/$/, '');
  $: canonicalURL = canonical === 'current' ? currentURL : canonical;
</script>

<svelte:head>
  <title>{pageTitle}</title>
  <meta name="description" content={description} />

  {#if canonicalURL}
    <link rel="canonical" href={canonicalURL} />
  {/if}

  <meta property="og:site_name" content={siteName} />
  <meta property="og:type" content={type ?? 'website'} />
  <meta property="og:url" content={url === 'current' ? currentURL : url} />
  <meta property="og:title" content={pageTitle} />
  <meta property="og:description" content={description} />
  {#if image}
    <meta property="og:image" content={image.url} />
    <meta property="og:image:alt" content={image.alt} />
  {/if}

  <slot />
</svelte:head>
