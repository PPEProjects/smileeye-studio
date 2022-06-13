<template>
  <div>
    <teleport-view
      to="#title"
    >
      {{ t('payment.detail.title', { id: $route.params.id }) }}
    </teleport-view>
  </div>
</template>

<script lang="ts" setup>
import { useLangs } from '@composables/useLangs'
import TeleportView from '@components/layout/TeleportView.vue'
const { t } = useLangs()
</script>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'PaymentDetail'
})
</script>
