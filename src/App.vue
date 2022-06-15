<template>
  <icon-view />
  <suspense>
    <master-view />
  </suspense>
  <teleport to='body'>
    <vue-process-bar />
  </teleport>
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
