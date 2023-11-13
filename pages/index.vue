<template>
    <div class="min-h-screen bg-white h-full w-full light">

        <!-- <div class="notification w-full bg-secondary/25 text-xs text-purple-800 px-12 py-1">
            Setup your website
        </div> -->
        
        <MainNavbar />

        <!-- Hero Area -->
        <section class="hero-area relative md:h-[85vh] h-full bg-form-lines md:mb-20">
            <div class="h-full overflow-hidden ">
                <div class="relative flex flex-col gap-6 md:flex-row items-center justify-center h-full">
                    <div>
                        <HeroMan class="md:h-[70vh] h-[30vh] w-full" base="#111111" gray="#b1b1b1" white="#ffffff" />
                    </div>
                    <div>
                        <div class="flex justify-center">
                            <a class="inline-flex items-center gap-x-2 bg-white border border-gray-200 text-xs text-gray-600 p-2 px-3 rounded-full transition hover:border-gray-300">
                                <div>👋</div>
                                <Icon name="ic:outline-arrow-right-alt" />
                                <span>Design</span>
                                <Icon name="ic:outline-arrow-right-alt" />
                                <span>Development</span>
                                <Icon name="ic:outline-arrow-right-alt" />
                                <div>🚀</div>
                            </a>
                        </div>

                        <div class="mt-5 max-w-3xl text-center mx-auto">
                            <h1 class="block font-bold text-gray-800 text-4xl md:text-5xl lg:text-6xl">Your Reliable Partner for Content Management</h1>
                        </div>
                        <div class="mt-5 max-w-3xl text-center mx-auto">
                            <p class="md:text-lg text-gray-600">Effortlessly Manage Your Content with us <br/>  Focus on Growth, We'll Handle the Rest</p>
                        </div>
                        <div class="flex flex-col items-center justify-center mt-10">
                            <button class="bg-gradient-to-r from-indigo-600 to-indigo-800 text-white px-4 py-1.5 rounded-lg mb-2">Start Now</button>
                            <Icon name="ph:arrow-bend-left-up" class="w-6 h-6 text-secondary " />
                            <div class="text-secondary font-niconne font-bold text-lg">Start building website in minutes</div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- How this works -->
        <section class="w-full h-full md:mb-20 mb-10">
            <div class="max-w-7xl mx-auto h-full bg-white border-2 border-dotted rounded-3xl overflow-hidden md:p-12 mt-12 md:mt-0">
                <!-- Features -->
                <div class="max-w-[85rem] md:px-4 md:py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
                    <div class="relative p-6 md:p-16">
                        <!-- Grid -->
                        <div class="relative z-10 lg:grid lg:grid-cols-12 lg:gap-16 lg:items-center">
                            <div class="mb-10 lg:mb-0 lg:col-span-6 lg:col-start-8 lg:order-2">
                                <h2 class="text-2xl text-gray-800 font-bold sm:text-3xl">
                                    Save time and increase your online presence with us
                                </h2>

                                <!-- Tab Navs -->
                                <nav class="grid gap-4 mt-5 md:mt-10" aria-label="Tabs" role="tablist">
                                    <button type="button" class="hs-tab-active:bg-white hs-tab-active:shadow-md hs-tab-active:hover:border-transparent text-left hover:bg-gray-200 p-4 md:p-5 rounded-xl active" id="tabs-with-card-item-1" data-hs-tab="#tabs-with-card-1" aria-controls="tabs-with-card-1" role="tab" @click="activeTab = 'tabOne'">
                                        <span class="flex">
                                        <svg class="flex-shrink-0 mt-2 h-6 w-6 md:w-7 md:h-7 hs-tab-active:text-secondary text-gray-800" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                            <path d="M5.5 2A3.5 3.5 0 0 0 2 5.5v5A3.5 3.5 0 0 0 5.5 14h5a3.5 3.5 0 0 0 3.5-3.5V8a.5.5 0 0 1 1 0v2.5a4.5 4.5 0 0 1-4.5 4.5h-5A4.5 4.5 0 0 1 1 10.5v-5A4.5 4.5 0 0 1 5.5 1H8a.5.5 0 0 1 0 1H5.5z"/>
                                            <path d="M16 3a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
                                        </svg>
                                        <span class="grow ml-6">
                                            <span class="block text-lg font-semibold hs-tab-active:text-secondary text-gray-800">Advanced tools</span>
                                            <span class="block mt-1 text-gray-800">Use runmybusiness thoroughly thought and automated libraries to manage your businesses.</span>
                                        </span>
                                        </span>
                                    </button>

                                    <button type="button" class="hs-tab-active:bg-white hs-tab-active:shadow-md hs-tab-active:hover:border-transparent text-left hover:bg-gray-200 p-4 md:p-5 rounded-xl" id="tabs-with-card-item-2" data-hs-tab="#tabs-with-card-2" aria-controls="tabs-with-card-2" role="tab" @click="activeTab = 'tabTwo'">
                                        <span class="flex">
                                        <svg class="flex-shrink-0 mt-2 h-6 w-6 md:w-7 md:h-7 hs-tab-active:text-secondary text-gray-800" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                            <path fill-rule="evenodd" d="M0 0h1v15h15v1H0V0Zm14.817 3.113a.5.5 0 0 1 .07.704l-4.5 5.5a.5.5 0 0 1-.74.037L7.06 6.767l-3.656 5.027a.5.5 0 0 1-.808-.588l4-5.5a.5.5 0 0 1 .758-.06l2.609 2.61 4.15-5.073a.5.5 0 0 1 .704-.07Z"/>
                                        </svg>
                                        <span class="grow ml-6">
                                            <span class="block text-lg font-semibold hs-tab-active:text-secondary text-gray-800">Smart dashboards</span>
                                            <span class="block mt-1 text-gray-800">Smart dashboard with analytics and quick links. Manage and use API's.</span>
                                        </span>
                                        </span>
                                    </button>

                                    <button type="button" class="hs-tab-active:bg-white hs-tab-active:shadow-md hs-tab-active:hover:border-transparent text-left hover:bg-gray-200 p-4 md:p-5 rounded-xl" id="tabs-with-card-item-3" data-hs-tab="#tabs-with-card-3" aria-controls="tabs-with-card-3" role="tab" @click="activeTab = 'tabThree'">
                                        <span class="flex">
                                        <svg class="flex-shrink-0 mt-2 h-6 w-6 md:w-7 md:h-7 hs-tab-active:text-secondary text-gray-800" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                            <path d="M5.52.359A.5.5 0 0 1 6 0h4a.5.5 0 0 1 .474.658L8.694 6H12.5a.5.5 0 0 1 .395.807l-7 9a.5.5 0 0 1-.873-.454L6.823 9.5H3.5a.5.5 0 0 1-.48-.641l2.5-8.5zM6.374 1 4.168 8.5H7.5a.5.5 0 0 1 .478.647L6.78 13.04 11.478 7H8a.5.5 0 0 1-.474-.658L9.306 1H6.374z"/>
                                        </svg>
                                        <span class="grow ml-6">
                                            <span class="block text-lg font-semibold hs-tab-active:text-secondary text-gray-800">Powerful features</span>
                                            <span class="block mt-1 text-gray-800">Reduce time and effort on building modern look website with RunMyBusiness only.</span>
                                        </span>
                                        </span>
                                    </button>
                                </nav>
                                <!-- End Tab Navs -->
                            </div>
                            <!-- End Col -->

                            <div class="lg:col-span-6">
                                <div class="relative">
                                    <!-- Tab Content -->
                                    <div>
                                        <div class="bg-white rounded-xl">
                                            <img class="shadow-xl shadow-gray-200 rounded-xl" src="/images/vecto_tools.webp" alt="Advanced tools" v-if="activeTab === 'tabOne'">
                                            <img class="shadow-xl shadow-gray-200 rounded-xl" src="/images/vector_7.webp" alt="Smart Dashboard" v-else-if="activeTab === 'tabTwo'">
                                            <img class="shadow-xl shadow-gray-200 rounded-xl" src="/images/vector_2.webp" alt="Powerfull features" v-else>
                                        </div>
                                    </div>
                                    <!-- End Tab Content -->

                                    <!-- SVG Element -->
                                    <div class="hidden absolute top-0 right-0 translate-x-20 md:block lg:translate-x-20">
                                        <svg class="w-16 h-auto text-primary" width="121" height="135" viewBox="0 0 121 135" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M5 16.4754C11.7688 27.4499 21.2452 57.3224 5 89.0164" stroke="currentColor" stroke-width="10" stroke-linecap="round"/>
                                        <path d="M33.6761 112.104C44.6984 98.1239 74.2618 57.6776 83.4821 5" stroke="currentColor" stroke-width="10" stroke-linecap="round"/>
                                        <path d="M50.5525 130C68.2064 127.495 110.731 117.541 116 78.0874" stroke="currentColor" stroke-width="10" stroke-linecap="round"/>
                                        </svg>
                                    </div>
                                    <!-- End SVG Element -->
                                </div>
                            </div>
                            <!-- End Col -->
                        </div>
                        <!-- End Grid -->

                        <!-- Background Color -->
                        <div class="absolute inset-0 grid grid-cols-12 w-full h-full">
                            <div class="col-span-full lg:col-span-7 lg:col-start-6 bg-gray-100 w-full h-5/6 rounded-xl sm:h-3/4 lg:h-full"></div>
                        </div>
                        <!-- End Background Color -->
                    </div>
                </div>
                <!-- End Features -->
            </div>
        </section>

        <!-- Who is this for -->
        <section class="w-full h-full md:mb-20 mb-10">
            <div class="max-w-7xl mx-auto h-full rounded-3xl overflow-hidden">
                <h2 class="text-center text-[2.8em] font-exo text-gray-900">Who is this for?</h2>
                <p class="text-gray-600 mt-3 text-center md:w-[60%] w-[90%] mx-auto">RunMyBusiness is for those Individual or agencies who want to manage their website content hassle free.</p>
                <div class="grid md:grid-cols-3 gap-6 mt-12">
                    <div class="rounded-3xl p-8 bg-zinc-50 h-[65vh] md:h-[75vh] overflow-hidden">
                        <h3 class="font-exo text-gray-900">Design agencies</h3>
                        <p class="text-sm text-gray-600 mb-10 mt-2">To manage their clients. without workload of design, content, hosting and database.</p>
                        <img src="/images/w_3.jpg" alt="" class="border-4 border-gray-800 rounded-3xl">
                    </div>
                    <div class="rounded-3xl p-8 bg-primary/75 h-[65vh] md:h-[75vh] overflow-hidden">
                        <h3 class="font-exo text-gray-900">Early-stage starups</h3>
                        <p class="text-sm text-gray-600 mb-10 mt-2">Have a product but no brand or a landing page? We'll work out off to bring your vision to life and make a splash in the startup world.</p>
                        <img src="/images/w_1.jpg" alt="" class="border-4 border-gray-800 rounded-3xl">
                    </div>
                    <div class="rounded-3xl p-8 bg-secondary/75 h-[65vh] md:h-[75vh] overflow-hidden text-white">
                        <h3 class="font-exo text-white">Individual</h3>
                        <p class="text-sm text-gray-50 mb-10 mt-2">Need a professionally beautiful landing page to transform your online presence.</p>
                        <img src="/images/w_2.jpg" alt="" class="border-4 border-gray-800 rounded-3xl">
                    </div>
                </div>
            </div>
        </section>

        <!-- FAQ -->
        <section class="w-full h-full md:mt-10">
            <div class="max-w-5xl mx-auto h-full rounded-3xl overflow-hidden md:px-0 px-6 py-3">
                <Faq />
            </div>
        </section>

        <Footer />

        <!-- Mobile Bottom Nav -->
    </div>
</template>

<script setup>
    definePageMeta({
        colorMode: 'light',
        layout: 'default',
    })
    
    const activeTab = ref('tabOne')
</script>

<style scoped>
.bg-form-lines{
    background-color: transparent;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Cg fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.05'%3E%3Cpath opacity='.6' d='M96 95h4v1h-4v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9zm-1 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-9-10h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm9-10v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-9-10h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm9-10v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-9-10h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm9-10v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-9-10h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9z'/%3E%3Cpath d='M6 5V0H5v5H0v1h5v94h1V6h94V5H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
}
</style>