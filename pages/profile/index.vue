<template>
    <div class="relative">
        <header class="bg-white w-full flex justify-between items-center pr-6 h-[50px] border-b border-dotted">
            <ProfileNav />
            <button 
                class="hover:bg-gray-800 hover:text-white border py-1.5 px-4 rounded-lg text-sm"
                type="submit" @click="updateProfile">
                {{ loading ? 'Updating...' : 'Update Profile' }}
            </button>
        </header>

        <section class="p-6" v-if="profile">
            <div class="max-w-7xl mx-auto flex flex-col md:flex-row gap-6 mb-6">
                <div class="md:w-[35%] w-full md:p-5 p-3 bg-white dark:bg-gray-800 shadow rounded-3xl flex flex-col justify-center items-center">
                    <div class="border-2 border-dashed rounded-3xl p-1.5">
                        <figure class="rounded-2xl w-44 h-44 overflow-hidden relative group cursor-pointer">
                            <img v-if="profile.avatar_url" :src="profile.avatar_url" class="w-full h-full object-cover">
                            <img v-else src="/images/vector_8.webp" alt="" class="w-full h-full object-cover">

                            <label class="absolute top-0 left-0 w-full h-full flex-col items-center justify-center bg-gray-900/50 text-white hidden group-hover:flex cursor-pointer" for="avatar">
                                <Icon name="material-symbols:add-a-photo-outline-sharp" class="w-6 h-6" />
                                <span class="text-white text-sm font-bold">Update photo</span>
                            </label>
                            <input 
                                type="file" 
                                class="avatar hidden" 
                                @input.prevent="changeAvatar" 
                                id="avatar" name="avatar" 
                            />
                            <!-- Loading skeleton -->
                            <USkeleton class="h-44 w-full absolute top-0 left-0 bg-zinc-300" v-if="avatarLoading" />
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
                                    required
                                    autocomplete="name"
                                    v-model="profile.full_name"
                                />
                            </div>

                            <div>
                                <InputLabel for="email" value="Email" />

                                <TextInput
                                    id="email"
                                    type="email"
                                    class="mt-1 block w-full"
                                    readonly
                                    v-model="user.email"
                                />
                            </div>
                        </div>
                    </section>
                </div>
            </div>

            <!-- Company Details -->
            <div class="max-w-7xl mx-auto">
                <form class="flex flex-col md:flex-row gap-6">
                    <div class="p-5 sm:p-8 bg-white dark:bg-gray-800 shadow rounded-3xl w-full space-y-6">
                        <header>
                            <h2 class="text-lg font-medium text-gray-900 dark:text-gray-100">Contact Information</h2>

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
                                    placeholder="Contact Number"
                                    v-model="profile.phone"
                                />
                            </div>

                            <div>
                                <InputLabel for="bio" value="Bio" />

                                <TextArea
                                    id="bio"
                                    class="mt-1 block w-full"
                                    placeholder="About Yourself"
                                    v-model="profile.bio"
                                />
                            </div>
                        </section>
                    </div>
                    <div class="p-5 sm:p-8 bg-white dark:bg-gray-800 shadow rounded-3xl w-full space-y-6">
                        <header>
                            <h2 class="text-lg font-medium text-gray-900 dark:text-gray-100">Website Information</h2>
                            
                            <p class="mt-1 text-sm text-gray-600 dark:text-gray-400">
                                Your website name, Website type etc.
                            </p>
                        </header>
                        
                        <section class="space-y-6">
                            <div>
                                <InputLabel for="website_name" value="Website Name" />

                                <TextInput
                                    id="website_name"
                                    type="text"
                                    readonly
                                    class="mt-1 block w-full"
                                    placeholder="Website name"
                                    v-model="profile.website_name"
                                />
                            </div>

                            <div>
                                <InputLabel for="website_type" value="Website Type" />

                                <TextInput
                                    id="website_type"
                                    readonly
                                    type="tel"
                                    class="mt-1 block w-full"
                                    placeholder="Website type"
                                    v-model="profile.website_type"
                                />

                            </div>
                        </section>
                    </div>
                </form>
            </div>
        </section>
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
    const loading = ref(false)
    const profile = ref()
    const avatar = ref('')
    const avatarLoading = ref(false)

    const fetchProfile = async () => {
        let { data, error } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', user.value.id)
            .single()
        profile.value = data
        avatar.value = data.avatar_url
    }
    fetchProfile()


    const changeAvatar = async (evt) => {
        let file = evt.target.files[0];
        try {
            if(!file || file.length === 0) {
                throw new Error("You must have at least one file to upload");
            } else {
                avatarLoading.value = true
            
                if (profile.value.avatar_url) {
                    let str = profile.value.avatar_url.split('/');
                    let result = str[str.length - 1];
                    const { data, error } = await supabase
                        .storage
                        .from('avatars')
                        .remove([result])
                }

                const fileExt = file.name.split('.').pop();
                const fileName = `${Math.random()}.${fileExt}`
                const filePath = `${fileName}`

                let {error: uploadError} = await supabase.storage.from('avatars').upload(filePath, file)

                if(uploadError) throw uploadError

                const { data } = supabase.storage.from('avatars').getPublicUrl(filePath)
                avatar.value = data.publicUrl;
                updateProfile();
            }
        } catch (error) {
            console.log(error);
        } finally {
            
        }
    }

    const updateProfile = async () => {
        const { data, error } = await supabase
            .from('profiles')
            .update({ 
                avatar_url: avatar.value,
                username: profile.value.username,
                full_name: profile.value.full_name,
                phone: profile.value.phone,
                bio: profile.value.bio
            })
            .eq('id', user.value.id)
            .select()
        fetchProfile()
        toast.add({ title: 'Profile updated' })
        avatarLoading.value = false
    }
    

</script>

<style scoped>

</style>