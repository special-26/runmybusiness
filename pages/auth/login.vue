<template>
  <div class="text-zinc-900 h-screen flex items-center justify-center font-indie relative">
        <img src="/images/login-bg.jpeg" class="absolute top-0 left-0 w-full h-full object-cover grayscale opacity-25" />
        
        <section class="w-full max-w-sm bg-white/50 backdrop-blur rounded-xl p-10">
            <h2 class="text-3xl font-bold mb-5 text-center">
                Login
            </h2>
            <form class="flex flex-col gap-5 w-full" @submit.prevent="signIn">
                <input type="email" class="w-full outline-zinc-700 border-2 rounded-lg bg-white  border-zinc-600 p-3" placeholder="Your Email" v-model="email">
                <input type="password" class="w-full outline-zinc-700 border-2 rounded-lg bg-white  border-zinc-600 p-3" placeholder="Password" v-model="password">
                <button class="bg-zinc-800 text-zinc-100 rounded-xl w-full py-3 flex gap-2 items-center justify-center group" type="submit">
                    Login
                    <Icon v-if="loading" name="line-md:loading-twotone-loop" class="w-5 h-5" />
                    <Icon v-else name="solar:login-2-line-duotone" class="w-5 h-5" />
                </button>
            </form>
            <div>{{ errorMsg }}</div>

            <div class="text-center mt-6 text-sm ">
                Create new account
                <NuxtLink to="/auth/register" class="font-bold underline">Register</NuxtLink>
            </div>
        </section>
  </div>
</template>

<script setup>
    const supabase = useSupabaseClient()
    const router = useRouter();

    definePageMeta({
        colorMode: 'light',
        layout: 'empty',
    })

  const email = ref('me@vimalbharti.com');
  const password = ref('password');
  const errorMsg = ref(null)

  const loading = ref(false)

  const signIn = async () => {
      try {
          loading.value = true;
          const { error } = await supabase.auth.signInWithPassword({
              email: email.value, 
              password: password.value,
          });
          if(error) throw error;
          router.push({ path: "/" });
          loading.value = false;
      } catch (error) {
          errorMsg.value = error.message
      }
  }
</script>

<style scoped>

</style>