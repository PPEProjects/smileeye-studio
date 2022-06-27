<template>

  <coupon-table />
  <coupon-upsert-modal />

  <teleport-view to="#actions">
    <a-button
      type="primary"
      size="large"
      class="uppercase"
      @click="$emitter.emit('upsertCoupon', {})"
    >
      <template #icon>
        <plus-outlined />
      </template>
      {{ t('button.addNew') }}
    </a-button>
  </teleport-view>

</template>

<script lang="ts" setup>
import { defineAsyncComponent } from 'vue'

import { PlusOutlined } from '@ant-design/icons-vue'

const CouponTable = defineAsyncComponent(() => import('@components/coupon/CouponTable.vue'))
const CouponUpsertModal = defineAsyncComponent(() => import('@components/coupon/CouponUpsertModal.vue'))
const TeleportView = defineAsyncComponent(() => import('@components/layout/TeleportView.vue'))

import { useCouponStore } from '@store/coupon'
import { useI18n } from 'vue-i18n'
// init store
useCouponStore()

const { t } = useI18n()

</script>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'CouponPage'
})
</script>
