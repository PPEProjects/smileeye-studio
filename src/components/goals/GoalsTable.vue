<template>
  <a-table
    :loading="loading || loadingQuickConfirm"
    :columns="columns"
    :data-source="goals"
    :pagination="{ total: counter, showLessItems: true, defaultPageSize: 6 }"
    row-key="id"
    @change="changePage($event.current)"
  >
    <template #headerCell="{ column }">
      <goal-setting-header v-if="!column.key" />
    </template>
    <template #bodyCell="{ column, record }">
      <template v-if="column.key === 'trial'">
        <span>{{ record.trial_blocks?.length }}</span>
      </template>
      <template v-if="column.key === 'name'">
        <router-link
          :to="'/payment/' + record.id"
          href="javascript:void(0)"
          class="font-medium ml-2"
        >
          {{ record.name }}
        </router-link>
      </template>
      <template v-if="column.key === 'owner'">
        <span>{{ record.user.name }}</span>
      </template>
      <template v-if="column.key === 'status'">
        <span>{{ record.status }}</span>
      </template>
      <goal-actions
          v-if="column.key === 'action'"
          :payment="record"
          @delete="deletePayment({ input: { id: record.id } })"
          @confirm="
          quickConfirm({
            input: { id: record.id, status: STATUS.PAID_CONFIRMED }
          })
        "
      />
    </template>
  </a-table>
</template>

<script lang="ts" setup>
import { computed, defineAsyncComponent, onMounted, onUnmounted, ref } from 'vue'

import GoalSettingHeader from '@components/goals/GoalSettingHeader.vue'
const GoalActions = defineAsyncComponent(() => import('@components/goals/GoalActions.vue'))

import { usePaymentStore } from '@store/payment'
import { useMutation, useQuery } from '@vue/apollo-composable'
import {
  SortPayments,
  SortPaymentsVariables
} from '#smileeye/queries/__generated__/SortPayments'
import { SUM_PAYMENT } from '#smileeye/queries/payment.query'
import usePick from '@composables/usePick'
//import { useDayjs } from '@composables/useDayjs'
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
import { LIST_GOAL_ROOT } from '#smileeye/queries/goal.query'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()// const dayjs = useDayjs()
// Store
const paymentStore = usePaymentStore()
const fixColumns = [
  {
    title: t('goals.table.name'),
    dataIndex: 'goal.name',
    key: 'name'
  },
  {
    title: t('goals.table.owner'),
    dataIndex: 'goal.owner',
    key: 'owner'
  },
  {
    title: t('goals.table.status'),
    dataIndex: 'status',
    key: 'status'
  },
  {
    title: t('goals.table.action'),
    key: 'action',
    align: 'right',
    fixed: 'right',
    width: 130
  }
]

const rawColumns = [
  {
    title: t('goals.table.name'),
    dataIndex: 'goal.name',
    key: null
  },
  {
    title: t('goals.table.trial'),
    dataIndex: 'trial',
    key: 'trial',
    align: 'center',
    width: 150
  },
  {
    title: t('goals.table.onbuy'),
    dataIndex: 'billImage',
    key: 'billImage',
    align: 'center',
    width: 180
  },
  {
    title: t('goals.table.paid_confirmed'),
    dataIndex: 'created_at',
    key: 'createdAt',
    align: 'center',
    width: 200
  },
  {
    title: t('goals.table.done'),
    key: 'action',
    align: 'right',
    fixed: 'right',
    width: 130
  },
  {
    title: t('goals.table.checked'),
    key: 'action',
    align: 'right',
    fixed: 'right',
    width: 130
  },
  {
    title: t('goals.table.per_goal'),
    key: 'action',
    align: 'right',
    fixed: 'right',
    width: 130
  },
  {
    title: t('goals.table.request_date'),
    key: 'action',
    align: 'right',
    fixed: 'right',
    width: 130
  }
]

// Setup table
const columns = computed(() => {
  const _dynamic = paymentStore.columns.map((_index) => rawColumns[_index])
  return [..._dynamic, ...fixColumns]
})

// Resource
const page = ref<number>(1)
// Query hook
const { result, refetch, loading } = useQuery<
  SortPayments,
  SortPaymentsVariables
>(
  // SORT_PAYMENTS,
  LIST_GOAL_ROOT,
  {
    first: 6,
    page: page.value
  }
)

const goals = usePick(result, [], (data) => data.list_goal_root)
console.log('goals', {goals})
const changePage = (_page: number) => {
  page.value = _page
  refetch({
    first: 6,
    page: page.value
  })
}

const { mutate: deletePayment } = useMutation<
  DeletePayment,
  DeletePaymentVariables
>(DELETE_PAYMENT, {
  // update: (proxy, _, options) => {
  //   proxy.writeQuery<SortPayments, SortPaymentsVariables>({
  //     query: SORT_PAYMENTS,
  //     variables: {
  //       first: 6,
  //       page: page.value
  //     },
  //     data: {
  //       sort_payments: result.value!.sort_payments!.filter(
  //         (e) => e?.id !== options.variables?.input.id
  //       )
  //     }
  //   })
  // }
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
