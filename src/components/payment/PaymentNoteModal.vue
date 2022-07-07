<template>
  <modal-base ref="modal" :title="t('payment.history.title')" event="updatePaymentNote" :max-width="450" @init="setupModal" @dispose="onDispose">
    <p>Chúng tôi phát hiện bạn:
      <span class="font-medium">{{ useUser.user.name }}
        </span> vừa thay đổi đơn số: <span class="font-medium">{{ payment.id }}. Hãy nói về điều này.</span>
    </p>
    <a-textarea
        v-model:value="note"
        placeholder="Thông tin và thời gian sẽ được lưu tự động."
        :auto-size="{ minRows: 3, maxRows: 6 }"
    />
    <p class="mt-1 text-gray-400 text-sm">Bạn có quyền im lặng, nhưng những gì bạn nói sẽ là bằng chứng chống lại anh trước toà.</p>

    <div class="flex items-center">
      <a-button type="danger" class="ml-auto mr-3" @click="addNote('Nhấp huỷ')">
        {{ t('button.cancel') }}
      </a-button>
      <a-button type="primary" @click="addNote">
        {{ t('button.yes') }}
      </a-button>
    </div>
  </modal-base>
</template>

<script lang="ts" setup>
import ModalBase from "../modal/ModalBase.vue"
import {useI18n} from "vue-i18n";
import {useUserStore} from "@store/user";
import {inject, onBeforeUnmount, ref, watch} from "vue";
import {AxiosInstance} from "axios"

import { ref as dbRef, set as dbSet } from 'firebase/database'
import {useFireRTDB} from "@composables/useFirebase"

import { v4 as uuidv4 } from 'uuid'
import {message} from "ant-design-vue";

interface LocalData {
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
}

const useUser = useUserStore()
const { t } = useI18n()

const modal = ref<any>(null)

const inNote = ref<boolean>(false)
const note = ref<string>('')
const payment = ref<any>({})
const info = ref<LocalData>({})
const time = ref<number>(0)

// http://ip-api.com/json/
const $axios = inject<AxiosInstance>('$axios')!
const setupModal = async (data: any) => {
  inNote.value = true
  payment.value = data
  time.value = Date.now()
  try {
    info.value = await $axios.get('http://ip-api.com/json/')
  } catch (e) {
    //
  }
}

const addNote = (forceNote = '') => {
  inNote.value = false
  modal.value?.dispose()
  dbSet(
      dbRef(
          useFireRTDB(),
          `payment-history/${payment.value?.id}/${uuidv4()}`
      ),
      {
        payment: payment.value,
        time: time.value,
        note: forceNote || note.value || '--',
        info: info.value,
        user: useUser.user,
      }
  )
  message.success('Đã thêm ghi chú')
}

const beforeUnLoad = (e: any) => {
  e.preventDefault()
  e.returnValue = ''
  addNote('Chủ động load lại trang')
};

watch(inNote, (val) => {
  if(val) {
    window.addEventListener('beforeunload', beforeUnLoad)
  } else {
    window.removeEventListener('beforeunload', beforeUnLoad)
  }
})
onBeforeUnmount(() => {
  window.removeEventListener('beforeunload', beforeUnLoad)
})

const onDispose = () => {
  if (inNote.value) {
    message.error('Bạn đã huỷ')
    dbSet(
        dbRef(
            useFireRTDB(),
            `payment-history/${payment.value?.id}/${uuidv4()}`
        ),
        {
          payment: payment.value,
          time: time.value,
          note: 'Bấm huỷ bỏ',
          info: info.value,
          user: useUser.user,
        }
    )
    inNote.value = false
  }
}

</script>

<style scoped></style>
