<template>

  <teleport-view to="#title">
    <div class="h-[70px] flex items-center">
      {{ t('users.title') }}
      <tabs-animation active='._active' tag='div' auto tab='.user-tab' direction='horizontal' class='flex items-center h-full'>
        <router-link
          to="/users"
          class="ml-3 block user-tab px-2"
          :class='{
            "user-tab-active _active": !$route.query.group
          }'
        >
          Lộ Trình Học
        </router-link>

        <router-link
          to="/users?group=supporters"
          class="block ml-3 user-tab px-2"
          :class='{
            "_active": $route.query.group === "supporters"
          }'
        >
          Hoạt Động
        </router-link>
      </tabs-animation>
    </div>
  </teleport-view>

  <a-spin :spinning="loading">
    <div ref="el" class="flex -mx-8">
      <div
        v-for="(group, index) in gridData"
        :key="index"
        class="px-3"
        :style="{ width: `${100 / gridData.length}%` }"
      >
        <div
          v-for="(post, index2) in group"
          :key="index2"
          class="mb-6 shadow-lg shadow-gray-100"
        >
            <japan-post
              :key="post.id"
              :post="post"
              class="mb-6 shadow-lg shadow-gray-100"
            />
        </div>
      </div>
    </div>
  </a-spin>
</template>

<script lang="ts" setup>
import { useRoute } from 'vue-router'
import { useQuery } from '@vue/apollo-composable'
import {
  PostsByGoalRoot,
  PostsByGoalRoot_list_japanese_posts_by_goal_root,
  PostsByGoalRootVariables
} from '#smileeye/queries/__generated__/PostsByGoalRoot'
import { LIST_POST_BY_UER } from '#smileeye/queries/user.query'
import { computed, ref } from 'vue'
import { DetailUser_detail_user } from '#smileeye/queries/__generated__/DetailUser'
import { useElementSize } from '@vueuse/core'
import JapanPost from '@components/bloc/JapanPost.vue'
import TabsAnimation from '@components/includes/TabsAnimation.vue'
import { useLangs } from '@composables/useLangs'
const route = useRoute()

const { t } = useLangs()


defineProps<{
  user: DetailUser_detail_user
}>()

const el = ref(null)
const { width } = useElementSize(el)
const chuckSize = computed(() => {
  if (width.value <= 768) {
    return 2
  } else if (width.value <= 1024) {
    return 3
  } else {
    return 4
  }
})

const { result, loading } = useQuery<PostsByGoalRoot, PostsByGoalRootVariables>(
  LIST_POST_BY_UER,
  {
    userId: String(route.params.id),
    goalRootId: String(route.params.goalID)
  }
)
const posts = computed(
  () => result.value?.list_japanese_posts_by_goal_root || []
)

type Post = PostsByGoalRoot_list_japanese_posts_by_goal_root

const gridData = computed(() => {
  // Build chuck of posts
  let chuck: any[] = []
  for (let i = 0; i < posts.value.length; i += chuckSize.value) {
    chuck.push(posts.value.slice(i, i + chuckSize.value))
  }

  const grid: Post[][] = []

  for (let i = 0; i < chuck.length; i++) {
    for (let j = 0; j < chuckSize.value; j++) {
      const post = chuck[i][j]
      if (post) {
        if (!grid[j]) grid[j] = []
        grid[j].push(post)
      }
    }
  }
  return grid
})
</script>

<style>
#users-id-goals-goalID .__tab {
  background: transparent;
}
</style>
