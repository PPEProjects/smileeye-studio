<template>
  <div class="_info bg-white relative">
    <div
      class="w-full overflow-hidden absolute top-0 left-0 right-0 h-[150px] z-10"
    >
      <img :src="$cdn(user.banner)" alt="" class="w-full h-full object-cover" />
    </div>

    <button
      class="absolute z-20 top-3 right-3 text-white text-[20px]"
      @click='goToProfile'
    >
      <share-alt-outlined />
    </button>

    <div class="flex justify-center items-center mt-[100px] relative z-20">
      <div
        class="rounded-full overflow-hidden w-[100px] h-[100px] border-[4px] shadow-lg border-white bg-white"
      >
        <img
          class="w-full h-full object-cover animate transform hover:scale-110"
          :src="$cdn(user.avatar)"
          alt=""
        />
      </div>
    </div>

    <div class="px-4">
      <h3 class="font-medium text-center text-[20px] capitalize mt-2">
        {{ user.name }}
      </h3>

      <user-roles-tag
        class="w-full flex flex-wrap justify-center mt-2 mb-1"
        :user="user"
      />

      <h3>Thông tin</h3>

      <div class="text-gray-600">
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
          <span class="ml-1.5">{{ user.current_address.detail || '--' }}</span>
        </div>

        <div class="py-2">
          <crown-outlined :style="{ width: '20px', height: '20px' }" />
          <span class="ml-1.5">{{ dayjs(user.created_at).fromNow() }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { DetailUser_detail_user } from '#smileeye/queries/__generated__/DetailUser'
import UserRolesTag from '@components/user/UserRolesTag.vue'
import {
  PhoneOutlined,
  MailOutlined,
  PushpinOutlined,
  CrownOutlined,
  ShareAltOutlined
} from '@ant-design/icons-vue'
import { useDayjs } from '@composables/useDayjs'

const props = defineProps<{
  user: DetailUser_detail_user
}>()

const dayjs = useDayjs()

const goToProfile = () => {
  window.open(`https://v2.smileeye.edu.vn/profile/${props.user?.id}`, '_blank')
}
</script>
