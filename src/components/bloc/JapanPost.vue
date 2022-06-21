<template>
  <div class="bg-white py-3 overflow-hidden">
    <div class="px-3.5 mb-2">
      <div class="flex justify-between">
        <h2
          class="font-medium text-gray-600 flex-shrink-0 line-clamp-1 text-[14px] mb-0"
        >
          {{ post.title }}
        </h2>

        <a-popover v-model:visible="visible" title="Tuỳ Chỉnh" trigger="click">
          <template #content>
            <a class='text-rose-500 hover:text-rose-500' @click="hide">
              <delete-outlined class='mr-1' />
              Xoá
            </a>
          </template>

          <button>
            <more-outlined />
          </button>

        </a-popover>

      </div>
      <div class="text-xs text-gray-500">
        {{ dayjs(post.created_at).fromNow() }}
      </div>
    </div>


    <div class="overflow-hidden empty:-mb-3">
      <div v-for='(content, index) in post.more?.media' :key='index'>
        <template v-if='typeof content === "string"'>
          <post-image :image="content" />
        </template>
        <template v-else-if='typeof content === "object"'>
          <post-video :video="content.file" />
        </template>

      </div>
    </div>

    <div
      class='flex mt-3'
      :class='{
        "flex-col-reverse": post.type === "diary",
        "flex-col": post.type === "post"
      }'
    >
      <div class="px-3.5 mt-1">
        <div class="text-gray-500">
          <div class="flex">
            <message-outlined />
            <div class="ml-1 text-[12px]">{{ Object.keys(comments).length }}</div>
          </div>
        </div>
      </div>

      <div class="px-3.5 mt-1">
        <p
          class="line-clamp-3 text-gray-500 text-[13px] mb-0"
          v-html="post.more?.content?.trim()"
        ></p>
      </div>
    </div>

  </div>
</template>

<script lang="ts" setup>
import { ref as dbRef, onValue } from 'firebase/database'
import { useFireRTDB } from '@composables/useFirebase'
import { MoreOutlined, MessageOutlined, DeleteOutlined } from '@ant-design/icons-vue'

import { PostsByGoalRoot_list_japanese_posts_by_goal_root } from '#smileeye/queries/__generated__/PostsByGoalRoot'
import { useDayjs } from '@composables/useDayjs'
import { ref } from 'vue'
import PostVideo from '@components/bloc/PostVideo.vue'
import PostImage from '@components/bloc/PostImage.vue'

const dayjs = useDayjs()

type PostUnion = Partial<PostsByGoalRoot_list_japanese_posts_by_goal_root> & {
  type: string
}

const props = defineProps<{
  post: PostUnion
}>()

const comments = ref<any[]>([])

const starCountRef = dbRef(useFireRTDB(), 'comments/' + props.post.id + '/list')
onValue(starCountRef, (snapshot) => {
  const data = snapshot.val()
  data && (comments.value = data)
})


const visible = ref<boolean>(false);

const hide = () => {
  visible.value = false;
};
</script>
