<template>
  <icon-view />
  <suspense>
    <master-view />
  </suspense>
  <vue-loading-indicator />
</template>

<script lang="ts">
import { defineAsyncComponent, defineComponent } from 'vue'

export default defineComponent({
  name: 'MainApplication',
  components: {
    MasterView: defineAsyncComponent(() => import('@components/layout/MasterView.vue')),
    IconView: defineAsyncComponent(() => import('@components/layout/IconView.vue')),
  }
})
</script>
