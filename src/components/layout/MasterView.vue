<template>
  <div>
    <component :is="layout" :key="layout" />
  </div>
</template>

<script lang="ts">
import { defineAsyncComponent, defineComponent, inject } from 'vue'
import { VueCookies } from 'vue-cookies'
import { useUserStore } from '@store/user'
import {useRoute, useRouter} from "vue-router";

export default defineComponent({
  name: 'MasterView',
  components: {
    // Async load component
    default: defineAsyncComponent(() => import('@layouts/default.vue')),
    blank: defineAsyncComponent(() => import('@layouts/blank.vue'))
  },
  async setup() {
    // Lấy user
    const useUser = useUserStore()
    const router = useRouter()
    const route = useRoute()

    // đọc cookie
    const cookies = inject<VueCookies>('$cookies')

    useUser.setToken(cookies?.get('_token'))

    // kiểm tra cookie, lấy user
    if (useUser._token) {
      await useUser.getMe()
    }

    if(!useUser.isAdmin) {
      cookies?.remove('_token')
      useUser.logout()
      if(route.path !== '/') {
        await router.replace('/')
      }
    }

    router.beforeEach((to, from, next) => {
      if (useUser.isAdmin) {
        if (to.path === '/') {
          next('/dashboard')
        } else {
          next()
        }
      } else {
        cookies?.remove('_token')
        useUser.logout()
        if (to.path !== '/') {
          next('/')
        }
        next()
      }
    })

    return {
      useUser,
      cookies
    }
  },
  computed: {
    layout() {
      // lấy layout từ router
      return this.$route.meta.layout || 'default'
    }
  },
  mounted() {
    this.$loading.finish()
  },
  created() {
    this.$loading.start()
    //  hook the progress bar to start before we move router-view
    this.$router.beforeEach((to, from, next) => {
      //  does the page we want to go to have a meta.progress object
      //  start the progress bar
      this.$loading.start()
      //  continue to next page
      next()
    })

    //  hook the progress bar to finish after we've finished moving router-view
    this.$router.afterEach(() => {
      //  finish the progress bar
      this.$loading.finish()
    })
  }
})
</script>

<style>
.vue-process-bar ._process {
  transition: 200ms linear;
}
</style>
