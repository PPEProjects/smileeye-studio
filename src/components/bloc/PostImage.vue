<template>
  <a-image
    :src="$cdn(image)"
    alt=""
    class="w-full h-full object-cover transform animate hover:scale-105"
  />
</template>

<script setup lang='ts'>
defineProps<{
  image: string
}>()
</script>
