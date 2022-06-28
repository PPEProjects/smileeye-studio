<template>
  <div>
    <a-button type="primary" size="large" :loading='loading' @click="openModal = true">
      <template #icon>
        <file-excel-outlined />
      </template>
      <span class="uppercase">
        {{ t('button.export') }}
      </span>
    </a-button>

    <!-- Form export modal -->
    <modal-base
      v-model:visible="openModal"
      event=""
      :title="t('button.export')"
      :max-width="450"
    >
      <a-form
        :model="exportOptions"
        name="basic"
        autocomplete="off"
        layout="vertical"
        @finish="() => exportFile()"
      >
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

        <a-form-item
          name="range"
          :label="String(t('export.fields')).toUpperCase()"
        >
          <a-checkbox-group
            v-model:value="exportOptions.fields"
            style="width: 100%"
          >
            <a-row>
              <a-col
                v-for="(item, index) in columns"
                :key="item.value"
                :span="8"
                class="mb-1"
              >
                <a-checkbox :value="index">
                  {{ item.label }}
                </a-checkbox>
              </a-col>
            </a-row>
          </a-checkbox-group>

          <template #extra>
            <div class='text-sm mt-4 -mb-2'>{{ t('export.guide') }}</div>
          </template>

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
import { FileExcelOutlined } from '@ant-design/icons-vue'
import { computed, defineAsyncComponent, reactive, ref } from 'vue'
import type { Dayjs } from 'dayjs'
const ModalBase = defineAsyncComponent(() => import('@components/modal/ModalBase.vue'))

import { useI18n } from 'vue-i18n'
import { DocumentNode } from 'graphql/language/ast'
import { useSmileeye } from '#apollo/client/smileeye'
import { builDeepExcel, IExcelColumn } from '@utils/excel'
const { t } = useI18n()
const openModal = ref(false)

const props = defineProps<{
  columns: IExcelColumn[],
  query: DocumentNode
}>()

const exportOptions = reactive<{
  range: Dayjs[]
  fields: number[]
}>({
  range: [],
  fields: []
})

const enable = computed(() => {
  return (
    exportOptions.fields.length > 0 &&
    exportOptions.range.length == 2 &&
    exportOptions.range.every((item) => item)
  )
})

const exportFile = () => {
  openModal.value = false

  const { range } = exportOptions
  const start = range[0].format('YYYY-MM-DD')
  const end = range[1].format('YYYY-MM-DD')

  getDataTable(start, end)
}

const smileyeClient = useSmileeye()
const loading = ref(false)
const getDataTable = async (start: string, end: string) => {
  loading.value = true
  try {
    const { data } = await smileyeClient.query({
      query: props.query,
      variables: {
        dateFrom: start,
        dateTo: end
      },
      fetchPolicy: 'no-cache'
    })
    if(data[0]) {
      // Build file...ánh xạ các cột vào cột của file excel
    }

    const blob = await builDeepExcel(props.columns, exportOptions.fields, data[Object.keys(data)[0]])

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
  loading.value = false
}
</script>
