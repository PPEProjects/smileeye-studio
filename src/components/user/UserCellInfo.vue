<template>
  <div class="py-2 border-b border-gray-200">
    <phone-outlined :style="{ width: '20px', height: '20px' }" />
    <span class="ml-1.5">{{ user.phone_number }}</span>
  </div>

  <div class="py-2 border-b border-gray-200">
    <mail-outlined :style="{ width: '20px', height: '20px' }" />
    <span class="ml-1.5">{{ user.email }}</span>
  </div>

  <div class="py-2 border-b border-gray-200">
    <pushpin-outlined :style="{ width: '20px', height: '20px' }" />
    <span class="ml-1.5">{{ user.current_address?.detail || '--' }}</span>
  </div>

  <div class="py-2">
    <crown-outlined :style="{ width: '20px', height: '20px' }" />
    <span class="ml-1.5">{{ dayjs(user.created_at).fromNow() }}</span>
  </div>
</template>

<script lang="ts" setup>
import { DetailUser_detail_user } from '#smileeye/queries/__generated__/DetailUser'

import {
  PhoneOutlined,
  MailOutlined,
  PushpinOutlined,
  CrownOutlined
} from '@ant-design/icons-vue'
import { useDayjs } from '@composables/useDayjs'

defineProps<{
  user: DetailUser_detail_user
}>()

const dayjs = useDayjs()

</script>
