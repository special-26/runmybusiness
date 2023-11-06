<template>
    <div class='flex items-center gap-6'>  
        <div class="text-sm">
            <template v-if="user">
                <NuxtLink
                    to="/dashboard"
                    class="font-semibold text-zinc-700 hover:text-gray-900 dark:hover:text-white"
                    >Dashboard</NuxtLink
                >
                <button class="border px-4 rounded-lg ml-4 py-1.5" @click="logout">Logout</button>
            </template>

            <template v-else>
                <NuxtLink
                    to="/auth/login"
                    class="text-gray-600 hover:text-gray-900"
                    >Log in</NuxtLink
                >

                <NuxtLink
                    to="/auth/register"
                    class="ml-4 text-gray-600 hover:text-gray-900"
                    >Register</NuxtLink
                >
            </template>
        </div>
    </div>
</template>

<script setup>
    const user = useSupabaseUser()
    const supabase = useSupabaseClient()
    const router = useRouter()

    const website_type = ref('listing')

    const logout = async () => {
        const { error } = await supabase.auth.signOut()
        router.push({ path: "/" });
    }
</script>

<style scoped>

</style>