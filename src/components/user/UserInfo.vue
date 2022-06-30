<template>
  <div class="_info bg-white relative">
    <div
      class="w-full overflow-hidden absolute top-0 left-0 right-0 h-[150px] z-10"
    >
      <img :src="$cdn(user.banner)" alt="" class="w-full h-full object-cover" />
    </div>

    <button
      class="absolute z-20 top-3 right-3 text-white text-[20px]"
      @click="goToProfile"
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

      <h3>{{ t('users.profile.info') }}</h3>

      <div class="text-gray-600">
        <user-cell-info :user="user" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { defineAsyncComponent } from 'vue'
const UserRolesTag = defineAsyncComponent(
  () => import('@components/user/UserRolesTag.vue')
)

import { DetailUser_detail_user } from '#smileeye/queries/__generated__/DetailUser'

import { ShareAltOutlined } from '@ant-design/icons-vue'
import { useI18n } from 'vue-i18n'
import UserCellInfo from '@components/user/UserCellInfo.vue'

const props = defineProps<{
  user: DetailUser_detail_user
}>()

const { t } = useI18n()

const goToProfile = () => {
  window.open(`https://v2.smileeye.edu.vn/profile/${props.user?.id}`, '_blank')
}
</script>
