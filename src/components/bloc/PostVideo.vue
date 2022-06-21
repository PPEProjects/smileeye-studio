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
import { computed } from 'vue'

const props = defineProps<{
  video: string
}>()
const iframe = computed(() => {
  return `${props.video}?autoplay=false`
})

</script>
