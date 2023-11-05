<template>
    <div class="flex w-full h-screen overflow-hidden bg-gray-100">
        <div class="md:w-[25%] h-screen overflow-y-auto 
                [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']
                hidden left-0 top-0 bottom-0 md:block">
            <AuthSidebar />
        </div>
        <main class="w-full h-screen scroll-smooth overflow-hidden bg-white pb-12 md:pb-0">
            <AuthNavbar />

            <section class="relative md:h-[calc(100vh-62px)] h-full bg-white overflow-y-auto pb-12 md:pb-0">
                <slot />
            </section>
            
            <!-- Mobile Bottom Nav -->

        </main>

    </div>
</template>

<script setup>

</script>

<style>

</style>

