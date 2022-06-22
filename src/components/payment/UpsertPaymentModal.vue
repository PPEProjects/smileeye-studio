<template>
  <modal-base
    ref="modal"
    event="upsertPaymentModal"
    :title="t('payment.form.upsert.title')"
    :max-width="1000"
    @init="buildForm"
  >
    <a-form
      :model="formState"
      name="basic"
      autocomplete="off"
      layout="vertical"
      class="-mb-4"
      @finish="upsertPayment(buildInput())"
    >
      <div class="flex">
        <div class="w-2/5 flex-shrink-0">
          <a-form-item
            :label="t('payment.form.upsert.name')"
            :name="['user_info', 'name']"
            :rules="[
              {
                required: true,
                message: t('form.validate.required', {
                  field: t('payment.form.upsert.name')
                })
              }
            ]"
          >
            <a-input v-model:value="formState.user_info.name" />
          </a-form-item>

          <a-form-item
            :label="t('payment.form.upsert.email')"
            :name="['user_info', 'email']"
            :rules="[
              {
                required: true,
                message: t('form.validate.required', {
                  field: t('payment.form.upsert.email')
                })
              }
            ]"
          >
            <a-input v-model:value="formState.user_info.email" />
          </a-form-item>

          <a-form-item
            :label="t('payment.form.upsert.phone')"
            :name="['user_info', 'phone_number']"
            :rules="[
              {
                required: true,
                message: t('form.validate.required', {
                  field: t('payment.form.upsert.phone')
                })
              }
            ]"
          >
            <a-input v-model:value="formState.user_info.phone_number" />
          </a-form-item>

          <a-form-item
            :label="t('payment.form.upsert.goal')"
            :name="['goal', 'name']"
            :rules="[
              {
                required: true,
                message: t('form.validate.required', {
                  field: t('payment.form.upsert.goal')
                })
              }
            ]"
          >
            <a-input v-model:value="formState.goal.name" disabled />
          </a-form-item>

          <div class="flex">
            <div class="w-full">
              <a-form-item
                :label="t('payment.form.upsert.value')"
                :name="['goal', 'price']"
                :rules="[
                  {
                    required: true,
                    message: t('form.validate.required', {
                      field: t('payment.form.upsert.value')
                    })
                  }
                ]"
              >
                <a-input v-model:value="formState.goal.price" disabled />
              </a-form-item>
            </div>

            <div class="w-5 flex-shrink-0"></div>

            <div class="w-full">
              <a-form-item
                :label="t('payment.form.upsert.referral')"
                name="code"
              >
                <a-input v-model:value="formState.referral" />
              </a-form-item>
            </div>
          </div>
        </div>

        <div class="w-3/5 flex-shrink-0 pl-8">
          <div class="flex">
            <div class="w-full">
              <a-form-item
                :label="t('payment.form.upsert.coupon')"
                name="code_sale"
              >
                <a-input v-model:value="formState.code_sale" />
              </a-form-item>
            </div>

            <div class="w-5 flex-shrink-0"></div>

            <div class="w-full">
              <a-form-item
                :label="t('payment.form.upsert.money')"
                name="money"
                :rules="[
                  {
                    required: true,
                    message: t('form.validate.required', {
                      field: t('payment.form.upsert.money')
                    })
                  }
                ]"
              >
                <a-input v-model:value="formState.money" />
              </a-form-item>
            </div>
          </div>

          <a-form-item
            :label="t('payment.form.upsert.status')"
            name="status"
            :rules="[
              {
                required: true,
                message: t('form.validate.required', {
                  field: t('payment.form.upsert.status')
                })
              }
            ]"
          >
            <a-select
              v-model:value="formState.status"
              placeholder="Please select status"
            >
              <a-select-option :value="PaymentStatusEnum.TRIAL">
                {{ t('payment.status.trial') }}
              </a-select-option>

              <a-select-option :value="PaymentStatusEnum.PAID_CONFIRMED">
                {{ t('payment.status.confirmed') }}
              </a-select-option>

              <a-select-option :value="PaymentStatusEnum.ON_BUY">
                {{ t('payment.status.onBuy') }}
              </a-select-option>
            </a-select>
          </a-form-item>

          <a-form-item :label="t('payment.form.upsert.note')" name="note">
            <a-input v-model:value="formState.note" />
          </a-form-item>

          <a-form-item :label="t('payment.form.upsert.billImage')" name="code">
            <a-image
              :width="'100%'"
              :height="120"
              :src="$cdn(formState.attachments[0])"
            />
          </a-form-item>
        </div>
      </div>

      <a-form-item>
        <div class="flex justify-end">
          <a-popconfirm
            :title="t('payment.action.delete.title')"
            :ok-text="t('payment.action.delete.yes')"
            :cancel-text="t('payment.action.delete.no')"
            @confirm='$emitter.emit("deletePayment", formState.id); modal?.dispose()'
          >
            <a-button type="danger" :disabled="loading">
              {{ t('payment.form.upsert.actions.cancel') }}
            </a-button>
          </a-popconfirm>

          <a-button type="primary" class="ml-auto" ghost :disabled="loading">
            {{ t('payment.form.upsert.actions.detail') }}
          </a-button>

          <a-button
            type="primary"
            html-type="submit"
            class="ml-4"
            :loading="loading"
          >
            {{ t('payment.form.upsert.actions.add') }}
          </a-button>
        </div>
      </a-form-item>
    </a-form>
  </modal-base>
</template>

<script lang="ts" setup>
import ModalBase from '@components/modal/ModalBase.vue'
import { useLangs } from '@composables/useLangs'
import { reactive, ref } from 'vue'
import { SortPayments_sort_payments } from '#smileeye/queries/__generated__/SortPayments'
import { PaymentStatusEnum } from '@components/payment/types'
import { useMutation } from '@vue/apollo-composable'
import {
  UpsertPayment,
  UpsertPaymentVariables
} from '#smileeye/mutations/__generated__/UpsertPayment'
import { UPSERT_PAYMENT } from '#smileeye/mutations/payment.mutation'
const { t } = useLangs()

const modal = ref<any>(null)

let initState = {
  id: '',
  add_user_id: '',
  goal_id: '',
  goal: {
    id: '',
    name: '',
    price: ''
  },
  referral: '',
  status: PaymentStatusEnum.TRIAL,
  type: '',
  user_info: {
    name: '',
    email: '',
    phone_number: ''
  },
  code_sale: '',
  money: '',
  note: '',
  attachments: []
}
let formState = reactive<typeof initState>(initState)

const resetForm = () => {
  Object.assign({}, initState)
}

const buildForm = (_data: SortPayments_sort_payments | undefined) => {
  if (!_data) {
    resetForm()
    return
  }
  Object.assign(formState, JSON.parse(JSON.stringify(_data)))
}

const { mutate: upsertPayment, loading } = useMutation<
  UpsertPayment,
  UpsertPaymentVariables
>(UPSERT_PAYMENT, {
  onQueryUpdated: () => {
    modal.value?.dispose()
  }
})

const buildInput = () => {
  return {
    input: {
      id: formState.id,
      add_user_id: formState.add_user_id,
      goal_id: formState.goal_id,
      status: formState.status,
      user_info: formState.user_info,
      type: formState.type,
      code_sale: formState.code_sale,
      money: formState.money,
      note: formState.note,
      attachments: formState.attachments
    }
  }
}
</script>

<style>
#upsertPaymentModal .ant-image {
  overflow: hidden;
}

#upsertPaymentModalBody {
  padding-bottom: 0;
}
</style>
