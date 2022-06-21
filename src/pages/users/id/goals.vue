<template>
  <a-spin :spinning="loading">
    <div ref="container" class="w-full mt-5">
      <!-- List Goals -->
      <!-- @ts-nocheck -->
      <use-element-size>
        <template #default="{ width }">
          <ul class="flex -mx-2.5 mb-0 flex-wrap">
            <li
              v-for="goal in goals"
              :key="String(goal?.id)"
              class="px-2.5"
              :class="{
                'w-1/5': width <= 768,
                'w-1/6': width > 768 && width <= 1024,
                'w-[150px]': width > 1024
              }"
            >
              <router-link
                class="animate"
                :to="{
                  name: 'users-id-goals-goalID-detail',
                  params: {
                    id: user.id,
                    goalID: goal.id
                  }
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
              </router-link>
            </li>
          </ul>
        </template>
      </use-element-size>
      <!-- End List Goals -->
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
import { computed } from 'vue'
import { DetailUser_detail_user } from '#smileeye/queries/__generated__/DetailUser'

const props = defineProps<{
  user: DetailUser_detail_user
}>()

// goal data
const { result, loading } = useQuery<
  GoalRootByUser,
  GoalRootByUserVariables
>(GOAL_ROOT_BY_USER, {
  userId: String(props.user?.id)
})
const goals = computed(() => result.value?.goal_root_by_user || [])
</script>
