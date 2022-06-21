<template>
  <a-spin :spinning="loading">

    <div v-if='!posts1.length' class='mt-24'>
      <a-empty description='' />
    </div>

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
              :key="posts1.id"
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
const route = useRoute()

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
const posts1 = computed(
  () => result.value?.list_japanese_posts_by_goal_root || []
)

type Post = PostsByGoalRoot_list_japanese_posts_by_goal_root

const gridData = computed(() => {
  // Build chuck of posts
  let chuck: any[] = []
  for (let i = 0; i < posts1.value.length; i += chuckSize.value) {
    chuck.push(posts1.value.slice(i, i + chuckSize.value))
  }

  const grid: Post[][] = []

  for (let i = 0; i < chuck.length; i++) {
    for (let j = 0; j < chuckSize.value; j++) {
      const _posts = chuck[i][j]
      if (_posts) {
        if (!grid[j]) grid[j] = []
        grid[j].push(_posts)
      }
    }
  }
  return grid
})
</script>

<style></style>
