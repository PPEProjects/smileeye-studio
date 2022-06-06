<template>
  <div>
    <teleport-view to="#actions">
      <a-button type="primary" size="large" class="uppercase">
        Teleport
      </a-button>
    </teleport-view>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'DashboardPage'
})
</script>
