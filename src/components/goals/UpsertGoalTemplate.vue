<template>
  <modal-base
    event="upsertGoalTemplate"
    :title="t('sellRequest.form.label')"
    :max-width="450"
    @init="buildForm"
  >
    <template #default="{ dispose }">
      <a-form
        :model="formState"
        layout="vertical"
        @finish="
          () => {
            $emitter.emit('onUpdateGoalTemplate', formState)
            dispose()
          }
        "
      >
        <a-form-item
          :label="t('goal.status')"
          :name="['input', 'status']"
        >
          <a-select
            v-model:value="formState.input.status"
            :placeholder="t('user.form.status.placeholder')"
          >
            <a-select-option value="">
              --
            </a-select-option>

            <a-select-option value="pending">
              {{ t('sellRequest.pending') }}
            </a-select-option>

            <a-select-option value="approved">
              {{ t('sellRequest.approved') }}
            </a-select-option>
          </a-select>
        </a-form-item>

        <a-form-item
          :label="t('goal.price')"
          :name="['form', 'price']"
          :rules="[
            {
              required: true,
              message: t('form.validate.required', {
                field: t('goal.price')
              })
            }
          ]"
        >
          <a-input-number
            v-model:value="formState.form.price"
            style="width: 100%"
            :min="0"
          />
        </a-form-item>

        <a-form-item
          :label="t('goal.percent')"
          :name="['form', 'owner_percent']"
          :rules="[
            {
              required: true,
              message: t('form.validate.required', {
                field: t('goal.percent')
              })
            }
          ]"
        >
          <a-input
            v-model:value="formState.form.owner_percent"
            style="width: 100%"
          />
        </a-form-item>

        <a-form-item class="-mt-3">
          <div class="flex justify-end">
            <a-button type="primary" html-type="submit" class="ml-4">
              {{ t('button.update') }}
            </a-button>
          </div>
        </a-form-item>
      </a-form>
    </template>
  </modal-base>
</template>

<script lang="ts" setup>
import { defineAsyncComponent, reactive } from 'vue'
import { useI18n } from 'vue-i18n'
import {
  EditGoalRootInput,
  UpsertGoalTemplateInput
} from '#schema/smileeyeTypes'
import { ListGoalRoot_list_goal_root } from '#smileeye/queries/__generated__/ListGoalRoot'

const ModalBase = defineAsyncComponent(
  () => import('@components/modal/ModalBase.vue')
)

const { t } = useI18n()

const formState = reactive<{
  input: UpsertGoalTemplateInput
  form: EditGoalRootInput
}>({
  input: {},
  form: {}
})

const buildForm = (data: ListGoalRoot_list_goal_root) => {
  formState.input.goal_id = data.id
  formState.input.status = data.sellRequest?.status || ''

  formState.form.id = data.id
  formState.form.price = data.price || 0
  formState.form.owner_percent = data.owner_percent || '0'
  formState.form.is_admin = true
}
</script>
