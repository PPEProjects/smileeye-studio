<template>
  <teleport-view to="#title">
    <div class="h-[70px] flex items-center">
      {{ t('users.label') }}

      <template v-if="$route.name.includes('users-id-goals-goalID-')">
        <tabs-animation
          active="._active"
          tag="div"
          auto
          tab=".user-tab"
          direction="horizontal"
          class="flex items-center h-full"
        >
          <router-link
            class="ml-3 block user-tab px-2"
            :class="{
              'user-tab-active _active':
                $route.name === 'users-id-goals-goalID-detail'
            }"
            :to="{
              name: 'users-id-goals-goalID-detail',
              params: $route.params
            }"
          >
            {{ t('users.goal.info') }}
          </router-link>

          <router-link
            class="block ml-3 user-tab px-2"
            :class="{
              _active: $route.name === 'users-id-goals-goalID-posts'
            }"
            :to="{
              name: 'users-id-goals-goalID-posts',
              params: $route.params
            }"
          >
            {{ t('users.goal.activity') }}
          </router-link>
        </tabs-animation>
      </template>
    </div>
  </teleport-view>
</template>

<script lang="ts" setup>
import TabsAnimation from '@components/includes/TabsAnimation.vue'
import { useLangs } from '@composables/useLangs'
const { t } = useLangs()
</script>
