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
    <export-excel-button :columns='columns' :query='query' />
  </teleport-view>

  <payment-table :key='$route.fullPath' />

  <upsert-payment-modal />

</template>

<script lang="ts" setup>
import { computed, defineAsyncComponent, reactive } from 'vue'

const PaymentTable = defineAsyncComponent(() => import('@components/payment/PaymentTable.vue'))
const UpsertPaymentModal = defineAsyncComponent(() => import('@components/payment/UpsertPaymentModal.vue'))
const TabsAnimation = defineAsyncComponent(() => import('@components/includes/TabsAnimation.vue'))
const TeleportView = defineAsyncComponent(() => import('@components/layout/TeleportView.vue'))
const ExportExcelButton = defineAsyncComponent(() => import('@components/includes/ExportExcelButton.vue'))

import { GET_PAYMENT_BY_DAY } from '#smileeye/queries/payment.query'

const query = computed(() => GET_PAYMENT_BY_DAY)

import { useI18n } from 'vue-i18n'
import { IExcelColumn } from '@utils/excel'
const { t } = useI18n()

const columns = reactive<IExcelColumn[]>([
  {
    label: t('user.name'),
    value: ['user_info', 'name']
  },
  {
    label: t('user.email'),
    value: ['user_info', 'email']
  },
  {
    label: t('user.phone'),
    value: ['user_info', 'user_phone']
  },
  {
    label: t('goal.name') + ' Goal',
    value: ['goal', 'name']
  },
  {
    label: t('payment.price'),
    value: ['goal', 'price']
  },
  {
    label: t('payment.referral'),
    value: 'referral'
  },
  {
    label: t('coupon.label'),
    value: 'code_sale'
  },
  {
    label: t('payment.money'),
    value: 'money'
  },
  {
    label: t('payment.note'),
    value: 'note'
  },
  {
    label: t('payment.billImage'),
    value: ['attachments', '0']
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
