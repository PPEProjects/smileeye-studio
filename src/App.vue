<template>
  <icon-view />
  <suspense>
    <master-view />
  </suspense>
  <vue-loading-indicator />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import IconView from '@components/layout/IconView.vue'
import MasterView from '@components/layout/MasterView.vue'

export default defineComponent({
  name: 'MainApplication',
  components: {
    MasterView,
    IconView
  }
})
</script>
