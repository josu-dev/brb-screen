<script>
  const links = [
    {
      name: 'Start',
      path: '/start',
    },
    {
      name: 'Bath',
      path: '/bath',
    },
    {
      name: 'Mate',
      path: '/mate',
    },
    {
      name: 'Unexpected',
      path: '/unexpected',
    },
    {
      name: 'Env',
      path: '/env',
    },
  ];
</script>

<main
  class="h-full flex flex-col items-center justify-center gap-24 text-lg text-zinc-200
  bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-slate-950 to-black"
>
  <h1 class="text-3xl font-bold text-center">
    Start using the Command Palette<br />
    <span class="text-sm font-normal"
      >Press <span class="font-bold text-zinc-100">Ctrl + P</span> to open</span
    >
  </h1>
  <div class="flex flex-col items-center justify-center gap-4">
    <h2 class="text-xl font-semibold">Default availible screens:</h2>
    <div
      class="flex items-center justify-between gap-4 [&_a:hover]:underline [&_a]:underline-offset-2"
    >
      {#each links as link (link.path)}
        <a href={link.path}>{link.name}</a>
      {/each}
    </div>
  </div>
</main>
