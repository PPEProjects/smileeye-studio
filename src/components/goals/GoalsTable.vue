<template>
  <a-table
    :loading="loading || loadingQuickConfirm"
    :columns="columns"
    :data-source="goals"
    :pagination="{ total: counter, showLessItems: true, defaultPageSize: 6 }"
    row-key="id"
    @change="queryVariables.page = $event.current"
  >
    <template #bodyCell="{ column, record }">
      <template v-if="column.key === 'name'">
        <span class="font-medium ml-2">
          {{ record.name }}
        </span>
      </template>

      <template v-if="column.key === 'owner'">

        <span>{{ record.user?.name }}</span>

      </template>

      <template v-if="column.key === 'phone'">
        <span>{{ record.user_info?.phone_number }}</span>
      </template>

      <template v-if="column.key === 'goal'">
        <span>{{ record.goal?.name || '-' }}</span>
      </template>

      <template v-else-if="column.key === 'billImage'">
        <div v-if="record.attachments?.[0]" class="rounded overflow-hidden">
          <a-image
            :width="150"
            :height="80"
            :src="$cdn(record.attachments[0])"
          />
        </div>
      </template>

      <template v-else-if="column.key === 'status'">
        {{ record.sellRequest?.status || '-' }}
      </template>

      <template v-else-if="column.key === 'createdAt'">
        {{ dayjs(record.created_at).format('DD/MM/YYYY') }}
      </template>

      <template v-else-if="column.key === 'action'">
        <div v-if="record.status === STATUS.IN_NEED">--</div>

        <payment-actions
          v-else
          :payment="record"
          @delete="deletePayment({ input: { id: record.id } })"
          @confirm="
            quickConfirm({
              input: { id: record.id, status: STATUS.PAID_CONFIRMED }
            })
          "
        />
      </template>
    </template>
  </a-table>
</template>

<script lang="ts" setup>
import { defineAsyncComponent, onMounted, onUnmounted, reactive } from 'vue'

const PaymentActions = defineAsyncComponent(() => import('@components/payment/PaymentActions.vue'))

import { useMutation, useQuery } from '@vue/apollo-composable'
import {
  SortPayments,
  SortPaymentsVariables
} from '#smileeye/queries/__generated__/SortPayments'
import { SORT_PAYMENTS, SUM_PAYMENT } from '#smileeye/queries/payment.query'
import usePick from '@composables/usePick'
import { useDayjs } from '@composables/useDayjs'
import {
  DELETE_PAYMENT,
  QUICK_DONE_PAYMENT
} from '#smileeye/mutations/payment.mutation'
import {
  DeletePayment,
  DeletePaymentVariables
} from '#smileeye/mutations/__generated__/DeletePayment'
import { SumPayment } from '#smileeye/queries/__generated__/SumPayment'
import { useEmitter } from '@nguyenshort/vue3-mitt'
import {
  QuickDonePayment,
  QuickDonePaymentVariables
} from '#smileeye/mutations/__generated__/QuickDonePayment'
import { STATUS } from '#schema/smileeyeTypes'
import { useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { ListGoalRoot_list_goal_root } from '#smileeye/queries/__generated__/ListGoalRoot'

defineProps<{
  goals: ListGoalRoot_list_goal_root[]
}>()

const { t } = useI18n()

const dayjs = useDayjs()

// Setup table
const columns = reactive([
  {
    title: t('goal.name'),
    dataIndex: 'name',
    key: 'name'
  },
  {
    title: t('goal.owner'),
    dataIndex: 'user',
    key: 'owner'
  },
  {
    title: t('goal.status'),
    dataIndex: 'sellRequest.status',
    key: 'status',
    align: 'center'
  },
  {
    title: t('goal.price'),
    dataIndex: 'price',
    key: 'price',
    align: 'center'
  },
  {
    title: t('goal.percent'),
    dataIndex: 'percent',
    key: 'percent',
    align: 'center'
  },
  {
    title: t('table.action.title'),
    key: 'action',
    align: 'right',
    fixed: 'right',
    width: 130
  }
])

const route = useRoute()

const queryVariables = reactive({
  first: 6,
  page: 1,
  status: ((route.query.status as string) || '').toUpperCase()
})
// Query hook
const { result, loading } = useQuery<
  SortPayments,
  SortPaymentsVariables
  >(SORT_PAYMENTS, queryVariables)


const { mutate: deletePayment } = useMutation<
  DeletePayment,
  DeletePaymentVariables
  >(DELETE_PAYMENT, {
  update: (proxy, _, options) => {
    proxy.writeQuery<SortPayments, SortPaymentsVariables>({
      query: SORT_PAYMENTS,
      variables: queryVariables,
      data: {
        sort_payments: result.value!.sort_payments!.filter(
          (e) => e?.id !== options.variables?.input.id
        )
      }
    })
  }
})

// Counter
const { result: paymentCounter } = useQuery<SumPayment>(SUM_PAYMENT)
const counter = usePick(paymentCounter, 0, (data) => data.sum_payment.sum)

// Delete from modal
// Global event
const emitter = useEmitter<{
  deletePayment: string
}>()
onMounted(() =>
  emitter.on('deletePayment', (id) => {
    deletePayment({ input: { id } })
  })
)

onUnmounted(() => emitter.off('deletePayment'))

const { mutate: quickConfirm, loading: loadingQuickConfirm } = useMutation<
  QuickDonePayment,
  QuickDonePaymentVariables
  >(QUICK_DONE_PAYMENT)
</script>
