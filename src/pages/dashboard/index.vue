<template>
  <div>
    <teleport-view to="#actions">
      <a-button type="primary" size="large" class="uppercase">
        Teleport
      </a-button>
    </teleport-view>

    <speak-view />

  </div>
</template>

<script lang="ts">
import { defineAsyncComponent, defineComponent } from 'vue'
import SpeakView from '@components/includes/SpeakView.vue'
const TeleportView = defineAsyncComponent(() => import('@components/layout/TeleportView.vue'))

export default defineComponent({
  name: 'DashboardPage',
  components: { SpeakView, TeleportView }
})
</script>
