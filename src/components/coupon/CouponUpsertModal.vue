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
      @finish="mutate({ input: buildForm() })"
    >
      <a-form-item
        :label="t('coupon.code')"
        name="code"
        :rules="[
          {
            required: true,
            message: t('form.validate.required', {
              field: t('coupon.code')
            })
          }
        ]"
      >
        <a-input v-model:value.trim="formState.code" />
      </a-form-item>

      <a-form-item
        :label="t('coupon.percent')"
        name="sale_percent"
        :rules="[
          {
            required: true,
            message: t('form.validate.required', {
              field: t('coupon.percent')
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

      <a-form-item :label="t('coupon.limit')" name="limit">
        <a-input-number
          v-model:value="formState.limit"
          style="width: 100%"
          :min="1"
        />
      </a-form-item>

      <a-form-item :label="t('coupon.expiryDate')" name="limit">
        <a-date-picker
          v-model:value="formState.expiry_date"
          :placeholder="t('coupon.placeholder.expiry_date')"
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
            {{ t(formState.id ? 'button.update' : 'button.addNew') }}
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
import { SortCoupons_sort_coupons_data } from '#smileeye/queries/__generated__/SortCoupons'
import { useLangs } from '@composables/useLangs'
import { Dayjs } from 'dayjs'
import { useDayjs } from '@composables/useDayjs'
import { useEmitter } from '@nguyenshort/vue3-mitt'
import { UpsertCouponInput } from '#schema/smileeyeTypes'

const { t } = useLangs()

// Modal
const modal = ref<any>(null)

// disbale form
const dayjs = useDayjs()
const disabledDate = (current: Dayjs) => {
  // Can not select days before today and today
  return current && current < dayjs().endOf('day')
}

// Form data
const formState = reactive<Partial<SortCoupons_sort_coupons_data>>({
  id: '',
  code: '',
  limit: 1,
  sale_percent: 1,
  expiry_date: ''
})

const buildData = (data: SortCoupons_sort_coupons_data) => {
  formState.id = data.id
  formState.code = data?.code || ''
  formState.limit = data?.limit || 1
  formState.sale_percent = data?.sale_percent || 1
  formState.expiry_date = data?.expiry_date || ''
}

// Event hook
const emitter = useEmitter<{
  afterUpsertCoupon: SortCoupons_sort_coupons_data
}>()

// Upsert
const buildForm = (): UpsertCouponInput => {
  const _form = Object.assign({}, formState)
  delete _form.id
  return _form as UpsertCouponInput
}
const { loading, mutate } = useMutation<UpsertCoupon, UpsertCouponVariables>(
  UPSERT_COUPON,
  {
    update: (proxy, { data }) => {
      // failse => dừng
      if (!data?.upsert_coupon) {
        return
      }
      emitter.emit('afterUpsertCoupon', data.upsert_coupon)
      // đóng modal
      modal.value?.dispose()
    }
  }
)
</script>
