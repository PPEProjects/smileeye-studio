<template>
  <modal-base
    ref="modal"
    event="updateGoalModal"
    :title="t('goals.edit.modal.title')"
    @init="buildForm"
  >
    <a-form :model="formState" layout="vertical" @finish="updateHandle">
          <a-form-item
              name="name"
              :label="t('users.edit.name')"
              :rules="[
              {
                required: true,
                message: t('form.validate.required', {
                  field: t('users.edit.name')
                })
              }
            ]"
          >
            <a-input v-model:value="formState.name" />
          </a-form-item>
          <a-form-item
              name="name"
              :label="t('users.edit.name')"
              :rules="[
              {
                required: true,
                message: t('form.validate.required', {
                  field: t('users.edit.name')
                })
              }
            ]"
          >
            <a-input v-model:value="formState.name" />
          </a-form-item>
    </a-form>
  </modal-base>

</template>

<script lang="ts" setup>
// @ts-ignore
import {
  getDistrictsByProvinceCode,
  getProvinces,
  getWardsByDistrictCode
  // @ts-ignore
} from '@do-kevin/pc-vn'

import ModalBase from '@components/modal/ModalBase.vue'
import { useLangs } from '@composables/useLangs'
import { computed, reactive, ref } from 'vue'
import { District, Province, Ward } from '@components/users/types'
import { useMutation } from '@vue/apollo-composable'
import { UPDATE_USER_INFO } from '#smileeye/mutations/user.mutation'
import {
  UpdateUserInfo,
  UpdateUserInfoVariables
} from '#smileeye/mutations/__generated__/UpdateUserInfo'
import ImageCropper from '@components/includes/ImageCropper.vue'
import { useFileSystemAccess } from '@vueuse/core'
import UserRolesTag from '@components/user/UserRolesTag.vue'

const { t } = useLangs()

// modal
const modal = ref<any>(null)

// init State
const initState = {
  __typename: '',
  id: '',
  roles: [],
  name: '',
  email: '',
  phone_number: '',
  avatar: '',
  banner: '',
  current_address: {
    detail: '',
    province: '',
    district: '',
    ward: ''
  },
  created_at: ''
}
// FormState
const formState = reactive<typeof initState>(initState)

const buildForm = (data: any) => {
  console.log('data', {data})
  // TODO
  const _form = JSON.parse(JSON.stringify(data))
  // if (!_form.current_address || Array.isArray(_form.current_address)) {
  //   _form.current_address = {}
  // }
  // Object.assign(formState, _form)
  // buildAddress()
}

// Update
const { mutate: updateAction, loading } = useMutation<
  UpdateUserInfo,
  UpdateUserInfoVariables
>(UPDATE_USER_INFO)
const updateHandle = () => {
  const _form: Partial<Record<keyof typeof initState, any>> = Object.assign(
    {},
    formState
  )
  delete _form.__typename
  delete _form.created_at
  updateAction(
    {
      input: _form
    },
    {
      update: () => {
        modal.value?.dispose()
      }
    }
  )
}
</script>
