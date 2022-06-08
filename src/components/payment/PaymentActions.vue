<template>

  <a-popconfirm
    :title="t('payment.action.accept.title')"
    placement="topLeft"
    :ok-text="t('payment.action.accept.yes')"
    :cancel-text="t('payment.action.accept.no')"
    @confirm="confirm"
  >
    <a-button type="primary" size="small">
      <template #icon>
        <check-outlined />
      </template>
    </a-button>
  </a-popconfirm>

  <a-popconfirm
    :title="t('payment.action.delete.title')"
    placement="topLeft"
    :ok-text="t('payment.action.delete.yes')"
    :cancel-text="t('payment.action.delete.no')"
    @confirm="confirm"
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
import { message } from 'ant-design-vue'
import { CheckOutlined } from '@ant-design/icons-vue'

import { useLangs } from '@composables/useLangs'

const { t } = useLangs()

const confirm = (e: MouseEvent) => {
  console.log(e);
  message.success('Click on Yes');
};
</script>
