<template>
  <teleport-view to="#title">
    {{ template.goal?.name }}
  </teleport-view>
</template>

<script lang="ts" setup>
import TeleportView from '@components/layout/TeleportView.vue'
import { GOAL_INFO } from '#smileeye/queries/goal.query'
import { useQuery } from '@vue/apollo-composable'
import {
  InfoGoalTemplate,
  InfoGoalTemplate_info_goal_template,
  InfoGoalTemplateVariables
} from '#smileeye/queries/__generated__/InfoGoalTemplate'
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const { result, loading } = useQuery<InfoGoalTemplate, InfoGoalTemplateVariables>(
  GOAL_INFO,
  {
    id: String(route.params.id)
  }
)

const template = computed<InfoGoalTemplate_info_goal_template>(() => result.value?.info_goal_template || {} as InfoGoalTemplate_info_goal_template)

console.log(loading, template)
</script>
