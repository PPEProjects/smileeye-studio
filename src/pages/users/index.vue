<template>
<!--  <teleport-view to="#actions">
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
  </teleport-view>-->

  <teleport-view to="#title">
    <div class="h-[70px] flex items-center">
      {{ t('users.label') }}

      <tabs-animation
        active="._active"
        tag="div"
        auto
        tab=".user-tab"
        direction="horizontal"
        class="flex items-center h-full"
      >
        <router-link
          to="/users"
          class="ml-3 block user-tab px-2"
          :class="{
            'user-tab-active _active': !$route.query.group
          }"
        >
          {{ t('users.tab.all') }}
        </router-link>

        <router-link
          to="/users?group=supporter"
          class="block ml-3 user-tab px-2"
          :class="{
            _active: $route.query.group === 'supporter'
          }"
        >
          {{ t('users.tab.supporters') }}
        </router-link>
      </tabs-animation>
    </div>
  </teleport-view>

  <users-table :key="$route.fullPath" />

  <update-user-modal />
  <edit-rule-modal />
</template>

<script lang="ts" setup>
import UpdateUserModal from '@components/users/UpdateUserModal.vue'
import EditRuleModal from '@components/users/EditRuleModal.vue'
import UsersTable from '@components/users/UsersTable.vue'
import TabsAnimation from '@components/includes/TabsAnimation.vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
</script>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'UsersPage'
})
</script>
