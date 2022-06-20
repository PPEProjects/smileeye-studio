<template>
  <iframe
    ref="el"
    :src="iframe"
    class='w-full'
    loading="lazy"
    allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture;"
    allowFullScreen
  ></iframe>
</template>

<script setup lang="ts">
import { PostsByGoalRoot_list_japanese_posts_by_goal_root } from '#smileeye/queries/__generated__/PostsByGoalRoot'
import { computed } from 'vue'
/*import { useElementHover } from '@vueuse/core'
import { useAnime } from '@composables/useAnime'*/

// const el = ref()
//const isHovered = useElementHover(el)

const props = defineProps<{
  post: PostsByGoalRoot_list_japanese_posts_by_goal_root
}>()

const iframe = computed(() => {
  return `${props.post.more.video[0].file}?autoplay=false`
})

// const anime = useAnime()
/*watch(isHovered, () => {
  anime({
    targets: el.value,
    opacity: [0, 1],
    duration: 300
  })
})*/

</script>
