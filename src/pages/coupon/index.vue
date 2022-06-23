<template>

  <coupon-table />
  <coupon-upsert-modal />

</template>

<script lang="ts" setup>
import { defineAsyncComponent } from 'vue'

const CouponTable = defineAsyncComponent(() => import('@components/coupon/CouponTable.vue'))
const CouponUpsertModal = defineAsyncComponent(() => import('@components/coupon/CouponUpsertModal.vue'))
import { useCouponStore } from '@store/coupon'
// init store
useCouponStore()
</script>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'CouponPage'
})
</script>
