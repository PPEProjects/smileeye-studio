<template>
  <div>
    <div>
      <a-button type="primary" @click="openModal = true">Xuất File</a-button>
    </div>
    <pre>
            {{ logs }}
</pre
    >

    <modal-base
      v-model:visible="openModal"
      event=""
      title="Tuỳ Chọn"
      :max-width="450"
    >
      <a-form
        :model="exportOptions"
        name="basic"
        autocomplete="off"
        layout="vertical"
        @finish="() => exportFile()"
      >

        <a-form-item>
          <a-select
              ref="select"
              v-model:value="exportOptions.group"
          >
            <a-select-option value="logs">Logs</a-select-option>
            <a-select-option value="invite">Invite</a-select-option>
          </a-select>
        </a-form-item>

        <a-form-item
          name="range"
          :label="String(t('export.range')).toUpperCase()"
        >
          <a-range-picker
            v-model:value="exportOptions.range"
            style="width: 100%"
            :placeholder="[t('export.startDay'), t('export.endDay')]"
          />
        </a-form-item>

        <a-form-item class="-mt-3">
          <div class="flex justify-end">
            <a-button
              type="primary"
              html-type="submit"
              class="ml-4"
              :disabled="!enable"
            >
              {{ t('button.export') }}
            </a-button>
          </div>
        </a-form-item>
      </a-form>
    </modal-base>
  </div>
</template>

<script lang="ts" setup>
import { computed, defineAsyncComponent, reactive, ref, toRaw } from 'vue'
import { onValue, ref as dbRef } from 'firebase/database'
import { useFireRTDB } from '@composables/useFirebase'
import { useRoute } from 'vue-router'
import { Dayjs } from 'dayjs'
import { useI18n } from 'vue-i18n'
import { builDeepExcel, IExcelColumn } from '@utils/excel'
import { useDayjs } from '@composables/useDayjs'
const { t } = useI18n()

const ModalBase = defineAsyncComponent(
  () => import('@components/modal/ModalBase.vue')
)

const route = useRoute()
const dayjs = useDayjs()

const logs = ref('')

const starCountRef = dbRef(useFireRTDB(), `meeting-logs/${route.params.id}`)
onValue(starCountRef, (snapshot) => {
  const data = snapshot.val()
  data && (logs.value = data)
})

const openModal = ref(false)

const exportOptions = reactive<{
  range: Dayjs[]
  group: 'logs' | 'invite'
}>({
  range: [],
  group: 'logs'
})

const enable = computed(() => {
  return (
    exportOptions.range.length == 2 && exportOptions.range.every((item) => item)
  )
})

const getDataTable = async (data: any, fields: any) => {
  try {
    const blob = await builDeepExcel(
      fields,
      fields.map((item: any) => item.label),
      data
    )

    const dlink = document.createElement('a')
    dlink.href = window.URL.createObjectURL(blob)

    // Memory leak
    dlink.addEventListener('click', () => {
      setTimeout(() => {
        window.URL.revokeObjectURL(dlink.href)
      }, 100)
    })

    dlink.click()
    dlink.remove()
  } catch (e) {
    console.log(e)
    // Xuất file thất bại
  }
}

const exportFile = () => {
  openModal.value = false

  const { range } = exportOptions
  const start = range[0].format('YYYY-MM-DD')
  const end = range[1].format('YYYY-MM-DD')

  const _invites: any[] = []
  const _logs: any[] = []

  Object.values(logs.value || {}).forEach((e: any) => {
    _invites.push(...Object.values(toRaw(e.invites) || []))
    _logs.push(...Object.values(toRaw(e.logs) || []))
  })
  const time1 = dayjs(start, 'YYYY-MM-DD').unix()
  const time2 = dayjs(end, 'YYYY-MM-DD').unix()

  console.log(time2)

  if(exportOptions.group === 'invite') {

    const columns = reactive<IExcelColumn[]>([
      {
        label: 'Ngày Tạo',
        value: ['createdAt']
      },
      {
        label: 'ID Người Gửi',
        value: ['sender', 'id']
      },
      {
        label: 'Email Người Gửi',
        value: ['sender', 'email']
      },
      {
        label: 'Tên Người Gửi',
        value: ['sender', 'name']
      },
      {
        label: 'ID Người Nhận',
        value: ['receiver', 'id']
      },
      {
        label: 'Email Người Nhận',
        value: ['receiver', 'email']
      },
      {
        label: 'Tên Người Nhận',
        value: ['receiver', 'name']
      }
    ])
    getDataTable(
        _invites
            .filter((e) => e.createdAt >= time1)
            .map((e) => ({
              ...e,
              createdAt: dayjs(e.createdAt).format('YYYY-MM-DD hh:mm')
            }))
        // .filter((e) => e.createdAt <= time2)
        , columns
    )
  } else {
    const columns = reactive<IExcelColumn[]>([
      {
        label: 'Thời Gian Vào',
        value: ['start']
      },
      {
        label: 'Thời Gian Kết Thúc',
        value: ['end']
      },
      {
        label: 'ID',
        value: ['user', 'id']
      },
      {
        label: 'Email',
        value: ['user', 'email']
      },
      {
        label: 'Tên',
        value: ['user', 'name']
      }
    ])

    getDataTable(
        _logs
            .filter((e) => e.start >= time1)
            .map((e) => ({
              ...e,
              start: dayjs(e.createdAt).format('YYYY-MM-DD hh:mm'),
              end: dayjs(e.createdAt).format('YYYY-MM-DD hh:mm')
            }))
        , columns
    )
  }
}
</script>

<style scoped></style>
