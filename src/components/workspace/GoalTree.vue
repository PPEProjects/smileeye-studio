<template>
  <a-spin :spinning='loading'>
    <goal-node ref="treeRef" class="!ml-0 __goal-tree" :node="tree" />
  </a-spin>
</template>

<script lang="ts" setup>
import { GOAL_TREE } from '#smileeye/queries/goal.query'
import { IGoalNode } from '@components/workspace/types'
import { nextTick, onMounted, provide, ref, watch } from 'vue'
import { useSmileeye } from '#apollo/client/smileeye'
import {
  GetGoalTree,
  GetGoalTreeVariables
} from '#smileeye/queries/__generated__/GetGoalTree'
import GoalNode from '@components/workspace/GoalNode.vue'
import { message } from 'ant-design-vue'

const props = defineProps<{
  goal: number
}>()

const tree = ref<IGoalNode[]>([])
const treeBackup = ref<IGoalNode[]>([])
const treeRef = ref()

provide('expanded', ref<string[]>([]))


const loading = ref(false)

const getTree = async () => {
  loading.value = true
  try {
    const { data } = await useSmileeye().query<
      GetGoalTree,
      GetGoalTreeVariables
    >({
      query: GOAL_TREE,
      variables: {
        goalId: String(props.goal)
      }
    })

    tree.value = [JSON.parse(JSON.stringify(data.my_tree_goal_v2))]
    treeBackup.value = [JSON.parse(JSON.stringify(data.my_tree_goal_v2))]
  } catch (e) {
    //
  }
  loading.value = false
}

await getTree()

watch(
  tree,
  (value) => {
    if (value.length > 1) {
      message.error('The course must be a single goal')
      tree.value = JSON.parse(JSON.stringify(treeBackup.value))
    } else {
      treeBackup.value = JSON.parse(JSON.stringify(tree.value))
    }
  },
  // fix
  { deep: true }
)

onMounted(() =>
  nextTick(() => {
    document
      .querySelector<HTMLLabelElement>(
        '.__goal-tree > .goal-node-item > .goal-node-content > .__expand-button'
      )
      ?.click()
  })
)

</script>

<style>
.__goal-tree > div > .goal-node-content .line-horizontal {
  display: none;
}

.__goal-tree .sortable-drag > .goal-node-content > .line-horizontal, .__goal-tree .sortable-drag > .goal-node-content:before, .__goal-tree .sortable-drag > .goal-node-content:before, .__goal-tree .sortable-drag > .goal-node-content:after, .__goal-tree .sortable-drag > .goal-node-content > .__expand-button {
  display: none;
  opacity: 0;
  visibility: hidden;
}
</style>
