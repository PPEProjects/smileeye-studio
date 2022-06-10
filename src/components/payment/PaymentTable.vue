<template>
  <a-table
    :loading="false"
    :columns="columns"
    :data-source="payments"
    :pagination="{ total: 10, showLessItems: true, defaultPageSize: 6 }"
    row-key="name"
    @change="changePage($event.current - 1)"
  >
    <template #headerCell="{ column }">
      <payment-setting-header v-if="!column.key" />
    </template>

    <template #bodyCell="{ column, record }">
      <template v-if="column.key === 'name'">
        <span class="font-medium ml-2">{{ record.user.name }}</span>
      </template>

      <template v-if="column.key === 'email'">
        <span>{{ record.user.email }}</span>
      </template>

      <template v-if="column.key === 'phone'">
        <span>{{ record.user.phone_number }}</span>
      </template>

      <template v-if="column.key === 'goal'">
        <span>{{ record.goal.name }}</span>
      </template>

      <template v-else-if="column.key === 'billImage'">
        <div class="rounded overflow-hidden">
          <a-image
            :width="150"
            :height="80"
            :src="$cdn(record.attachments[0])"
          />
        </div>
      </template>

      <template v-else-if="column.key === 'status'">
        <a-tag v-if="record.status === PaymentStatusEnum.TRIAL" color="#2db7f5">
          TRIAL
        </a-tag>
        <a-tag
          v-else-if="record.status === PaymentStatusEnum.ON_BUY"
          color="#f50"
        >
          ON BUY
        </a-tag>
        <a-tag
          v-else-if="record.status === PaymentStatusEnum.PAID_CONFIRMED"
          color="#87d068"
        >
          CONFIRMED
        </a-tag>
      </template>

      <template v-else-if="column.key === 'createdAt'">
        {{ dayjs(record.created_at).format('DD/MM/YYYY') }}
      </template>

      <payment-actions v-else-if="column.key === 'action'" />
    </template>

    <template #expandedRowRender="{ record }">
      <PaymentExpanded :payment="record" />
    </template>
  </a-table>
</template>

<script lang="ts" setup>
import { computed } from 'vue'

import { useLangs } from '@composables/useLangs'
import { PaymentStatusEnum } from '@components/payment/types'
import PaymentActions from '@components/payment/PaymentActions.vue'
import PaymentExpanded from '@components/payment/PaymentExpanded.vue'
import PaymentSettingHeader from '@components/payment/PaymentSettingHeader.vue'
import { usePaymentStore } from '@store/payment'
import { useQuery } from '@vue/apollo-composable'
import {
  SortPayments,
  SortPaymentsVariables
} from '#smileeye/queries/__generated__/SortPayments'
import { SORT_PAYMENTS } from '#smileeye/queries/payment.query'
import usePick from '@composables/usePick'
import { useDayjs } from '@composables/useDayjs'

const { t } = useLangs()

const dayjs = useDayjs()

// Store
const paymentStore = usePaymentStore()

const rawColumns = [
  {
    title: t('payment.table.user.name'),
    dataIndex: 'user.name',
    key: 'name'
  },
  {
    title: t('payment.table.user.email'),
    dataIndex: 'user',
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
    title: t('payment.table.money'),
    dataIndex: 'money',
    key: 'money',
    align: 'center',
    width: 150
  },
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
    dataIndex: 'created_at',
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

const changePage = (page: number) => {
  //
  console.log('Page', page)
}

const { result } = useQuery<SortPayments, SortPaymentsVariables>(
  SORT_PAYMENTS,
  {
    first: 6,
    page: 1
  }
)

const payments = usePick(result, [], (data) => data.sort_payments)
</script>
