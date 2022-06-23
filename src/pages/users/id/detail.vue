<template>
  <div ref="container" class="w-full pt-6">
    <goal-tree :goal='Number($route.params.goalID)' class='mt-4' />
  </div>

</template>

<script lang="ts" setup>
const GoalTree = defineAsyncComponent(() => import('@components/workspace/GoalTree.vue'))

import { DetailUser_detail_user } from '#smileeye/queries/__generated__/DetailUser'
import { defineAsyncComponent } from 'vue'

defineProps<{
  user: DetailUser_detail_user
}>()
</script>
