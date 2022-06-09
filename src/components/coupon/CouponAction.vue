<template>

  <a-button type="primary" size="small" @click='emit("edit")'>
    <template #icon>
      <edit-outlined />
    </template>
  </a-button>

  <a-popconfirm
    :title="t('coupon.actions.destroy.title')"
    placement="topLeft"
    :ok-text="t('coupon.actions.delete.yes')"
    :cancel-text="t('coupon.actions.delete.no')"
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
import { EditOutlined } from '@ant-design/icons-vue'

import { useLangs } from '@composables/useLangs'
const { t } = useLangs()

// edit
const emit = defineEmits<{
  (e: 'delete'): void,
  (e: 'edit'): void
}>()
</script>
