<template>
  <a-spin :spinning="loading">
    <div v-if="!posts.length" class="mt-24">
      <a-empty description="" />
    </div>

    <div ref="el" class="flex -mx-8">
      <div
        v-for="(group, index) in gridData"
        :key="`${index}-${posts.length}`"
        class="px-3"
        :style="{ width: `${100 / gridData.length}%` }"
      >
        <div
          v-for="(post, index2) in group"
          :key="index2"
          class="mb-6 shadow-lg shadow-gray-100"
        >
          <japan-post
            :key="posts.id"
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
  PostsByGoalRoot_list_japanese_posts_by_goal_root,
} from '#smileeye/queries/__generated__/PostsByGoalRoot'
import { computed, ref } from 'vue'
import { DetailUser_detail_user } from '#smileeye/queries/__generated__/DetailUser'
import { useElementSize } from '@vueuse/core'
import JapanPost from '@components/bloc/JapanPost.vue'
import {
  ListPostsAndDiary, ListPostsAndDiary_list_posts_and_diary_StoryShare,
  ListPostsAndDiaryVariables
} from '#smileeye/queries/__generated__/ListPostsAndDiary'
import { GET_POST_BOTH } from '#smileeye/queries/goal.query'
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
// New API
const { result: queryData, loading } = useQuery<
  ListPostsAndDiary,
  ListPostsAndDiaryVariables
>(GET_POST_BOTH, {
  userId: String(route.params.id),
  goalRootId: String(route.params.goalID)
})

type PostUnion = Partial<PostsByGoalRoot_list_japanese_posts_by_goal_root> & {
  type: string
}

function hasKey(post: any, key: string) {
  return Object.prototype.hasOwnProperty.call(post, key)
}

// <PostUnion[]>
const posts = computed<PostUnion[]>(() =>
  (queryData.value?.list_posts_and_diary || []).map((post) => {

    const _post: PostUnion = {} as PostUnion

    _post.id = post?.id
    _post.type = hasKey(post, 'content') ? 'diary' : 'post'

    if(_post.type === 'post') {
      Object.assign(_post, post)
      _post.type = 'post'
    } else {
      // post diary
      const postDiary = post as ListPostsAndDiary_list_posts_and_diary_StoryShare
      _post.title = postDiary.goal?.name
      _post.created_at = postDiary.created_at
      _post.more = {
        content: postDiary.content,
      }
    }

    // Type data
    _post.__typename = post?.__typename as "JapanesePost" | undefined

    return _post

  })
)


const gridData = computed<PostUnion[][]>(() => {
  // Build chuck of posts
  let chuck: any[] = []
  for (let i = 0; i < posts.value.length; i += chuckSize.value) {
    chuck.push(posts.value.slice(i, i + chuckSize.value))
  }

  const grid: PostUnion[][] = []

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

<style>
#users-id-goals-goalID-posts .__user-container .__tab {
  background: transparent;
}
</style>
