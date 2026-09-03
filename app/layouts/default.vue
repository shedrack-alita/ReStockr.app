<template>
  <div class="flex min-h-dvh flex-col">
    <LayoutHeader />
    <main class="flex-1 bg-green-950">
      <slot />
    </main>
    <LayoutFooter />
  </div>
</template>
