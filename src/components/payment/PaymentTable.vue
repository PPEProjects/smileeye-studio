<template>
  <a-table
    :loading="loading || loadingQuickConfirm"
    :columns="columns"
    :data-source="payments"
    :pagination="{ total: counter, showLessItems: true, defaultPageSize: 6 }"
    row-key="id"
    @change="queryVariables.page = $event.current"
  >
    <template #headerCell="{ column }">
      <table-setting-header
        v-if="!column.key"
        v-model:value="selectColumns"
        :auto="false"
        :columns="rawColumns"
      />
    </template>

    <template #bodyCell="{ column, record }">
      <template v-if="column.key === 'name'">
        <router-link
          :to="'/payment/' + record.id"
          href="javascript:void(0)"
          class="font-medium ml-2"
        >
          {{ record.user_info?.name }}
        </router-link>
      </template>

      <template v-if="column.key === 'email'">
        <span>{{ record.user_info.email }}</span>
      </template>

      <template v-if="column.key === 'phone'">
        <span>{{ record.user_info?.phone_number }}</span>
      </template>

      <template v-if="column.key === 'goal'">
        <span>{{ record.goal?.name || '-' }}</span>
      </template>

      <template v-else-if="column.key === 'billImage'">
        <div
          v-if="record.attachments?.[0]"
          class="rounded overflow-hidden h-[80px]"
        >
          <a-image
            :width="150"
            :height="80"
            :src="$cdn(record.attachments[0])"
          />
        </div>
      </template>

      <template v-else-if="column.key === 'status'">
        <a-tag v-if="record.status === STATUS.TRIAL" color="#2db7f5">
          {{ t('payment.status.trial') }}
        </a-tag>
        <a-tag v-else-if="record.status === STATUS.ON_BUY" color="#f50">
          {{ t('payment.status.on_buy') }}
        </a-tag>
        <a-tag
          v-else-if="record.status === STATUS.PAID_CONFIRMED"
          color="#87d068"
        >
          {{ t('payment.status.paid_confirmed') }}
        </a-tag>
        <a-tag v-else-if="record.status === STATUS.IN_NEED" color="#9c27b0">
          {{ t('payment.status.in_need') }}
        </a-tag>
      </template>

      <template v-else-if="column.key === 'createdAt'">
        {{ dayjs(record.created_at).format('DD/MM/YYYY') }}
      </template>

      <template v-else-if="column.key === 'action'">
        <div v-if="record.status === STATUS.IN_NEED">--</div>

        <payment-actions
          v-else
          :payment="record"
          @delete="
            quickConfirm({
              input: { id: record.id, status: STATUS.TRIAL }
            })
          "
          @confirm="
            quickConfirm({
              input: { id: record.id, status: STATUS.PAID_CONFIRMED }
            })
          "
        />
      </template>
    </template>

    <template #expandedRowRender="{ record }">
      <PaymentExpanded :payment="record" />
    </template>
  </a-table>
</template>

<script lang="ts" setup>
import {
  computed,
  defineAsyncComponent,
  onMounted,
  onUnmounted,
  reactive,
  ref
} from 'vue'

import { ref as dbRef, set as dbSet } from 'firebase/database'

const PaymentActions = defineAsyncComponent(
  () => import('@components/payment/PaymentActions.vue')
)
const PaymentExpanded = defineAsyncComponent(
  () => import('@components/payment/PaymentExpanded.vue')
)
const TableSettingHeader = defineAsyncComponent(
  () => import('@components/includes/TableSettingHeader.vue')
)

