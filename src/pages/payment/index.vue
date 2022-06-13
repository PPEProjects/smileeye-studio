<template>
  <payment-table />
  <teleport-view v-if='false' to="#actions">
    <a-button
      type="primary"
      size="large"
      class="uppercase"
      @click="$emitter.emit('upsertPaymentModal')"
    >
      <template #icon>
        <plus-outlined />
      </template>
      add bill
    </a-button>
  </teleport-view>

  <upsert-payment-modal />
</template>

<script lang="ts" setup>
import { PlusOutlined } from '@ant-design/icons-vue'
import { usePaymentStore } from '@store/payment'
import UpsertPaymentModal from '@components/payment/UpsertPaymentModal.vue'

usePaymentStore()
</script>

<script lang="ts">
import { defineComponent } from 'vue'
import PaymentTable from '@components/payment/PaymentTable.vue'

export default defineComponent({
  name: 'InComePage',
  components: { PaymentTable }
})
</script>
