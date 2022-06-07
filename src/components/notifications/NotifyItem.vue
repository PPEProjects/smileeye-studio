<template>
  <div
    class="py-4 border-b border-gray-50 animate px-3 hover:bg-blue-50 bg-white notify-item cursor-pointer animate"
    :class='{
            "opacity-50": notify.readAt
          }'
    :data-notify="notify.id"
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
        <div class="overflow-hidden text-sm relative line-clamp-2 text-gray-600" v-html='notify.content' />
        <span class="text-xs font-semibold text-gray-600">
                {{ dayjs(notify.createdAt).fromNow()}}
              </span>
      </div>
    </div>
  </div>
</template>

<script lang='ts' setup>
defineProps({
  notify: {
    type: Object,
    required: true
  }
})
// Time format
import { useDayjs } from '@composables/useDayjs'

const dayjs = useDayjs()
</script>