import { useMutation, useQuery } from '@vue/apollo-composable'
import {
  SortPayments,
  SortPaymentsVariables
} from '#smileeye/queries/__generated__/SortPayments'
import {
  PAYMENT_BY_ID,
  SORT_PAYMENTS,
  SUM_PAYMENT
} from '#smileeye/queries/payment.query'
import { useDayjs } from '@composables/useDayjs'
import {
  QUICK_DONE_PAYMENT
} from '#smileeye/mutations/payment.mutation'
import {
  SumPayment,
  SumPaymentVariables
} from '#smileeye/queries/__generated__/SumPayment'
import { useEmitter } from '@nguyenshort/vue3-mitt'
import {
  QuickDonePayment,
  QuickDonePaymentVariables
} from '#smileeye/mutations/__generated__/QuickDonePayment'
import { STATUS } from '#schema/smileeyeTypes'
import { useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { useFireRTDB } from '@composables/useFirebase'
import { PaymentByID } from '#smileeye/queries/__generated__/PaymentByID'

const { t } = useI18n()

const dayjs = useDayjs()

const selectColumns = ref<number[]>([0])

const rawColumns = reactive([
  {
    title: t('user.name'),
    dataIndex: 'user.name',
    key: 'name'
  },
  {
    title: t('user.email'),
    dataIndex: 'user',
    key: 'email'
  },
  {
    title: t('user.phone'),
    dataIndex: 'phone',
    key: 'phone'
  },
  {
    title: t('goal.name') + ' Goal',
    dataIndex: 'goal',
    key: 'goal'
  }
])

const fixColumns = [
  {
    title: t('payment.money'),
    dataIndex: 'money',
    key: 'money',
    align: 'center',
    width: 150
  },
  {
    title: t('payment.status.title'),
    dataIndex: 'status',
    key: 'status',
    align: 'center',
    width: 150
  },
  {
    title: t('payment.billImage'),
    dataIndex: 'billImage',
    key: 'billImage',
    align: 'center',
    width: 180
  },
  {
    title: t('payment.createdAt'),
    dataIndex: 'created_at',
    key: 'createdAt',
    align: 'center',
    width: 200
  },
  {
    title: t('table.action.title'),
    key: 'action',
    align: 'right',
    fixed: 'right',
    width: 130
  }
]

// Setup table
const columns = computed(() => {
  const _dynamic = selectColumns.value.map((_index) => rawColumns[_index])
  return [..._dynamic, ...fixColumns]
})

const route = useRoute()

const queryVariables = reactive({
  first: 6,
  page: 1,
  status: ((route.query.status as string) || '').toUpperCase()
})
// Query hook
const { result, loading } = useQuery<SortPayments, SortPaymentsVariables>(
  SORT_PAYMENTS,
  queryVariables
)

const payments = computed(() => {
  const _payments = result.value?.sort_payments || []

  if (queryVariables.status) {
    return _payments.filter(
      (_payment) => _payment?.status === queryVariables.status
    )
  }
  return _payments
})

// Counter
const { result: paymentCounter } = useQuery<SumPayment, SumPaymentVariables>(
  SUM_PAYMENT,
  {
    status: ((route.query.status as string) || '').toUpperCase()
  }
)
const counter = computed(
  () => paymentCounter?.value?.sum_payment?.number_status || 0
)

onUnmounted(() => emitter.off('deletePayment'))

const { mutate: quickConfirm, loading: loadingQuickConfirm } = useMutation<
  QuickDonePayment,
  QuickDonePaymentVariables
>(QUICK_DONE_PAYMENT, {
  update: (proxy, result) => {
    const _payment = proxy.readFragment<PaymentByID>({
      id: proxy.identify(result.data?.upsert_payment?.[0] as any),
      fragment: PAYMENT_BY_ID
    })
    if (_payment) {
      dbSet(
        dbRef(
          useFireRTDB(),
          `payment/${_payment.add_user_id}/${_payment.goal_id}`
        ),
        _payment
      )
    }
  }
})

// Delete from modal
// Global event
const emitter = useEmitter<{
  deletePayment: string
}>()
onMounted(() =>
  emitter.on('deletePayment', (id) => {
    quickConfirm({
      input: { id, status: STATUS.TRIAL }
    })
  })
)
</script>
