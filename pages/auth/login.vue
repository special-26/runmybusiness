<template>
  <div class="text-zinc-900 h-screen flex items-center justify-center font-indie">
      <section class="w-full max-w-sm mx-auto">
          <h2 class="text-3xl font-bold mb-5 text-center">
              Login
          </h2>
          <form class="flex flex-col gap-5" @submit.prevent="signIn">
              <input type="email" class="w-full outline-zinc-700 border-2 rounded-lg bg-white  border-zinc-600 p-3" placeholder="Your Email" v-model="email">
              <input type="password" class="w-full outline-zinc-700 border-2 rounded-lg bg-white  border-zinc-600 p-3" placeholder="Password" v-model="password">
              <button class="bg-zinc-800 text-zinc-100 rounded-xl w-full py-3 flex gap-2 items-center justify-center group" type="submit">
                  Login
                  <Icon v-if="loading" name="line-md:loading-twotone-loop" class="w-5 h-5" />
                  <Icon v-else name="ph:baby-fill" class="w-5 h-5" />
              </button>
          </form>
          <div>{{ errorMsg }}</div>

          <NuxtLink to="/auth/register">Register</NuxtLink>
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
          loading.value = false;
          if(error) throw error;

          router.push({ path: "/" });
      } catch (error) {
          errorMsg.value = error.message
      }
  }
</script>

<style scoped>

</style>