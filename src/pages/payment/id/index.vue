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
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
import TeleportView from '@components/layout/TeleportView.vue'
</script>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'PaymentDetail'
})
</script>
