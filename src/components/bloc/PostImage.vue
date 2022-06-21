<template>
  <a-image
    :src="$cdn(image)"
    alt=""
    class="w-full h-full object-cover transform animate hover:scale-105"
  />
</template>

<script setup lang='ts'>
import { PostsByGoalRoot_list_japanese_posts_by_goal_root } from '#smileeye/queries/__generated__/PostsByGoalRoot'
import { computed } from 'vue'

const props = defineProps<{
  post: PostsByGoalRoot_list_japanese_posts_by_goal_root
}>()

const image = computed(() => {
  return `${props.post.more.media[0]}`
})
</script>
