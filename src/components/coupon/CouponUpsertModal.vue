<template>
  <modal-base
    ref="modal"
    title="Custom Coupon"
    event="upsertCoupon"
    :max-width="450"
    @init="buildData"
  >
    <a-form
      :model="formState"
      name="basic"
      autocomplete="off"
      layout="vertical"
      class="-mb-4"
      @finish="mutate({ input: formState })"
    >
      <a-form-item
        :label="t('coupon.form.code.label')"
        name="code"
        :rules="[
          {
            required: true,
            message: t('form.validate.required', {
              field: t('coupon.form.code.label')
            })
          }
        ]"
      >
        <a-input v-model:value.trim="formState.code" />
      </a-form-item>

      <a-form-item
        :label="t('coupon.form.percent.label')"
        name="sale_percent"
        :rules="[
          {
            required: true,
            message: t('form.validate.required', {
              field: t('coupon.form.percent.label')
            })
          }
        ]"
      >
        <a-input-number
          v-model:value="formState.sale_percent"
          style="width: 100%"
          :min="1"
          :max="100"
        />
      </a-form-item>

      <a-form-item :label="t('coupon.form.limit.label')" name="limit">
        <a-input-number
          v-model:value="formState.limit"
          style="width: 100%"
          :min="1"
        />
      </a-form-item>

      <a-form-item :label="t('coupon.form.expiry.label')" name="limit">
        <a-date-picker
          v-model:value="formState.expiry_date"
          placeholder="Select Time"
          style="width: 100%"
          :disabled-date="disabledDate"
          value-format="YYYY-MM-DD HH:mm:ss"
        />
      </a-form-item>

      <a-form-item>
        <div class="flex">
          <a-button
            type="primary"
            class="ml-auto"
            html-type="submit"
            :loading="loading"
          >
            {{ t('coupon.form.button.add') }}
          </a-button>
        </div>
      </a-form-item>
    </a-form>
  </modal-base>
</template>

<script setup lang="ts">
import ModalBase from '@components/modal/ModalBase.vue'
import { reactive, ref } from 'vue'
import { useMutation } from '@vue/apollo-composable'
import {
  UpsertCoupon,
  UpsertCouponVariables
} from '#smileeye/mutations/__generated__/UpsertCoupon'
import { UPSERT_COUPON } from '#smileeye/mutations/coupon.mutation'
import { IFormCouponUpsert } from '@components/coupon/types'
import {
  SortCoupons,
  SortCoupons_sort_coupons_data,
  SortCouponsVariables
} from '#smileeye/queries/__generated__/SortCoupons'
import { useLangs } from '@composables/useLangs'
import { SORT_COUPONS } from '#smileeye/queries/coupon.query'
import { useCouponStore } from '@store/coupon'
import { FilterExpiry } from '#schema/smileeyeTypes'
import { Dayjs } from 'dayjs'
import { useDayjs } from '@composables/useDayjs'

const { t } = useLangs()

// Store
const couponStore = useCouponStore()

// Modal
const modal = ref<any>(null)

// disbale form
const dayjs = useDayjs()
const disabledDate = (current: Dayjs) => {
  // Can not select days before today and today
  return current && current < dayjs().endOf('day');
};

// Form data
const formState = reactive<IFormCouponUpsert>({
  code: '',
  limit: 1,
  sale_percent: 1,
  expiry_date: ''
})

const buildData = (data: SortCoupons_sort_coupons_data) => {
  formState.code = data?.code || ''
  formState.limit = data?.limit || 1
  formState.sale_percent = data?.sale_percent || 1
  formState.expiry_date = data?.expiry_date || ''
}

// Upsert
const { loading, mutate } = useMutation<UpsertCoupon, UpsertCouponVariables>(
  UPSERT_COUPON,
  {
    update: (proxy, { data }) => {
      // failse => dừng
      if (!data?.upsert_coupon) {
        return
      }

      const _index = couponStore.coupons.findIndex((e) => e.code === data.upsert_coupon?.code)
      if(_index === -1) {
        // không có trong page hiện tại => gi vào page 1
        const _cache = proxy.readQuery<SortCoupons, SortCouponsVariables>({
          query: SORT_COUPONS,
          variables: {
            first: 7,
            page: 1,
            expiry: FilterExpiry.all
          }
        })

        proxy.writeQuery<SortCoupons, SortCouponsVariables>({
          query: SORT_COUPONS,
          variables: {
            first: 7,
            page: 1,
            expiry: FilterExpiry.all
          },
          data: {
            sort_coupons: {
              __typename: _cache!.sort_coupons!.__typename,
              info: {
                __typename: couponStore.counter.__typename,
                availability: couponStore.counter.availability! + 1,
                expired: couponStore.counter.expired,
                last_page: couponStore.counter.last_page
              },
              data: [
                data.upsert_coupon,
                ...couponStore.coupons
              ]
            }
          }
        })

      }

      // đóng modal
      modal.value?.dispose()
    }
  }
)
</script>