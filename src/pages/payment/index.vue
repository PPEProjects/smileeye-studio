<template>
  <payment-table />
  <teleport-view to="#actions">
    <a-button type="primary" size="large" class="uppercase">
      <template #icon>
        <plus-outlined />
      </template>
      add bill
    </a-button>
  </teleport-view>
</template>

<script lang='ts' setup>
import { PlusOutlined } from '@ant-design/icons-vue'
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