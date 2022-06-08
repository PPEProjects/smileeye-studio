<template>
  <payment-table />
</template>

<script lang='ts'>
import { defineComponent } from 'vue'
import PaymentTable from '@components/payment/PaymentTable.vue'

export default defineComponent({
  name: 'InComePage',
  components: { PaymentTable }
})
</script>
