<template>
    <div class="h-full">
        <header class="bg-white w-full flex justify-between items-center px-4 h-[50px] border-b border-dotted">
            <NuxtLink to="route('listing.index')" class="items-center flex gap-2 text-sm">
                back
            </NuxtLink>
        </header>

        <div class="w-full h-full p-12">

            <!-- Category -->
            <section class="mb-12 flex gap-6 md:flex-row flex-col px-6 md:px-0">
                <div class="md:w-[30%]">
                    <h5 class="">Select Category</h5>
                    <p class="text-sm text-gray-500 dark:text-gray-300">Categories like showroom, studio, SOHO</p>
                </div>
                <div class="md:w-[70%] rounded-xl md:shadow flex-col flex gap-6 md:p-6 w-full">
                    <div class="relative">
                        <form class="flex gap-2 mt-4">
                            <input placeholder="Add new category" class="w-full" />
                            <button class="border px-7 py-2 rounded-lg bg-gray-50 w-[30%]" type="submit">Add new</button>
                        </form>
                    </div>
                </div>
            </section>
                
            <!-- Basic Details -->
            <section class="mb-12 flex gap-6 md:flex-row flex-col px-6 md:px-0">
                <div class="md:w-[30%]">
                    <h5 class="">Create a new Listing</h5>
                    <p class="text-sm text-gray-500 dark:text-gray-300">Title, Short description, featured image...</p>
                </div>
                <div class="md:w-[70%] rounded-xl md:shadow flex-col flex gap-6 md:p-6 w-full">
                    <div class="relative">
                        <input placeholder="Name" />
                    </div>
                    <div class="relative">
                        <textarea rows="5" placeholder="Description" ></textarea>
                    </div>
                    <div class="relative">
                        <input placeholder="Complete Address" />
                    </div>
                    <div class="grid grid-cols-2 gap-6">
                        <div class="relative">
                            <input  placeholder="City" />
                        </div>
                        <div class="relative">
                            <input  placeholder="Total Area" />
                        </div>
                    </div>
                </div>
            </section>

            <!-- Amenities -->
            <section class="mb-12 flex gap-6 md:flex-row flex-col px-6 md:px-0">
                <div class="md:w-[30%]">
                    <h5 class="dark:text-gray-200">Investment &amp; Property Details</h5>
                    <p class="text-sm text-gray-500 dark:text-gray-300">Units, operation, floor,location...</p>
                </div>
                <div class="md:w-[70%] rounded-xl shadow flex-col flex">
                    <!-- Price and property type -->
                    <section class="p-6">
                        <div class="grid grid-cols-2 gap-6">
                            <div class="relative">
                                <label class="">Price</label>
                                <input  placeholder="Price" />
                            </div>
                            <div class="relative">
                                <label>Property Type</label>
                                <select class="bg-white border border-gray-200 dark:border-gray-800 p-3 rounded-lg dark:bg-gray-900 w-full dark:text-gray-300">
                                    <option value="residential">Residential</option>
                                    <option value="commercial">Commercial</option>
                                </select>
                            </div>
                        </div>
                    </section>
                    <hr/>
                    <!-- Amenities -->
                    <section class="p-6">
                        <div class="relative">
                            <label>Amenities</label>
                            
                        </div>
                    </section>
                </div>
            </section>

            <!-- Map Location and Walkthrough -->
            <section class="mb-12 flex gap-6 md:flex-row flex-col px-6 md:px-0">
                <div class="md:w-[30%]">
                    <h5 class="dark:text-gray-200">Walkthrough &amp; Map Location</h5>
                    <p class="text-sm text-gray-500 dark:text-gray-300">Google map location and walkthrough video</p>
                </div>
                <div class="md:w-[70%] rounded-xl shadow flex-col flex">
                    <section class="">
                        <!-- Map Location -->
                        <div class="relative p-6">
                            <label>Map Location</label>
                            <div class="w-full">
                                <input type="text"
                                    ref="streetRef"
                                    placeholder="Search street..."
                                    class="w-full placeholder-gray-400 rounded-md border-gray-300 focus:ring-gray-500 focus:border-gray-500 py-3 mb-5" 
                                />
                                <div id="map"></div>
                                <div id="infowindow-content">
                                    <span id="place-name" class="title"></span><br />
                                    <span id="place-address"></span>
                                </div>
                            </div>
                        </div>

                        <hr/>
                        <!-- Walkthrough -->
                        <div class="relative p-6">
                            <label>Walkthrough - (Youtube Video Link)</label>
                            <input placeholder="Walkthrough" />
                        </div>
                    </section>                    
                </div>
            </section>

            <!-- Image Gallery -->
            <section class="flex gap-6 md:flex-row flex-col px-6 md:px-0 mb-12">
                <div class="md:w-[30%]">
                    <h5 class="dark:text-gray-200">Image Gallery</h5>
                    <p class="text-sm text-gray-500 dark:text-gray-300">Upload Upto 10 Image. <br/> <small>Format must be .jpg, .jpeg, .png</small></p>
                </div>
                <div class="md:w-[70%] shadow rounded-xl flex-col flex gap-6 p-6">
                    <h5 class="font-bold">Images</h5>
                    
                </div>
            </section>

            <!-- Floor Plans -->
            <section class="flex gap-6 md:flex-row flex-col px-6 md:px-0">
                <div class="md:w-[30%]">
                    <h5 class="dark:text-gray-200">Floor Plans</h5>
                    <p class="text-gray-500 dark:text-gray-300">Upload Upto 10 Image. <br/> <small>Format must be .jpg, .jpeg, .png</small></p>
                </div>
                <div class="md:w-[70%] shadow rounded-xl flex-col flex gap-6 p-6">
                    <h5 class="font-bold">Floor Plans</h5>

                    
                </div>
            </section>

            <section class="flex justify-end px-6 pb-12">
                <button 
                class="bg-gray-800 text-white py-3 px-7 rounded-lg mt-6 w-full md:w-auto"
                type="submit" 
                >Add Listing</button>
            </section>

        </div>
    </div>
</template>

<script setup>
    const user = useSupabaseUser()
    const supabase = useSupabaseClient()

    definePageMeta({
        colorMode: 'light',
        middleware: 'auth',
        layout: 'dashboard'
    })
</script>

<style scoped>

</style>