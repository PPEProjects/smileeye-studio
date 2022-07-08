<template>
  <modal-base
    ref="modal"
    event="upsertPaymentModal"
    :title="t('actions.edit.title', { name: t('payment.payment') })"
    :max-width="1000"
    @init="buildForm"
  >
    <a-form
      :model="formState"
      name="basic"
      autocomplete="off"
      layout="vertical"
      class="-mb-4"
      @finish="updatePayment(buildInput())"
    >
      <div class="flex">
        <div class="w-2/5 flex-shrink-0">
          <a-form-item
            :label="t('user.name')"
            :name="['user_info', 'name']"
            :rules="[
              {
                required: true,
                message: t('form.validate.required', {
                  field: t('user.name')
                })
              }
            ]"
          >
            <a-input v-model:value="formState.user_info.name" />
          </a-form-item>

          <a-form-item
            :label="t('user.email')"
            :name="['user_info', 'email']"
            :rules="[
              {
                required: true,
                message: t('form.validate.required', {
                  field: t('user.email')
                })
              }
            ]"
          >
            <a-input v-model:value="formState.user_info.email" />
          </a-form-item>

          <a-form-item
            :label="t('user.phone')"
            :name="['user_info', 'phone_number']"
            :rules="[
              {
                required: true,
                message: t('form.validate.required', {
                  field: t('user.phone')
                })
              }
            ]"
          >
            <a-input v-model:value="formState.user_info.phone_number" />
          </a-form-item>

          <a-form-item
            :label="t('goal.name')"
            :name="['goal', 'name']"
            :rules="[
              {
                required: true,
                message: t('form.validate.required', {
                  field: t('goal.name')
                })
              }
            ]"
          >
            <a-input v-model:value="formState.goal.name" disabled />
          </a-form-item>

          <div class="flex">
            <div class="w-full">
              <a-form-item
                :label="t('payment.price')"
                :name="['goal', 'price']"
                :rules="[
                  {
                    required: true,
                    message: t('form.validate.required', {
                      field: t('payment.price')
                    })
                  }
                ]"
              >
                <a-input v-model:value="formState.goal.price" disabled />
              </a-form-item>
            </div>

            <div class="w-5 flex-shrink-0"></div>

            <div class="w-full">
              <a-form-item :label="t('payment.referral')" name="code">
                <a-input v-model:value="formState.referral" />
              </a-form-item>
            </div>
          </div>
        </div>

        <div class="w-3/5 flex-shrink-0 pl-8">
          <div class="flex">
            <div class="w-full">
              <a-form-item :label="t('coupon.label')" name="code_sale">
                <a-input v-model:value="formState.code_sale" />
              </a-form-item>
            </div>

            <div class="w-5 flex-shrink-0"></div>

            <div class="w-full">
              <a-form-item
                :label="t('payment.money')"
                name="money"
                :rules="[
                  {
                    required: true,
                    message: t('form.validate.required', {
                      field: t('payment.money')
                    })
                  }
                ]"
              >
                <a-input v-model:value.number="formState.money" />
              </a-form-item>
            </div>
          </div>

          <a-form-item
            :label="t('payment.status.title')"
            name="status"
            :rules="[
              {
                required: true,
                message: t('form.validate.required', {
                  field: t('payment.status.title')
                })
              }
            ]"
          >
            <a-select
              v-model:value="formState.status"
              :placeholder="t('user.form.status.placeholder')"
            >
              <a-select-option :value="STATUS.TRIAL">
                {{ t('payment.status.trial') }}
              </a-select-option>

              <a-select-option :value="STATUS.PAID_CONFIRMED">
                {{ t('payment.status.paid_confirmed') }}
              </a-select-option>

              <a-select-option :value="STATUS.ON_BUY">
                {{ t('payment.status.on_buy') }}
              </a-select-option>
            </a-select>
          </a-form-item>

          <a-form-item :label="t('payment.note')" name="note">
            <a-input v-model:value="formState.note" />
          </a-form-item>

          <a-form-item :label="t('payment.billImage')" name="code">
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
            :title="t('actions.delete.title', { name: t('payment.payment') })"
            :ok-text="t('button.yes')"
            :cancel-text="t('button.no')"
            @confirm="deletePayment"
          >
            <a-button type="danger">
              {{ t('button.delete') }}
            </a-button>
          </a-popconfirm>

          <a-button type="primary" class="ml-auto" ghost @click="$router.push('/payment/' + formState.id)">
            {{ t('button.detail') }}
          </a-button>

          <a-button
            type="primary"
            html-type="submit"
            class="ml-4"
          >
            {{ t('button.update') }}
          </a-button>
        </div>
      </a-form-item>
    </a-form>
  </modal-base>
</template>

<script lang="ts" setup>
import {defineAsyncComponent, reactive, ref} from 'vue'
import {SortPayments_sort_payments} from '#smileeye/queries/__generated__/SortPayments'
import {STATUS, UpsertPaymentInput} from '#schema/smileeyeTypes'
import {useI18n} from 'vue-i18n'
import {useEmitter} from "@nguyenshort/vue3-mitt";

const ModalBase = defineAsyncComponent(
  () => import('@components/modal/ModalBase.vue')
)

const { t } = useI18n()
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
  status: STATUS.TRIAL,
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

// Global event
const emitter = useEmitter<{
  beforeUpdatePayment: UpsertPaymentInput
}>()

const buildInput = () => {
  return {
    id: formState.id,
    add_user_id: formState.add_user_id,
    goal_id: formState.goal_id,
    status: formState.status,
    user_info: formState.user_info,
    type: formState.type,
    code_sale: formState.code_sale,
    money: formState.status === STATUS.TRIAL ? 0 : formState.money,
    note: formState.note,
    attachments: formState.attachments
  }
}

const updatePayment = (doc: any) => {
  modal.value?.dispose()
  emitter.emit('beforeUpdatePayment', doc);
}

const deletePayment = () => {
  modal.value?.dispose()
  emitter.emit('beforeUpdatePayment', {
    status: STATUS.TRIAL,
    money: 0,
    id: formState.id,
  });
}
</script>

<style>
#upsertPaymentModal .ant-image {
  overflow: hidden;
}
</style>
