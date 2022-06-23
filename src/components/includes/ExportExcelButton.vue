<template>
  <div>
    <a-button type="primary" size="large" @click="openModal = true">
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
                v-for="item in columns"
                :key="item.value"
                :span="8"
                class="mb-1"
              >
                <a-checkbox :value="item.value">
                  {{ item.label }}
                </a-checkbox>
              </a-col>
            </a-row>
          </a-checkbox-group>
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
import { useLangs } from '@composables/useLangs'
import { computed, reactive, ref } from 'vue'
import type { Dayjs } from 'dayjs'

import ModalBase from '@components/modal/ModalBase.vue'
const { t } = useLangs()

const openModal = ref(false)

defineProps<{
  columns: {
    label: string
    value: string
  }[]
}>()

const exportOptions = reactive<{
  range: Dayjs[]
  fields: string[]
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

  const { range, fields } = exportOptions
  const start = range[0].format('YYYY-MM-DD')
  const end = range[1].format('YYYY-MM-DD')

  console.log(start, end, fields)
}
</script>
