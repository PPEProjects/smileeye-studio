<template>
  <modal-base
    ref="modal"
    v-model:visible="showModal"
    title="Xác nhận thay đổi"
    event="updatePaymentNote"
    :max-width="450"
  >
    <a-textarea
      v-model:value="note"
      placeholder="Thông tin và thời gian sẽ được lưu tự động."
      :auto-size="{ minRows: 3, maxRows: 6 }"
    />

    <div class="flex items-center">
      <a-button type="danger" class="ml-auto mr-3" @click="showModal = false">
        {{ t('button.cancel') }}
      </a-button>
      <a-button type="primary" :loading="loading" @click="changePayment">
        {{ t('button.yes') }}
      </a-button>
    </div>
  </modal-base>
</template>

<script lang="ts" setup>
import ModalBase from '../modal/ModalBase.vue'
import { useI18n } from 'vue-i18n'
import { useUserStore } from '@store/user'
import { onBeforeUnmount, onMounted, ref } from 'vue'

import { useEmitter } from '@nguyenshort/vue3-mitt'
import { UpsertPaymentInput } from '#schema/smileeyeTypes'
import { useMutation } from '@vue/apollo-composable'
import { CREATE_HISTORY_PAYMENT } from '#smileeye/mutations/payment.mutation'
import {
  CreateHistoryPayment,
  CreateHistoryPaymentVariables
} from '#smileeye/mutations/__generated__/CreateHistoryPayment'

/*interface LocalData {
  as?: string
  city?: string
  country?: string
  countryCode?: string
  isp?: string
  lat?: number
  lon?: number
  org?: string
  query?: string
  region?: string
  regionName?: string
  status?: string
  timezone?: string
  zip?: string
}*/

// Global event
const emitter = useEmitter<{
  beforeUpdatePayment: UpsertPaymentInput
  afterAppNotePayment: UpsertPaymentInput
}>()

const showModal = ref(false)

const useUser = useUserStore()
const { t } = useI18n()

const modal = ref<any>(null)

const note = ref<string>('')
const payment = ref<any>({})

const { mutate, loading, onDone } = useMutation<
  CreateHistoryPayment,
  CreateHistoryPaymentVariables
>(CREATE_HISTORY_PAYMENT)
const changePayment = () => {
  mutate({
    input: {
      user_id: String(useUser.user?.id),
      payment_id: String(payment.value.id),
      note: note.value
    }
  })
}

onDone(() => {
  showModal.value = false
  emitter.emit('afterAppNotePayment', payment.value)
})

onMounted(() => {
  emitter.on('beforeUpdatePayment', (data: UpsertPaymentInput) => {
    payment.value = JSON.parse(JSON.stringify(data))
    note.value = ''
    showModal.value = true
  })
})

onBeforeUnmount(() => {
  emitter.off('beforeUpdatePayment')
})
</script>

<style scoped></style>
