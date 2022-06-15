<template>
  <component :is="layout" :key="layout" />
</template>

<script lang="ts">
import { defineComponent, inject } from 'vue'
import DefaultLayout from '@layouts/default.vue'
import BlankLayout from '@layouts/blank.vue'
import { VueCookies } from 'vue-cookies'
import { useUserStore } from '@store/user'

export default defineComponent({
  name: 'MasterView',
  components: {
    default: DefaultLayout,
    blank: BlankLayout
  },
  async setup() {
    const cookies = inject<VueCookies>('$cookies')

    const useUser = useUserStore()
    useUser.setToken(cookies?.get('_token'))

    if (useUser._token) {
      await useUser.getMe()
    }

    return {
      useUser
    }
  },
  computed: {
    layout() {
      return this.$route.meta.layout || 'default'
    }
  },
  mounted() {
    this.$process.finish()
  },
  created() {
    this.$process.start()
    //  hook the progress bar to start before we move router-view
    this.$router.beforeEach((to, from, next) => {
      //  does the page we want to go to have a meta.progress object
      //  start the progress bar
      this.$process.start()
      //  continue to next page
      next();
    });
    //  hook the progress bar to finish after we've finished moving router-view
    this.$router.afterEach(() => {
      //  finish the progress bar
      this.$process.finish()
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
