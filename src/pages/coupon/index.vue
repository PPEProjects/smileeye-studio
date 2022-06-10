<template>

  <coupon-table />

  <coupon-upsert-modal />

  <teleport-view to="#actions">
    <a-button
      type="primary"
      size="large"
      class="uppercase"
      @click="emitter.emit('upsertCoupon', {})"
    >
      <template #icon>
        <plus-outlined />
      </template>
      {{ t('coupon.action.add') }}
    </a-button>
  </teleport-view>
</template>

<script lang="ts" setup>
import { PlusOutlined } from '@ant-design/icons-vue'
import { useLangs } from '@composables/useLangs'
import CouponTable from '@components/coupon/CouponTable.vue'
import { useEmitter } from '@composables/useEmitter'
import { IFormCouponUpsert } from '@components/coupon/types'
import CouponUpsertModal from '@components/coupon/CouponUpsertModal.vue'
import { useCouponStore } from '@store/coupon'
const { t } = useLangs()

const emitter = useEmitter<{
  upsertCoupon: IFormCouponUpsert | object
}>()

// init store
useCouponStore()
</script>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'CouponPage'
})
</script>

<style>
#upsertCouponContent {
  margin-bottom: -30px;
}
</style>
