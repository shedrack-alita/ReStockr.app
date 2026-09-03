<!--
  Signed-in account area shell (sidebar nav + content), to be used by
  app/pages/account/* and app/pages/orders/*. Not built yet — those pages
  don't exist, so this just reuses the default layout for now rather than
  shipping an unused sidebar nobody can navigate to.

  TODO: build the real account nav once app/pages/account/* exists — see
  its README.
-->
<template>
  <div class="flex min-h-dvh flex-col">
    <LayoutHeader />
    <main class="flex-1">
      <slot />
    </main>
    <LayoutFooter />
  </div>
</template>
