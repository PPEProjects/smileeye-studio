<template>
  <div class="bg-white py-3 overflow-hidden">
    <div class="px-3.5 mb-2">
      <div class="flex justify-between">
        <h2
          class="font-medium text-gray-600 flex-shrink-0 line-clamp-1 text-[14px] mb-0"
        >
          {{ post.title }}
        </h2>

        <button>
          <more-outlined />
        </button>
      </div>
      <div class="text-xs text-gray-500">
        {{ dayjs(post.created_at).fromNow() }}
      </div>
    </div>

    <!-- Dinamic content 310 / 220 -->

    <div class="overflow-hidden">
      <template v-if='hasContent("video")'>
        <post-video :post='post' />
      </template>
      <template v-else-if='hasContent("media")'>
        <post-image :post='post'/>
      </template>
    </div>

    <div class="px-3.5 mt-4">
      <div class="text-gray-500">
        <div class="flex">
          <message-outlined />
          <div class="ml-1 text-[12px]">{{ Object.keys(comments).length }}</div>
        </div>
      </div>
    </div>

    <div class="px-3.5 mt-1">
      <p class="line-clamp-3 text-gray-500 text-[13px] mb-0">
        {{ post.more.content }}
      </p>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref as dbRef, onValue } from 'firebase/database'
import { useFireRTDB } from '@composables/useFirebase'
import { MoreOutlined, MessageOutlined } from '@ant-design/icons-vue'

import { PostsByGoalRoot_list_japanese_posts_by_goal_root } from '#smileeye/queries/__generated__/PostsByGoalRoot'
import { useDayjs } from '@composables/useDayjs'
import { ref } from 'vue'
import PostVideo from '@components/bloc/PostVideo.vue'
import PostImage from '@components/bloc/PostImage.vue'

const dayjs = useDayjs()

const props = defineProps<{
  post: PostsByGoalRoot_list_japanese_posts_by_goal_root
}>()

const comments = ref<any[]>([])

const starCountRef = dbRef(useFireRTDB(), 'comments/' + props.post.id + '/list')
onValue(starCountRef, (snapshot) => {
  const data = snapshot.val()
  data && (comments.value = data)
})

const hasContent = (key: string) => {
  if(!props.post.more) {
    return false
  }
  return Object.prototype.hasOwnProperty.call(props.post.more, key)
}
</script>
