<template>
  <teleport-view to="#title">
    {{ template.goal?.name }}
  </teleport-view>

  <teleport-view to="#actions">
    <a-button
      type="primary"
      size="large"
      class="uppercase"
    >
      <template #icon>
        <eye-outlined />
      </template>
      preview
    </a-button>
  </teleport-view>

  <a-spin :spinning="loading">
    <div v-if="!Object.keys(template).length" class="h-[200px]"></div>

    <div v-else>
      <div class="flex">
        <div class="w-1/2 flex-shrink-0 pr-4">
          <div class="flex">
            <div class="h-[130px] w-[100px] border-2 border-white shadow">
              <img class="img-full" :src="$cdn(template.goal.image[0])" alt="" />
            </div>

            <div class="ml-3.5">
              <h3 class="text-[17px]">{{ template.goal.name }}</h3>

              <a-tag
                v-if="template.goal.sellRequest?.status === 'approved'"
                color="#355cdd"
              >
                {{ t('sellRequest.approved') }}
              </a-tag>
              <a-tag
                v-else-if="template.goal.sellRequest?.status === 'pending'"
                color="#f50"
              >
                {{ t('sellRequest.pending') }}
              </a-tag>

              <div class="mt-3.5">
                <a-tag color="#17a34b">{{
                    $moneyFormat(template.goal.price)
                  }}</a-tag>
              </div>
            </div>
          </div>

          <p class="mt-3 text-gray-500">{{ template.goal?.description }}</p>

          <a-divider orientation="left">Chủ Sở Hữu</a-divider>

          <div>
            <div class="flex mb-5">
              <router-link
                :to="'/users/' + template.goal.user.id"
                class="rounded-full overflow-hidden mr-3 border-2 border-white shadow-md w-[55px] h-[55px]"
              >
                <img
                  :src="$cdn(template.goal.user.avatar)"
                  alt=""
                  class="object-cover w-full h-full"
                />
              </router-link>

              <div>
                <router-link
                  :to="'/users/' + template.goal.user.id"
                  class="mb-0 font-medium"
                >{{ template.goal.user.name }}</router-link
                >

                <user-roles-tag class="mt-2" :user="template.goal.user" />
              </div>
            </div>

            <user-cell-info :user='template.goal.user' />

          </div>
        </div>

        <div class="w-1/2 flex-shrink-0 pl-4">
          <GoalChart :template="template" />

          <div class='mt-4'>
            <div class='text-xs text-gray-500 text-center'>Biểu đồ học sinh của {{ template.goal.name }}</div>
            <div class='text-xs text-gray-500 text-center mt-4'>

              <a-tag color="#9c27b0">
                {{ t('payment.status.in_need') }} {{ Math.round(template.detail_template.percent_in_need) }} %
              </a-tag>

              <a-tag color="#87d068">
                {{ t('payment.status.trial') }} {{ Math.round(template.detail_template.percent_trial) }} %
              </a-tag>

              <a-tag color="#f50">
                {{ t('payment.status.on_buy') }} {{ Math.round(template.detail_template.percent_on_buy) }} %
              </a-tag>


              <a-tag color="#3b66f5">
                {{ t('payment.status.paid_confirmed') }} {{ Math.round(template.detail_template.percent_paid_confirmed) }} %
              </a-tag>

            </div>
          </div>

        </div>
      </div>

      <a-divider />

      <div class='mt-4'>
        <tabs-animation active='._active' tag='div' auto tab='.goal-tab' direction='horizontal' class='flex items-center h-full border-b'>

          <button
            class="ml-3 block goal-tab px-2"
            :class='{
              "_active": !$route.query.tab
            }'
            @click='$router.replace({ query: { tab: null } })'
          >
            {{ t('goal.tab.tree') }}
          </button>

          <button
            class="ml-3 block goal-tab px-2 goal-tab"
            :class='{
              "_active": $route.query.tab === "students"
            }'
            @click='$router.replace({ query: { tab: "students" } })'
          >
            {{ t('goal.tab.students') }}
          </button>

          <button
            class="ml-3 block goal-tab px-2 goal-tab"
            :class='{
              "_active": $route.query.tab === "teachers"
            }'
            @click='$router.replace({ query: { tab: "teachers" } })'
          >
            {{ t('goal.tab.teachers') }}
          </button>

        </tabs-animation>
      </div>

      <div class='min-h-screen overflow-hidden'>

        <div class='mt-5'>
          <goal-tree v-if='!$route.query.tab' :goal='Number(template.goal.id)'/>
        </div>

        <students-table v-if='$route.query.tab === "students" ' />

        <teachers-table v-if='$route.query.tab === "teachers" ' />

      </div>

    </div>

  </a-spin>

  <edit-rule-modal />

</template>

<script lang="ts" setup>

import { EyeOutlined } from '@ant-design/icons-vue'

import TeleportView from '@components/layout/TeleportView.vue'
const EditRuleModal = defineAsyncComponent(() => import('@components/users/EditRuleModal.vue'))
const TabsAnimation = defineAsyncComponent(() => import('@components/includes/TabsAnimation.vue'))

import { GOAL_INFO } from '#smileeye/queries/goal.query'
import { useQuery } from '@vue/apollo-composable'
import {
  InfoGoalTemplate,
  InfoGoalTemplate_info_goal_template,
  InfoGoalTemplateVariables
} from '#smileeye/queries/__generated__/InfoGoalTemplate'
import { computed, defineAsyncComponent } from 'vue'
import { useRoute } from 'vue-router'
import GoalChart from '@components/goal/GoalChart'
import { useI18n } from 'vue-i18n'
import UserRolesTag from '@components/user/UserRolesTag.vue'
import UserCellInfo from '@components/user/UserCellInfo.vue'
import GoalTree from '@components/workspace/GoalTree.vue'
import StudentsTable from '@components/goals/StudentsTable.vue'
import TeachersTable from '@components/goals/TeachersTable.vue'

const route = useRoute()

const { result, loading } = useQuery<
  InfoGoalTemplate,
  InfoGoalTemplateVariables
>(GOAL_INFO, {
  id: String(route.params.id)
})

const template = computed<InfoGoalTemplate_info_goal_template>(
  () =>
    result.value?.info_goal_template ||
    ({} as InfoGoalTemplate_info_goal_template)
)

const { t } = useI18n()
</script>

<style>
.goal-tab {
  @apply px-4 py-2 text-lg text-gray-500
}
.goal-tab._active {
  @apply text-primary-600
}
</style>
