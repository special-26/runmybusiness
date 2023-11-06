<template>
  <div class="items-center flex text-sm divide-x h-full">
      <button class="text-sm h-full px-6 hover:bg-zinc-50">
          <NuxtLink to="/profile" class="w-full h-full items-center flex gap-2">
              <Icon name="material-symbols:person-4-outline-rounded" />
              Profile
          </NuxtLink>
      </button>
      <button class="text-sm h-full px-6 hover:bg-zinc-50">
          <NuxtLink to="/profile/billing" class="w-full h-full items-center flex gap-2">
              <Icon name="material-symbols:currency-rupee-rounded" />
              Billing
          </NuxtLink>
      </button>
      <button class="text-sm h-full px-6 hover:bg-zinc-50">
          <NuxtLink to="/profile/social-links" class="w-full h-full items-center flex gap-2">
              <Icon name="iconoir:facebook" />
              Social Links
          </NuxtLink>
      </button>
      <button class="text-sm h-full px-6 hover:bg-zinc-50">
          <NuxtLink to="/profile/security" class="w-full h-full items-center flex gap-2">
              <Icon name="material-symbols:lock-outline" />
              Security
          </NuxtLink>
      </button>
  </div>
</template>

<script setup>

</script>

<style>

</style>

