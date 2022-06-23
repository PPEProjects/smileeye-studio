<template>

  <coupon-table />
  <coupon-upsert-modal />

</template>

<script lang="ts" setup>
import CouponTable from '@components/coupon/CouponTable.vue'
import CouponUpsertModal from '@components/coupon/CouponUpsertModal.vue'
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
