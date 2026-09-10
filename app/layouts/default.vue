<template>
  <div class="flex min-h-dvh flex-col">
    <LayoutHeader />
    <main class="flex-1 bg-gradient-to-b from-[#184c0e] from-[0%] via-[#1e6f12] via-[47%] to-[#1b5e10] to-[95%]">
      <slot />
    </main>
    <LayoutFooter dark />
  </div>
</template>
