<template>

  <teleport-view to="#actions">
    <a-button
      type="primary"
      size="large"
      class="uppercase"
      @click="$emitter.emit('upsertPaymentModal')"
    >
      <template #icon>
        <plus-outlined />
      </template>
      add user
    </a-button>
  </teleport-view>

  <teleport-view to="#title">
    <div class="h-[70px] flex items-center">
      {{ t('users.title') }}

      <router-link
        to="/users/list"
        class="user-tab"
        :class='{
          "before:bg-primary-500 text-primary-500": $route.path === "/users/list",
          "text-gray-400": $route.path !== "/users/list"
        }'
      >
        {{ t('users.tab.list') }}
      </router-link>

      <router-link
        to="/users/supporters"
        class="user-tab"
        :class='{
          "before:bg-primary-500": $route.path === "/users/supporters",
          "text-gray-400": $route.path !== "/users/supporters"
        }'
      >
        {{ t('users.tab.supporters') }}
      </router-link>
    </div>
  </teleport-view>
  <router-view />
</template>

<script lang="ts" setup>
import TeleportView from '@components/layout/TeleportView.vue'
import { PlusOutlined } from '@ant-design/icons-vue'
import { useLangs } from '@composables/useLangs'

const { t } = useLangs()
</script>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'UserPage'
})
</script>

<style>
.user-tab {
  @apply ml-4 h-full flex items-center relative before:absolute before:left-0 before:right-0 before:bottom-0 before:h-1 before:transition before:duration-300
}
</style>
