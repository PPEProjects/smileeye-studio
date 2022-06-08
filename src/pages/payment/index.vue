<template>
  <payment-table />
</template>

<script lang='ts' setup>
import { usePaymentStore } from '@store/payment'

usePaymentStore()

</script>

<script lang='ts'>
import { defineComponent } from 'vue'
import PaymentTable from '@components/payment/PaymentTable.vue'

export default defineComponent({
  name: 'InComePage',
  components: { PaymentTable }
})
</script>
