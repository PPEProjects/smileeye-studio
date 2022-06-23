<template>
  <a-spin :spinning='loading || loadingDelete'>
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
              <a class="text-rose-500 hover:text-rose-500" @click="deleteHandle">
                <delete-outlined class="mr-1" />
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
        <div v-for="(content, index) in post.more?.media" :key="index">
          <template v-if="typeof content === 'string'">
            <post-image :image="content" />
          </template>
          <template v-else-if="typeof content === 'object'">
            <post-video :video="content.file" />
          </template>
        </div>
      </div>

      <div
        class="flex mt-3"
        :class="{
        'flex-col-reverse': post.type === 'diary',
        'flex-col': post.type === 'post'
      }"
      >
        <div class="px-3.5 mt-1">
          <div class="text-gray-500">
            <div class="flex">
              <message-outlined />
              <div class="ml-1 text-[12px]">
                {{ Object.keys(comments).length }}
              </div>
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
  </a-spin>
</template>

<script lang="ts" setup>
import { defineAsyncComponent, ref } from 'vue'

import { ref as dbRef, onValue } from 'firebase/database'
import { useFireRTDB } from '@composables/useFirebase'
import {
  MoreOutlined,
  MessageOutlined,
  DeleteOutlined
} from '@ant-design/icons-vue'

const PostVideo = defineAsyncComponent(() => import('@components/bloc/PostVideo.vue'))
const PostImage = defineAsyncComponent(() => import('@components/bloc/PostImage.vue'))

import { PostsByGoalRoot_list_japanese_posts_by_goal_root } from '#smileeye/queries/__generated__/PostsByGoalRoot'
import { useDayjs } from '@composables/useDayjs'
import { useMutation } from '@vue/apollo-composable'
import {
  DeletePosts,
  DeletePostsVariables
} from '#smileeye/mutations/__generated__/DeletePosts'
import { DELETE_DIARY, DELETE_POST } from '#smileeye/mutations/post.mutation'
import { useSmileeye } from '#apollo/client/smileeye'
import { DeleteShare, DeleteShareVariables } from '#smileeye/mutations/__generated__/DeleteShare'

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

const visible = ref<boolean>(false)


// Delete
const { mutate: deletePost, loading } = useMutation<DeletePosts, DeletePostsVariables>(
  DELETE_POST,
  {
    variables: {
      input: {
        id: String(props.post.id)
      }
    }
  }
)
const { mutate: deleteDiary, loading: loadingDelete } = useMutation<DeleteShare, DeleteShareVariables>(
  DELETE_DIARY,
  {
    variables: {
      id: String(props.post.id)
    }
  }
)

const smileeye = useSmileeye()

const deleteHandle = async () => {
  visible.value = false
  //
  if(props.post.type === 'post') {
     await deletePost()
  } else {
    // delete story share
    await deleteDiary()
  }
  // delete cache
  smileeye.cache.evict({
    id: smileeye.cache.identify(props.post)
  })
}
</script>
