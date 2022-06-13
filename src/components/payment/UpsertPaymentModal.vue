<template>
  <modal-base
    event="upsertPaymentModal"
    :title="t('payment.form.upsert.title')"
    :max-width="1000"
    @init='buildForm'
  >
    <a-form
      :model="formState"
      name="basic"
      autocomplete="off"
      layout="vertical"
      class="-mb-4"
    >
      <div class="flex">
        <div class="w-2/5 flex-shrink-0">
          <a-form-item
            :label="t('payment.form.upsert.name')"
            name="code"
            :rules="[
              {
                required: true,
                message: t('form.validate.required', {
                  field: t('payment.form.upsert.name')
                })
              }
            ]"
          >
            <a-input v-model:value.trim="formState.code" disabled />
          </a-form-item>

          <a-form-item
            :label="t('payment.form.upsert.email')"
            name="code"
            :rules="[
              {
                required: true,
                message: t('form.validate.required', {
                  field: t('payment.form.upsert.email')
                })
              }
            ]"
          >
            <a-input v-model:value.trim="formState.code" disabled />
          </a-form-item>

          <a-form-item
            :label="t('payment.form.upsert.phone')"
            name="code"
            :rules="[
              {
                required: true,
                message: t('form.validate.required', {
                  field: t('payment.form.upsert.phone')
                })
              }
            ]"
          >
            <a-input v-model:value.trim="formState.code" disabled />
          </a-form-item>

          <a-form-item
            :label="t('payment.form.upsert.goal')"
            name="code"
            :rules="[
              {
                required: true,
                message: t('form.validate.required', {
                  field: t('payment.form.upsert.goal')
                })
              }
            ]"
          >
            <a-input v-model:value.trim="formState.code" disabled />
          </a-form-item>

          <div class='flex'>

            <div class='w-full'>
              <a-form-item
                :label="t('payment.form.upsert.value')"
                name="code"
                :rules="[
                {
                  required: true,
                  message: t('form.validate.required', {
                    field: t('payment.form.upsert.value')
                  })
                }
              ]"
              >
                <a-input v-model:value.trim="formState.code" disabled />
              </a-form-item>
            </div>


            <div class='w-5 flex-shrink-0'></div>

            <div class='w-full'>
              <a-form-item
                :label="t('payment.form.upsert.referral')"
                name="code"
              >
                <a-input v-model:value.trim="formState.code" disabled />
              </a-form-item>
            </div>


          </div>

        </div>

        <div class="w-3/5 flex-shrink-0 pl-8">

          <div class='flex'>

            <div class='w-full'>
              <a-form-item
                :label="t('payment.form.upsert.coupon')"
                name="code"
              >
                <a-input v-model:value.trim="formState.code" />
              </a-form-item>
            </div>


            <div class='w-5 flex-shrink-0'></div>

            <div class='w-full'>
              <a-form-item
                :label="t('payment.form.upsert.money')"
                name="code"
              >
                <a-input v-model:value.trim="formState.code" />
              </a-form-item>
            </div>


          </div>


          <a-form-item
            :label="t('payment.form.upsert.note')"
            name="code"
          >
            <a-input v-model:value.trim="formState.code" />
          </a-form-item>

          <div class='flex'>

            <div class='w-full'>

              <a-form-item
                :label="t('payment.form.upsert.billImage')"
                name="code"
              >
                <a-image
                  :width="'100%'"
                  :height='144'
                  src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
                />
              </a-form-item>

            </div>


            <div class='w-5 flex-shrink-0'></div>

            <div class='w-full'>
              <a-form-item
                :label="t('payment.form.upsert.noteImage')"
                name="code"
              >
                <a-image
                  :width="'100%'"
                  :height='144'
                  src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
                />
              </a-form-item>
            </div>


          </div>

<!--          <a-form-item
            :label="t('payment.form.upsert.note')"
            name="code"
          >
            <a-input v-model:value.trim="formState.code" />
          </a-form-item>-->

          <a-form-item>
            <div class="flex justify-end">

              <a-popconfirm
                :title="t('payment.action.delete.title')"
                :ok-text="t('payment.action.delete.yes')"
                :cancel-text="t('payment.action.delete.no')"
              >
                <a-button
                  type="danger"
                >
                  {{ t('payment.form.upsert.actions.cancel') }}
                </a-button>
              </a-popconfirm>


              <a-button
                type="primary"
                class='ml-auto'
                ghost
              >
                {{ t('payment.form.upsert.actions.detail') }}
              </a-button>

              <a-button
                type="primary"
                html-type="submit"
                class='ml-4'
              >
                {{ t('payment.form.upsert.actions.add') }}
              </a-button>
            </div>
          </a-form-item>

        </div>

      </div>
    </a-form>
  </modal-base>
</template>

<script lang="ts" setup>
import ModalBase from '@components/modal/ModalBase.vue'
import { useLangs } from '@composables/useLangs'
import { reactive } from 'vue'
import { SortPayments_sort_payments } from '#smileeye/queries/__generated__/SortPayments'
const { t } = useLangs()

const formState = reactive({})

const buildForm = (_data: SortPayments_sort_payments | undefined) => {
  console.log(_data)
}

</script>

<style>
#upsertPaymentModal .ant-image {
  overflow: hidden;
}
</style>
