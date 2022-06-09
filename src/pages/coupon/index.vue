<template>

  <coupon-table />

  <upsert-coupon-modal />

  <teleport-view to="#actions">
    <a-button type="primary" size="large" class="uppercase">
      <template #icon>
        <plus-outlined />
      </template>
      {{ t('coupon.action.add') }}
    </a-button>
  </teleport-view>

</template>

<script lang='ts' setup>
import { PlusOutlined } from '@ant-design/icons-vue'
import { useLangs } from '@composables/useLangs'
import CouponTable from '@components/coupon/CouponTable.vue'
import UpsertCouponModal from '@components/coupon/UpsertCouponModal.vue'
const { t } = useLangs()

</script>

<script lang='ts'>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'CouponPage'
})
</script>
