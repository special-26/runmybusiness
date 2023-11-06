<template>
    <div class="text-zinc-900 h-screen flex items-center justify-center font-indie relative">
        <img src="/images/login-bg.jpeg" class="absolute top-0 left-0 w-full h-full object-cover grayscale opacity-25" />
        <section class="w-full max-w-sm bg-white/50 backdrop-blur rounded-xl p-10">
          <h2 class="text-3xl font-bold mb-5 text-center">
              Create new account!
          </h2>
          <form class="flex flex-col gap-5" @submit.prevent="signUp">
            <input type="text" class="w-full outline-zinc-700 border-2 rounded-lg bg-white  border-zinc-600 p-3" placeholder="Full Name" v-model="full_name">
              <input type="email" class="w-full outline-zinc-700 border-2 rounded-lg bg-white  border-zinc-600 p-3" placeholder="Your Email" v-model="email">
              <input type="password" class="w-full outline-zinc-700 border-2 rounded-lg bg-white  border-zinc-600 p-3" placeholder="New Password" v-model="password">
              <button class="bg-zinc-800 text-zinc-100 rounded-xl w-full py-3 flex gap-3 items-center justify-center group">
                  Create Now
                  <Icon name="line-md:loading-twotone-loop" v-if="loading" />
                  <Icon name="fa6-solid:wand-magic-sparkles" v-else class="group-hover:scale-125 transition duration-700 ease-in-out" />
              </button>
              <div>{{ successMsg }}</div>

                <div class="text-center text-sm ">
                    Create new account
                    <NuxtLink to="/auth/login" class="font-bold underline">Login</NuxtLink>
                </div>
          </form>
        </section>
    </div>
</template>

<script setup>
    definePageMeta({
        colorMode: 'light',
        layout: 'empty'
    })

    const supabase = useSupabaseClient()
    const router = useRouter();

    const full_name = ref("")
    const email = ref("")
    const password = ref(null)

    const errorMsg = ref(null)
    const successMsg = ref(null)
    const loading = ref(false)

    async function signUp() {
        loading.value = true
        try {
            const { data, error } = await supabase.auth.signUp({
                full_name: full_name.value,
                email: email.value,
                password: password.value
            });
            if(error) throw error;

            successMsg.value = "Check your email to confirm your account.";
            router.push({ path: "/auth/login" });
        } catch (error) {
            errorMsg.value = error.message;
        }
        loading.value = false
    }
</script>

<style scoped>

</style>