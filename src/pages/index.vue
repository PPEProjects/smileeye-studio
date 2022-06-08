<template>
  <div>
    <auth-modal />
    <div
      class="w-full h-full absolute blur-sm brightness-90 bg-cover"
      style="background-image: url('/images/slidebg.jpeg')"
    />
  </div>
</template>

<script lang="ts" setup>
import AuthModal from '../components/modal/AuthModal.vue'

import { useRouter } from 'vue-router'
import { useUserStore } from '@store/user'

const router = useRouter()
const useUser = useUserStore()

if (useUser.auth) {
  // back lại nếu đã đăng nhập mà cố tính vào auth page
  router.replace('/dashboard')
}
</script>
