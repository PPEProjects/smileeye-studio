<template>

  <teleport-view to='#actions'>
    <export-excel-button :columns='columnsExport' :query='query' />
  </teleport-view>

  <a-table
    :loading="loading"
    :columns="columns"
    :data-source="histories"
    :pagination="{ total: count, showLessItems: true, defaultPageSize: 10 }"
    row-key="id"
    @change="queryVar.page = $event.current"
  >
    <template #bodyCell="{ column, text }">
      <template v-if="column.key === 'status'">
        <a-tag v-if="text === STATUS.TRIAL" color="#2db7f5">
          {{ t('payment.status.trial') }}
        </a-tag>
        <a-tag v-else-if="text === STATUS.ON_BUY" color="#f50">
          {{ t('payment.status.on_buy') }}
        </a-tag>
        <a-tag
            v-else-if="text === STATUS.PAID_CONFIRMED"
            color="#87d068"
        >
          {{ t('payment.status.paid_confirmed') }}
        </a-tag>
        <a-tag v-else-if="text === STATUS.IN_NEED" color="#9c27b0">
          {{ t('payment.status.in_need') }}
        </a-tag>
      </template>

      <template v-else-if="column.key === 'createdAt'">
        {{ dayjs(text).format('DD/MM/YYYY') }}
      </template>

    </template>
  </a-table>
</template>

<script lang="ts" setup>
const TeleportView = defineAsyncComponent(() => import('@components/layout/TeleportView.vue'))
const ExportExcelButton = defineAsyncComponent(() => import('@components/includes/ExportExcelButton.vue'))

import { useQuery } from '@vue/apollo-composable'
import {
  HISTORY_BY_DATE,
  HISTORY_PAYMENT,
  SUM_PAYMENT_HISTORY
} from '#smileeye/queries/payment.query'
import {computed, defineAsyncComponent, reactive} from 'vue'
import {
  HistoryPayment,
  HistoryPaymentVariables
} from '#smileeye/queries/__generated__/HistoryPayment'
import { SumHistoryPayment } from '#smileeye/queries/__generated__/SumHistoryPayment'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const dayjs = useDayjs()

import {STATUS} from '#schema/smileeyeTypes'
import {useDayjs} from "@composables/useDayjs";
import {IExcelColumn} from "@utils/excel";


const columns = reactive([
  {
    title: t('goal.name'),
    dataIndex: ['payment', 'goal', 'name'],
    key: 'name'
  },
  {
    title: t('payment.price'),
    dataIndex: ['payment', 'goal', 'price'],
    key: 'money',
    align: 'center',
    width: 150
  },
  {
    title: t('goal.status'),
    dataIndex: ['payment', 'status'],
    key: 'status',
    align: 'center',
    width: 150
  },
  {
    title: t('payment.userChange'),
    dataIndex: ['user', 'name'],
    key: 'status',
    align: 'center',
    width: 200
  },
  {
    title: t('payment.note'),
    dataIndex: ['note'],
    key: 'note'
  },
  {
    title: t('payment.createdAt'),
    dataIndex: 'created_at',
    key: 'createdAt',
    align: 'right',
    fixed: 'right',
    width: 200
  },
])

const queryVar = reactive({
  first: 10,
  page: 1
})

const { result, loading } = useQuery<HistoryPayment, HistoryPaymentVariables>(
  HISTORY_PAYMENT,
  queryVar,
  {
    fetchPolicy: 'network-only'
  }
)

const histories = computed(() => result.value?.history_payment || [])

const { result: countResult } = useQuery<SumHistoryPayment>(SUM_PAYMENT_HISTORY)

const count = computed(() => countResult.value?.sum_history_payment || 0)


const columnsExport = reactive<IExcelColumn[]>([
  {
    label: 'STT',
    value: ['id']
  },
  {
    label: t('payment.createdAt'),
    value: ['created_at']
  },
  {
    label: t('user.name'),
    value: ['user', 'name']
  },
  {
    label: t('user.email'),
    value: ['user', 'email']
  }
])
const query = computed(() => HISTORY_BY_DATE)
</script>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'PaymentsLogs'
})
</script>
