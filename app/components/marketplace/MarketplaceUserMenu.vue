<script setup lang="ts">
const emit = defineEmits<{ close: [] }>()
const auth = useAuth()

async function handleLogout() {
  await auth.signOut()
  emit('close')
}
</script>

<template>
  <div class="w-56 rounded-field bg-green-50 p-4 shadow-lg">
    <ul v-if="!auth.isSignedIn.value" class="space-y-2 text-sm font-semibold text-text-primary">
      <li><NuxtLink to="/login" class="block hover:underline" @click="emit('close')">Sign In</NuxtLink></li>
      <li><NuxtLink to="/register" class="block hover:underline" @click="emit('close')">Register</NuxtLink></li>
    </ul>
    <ul v-else class="space-y-2 text-sm text-text-primary">
      <li><NuxtLink to="/orders" class="block hover:font-semibold" @click="emit('close')">My Order</NuxtLink></li>
      <li><NuxtLink to="/cart" class="block hover:font-semibold" @click="emit('close')">My Cart</NuxtLink></li>
      <li><NuxtLink to="/account" class="block hover:font-semibold" @click="emit('close')">My Account</NuxtLink></li>
      <li><NuxtLink to="/account/settings" class="block hover:font-semibold" @click="emit('close')">Settings</NuxtLink></li>
      <li><NuxtLink to="/account/coupons" class="block hover:font-semibold" @click="emit('close')">Coupons</NuxtLink></li>
      <li>
        <button type="button" class="block w-full text-left hover:font-semibold" @click="handleLogout">Logout</button>
      </li>
    </ul>
  </div>
</template>
