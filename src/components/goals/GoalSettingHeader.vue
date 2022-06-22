<template>

  <a-dropdown v-model:visible="visible">
    <a class="ant-dropdown-link" @click.prevent='openSelector'>
      <button>
        <plus-square-outlined :style="{ color: '#3b66f5'}" />
      </button>
    </a>
    <template #overlay>
      <a-menu @click="handleMenuClick">
        <a-checkbox-group v-model:value="columns" class='w-full'>
          <a-menu-item key="1">
            <a-checkbox name='menu' :value='0' />
            <span class='ml-2'>Member</span>
          </a-menu-item>
          <a-menu-item key="2">
            <a-checkbox name='menu' :value='1' />
            <span class='ml-2'>Trial</span>
          </a-menu-item>
          <a-menu-item key="3">
            <a-checkbox name='menu' :value='2' />
            <span class='ml-2'>Onbuy</span>
          </a-menu-item>
          <a-menu-item key="4">
            <a-checkbox name='menu' :value='3' />
            <span class='ml-2'>Paid confirmed</span>
          </a-menu-item>
          <a-menu-item key="5">
            <a-checkbox name='menu' :value='4' />
            <span class='ml-2'>Done</span>
          </a-menu-item>
          <a-menu-item key="6">
            <a-checkbox name='menu' :value='5' />
            <span class='ml-2'>Checked</span>
          </a-menu-item>
          <a-menu-item key="7">
            <a-checkbox name='menu' :value='6' />
            <span class='ml-2'>Per goal</span>
          </a-menu-item>
          <a-menu-item key="8">
            <a-checkbox name='menu' :value='7' />
            <span class='ml-2'>Request date</span>
          </a-menu-item>
        </a-checkbox-group>
        <div class='w-full h-[1px] bg-gray-100'></div>

        <div class='flex justify-between items-center mt-3 px-3 pb-2'>
          <a-button type="danger" size="small" @click='resetHeader'>Reset</a-button>
          <div class='w-4'></div>
          <a-button type="primary" size="small" @click='buildHeader'>Choice</a-button>
        </div>

      </a-menu>
    </template>
  </a-dropdown>
</template>

<script lang='ts' setup>
import { PlusSquareOutlined } from '@ant-design/icons-vue'
import { MenuProps } from 'ant-design-vue'
import { ref } from 'vue'
import { usePaymentStore } from '@store/payment'
// payment store
// support v-model
const paymentStore = usePaymentStore()

const columns = ref<number[]>([])

const visible = ref(false)
const handleMenuClick: MenuProps['onClick'] = () => {
  //
}

// Mở menu => set biến
const openSelector = () => {
  columns.value = paymentStore.columns
}

const buildHeader = () => {
  visible.value = false
  paymentStore.setColumns(columns.value)
}

const resetHeader = () => {
  visible.value = false
  paymentStore.setColumns([0])
}

</script>
