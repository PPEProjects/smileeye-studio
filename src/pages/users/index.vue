<template>
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
import { useI18n } from 'vue-i18n'
import { defineAsyncComponent } from 'vue'

const UpdateUserModal = defineAsyncComponent(() => import('@components/users/UpdateUserModal.vue'))
const EditRuleModal = defineAsyncComponent(() => import('@components/users/EditRuleModal.vue'))
const UsersTable = defineAsyncComponent(() => import('@components/users/UsersTable.vue'))
const TabsAnimation = defineAsyncComponent(() => import('@components/includes/TabsAnimation.vue'))

const { t } = useI18n()
</script>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'UsersPage'
})
</script>
