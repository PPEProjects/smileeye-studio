<template>
  <template v-if='!user || loading'>
    <div class='__user-placeholder bg-white'></div>
    <user-placeholder />
  </template>

  <template v-else>
    <teleport-view to="#title">
      <div class="h-[70px] flex items-center">
        {{ user.name }}
      </div>
    </teleport-view>


    <div class='flex __user-container'>

      <user-info class='w-[350px] flex-shrink-0 h-full bg-white' :user='user' ></user-info>

      <div class='w-auto flex-shrink-0 bg-white h-full __tab'></div>

    </div>

  </template>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
import { useQuery } from '@vue/apollo-composable'
import {
  DetailUser,
  DetailUserVariables
} from '#smileeye/queries/__generated__/DetailUser'
import { DETAIL_USER } from '#smileeye/queries/user.query'
import TeleportView from '@components/layout/TeleportView.vue'
import { computed } from 'vue'
import UserPlaceholder from '@components/user/UserPlaceholder.vue'
import UserInfo from '@components/user/UserInfo.vue'

const route = useRoute()

// deep cache user
const { result, loading } = useQuery<DetailUser, DetailUserVariables>(
  DETAIL_USER,
  {
    id: route.params.id as string
  }
)

const user = computed(() => result.value?.detail_user)
</script>

<style>
#users-\:id\(\\d\+\) #page-content {
  padding: 0;
  background: transparent;
}

.__user-container ._info, .__user-placeholder, .__user-container .__tab {
  min-height: var(--height-container);
}

.__user-container .__tab{
  margin-left: 30px;
  width: calc(100% - 380px);
}
</style>
