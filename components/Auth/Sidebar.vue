<template>
    <aside class="bg-white dark:bg-gray-950 flex flex-col h-screen border-r border-dashed dark:border-gray-900">
        <NuxtLink to="/" class="flex px-10 py-6">
            <LogoSvg class="h-12 w-full dark:text-gray-300 text-gray-800" />
        </NuxtLink>

        <div class="hr h-0.5 w-full bg-gradient-to-r from-transparent via-gray-200 dark:via-gray-800 to-transparent"></div>

        <div class="action flex flex-col text-gray-500 my-4 dark:text-gray-500 font-inter text-sm px-4" v-if="website_type">

            <!-- Sidebar for Product -->
            <template v-if="website_type === 'product'">
                <NuxtLink 
                    v-for="link in product"
                    :to="link.url"
                    class="flex items-center gap-2 px-2 py-1.5 group text-gray-500 hover:font-bold hover:text-gray-900 dark:hover:text-gray-300 rounded-2xl border border-transparent cursor-pointer"  
                >
                    <button class="
                        buttonIcon w-10 h-10 
                        flex items-center justify-center group-hover:text-gray-800 dark:group-hover:text-gray-400 text-gray-400
                    ">
                        <Icon :name="link.icon" class="w-4 h-4" />
                    </button>
                    {{ link.name }}
                </NuxtLink>
            </template>

            <!-- Sidebar for Realestate -->
            <template v-if="website_type === 'realestate'">
                <NuxtLink 
                    v-for="link in realestate"
                    :to="link.url"
                    class="flex items-center gap-2 px-2 py-1.5 group text-gray-500 hover:font-bold hover:text-gray-900 dark:hover:text-gray-300 rounded-2xl border border-transparent cursor-pointer"  
                >
                    <button class="
                        buttonIcon w-10 h-10 
                        flex items-center justify-center group-hover:text-gray-800 dark:group-hover:text-gray-400 text-gray-400
                    ">
                        <Icon :name="link.icon" class="h-4 w-4" />
                    </button>
                    {{ link.name }}
                </NuxtLink>
            </template>
        </div>

        <div class="hr h-0.5 w-full bg-gradient-to-r from-transparent via-gray-200 dark:via-gray-800 to-transparent my-4"></div>

        <div class="flex flex-col text-gray-500 dark:text-gray-500 font-inter text-sm px-4">
            <NuxtLink 
                to="/profile/setting"
                class="flex items-center gap-2 px-2 py-1.5 group text-gray-500 hover:font-bold hover:text-gray-900 dark:hover:text-gray-300 rounded-2xl border border-transparent cursor-pointer"  
            >
                <button class="
                    buttonIcon w-10 h-10 
                    flex items-center justify-center group-hover:text-gray-800 dark:group-hover:text-gray-400 text-gray-400
                ">
                    <Icon name="material-symbols:settings-outline-rounded" class="w-5 h-5" />
                </button>
                Setting
            </NuxtLink>
            <NuxtLink 
                to="/profile"
                class="flex items-center gap-2 px-2 py-1.5 group text-gray-500 hover:font-bold hover:text-gray-900 dark:hover:text-gray-300 rounded-2xl border border-transparent cursor-pointer"  
            >
                <button class="
                    buttonIcon w-10 h-10 
                    flex items-center justify-center group-hover:text-gray-800 dark:group-hover:text-gray-400 text-gray-400
                ">
                    <Icon name="material-symbols:person-4-outline-rounded" class="w-5 h-5" />
                </button>
                Profile
            </NuxtLink>
        </div>
        
        <section class="p-3 mt-auto">
            <div 
                class="bg-white dark:bg-gray-950 border border-dashed rounded-lg p-4"
            >
                    <p class="text-sm text-gray-800 dark:text-gray-200">
                        Your email address is unverified.
                    </p>
            </div>
        </section>

    </aside>
</template>

<script setup>
    const user = useSupabaseUser()
    const supabase = useSupabaseClient()

    const website_type = ref('')

    const fetchData = async () => {
        let { data: profile, error } = await supabase
            .from('profiles')
            .select('website_type')
            .single()

        website_type.value = profile.website_type
    }
    fetchData()

    const realestate = ref([
        { name: "Dashboard", icon: 'streamline:interface-dashboard-layout-circle-app-application-dashboard-home-layout-circle', route: 'dashboard.index', url: '/dashboard'},
        { name: "Property", icon: 'ph:house-bold', route: 'listing.index', url: '/property'},
        // { name: "Blog", icon: 'solar:document-text-linear', route: 'blog.index', url: '/blog'},
        // { name: "Categories", icon: 'ic:twotone-category', route: 'category.index', url: '/category'},
        // { name: "My Clients", icon: 'solar:users-group-rounded-linear', route: 'client.index', url: '/client'},
        { name: "Contact Leads", icon: 'mdi:message-reply-text-outline', route: 'contact.index', url: '/contact-form'},
    ])

    // For Listing Serviec and Product
    const product = ref([
        { name: "Dashboard", icon: 'streamline:interface-dashboard-layout-circle-app-application-dashboard-home-layout-circle', route: 'dashboard.index', url: '/dashboard'},
        { name: "Products", icon: 'ic:sharp-format-list-bulleted', url: '/product'},
        { name: "Add Product", icon: 'gridicons:create', url: '/product/add-product'},
        { name: "Product Category", icon: 'ic:twotone-category', url: '/product/category'},
        // { name: "Blog", icon: 'solar:document-text-linear', url: '/blog'},
        // { name: "My Clients", icon: 'solar:users-group-rounded-linear', url: '/client'},
        { name: "Contact Leads", icon: 'mdi:message-reply-text-outline', url: '/contact-form'},
    ])

    // Profile Links
    const profilelinks = ref([
        { name: "Profile", icon: 'material-symbols:person-4-outline-rounded', url: '/profile'},
        { name: "Billing", icon: '/profile/billing', url: '/profile'},
        { name: "Social Links", icon: 'iconoir:facebook', url: '/profile/social-links'},
        { name: "Security", icon: 'material-symbols:lock-outline', url: '/profile/security'},
    ])
</script>