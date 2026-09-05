<template>
  <div class="flex min-h-dvh flex-col bg-green-50">
    <MarketplaceHeader />
    <main class="flex-1">
      <slot />
    </main>
    <LayoutFooter />
    <CartDrawer />
  </div>
</template>
