<template>
<!--
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
  </teleport-view>-->

  <teleport-view to="#title">
    <div class="h-[70px] flex items-center">
      {{ t('goals.title') }}
      <tabs-animation active='._active' tag='div' auto tab='.goal-tab' direction='horizontal' class='flex items-center h-full'>
        <router-link
            to="/goals"
            class="ml-3 block user-tab px-2"
            :class='{
            "user-tab-active _active": !$route.query.group
          }'
        >
          {{ t('goals.tab.list') }}
        </router-link>
        <router-link
            to="/goals?group=sell-request"
            class="block ml-3 user-tab px-2"
            :class='{
            "_active": $route.query.group === "sell-request"
          }'
        >
          {{ t('goals.tab.sell_request') }}
        </router-link>
      </tabs-animation>
    </div>
  </teleport-view>

  <goals-table/>
</template>

<script lang="ts" setup>
import { useLangs } from '@composables/useLangs'
import GoalsTable from '@components/goals/GoalsTable.vue'
import TeleportView from "@components/layout/TeleportView.vue";
import TabsAnimation from "@components/includes/TabsAnimation.vue";

const { t } = useLangs()
</script>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'GoalsPage'
})
</script>