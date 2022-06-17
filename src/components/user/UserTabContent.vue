<template>
  <div class="__tab overflow-hidden">
    <tabs-animation
      active="._active"
      direction="horizontal"
      auto
      tab=".profile-tab"
      class="h-[50px] w-full border-b-[2px] flex border-gray-100 box-content"
    >
      <button
        v-for="(tab, index) in tabs"
        :key="index"
        class="profile-tab"
        :class="{
          _active: index === currentTab
        }"
        @click="currentTab = index"
      >
        <span
          class="animate"
          :class="{
            'text-gray-400': index !== currentTab,
            'text-primary-500': index === currentTab
          }"
        >
          {{ tab.label }}
        </span>
      </button>
    </tabs-animation>

    <div class='__tab-content px-4'>
      <component :is="tabs[currentTab].component" :user='user' />
    </div>

  </div>
</template>

<script lang="ts" setup>
import TabsAnimation from '@components/includes/TabsAnimation.vue'
import { defineAsyncComponent, ref } from 'vue'
import { DetailUser_detail_user } from '#smileeye/queries/__generated__/DetailUser'

const props = defineProps<{
  user: DetailUser_detail_user
}>()

const tabs = [
  {
    label: 'My Goal Root',
    component: defineAsyncComponent(() => import('@components/user/UserTabGoalRoot.vue'))
  },
  {
    label: 'Activity',
    component: defineAsyncComponent(() => import('@components/user/UserTabActivity.vue'))
  }
]

const currentTab = ref(0)
</script>

<style>
.__user-container .profile-tab ~ span:last-child {
  display: none;
}
.profile-tab {
  @apply flex items-center justify-center px-4 font-medium;
}
</style>
