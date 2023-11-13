<template>
    <nav class="sticky top-0 z-10 bg-white dark:bg-gray-950/50 backdrop-blur-xl w-full hidden md:flex justify-between items-center h-[62px] px-6 border-b border-dashed dark:border-gray-900">
        <header>
            <slot name="header"></slot>
        </header>
        <div class="flex gap-4">
            <NuxtLink 
                to="/"
                class="flex items-center gap-2 border px-4 py-1 rounded-lg text-gray-700 dark:text-gray-200 dark:border-gray-800"
            >
                <Icon name="solar:programming-broken" class="w-4 h-4" />
                api
            </NuxtLink>

            <!-- <ThemeToggle /> -->

            <!-- Settings Dropdown -->

            <button class="flex items-center gap-1 border px-3 py-1 rounded-lg text-gray-700 dark:text-gray-200 dark:border-gray-800 hover:bg-zinc-50" @click="logout">
                <Icon name="ri:logout-circle-line" />
                Logout
            </button>

        </div>
    </nav>
</template>

<script setup>
    const supabase = useSupabaseClient()
    const user = useSupabaseUser()
    const router = useRouter();

    const loading = ref(false)
    const email = ref(user.value.email)
    
    const items = [
        [
            {
                label: 'Profile',
                avatar: {
                    src: 'https://avatars.githubusercontent.com/u/739984?v=4'
                },
                click: async () => {
                    router.push({ path: "/profile" });
                }    
            }
        ], [{
            label: 'Logout',
            icon: 'i-heroicons-arrow-left-on-rectangle',
            click: async () => {
                const { error } = await supabase.auth.signOut()
                router.push({ path: "/" });
            }
        }]
    ]

    const logout = async () => {
        const { error } = await supabase.auth.signOut()
        router.push({ path: "/" });
    }

</script>

<style scoped>
    
</style>