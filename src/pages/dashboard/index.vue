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
import { defineComponent } from 'vue'
import SpeakView from '@components/includes/SpeakView.vue'

export default defineComponent({
  name: 'DashboardPage',
  components: { SpeakView }
})
</script>
