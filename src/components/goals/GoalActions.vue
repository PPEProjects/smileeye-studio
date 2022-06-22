<template>

<!--  <a-popconfirm
    :title="t('payment.action.accept.title')"
    placement="topLeft"
    :ok-text="t('payment.action.accept.yes')"
    :cancel-text="t('payment.action.accept.no')"
    @confirm='emit("confirm")'
  >
    <a-button type="primary" size="small">
      <template #icon>
        <check-outlined />
      </template>
    </a-button>
  </a-popconfirm>-->


  <a-button type="primary" size="small" class='ml-2' @click='$emitter.emit("upsertPaymentModal", payment)'>
    <template #icon>
      <edit-outlined />
    </template>
  </a-button>

  <a-popconfirm
    :title="t('payment.action.delete.title')"
    placement="topLeft"
    :ok-text="t('payment.action.delete.yes')"
    :cancel-text="t('payment.action.delete.no')"
    @confirm="emit('delete')"
  >
    <a-button type="danger" size="small" class="ml-2">
      <svg class="fill-current text-white" width="1em" height="1em">
        <use xlink:href="#i-remove" />
      </svg>
    </a-button>
  </a-popconfirm>

</template>

<script lang='ts' setup>
// Action
import { CheckOutlined, EditOutlined } from '@ant-design/icons-vue'

import { useLangs } from '@composables/useLangs'
import { SortPayments_sort_payments } from '#smileeye/queries/__generated__/SortPayments'

const { t } = useLangs()


defineProps<{
  payment: SortPayments_sort_payments
}>()

const emit = defineEmits<{
  (e: 'delete'): void
  (e: 'confirm'): void
}>()
</script>
