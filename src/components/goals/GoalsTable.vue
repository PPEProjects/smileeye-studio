<template>
  <a-table
    :columns="columns"
    :data-source="payments"
    :pagination="{ total: counter, showLessItems: true, defaultPageSize: 60 }"
    row-key="id"
    :loading="loading"
    @change="changePage($event.current)"
  >
    <template #headerCell="{ column }">
      <goal-setting-header v-if="!column.key" />
    </template>
    <template #bodyCell="{ column, record }">
      <template v-if="column.key === 'trial'">
        <span>{{ record.trial_blocks?.length }}</span>
      </template>
      <template v-if="column.key === 'image'">
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
      <template v-if="column.key === 'request_date'">
        <span>{{ record.sellRequest?.created_at }}</span>
      </template>
      <template v-if="column.key === 'status'">
        <span>{{ record.status }}</span>
      </template>
      <goal-actions
        v-if="column.key === 'action'"
        :payment="record"
        @delete="deleteGoal({ input: { id: record.id } })"
        @confirm="
          quickConfirm({
            input: { id: record.id, status: STATUS.PAID_CONFIRMED }
          })
        "
      />
    </template>
  </a-table>
  <update-goal-modal />

</template>

<script lang="ts" setup>
import { computed, onMounted, onUnmounted, ref } from 'vue'

import { useLangs } from '@composables/useLangs'
import GoalActions from '@components/goals/GoalActions.vue'
import GoalSettingHeader from '@components/goals/GoalSettingHeader.vue'
import { usePaymentStore } from '@store/payment'
import { useMutation, useQuery } from '@vue/apollo-composable'
// import {
//   SortPayments,
//   SortPaymentsVariables
// } from '#smileeye/queries/__generated__/SortPayments'
import { SORT_PAYMENTS, SUM_PAYMENT } from '#smileeye/queries/payment.query'
import usePick from '@composables/usePick'
import { useDayjs } from '@composables/useDayjs'
import {
  DELETE_PAYMENT,
  QUICK_DONE_PAYMENT
} from '#smileeye/mutations/payment.mutation'
// import {
//   DeletePayment,
//   DeletePaymentVariables
// } from '#smileeye/mutations/__generated__/DeletePayment'
import { SumPayment } from '#smileeye/queries/__generated__/SumPayment'
import { useEmitter } from '@nguyenshort/vue3-mitt'
import {
  QuickDonePayment,
  QuickDonePaymentVariables
} from '#smileeye/mutations/__generated__/QuickDonePayment'
import { LIST_GOAL_ROOT } from '#smileeye/queries/goal.query'
import { ListGoalRoot } from '#smileeye/queries/__generated__/ListGoalRoot'
import {DeleteGoalVariables, DeleteGoal} from "#smileeye/mutations/__generated__/DeleteGoal";
import UpdateGoalModal from "@components/goals/UpdateGoalModal.vue";
import { DELETE_GOAL_ROOT} from "#smileeye/mutations/goal.mutation";
import {useGoalStore} from "@store/goal";

const { t } = useLangs()
const dayjs = useDayjs()
// Store
const goalStore = useGoalStore()
const fixColumns = [
  {
    title: t('goals.table.name'),
    dataIndex: 'goal.name',
    key: 'name'
  },
  {
    title: 'Image',
    dataIndex: 'goal.image',
    key: 'image'
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

// const rawColumns = [
//   {
//     title: t('goals.table.name'),
//     dataIndex: 'goal.name',
//     key: null
//   },
//   {
//     title: t('goals.table.trial'),
//     dataIndex: 'trial',
//     key: 'trial',
//     align: 'center',
//     width: 150
//   },
//   {
//     title: t('goals.table.request_date'),
//     key: 'request_date',
//     width: 130
//   }
// ]

// Setup table
const columns = computed(() => {
  const _dynamic = goalStore.columns.map((_index) => goalStore._headerColumns[_index])
  // console.log('_dynamic', {_dynamic})
  return [..._dynamic, ...fixColumns]
})

// Resource
const page = ref<number>(1)
// Query hook
const { result, refetch, loading } = useQuery<ListGoalRoot>(
  LIST_GOAL_ROOT,
  {
    first: 6,
    page: page.value
  }
)
console.log('loading', {loading})
const payments = usePick(result, [], (data) => data.list_goal_root)
console.log('payments', { payments })
const changePage = (_page: number) => {
  page.value = _page
  refetch({
    first: 6,
    page: page.value
  })
}

const { mutate: deleteGoal } = useMutation<
  DeleteGoal,
  DeleteGoalVariables
>(DELETE_GOAL_ROOT, {
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
  deleteGoal: string
}>()
onMounted(() =>
  emitter.on('deleteGoal', (id) => {
    deleteGoal({ input: { id } })
  })
)

onUnmounted(() => emitter.off('deleteGoal'))

const { mutate: quickConfirm, loading: loadingQuickConfirm } = useMutation<
  QuickDonePayment,
  QuickDonePaymentVariables
>(QUICK_DONE_PAYMENT)
</script>
