<template>
  <teleport-view to="#title">
    <div class="h-[70px] flex items-center">
      {{ t('payment.title') }}

      <tabs-animation active='._active' tag='div' auto tab='.user-tab' direction='horizontal' class='flex items-center h-full'>
        <router-link
          to="/payment"
          class="ml-3 block user-tab px-2"
          :class='{
            "user-tab-active _active": !$route.query.status
          }'
        >
          {{ t('payment.status.all') }}
        </router-link>

        <router-link
          to="/payment?status=trial"
          class="block ml-3 user-tab px-2"
          :class='{
            "_active": $route.query.status === "trial"
          }'
        >
          {{ t('payment.status.trial') }}
        </router-link>

        <router-link
          to="/payment?status=in_need"
          class="block ml-3 user-tab px-2"
          :class='{
            "_active": $route.query.status === "in_need"
          }'
        >
          {{ t('payment.status.wanted') }}
        </router-link>

        <router-link
          to="/payment?status=on_buy"
          class="block ml-3 user-tab px-2"
          :class='{
            "_active": $route.query.status === "on_buy"
          }'
        >
          {{ t('payment.status.onBuy') }}
        </router-link>


        <router-link
          to="/payment?status=paid_confirmed"
          class="block ml-3 user-tab px-2"
          :class='{
            "_active": $route.query.status === "paid_confirmed"
          }'
        >
          {{ t('payment.status.confirmed') }}
        </router-link>

      </tabs-animation>
    </div>
  </teleport-view>

  <teleport-view to='#actions'>
    <export-excel-button :columns='columns' />
  </teleport-view>

  <payment-table :key='$route.fullPath' />
  <upsert-payment-modal />
</template>

<script lang="ts" setup>
import PaymentTable from '@components/payment/PaymentTable.vue'
import UpsertPaymentModal from '@components/payment/UpsertPaymentModal.vue'

import TabsAnimation from '@components/includes/TabsAnimation.vue'
import TeleportView from '@components/layout/TeleportView.vue'

import { useLangs } from '@composables/useLangs'
import ExportExcelButton from '@components/includes/ExportExcelButton.vue'
import { reactive } from 'vue'
const { t } = useLangs()

const columns = reactive([
  {
    label: t('user.name'),
    value: 'name'
  },
  {
    label: t('user.email'),
    value: 'email'
  },
  {
    label: t('user.phone'),
    value: 'user_phone'
  },
  {
    label: t('goal.name'),
    value: 'goal'
  },
  {
    label: t('payment.price'),
    value: 'price'
  },
  {
    label: t('payment.billImage'),
    value: 'billImage'
  },
  {
    label: t('payment.status.title'),
    value: 'status'
  },
  {
    label: t('payment.createdAt'),
    value: 'created_at'
  }
])

</script>
