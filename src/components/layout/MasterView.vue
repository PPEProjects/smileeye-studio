<template>
  <component :is="layout" :key='layout' />
</template>

<script lang="ts">
import {defineComponent, inject} from "vue";
import DefaultLayout from "@layouts/default.vue";
import BlankLayout from "@layouts/blank.vue";
import {VueCookies} from "vue-cookies";
import {useUserStore} from "@store/user";

export default defineComponent({
  name: "MasterView",
  components: {
    default: DefaultLayout,
    blank: BlankLayout
  },
  async setup() {

    const cookies = inject<VueCookies>('$cookies')

    const useUser = useUserStore()
    useUser.setToken(cookies?.get('_token'))

    if(useUser._token) {
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
