<template>
  <a-table
    :loading="false"
    :columns="columns"
    :data-source="bills"
    :pagination="{ total: 10, showLessItems: true, defaultPageSize: 6 }"
    row-key="name"
    @change="changePage($event.current - 1)"
  >
    <template #headerCell="{ column }">
      <payment-setting-header v-if="!column.key" />
    </template>

    <template #bodyCell="{ column, record }">
      <template v-if="column.key === 'name'">
        <span class="font-medium ml-2">{{ record.name }}</span>
      </template>

      <template v-else-if="column.key === 'billImage'">
        <div class="rounded overflow-hidden">
          <a-image :width="150" :height="80" :src="record.billImage" />
        </div>
      </template>

      <template v-else-if="column.key === 'status'">
        <a-tag v-if="record.status === PaymentStatusEnum.TRIAL" color="#f50">
          TRIAL
        </a-tag>
        <a-tag
          v-else-if="record.status === PaymentStatusEnum.ON_BUY"
          color="#2db7f5"
        >
          ON BUY
        </a-tag>
        <a-tag
          v-else-if="record.status === PaymentStatusEnum.CONFIRMED"
          color="#87d068"
        >
          CONFIRMED
        </a-tag>
      </template>

      <template v-else-if="column.key === 'createdAt'">
        {{ record.createdAt }}
      </template>

      <payment-actions v-else-if="column.key === 'action'" />

    </template>

    <template #expandedRowRender="{ record }">
      <PaymentExpanded :payment="record" />
    </template>
  </a-table>
</template>

<script lang="ts" setup>
import { computed, reactive } from 'vue'

import { useLangs } from '@composables/useLangs'
import { IPaymentTable, PaymentStatusEnum } from '@components/payment/types'
import { paymentFactory } from '@utils/factory'
import PaymentActions from '@components/payment/PaymentActions.vue'
import PaymentExpanded from '@components/payment/PaymentExpanded.vue'
import PaymentSettingHeader from '@components/payment/PaymentSettingHeader.vue'
import { usePaymentStore } from '@store/payment'

const { t } = useLangs()

// Store
const paymentStore = usePaymentStore()

const rawColumns = [
  {
    title: t('payment.table.user.name'),
    dataIndex: 'name',
    key: 'name'
  },
  {
    title: t('payment.table.user.email'),
    dataIndex: 'email',
    key: 'email'
  },
  {
    title: t('payment.table.user.phone'),
    dataIndex: 'phone',
    key: 'phone'
  },
  {
    title: t('payment.table.user.goal'),
    dataIndex: 'goal',
    key: 'goal'
  }
]

const fixColumns = [
  {
    title: t('payment.table.status'),
    dataIndex: 'status',
    key: 'status',
    align: 'center',
    width: 150
  },
  {
    title: t('payment.table.billImage'),
    dataIndex: 'billImage',
    key: 'billImage',
    align: 'center',
    width: 180
  },
  {
    title: t('payment.table.createdAt'),
    dataIndex: 'createdAt',
    key: 'createdAt',
    align: 'center',
    width: 200
  },
  {
    title: t('payment.table.action'),
    key: 'action',
    align: 'right',
    fixed: 'right'
  }
]

// Setup table
const columns = computed(() => {
  const _dynamic = paymentStore.columns.map((_index) => rawColumns[_index])
  return [..._dynamic, ...fixColumns]
})
// table source
const bills = reactive<IPaymentTable[]>([])

const changePage = (page: number) => {
  //
  console.log('Page', page)
}

for (let i = 0; i < 20; i++) {
  bills.push(paymentFactory())
}
</script>
