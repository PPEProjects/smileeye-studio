<template>
  <a-dropdown v-model:visible="visible">
    <a class="ant-dropdown-link" @click.prevent="openSelector">
      <button>
        <plus-square-outlined :style="{ color: '#3b66f5' }" />
      </button>
    </a>
    <template #overlay>
      <a-menu @click="handleMenuClick">
        <a-checkbox-group class="w-full" :value='value' @change='emit("update:value", $event)'>

          <a-menu-item v-for='(colume, index) in columns' :key="colume.key">
            <a-checkbox name="menu" :value="index" />
            <span class="ml-2 capitalize">
              {{ colume.title }}
            </span>
          </a-menu-item>

        </a-checkbox-group>

        <div class="w-full h-[1px] bg-gray-100"></div>

        <div class="flex justify-end items-center mt-3 px-3 pb-2">
          <a-button type="danger" size="small" @click="resetHeader">Reset</a-button>
<!--          <div class="w-4"></div>
          <a-button type="primary" size="small" @click="buildHeader">
            Choice
          </a-button>-->
        </div>
      </a-menu>
    </template>
  </a-dropdown>
</template>

<script lang="ts" setup>
import { PlusSquareOutlined } from '@ant-design/icons-vue'
import { MenuProps } from 'ant-design-vue'
import { ref } from 'vue'

type IColumn = Partial<{
  title: string,
  dataIndex: string,
  key: string
}>

const emit = defineEmits<{
  (e: 'update:value', value: number[]): void
}>()

defineProps<{
  columns: IColumn[],
  value: number[],
}>()

const visible = ref(false)
const handleMenuClick: MenuProps['onClick'] = () => {
  //
}

// Mở menu => set biến
const openSelector = () => {
 // columns.value = paymentStore.columns
}

const buildHeader = () => {
  visible.value = false
 //  paymentStore.setColumns(columns.value)
}

const resetHeader = () => {
  visible.value = false
  emit('update:value', [])
}
</script>
