<template>

  <coupon-table @edit='buildUpsertModal($event)' />

  <teleport-view to="#actions">
    <a-button
      type="primary"
      size="large"
      class="uppercase"
      :loading="loading"
      @click="buildUpsertModal"
    >
      <template #icon>
        <plus-outlined />
      </template>
      {{ t('coupon.action.add') }}
    </a-button>
  </teleport-view>

  <!-- Model Upser -->
  <modal-base
    ref="modal"
    title="Custom Coupon"
    event="upsertCoupon"
    :max-width="450"
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
          value-format="YYYY-MM-DD HH:mm:ss"
        />
      </a-form-item>

      <a-form-item>
        <div class="flex">
          <a-button type="primary" class="ml-auto" html-type="submit" :loading='loading'>
            {{ t('coupon.form.button.add') }}
          </a-button>
        </div>
      </a-form-item>
    </a-form>
  </modal-base>
  <!-- End Modal -->
</template>

<script lang="ts" setup>
import { PlusOutlined } from '@ant-design/icons-vue'
import { useLangs } from '@composables/useLangs'
import CouponTable from '@components/coupon/CouponTable.vue'
import { reactive, ref } from 'vue'
import { useMutation } from '@vue/apollo-composable'
import {
  UpsertCoupon,
  UpsertCouponVariables
} from '#smileeye/mutations/__generated__/UpsertCoupon'
import { UPSERT_COUPON } from '#smileeye/mutations/coupon.mutation'
import ModalBase from '@components/modal/ModalBase.vue'
import { SortCoupons_sort_coupons_data } from '#smileeye/queries/__generated__/SortCoupons'
const { t } = useLangs()

// Form data
interface FormState {
  code: string
  limit: number
  sale_percent: number
  expiry_date: string
}

const formState = reactive<FormState>({
  code: '',
  limit: 1,
  sale_percent: 1,
  expiry_date: ''
})

// Modal
const modal = ref<any>(null)
const buildUpsertModal = (data: SortCoupons_sort_coupons_data) => {
  formState.code = data?.code || ''
  formState.limit = data?.limit || 1
  formState.sale_percent = data?.sale_percent || 1
  formState.expiry_date = data?.expiry_date || ''
  modal.value?.init()
}

// Upsert
const { loading, mutate } = useMutation<UpsertCoupon, UpsertCouponVariables>(
  UPSERT_COUPON,
  {
    onQueryUpdated() {
      modal.value?.dispose()
    }
  }
)
</script>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'CouponPage'
})
</script>

<style>
#upsertCouponContent {
  margin-bottom: -30px;
}
</style>
