<template>
  <teleport-view to="#title">
    <div class="h-[70px] flex items-center">
      {{ t('sidebar.workspace') }}
      <tabs-animation
        active="._active"
        tag="div"
        auto
        tab=".goal-tab"
        direction="horizontal"
        class="flex items-center h-full"
      >
        <router-link
          to="/workspace"
          class="ml-3 block goal-tab px-2"
          :class="{
            'user-tab-active _active': !$route.query.group
          }"
        >
          {{ t('goals.tab.all') }}
        </router-link>
        <router-link
          to="/workspace?group=sell-request"
          class="block ml-3 goal-tab px-2"
          :class="{
            _active: $route.query.group === 'sell-request'
          }"
        >
          {{ t('goals.tab.sell_request') }}
        </router-link>
      </tabs-animation>
    </div>
  </teleport-view>

  <a-spin :spinning='loading || spinning'>
    <goals-table :key="$route.fullPath" v-model:goals='goals' />
  </a-spin>

  <upsert-goal-template />
</template>

<script lang="ts" setup>
import { computed, defineAsyncComponent, onMounted, onUnmounted } from 'vue'

const GoalsTable = defineAsyncComponent(() => import('@components/goals/GoalsTable.vue'))
const TeleportView = defineAsyncComponent(() => import('@components/layout/TeleportView.vue'))
const TabsAnimation = defineAsyncComponent(() => import('@components/includes/TabsAnimation.vue'))
const UpsertGoalTemplate = defineAsyncComponent(() => import('@components/goals/UpsertGoalTemplate.vue'))

import { useI18n } from 'vue-i18n'
import { useMutation, useQuery } from '@vue/apollo-composable'
import { LIST_GOAL_ROOT } from '#smileeye/queries/goal.query'
import { ListGoalRoot, ListGoalRoot_list_goal_root } from '#smileeye/queries/__generated__/ListGoalRoot'
import { UpdateGoalDeal, UpdateGoalDealVariables } from '#smileeye/mutations/__generated__/UpdateGoalDeal'
import { UPDATE_GOAL_DEAL } from '#smileeye/mutations/goal.mutation'
import { useEmitter } from '@nguyenshort/vue3-mitt'
const { t } = useI18n()

// Tính toán goals từ ngoài => filter => props vào
const { result, loading } = useQuery<ListGoalRoot>(LIST_GOAL_ROOT)
const goals = computed<ListGoalRoot_list_goal_root[]>(()=> (result.value?.list_goal_root || []) as ListGoalRoot_list_goal_root[])

const { mutate, loading: spinning } = useMutation<UpdateGoalDeal, UpdateGoalDealVariables>(UPDATE_GOAL_DEAL)

// sự kiện
// Global event
const emitter = useEmitter<{
  onUpdateGoalTemplate: UpdateGoalDealVariables
}>()

onMounted(() => emitter.on('onUpdateGoalTemplate', (data) => mutate(data)))

onUnmounted(() => emitter.off('onUpdateGoalTemplate'))

</script>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'GoalsPage'
})
</script>
