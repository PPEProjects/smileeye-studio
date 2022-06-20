<template>
  <a-spin :spinning="loading">
    <div ref="container" class="w-full mt-5">
      <!-- List Goals -->
      <!-- @ts-nocheck -->
      <use-element-size>
        <template #default='{ width }'>
          <ul class="flex -mx-2.5 mb-0 flex-wrap">
            <li
              v-for="(goal, index) in goals"
              :key="String(goal?.id)"
              class="px-2.5"
              :class="{
              'w-1/5': width <= 768,
              'w-1/6': width > 768 && width <= 1024,
              'w-[150px]': width > 1024
            }"
              @click='currentGoal = index'
            >
              <div
                class='animate'
                :class="{
                  'opacity-70': currentGoal !== index
                }"
              >
                <div
                  class="aspect-w-3 aspect-h-4 overflow-hidden rounded-md border-2 border-white shadow"
                >
                  <img
                    :src="$cdn(goal?.image?.[0])"
                    alt=""
                    class="w-full h-full object-cover"
                  />
                </div>

                <h2 class="capitalize line-clamp-2 mt-2 text-gray-600">
                  {{ goal?.name }}
                </h2>
              </div>
            </li>
          </ul>
        </template>
      </use-element-size>
      <!-- End List Goals -->

      <template v-if='currentGoal > -1'>

        <div class='border-b pb-2 mb-5 flex items-center justify-end'>
          <router-link
            :to='{
              name: "users-id-goals-goalID",
              params: {
                id: user.id,
                goalID: goals[currentGoal].id
              }
            }'
            class='text-[10px] ml-4 text-gray-400'
          >Xem thêm</router-link>
        </div>


        <goal-tree :key='goals[currentGoal].id' :goal='Number(goals[currentGoal].id)' class='mt-4' />

      </template>

    </div>
  </a-spin>
</template>

<script setup lang="ts">
import { useQuery } from '@vue/apollo-composable'
import { UseElementSize } from '@vueuse/components'
import { GOAL_ROOT_BY_USER } from '#smileeye/queries/goal.query'
import {
  GoalRootByUser,
  GoalRootByUserVariables
} from '#smileeye/queries/__generated__/GoalRootByUser'
import { computed, ref } from 'vue'
import GoalTree from '@components/workspace/GoalTree.vue'
import { DetailUser_detail_user } from '#smileeye/queries/__generated__/DetailUser'

const props = defineProps<{
  user: DetailUser_detail_user
}>()

// goal data
const { result, loading, onResult } = useQuery<GoalRootByUser, GoalRootByUserVariables>(
  GOAL_ROOT_BY_USER,
  {
    userId: String(props.user?.id)
  }
)
const goals = computed(() => result.value?.goal_root_by_user || [])

// Tree selector
const currentGoal = ref<number | undefined>()

onResult(({ data }) => {
  if (data?.goal_root_by_user?.length) {
    currentGoal.value = 0
  }
})

</script>
