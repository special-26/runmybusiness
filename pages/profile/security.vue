<template>
  <div class="relative">
      <header class="bg-white w-full flex justify-between items-center pr-6 h-[50px] border-b border-dotted">
          <ProfileNav />
      </header>

      <section class="p-6">
        <div class="grid md:grid-cols-2 grid-cols-1 gap-6">
            <div class="p-4 sm:p-8 bg-white dark:bg-gray-800 shadow rounded-3xl w-full">
              <section>
                  <header class="mb-5">
                      <h2 class="text-lg font-medium text-gray-900 dark:text-gray-100">Update Password</h2>
                      <p class="mt-1 text-sm text-gray-600 dark:text-gray-400">
                          Ensure your account is using a long, random password to stay secure.
                      </p>
                  </header>
                  <div class="mb-5">
                      <InputLabel for="current_password" value="Current Password" />

                      <TextInput
                          id="current_password"
                          ref="currentPasswordInput"
                          type="password"
                          class="mt-1 block w-full"
                          autocomplete="current-password"
                      />
                  </div>

                  <div class="mb-5">
                      <InputLabel for="password" value="New Password" />
                      <TextInput
                          id="password"
                          ref="passwordInput"
                          type="password"
                          class="mt-1 block w-full"
                          autocomplete="new-password"
                      />
                  </div>

                  <div class="mb-5">
                      <InputLabel for="password_confirmation" value="Confirm Password" />
                      <TextInput
                          id="password_confirmation"
                          type="password"
                          class="mt-1 block w-full"
                          autocomplete="new-password"
                      />
                  </div>

                  <div class="flex items-center gap-4">
                      <button class="border hover:border-zinc-800 hover:text-zinc-200 bg-zinc-100 border-zinc-400 text-zinc-800 w-full p-3 rounded-xl">Save</button>
                  </div>
              </section>
            </div>
            <!-- seprator -->
            <div class="p-4 sm:p-8 bg-white dark:bg-gray-800 shadow rounded-3xl w-full">
              <section class="space-y-6">
                <header>
                    <h2 class="text-lg font-medium text-gray-900 dark:text-gray-100">Delete Account</h2>

                    <p class="mt-1 text-sm text-gray-600 dark:text-gray-400">
                        Once your account is deleted, all of its resources and data will be permanently deleted. Before deleting
                        your account, please download any data or information that you wish to retain.
                    </p>
                </header>

                <button class="bg-red-100 text-red-400 rounded-lg border border-red-300 hover:bg-red-500 hover:text-red-200 p-3 text-sm w-full" @click="confirmingUserDeletion = true">Delete Account</button>

                <UModal v-model="confirmingUserDeletion">
                    <div class="p-6">
                        <h2 class="text-lg font-medium text-gray-900 dark:text-gray-100">
                            Are you sure you want to delete your account?
                        </h2>

                        <p class="mt-1 mb-3 text-sm text-gray-600 dark:text-gray-400">Once your account is deleted, all of its resources and data will be permanently deleted. </p>
                        <h4 class="border-y py-2 text-sm font-bold">Type : <span class="text-sm bg-yellow-200 px-2 py-1 rounded">{{ confirmText }}</span></h4>

                        <div class="mt-6">
                            <TextInput
                                type="text"
                                class="mt-1 block w-3/4 border-2"
                                placeholder="Enter above text"
                                v-model="enteredText"
                                :class="notMatched ? 'border-red-600' : ''"
                            />
                        </div>

                        <div class="mt-6 flex justify-between text-sm">
                            <button @click="closeModal"> Cancel </button>

                            <button 
                                class="bg-red-200 text-red-700 border border-red-500 px-4 py-2 rounded-xl" @click="deleteAccount"
                            >
                                Delete Account
                            </button>
                        </div>
                    </div>
                </UModal>

            </section>
            </div>
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
  const router = useRouter()

  const confirmText = ref('yes delete my account')
  const enteredText = ref('')
  const notMatched = ref(false)

  const confirmingUserDeletion = ref(false)

    const deleteAccount = async () => {
        if(confirmText.value === enteredText.value){
            await supabase.auth.signOut()
            router.push({ path: "/" });
            // Deleet user from supabase
            const {data} = await supabase.auth.admin.deleteUser(
                user.value.id
            )
            if(data){
                await supabase.from('profiles').delete().eq('id', user.value.id)
            }

        } else {
            notMatched.value = true
        }
    }

</script>

<style>

</style>

