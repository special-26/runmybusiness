<template>
    <div class="p-6">
        <div class="max-w-7xl mx-auto flex flex-col md:flex-row gap-6 mb-6">
            <div class="md:w-[35%] w-full md:p-5 p-3 bg-white dark:bg-gray-800 shadow rounded-3xl flex flex-col justify-center items-center">
                <div class="border-2 border-dashed rounded-3xl p-1.5">
                    <figure class="rounded-2xl w-44 h-44 overflow-hidden relative group cursor-pointer">
                        <img v-if="preview" :src="preview" class="w-full h-full object-cover">
                        <img v-else :src="`https://d251pozxe7k40y.cloudfront.net/profile/avatar/`" alt="" class="w-full h-full object-cover">
                        <label class="absolute top-0 left-0 w-full h-full flex-col items-center justify-center bg-gray-900/50 text-white hidden group-hover:flex cursor-pointer" for="avatar">
                            <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" class="h-8 w-8" viewBox="0 0 24 24"><g fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"><path d="M12 10.25a.75.75 0 0 1 .75.75v1.25H14a.75.75 0 0 1 0 1.5h-1.25V15a.75.75 0 0 1-1.5 0v-1.25H10a.75.75 0 0 1 0-1.5h1.25V11a.75.75 0 0 1 .75-.75Z"></path><path d="M9.778 21h4.444c3.121 0 4.682 0 5.803-.735a4.408 4.408 0 0 0 1.226-1.204c.749-1.1.749-2.633.749-5.697c0-3.065 0-4.597-.749-5.697a4.407 4.407 0 0 0-1.226-1.204c-.72-.473-1.622-.642-3.003-.702c-.659 0-1.226-.49-1.355-1.125A2.064 2.064 0 0 0 13.634 3h-3.268c-.988 0-1.839.685-2.033 1.636c-.129.635-.696 1.125-1.355 1.125c-1.38.06-2.282.23-3.003.702A4.405 4.405 0 0 0 2.75 7.667C2 8.767 2 10.299 2 13.364c0 3.064 0 4.596.749 5.697c.324.476.74.885 1.226 1.204C5.096 21 6.657 21 9.778 21ZM16 13a4 4 0 1 1-8 0a4 4 0 0 1 8 0Zm2-3.75a.75.75 0 0 0 0 1.5h1a.75.75 0 0 0 0-1.5h-1Z"></path></g></svg>
                            <span class="text-white text-sm font-bold">Update photo</span>
                        </label>
                        <input 
                            type="file" 
                            class="avatar hidden" 
                            @input.prevent="onFileChange" 
                            id="avatar" name="avatar" 
                        />
                    </figure>
                </div>
                <span class="text-gray-400 dark:text-gray-800 text-sm text-center mt-6">Allowed *.jpeg, *.jpg, *.png, *.gif <br/> max size of 2 MB</span>
            </div>
            <div class="p-5 sm:p-8 bg-white dark:bg-gray-800 shadow rounded-3xl md:w-[65%] w-full">
                <section>
                    <header>
                        <h2 class="text-lg font-medium text-gray-900 dark:text-gray-100">Profile Information</h2>

                        <p class="mt-1 text-sm text-gray-600 dark:text-gray-400">
                            Update your account's profile information and email address.
                        </p>
                    </header>

                    <div class="mt-6 space-y-6">
                        <div>
                            <InputLabel for="name" value="Name" />

                            <TextInput
                                id="name"
                                type="text"
                                class="mt-1 block w-full"
                                v-model="profile.name"
                                required
                                autocomplete="name"
                            />

                            <InputError class="mt-2" :message="form.errors.name" />
                        </div>

                        <div>
                            <InputLabel for="name" value="Email" />

                            <TextInput
                                id="name"
                                type="text"
                                class="mt-1 block w-full"
                                v-model="profile.email"
                                readonly
                            />

                            <InputError class="mt-2" :message="form.errors.name" />
                        </div>

                        <div class="flex items-center gap-4">
                            <PrimaryButton :disabled="form.processing" @click.prevent="saveDetails">Save Profile</PrimaryButton>

                            <Transition enter-from-class="opacity-0" leave-to-class="opacity-0" class="transition ease-in-out">
                                <p v-if="form.recentlySuccessful" class="text-sm text-gray-600 dark:text-gray-400">Saved.</p>
                            </Transition>
                        </div>
                    </div>
                </section>
            </div>
        </div>

        <!-- Company Details -->
        <div class="max-w-7xl mx-auto">
            <form @submit.prevent="form.patch(route('company.update'))" class="flex flex-col md:flex-row gap-6">
                <div class="p-5 sm:p-8 bg-white dark:bg-gray-800 shadow rounded-3xl w-full space-y-6">
                    <header>
                        <h2 class="text-lg font-medium text-gray-900 dark:text-gray-100">Company Information</h2>

                        <p class="mt-1 text-sm text-gray-600 dark:text-gray-400">
                            Update your account's profile information and email address.
                        </p>
                    </header>

                    <section class="space-y-6">
                        <div>
                            <InputLabel for="contact" value="Phone Number" />

                            <TextInput
                                id="contact"
                                type="tel"
                                class="mt-1 block w-full"
                                v-model="form.contact"
                                placeholder="Contact Number"
                            />

                            <InputError class="mt-2" :message="form.errors.contact" />
                        </div>

                        <div>
                            <InputLabel for="contact" value="Bio" />

                            <TextArea
                                id="contact"
                                type="tel"
                                class="mt-1 block w-full"
                                v-model="form.bio"
                                placeholder="About Yourself"
                            />

                            <InputError class="mt-2" :message="form.errors.bio" />
                        </div>
                    </section>
                </div>
                <div class="p-5 sm:p-8 bg-white dark:bg-gray-800 shadow rounded-3xl w-full space-y-6">
                    <header>
                        <h2 class="text-lg font-medium text-gray-900 dark:text-gray-100">Company Information</h2>
                        
                        <p class="mt-1 text-sm text-gray-600 dark:text-gray-400">
                            Update your account's profile information and email address.
                        </p>
                    </header>
                    
                    <section class="space-y-6">
                        <div>
                            <InputLabel for="name" value="Company Name" />

                            <TextInput
                                id="name"
                                type="text"
                                class="mt-1 block w-full"
                                v-model="form.company_name"
                                autocomplete="name"
                                placeholder="Company Name"
                            />

                            <InputError class="mt-2" :message="form.errors.company_name" />
                        </div>

                        <div>
                            <InputLabel for="contact" value="Company Address" />

                            <TextInput
                                id="contact"
                                type="tel"
                                class="mt-1 block w-full"
                                v-model="form.company_address" 
                                placeholder="Complete address"
                            />

                            <InputError class="mt-2" :message="form.errors.company_address" />
                        </div>
                    </section>
                </div>
            </form>
        </div>
    </div>
</template>

<script setup>
    definePageMeta({
        colorMode: 'light',
        middleware: 'auth',
        layout: 'dashboard'
    })

    const user = useSupabaseUser()
    const supabase = useSupabaseClient()
    const toast = useToast()

    const preview = ref('')
    const profile = ref()

    

</script>

<style scoped>

</style>