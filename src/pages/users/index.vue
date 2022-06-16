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

      <tabs-animation active='._active' tag='div' auto tab='.user-tab' direction='horizontal' class='flex items-center h-full'>
        <router-link
          to="/users"
          class="ml-3 block user-tab px-2"
          :class='{
            "user-tab-active _active": !$route.query.group
          }'
        >
          {{ t('users.tab.list') }}
        </router-link>

        <router-link
          to="/users?group=supporters"
          class="block ml-3 user-tab px-2"
          :class='{
            "_active": $route.query.group === "supporters"
          }'
        >
          {{ t('users.tab.supporters') }}
        </router-link>
      </tabs-animation>
    </div>
  </teleport-view>

  <users-table />

  <update-user-modal />
  <edit-rule-modal />

</template>

<script lang="ts" setup>
import { PlusOutlined } from '@ant-design/icons-vue'
import UpdateUserModal from '@components/users/UpdateUserModal.vue'
import EditRuleModal from '@components/users/EditRuleModal.vue'
import UsersTable from '@components/users/UsersTable.vue'
import { useLangs } from '@composables/useLangs'
import TabsAnimation from '@components/includes/TabsAnimation.vue'

const { t } = useLangs()

</script>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'UsersPage'
})
</script>
