<template>
  <a-table
    :loading="loading || isUpdating"
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

      <template v-else-if="column.key === 'action'">
        <search-header-table v-model:value='formSearch' :options="searchOptions" @change='onSearch' />
      </template>

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

      <template v-else-if="column.key === 'money'">
        <p>{{ $moneyFormat(record.money) }}</p>
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
            emitter.emit('beforeUpdatePayment', { id: record.id, status: STATUS.TRIAL, money: 0})
          "
          @confirm="
            emitter.emit('beforeUpdatePayment', { id: record.id, status: STATUS.PAID_CONFIRMED })
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
  defineAsyncComponent, onMounted, onUnmounted,
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

const SearchHeaderTable = defineAsyncComponent(() => import('@components/includes/SearchHeaderTable.vue'))

import {useMutation, useQuery} from '@vue/apollo-composable'
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
  SumPayment,
  SumPaymentVariables
} from '#smileeye/queries/__generated__/SumPayment'
import { useEmitter } from '@nguyenshort/vue3-mitt'
import {STATUS, UpsertPaymentInput} from '#schema/smileeyeTypes'
import { useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import {UpsertPayment, UpsertPaymentVariables} from "#smileeye/mutations/__generated__/UpsertPayment";
import {UPSERT_PAYMENT} from "#smileeye/mutations/payment.mutation";
import {PaymentByID} from "#smileeye/queries/__generated__/PaymentByID";
import {useFireRTDB} from "@composables/useFirebase";

const { t } = useI18n()

const dayjs = useDayjs()

const selectColumns = ref<number[]>([0])

/**
 * Cột động. Có thể tuỳ chọn ẩn hoặc hiện
 */
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

/**
 * Cột tĩnh. Sẽ không thay đổi khi cập nhật dữ liệu
 */
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

/**
 * Sự kiện toàn cầu cho cột động
 */
const emitter = useEmitter<{
  beforeUpdatePayment: UpsertPaymentInput
  afterAppNotePayment: UpsertPaymentInput
}>()

// Setup table
// Merger cuột tĩnh và cột động
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
  queryVariables,
    {
      fetchPolicy: 'network-only'
    }
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
const { mutate: upsertPayment, loading: isUpdating } = useMutation<
  UpsertPayment,
  UpsertPaymentVariables
>(UPSERT_PAYMENT, {
  update: (proxy, result) => {
    const _payment = proxy.readFragment<PaymentByID>({
      id: proxy.identify(result.data?.upsert_payment?.[0] as any),
      fragment: PAYMENT_BY_ID
    })
    // Thay đổi firebase
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
onMounted(() =>
  emitter.on('afterAppNotePayment', (data) => {
    upsertPayment({
      input: data
    })
  })
)
onUnmounted(() => emitter.off('afterAppNotePayment'))

/**
 * Các fild sẽ dùng để tìm kiếm
 * Mỗi số field đều phải có key và label
 * @type {Array<{key: string, label: string}>}
 * Sẽ search thoe value của field đó
 */
const searchOptions = [
  {
    label: t('user.name'),
    value: 'name'
  },
  {
    label: t('user.phone'),
    value: 'phone_number'
  },
  {
    label: t('user.email'),
    value: 'email'
  }
]

/**
 * @param {ListUserVariables} variables
 */
const formSearch = reactive<{
  field: 'name' | 'email' | 'phone_number'
  keyword: ''
}>({
  field: 'name',
  keyword: ''
})

const onSearch = () => {
  //
}
</script>
