<template>
  <div>
    <component :is="layout" :key="layout" />
  </div>
</template>

<script lang="ts">
import { defineAsyncComponent, defineComponent, inject } from 'vue'
import { VueCookies } from 'vue-cookies'
import { useUserStore } from '@store/user'

export default defineComponent({
  name: 'MasterView',
  components: {
    // Async load component
    default: defineAsyncComponent(() => import('@layouts/default.vue')),
    blank: defineAsyncComponent(() => import('@layouts/blank.vue'))
  },
  async setup() {
    // đọc cookie
    const cookies = inject<VueCookies>('$cookies')

    // Lấy user
    const useUser = useUserStore()
    useUser.setToken(cookies?.get('_token'))

    // kiểm tra cookie, lấy user
    if (useUser._token) {
      await useUser.getMe()
    }

    if(!useUser.auth) {
      useUser.setToken('')
      cookies?.remove('_token')
    }

    return {
      useUser
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
      next();
    });
    //  hook the progress bar to finish after we've finished moving router-view
    this.$router.afterEach(() => {
      //  finish the progress bar
      this.$loading.finish()
    });
  },
  beforeCreate() {
    // Không đăng nhập => /
    if (this.useUser.auth) {
      if (this.$route.path === '/') {
        this.$router.replace('/dashboard')
      }
    } else {
      this.$router.replace('/')
    }
  }
})
</script>

<style>
.vue-process-bar ._process {
  transition: 200ms linear;
}
</style>
