<template>
  <div>
    <teleport-view
      to="#title"
    >
      <span class="capitalize">{{ t('payment.payment') }}: {{ $route.params.id }}</span>
    </teleport-view>
  </div>
</template>

<script lang="ts" setup>
import { useI18n } from 'vue-i18n'
import {defineAsyncComponent} from "vue";
const TeleportView = defineAsyncComponent(() => import('@components/layout/TeleportView.vue'))

const { t } = useI18n()
</script>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'PaymentDetail'
})
</script>
