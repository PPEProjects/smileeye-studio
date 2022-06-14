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
        class="user-tab ml-3"
        :class='{
          "user-tab-active": $route.path === "/users/list",
          "text-gray-400": $route.path !== "/users/list"
        }'
        active-class='_active'
      >
        {{ t('users.tab.list') }}
      </router-link>

      <router-link
        to="/users/supporters"
        class="user-tab"
        :class='{
          "user-tab-active": $route.path === "/users/supporters",
          "text-gray-400": $route.path !== "/users/supporters"
        }'
        active-class='_active'
      >
        {{ t('users.tab.supporters') }}
      </router-link>
    </div>
  </teleport-view>
  <router-view />

  <update-user-modal />
  <edit-rule-modal />

</template>

<script lang="ts" setup>
import TeleportView from '@components/layout/TeleportView.vue'
import { PlusOutlined } from '@ant-design/icons-vue'
import { useLangs } from '@composables/useLangs'
import EditRuleModal from '@components/users/EditRuleModal.vue'
import UpdateUserModal from '@components/users/UpdateUserModal.vue'

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
  @apply h-full flex items-center relative before:absolute before:left-0 before:right-0 before:bottom-0 before:h-1 before:transition before:duration-300 px-3
}

.user-tab-active {
  @apply before:bg-primary-500 text-primary-500 bg-primary-50
}
</style>
