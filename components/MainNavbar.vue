<template>
  <header class="header hidden sticky top-0 left-0 w-full z-20 md:h-24 py-2 md:flex items-center font-inter">
        <nav class="flex justify-between items-center max-w-7xl mx-auto px-4 md:px-6 rounded-3xl backdrop-blur-xl bg-white/75 w-full h-full border border-white/50">
            <NuxtLink to="/">
                <LogoSvg class="md:h-10 h-6 text-gray-800" />
            </NuxtLink>
            <div class="hidden md:flex items-center gap-6 text-gray-900 text-sm">
                <NuxtLink to="/pricing">Pricing</NuxtLink>
                <NuxtLink to="/contact">Contact</NuxtLink>
            </div>
            
            <AuthButton />
        </nav>
    </header>
</template>

<script setup>
  const user = useSupabaseUser()
</script>

<style>

</style>

