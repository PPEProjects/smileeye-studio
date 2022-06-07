<template>
  <a-spin :spinning="loading">
    <div
      class="py-4 border-b border-gray-50 animate px-3 hover:bg-blue-50 bg-white notify-item cursor-pointer animate"
      :class="{
        'opacity-50': notify.readAt
      }"
      :data-notify="notify.id"
      @click="readNotifiesHandle"
    >
      <div class="flex">
        <div class="relative flex-shrink-0 h-[56px]">
          <div
            class="w-[56px] h-full rounded-full overflow-hidden relative border-2 border-white shadow box-border"
          >
            <img
              class="img-full animate hover:scale-110 transform"
              data-src="https://i.imgur.com/kOBjC4x.jpg"
              src="https://i.imgur.com/kOBjC4x.jpg"
              alt=""
            />
          </div>
        </div>
        <div class="ml-3 text-left">
          <div
            class="overflow-hidden text-sm relative line-clamp-2 text-gray-600"
            v-html="notify.content"
          />
          <span class="text-xs font-semibold text-gray-600">
            {{ dayjs(notify.createdAt).fromNow() }}
          </span>
        </div>
      </div>
    </div>
  </a-spin>
</template>

<script lang="ts" setup>
import { useMutation } from '@vue/apollo-composable'
import {
  ReadNotifies,
  ReadNotifiesVariables
} from '#notify/mutations/__generated__/ReadNotifies'
import { READ_NOTIFIES } from '#notify/mutations/notifies.mutation'
import { ApolloEnum } from '@plugins/apollo'
import { useUserStore } from '@store/user'
// Time format
import { useDayjs } from '@composables/useDayjs'

const useUser = useUserStore()

const dayjs = useDayjs()

const props = defineProps({
  notify: {
    type: Object,
    required: true
  }
})

// Read notify
const { mutate: readNotify, loading } = useMutation<
  ReadNotifies,
  ReadNotifiesVariables
>(READ_NOTIFIES, {
  clientId: ApolloEnum.notify
})

const readNotifiesHandle = () => {
  readNotify({
    input: {
      user: String(useUser.user?.id),
      ids: [props.notify.id]
    }
  })
}
</script>
