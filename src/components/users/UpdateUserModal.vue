<template>
  <modal-base
    event="updateUserModal"
    title="Update User"
    :max-width="1000"
    @init="buildForm"
  >
    <a-form :model="formState" layout="vertical">
      <div class="flex">
        <div class="w-3/5 pr-7">
          <div class="relative">
            <div class="w-full h-[145px] rounded overflow-hidden cursor-pointer _upload_overlay">
              <img
                src="https://i.imgur.com/TGrWoue.jpg"
                alt=""
                class="w-full h-full object-cover"
              />
            </div>

            <div
              class="w-[84px] h-[84px] overflow-hidden rounded-full absolute -bottom-7 left-7 border-2 border-white shadow-md cursor-pointer _upload_overlay"
            >
              <img
                class="w-full h-full object-cover"
                src="https://i.imgur.com/jfZDmVD.png"
                alt=""
              />
            </div>
          </div>

          <div class="h-7 flex justify-end items-start">
            <p class='text-xs text-gray-400 relative top-1.5'>
              {{ t('users.edit.upload.guide') }}
            </p>
          </div>

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
            <a-input v-model:value='formState.name' />
          </a-form-item>

          <a-form-item
            name="email"
            label="Email"
            :rules="[
              {
                required: true,
                message: t('form.validate.required', {
                  field: 'Email'
                })
              }
            ]"
          >
            <a-input v-model:value='formState.email' />
          </a-form-item>

          <a-form-item
            name="phone_number"
            :label="t('users.edit.phone')"
            :rules="[
              {
                required: true,
                message: t('form.validate.required', {
                  field: t('users.edit.phone')
                })
              }
            ]"
          >
            <a-input v-model:value='formState.phone_number' />
          </a-form-item>
        </div>

        <div class="w-2/5">
          <a-form-item
            name="roles"
            :label="t('users.edit.rule.label')"
            class="!mb-[15px]"
            :rules="[
              {
                required: true,
                message: t('form.validate.required', {
                  field: t('users.edit.rule.label')
                })
              }
            ]"
          >
            <a-checkbox-group
              v-model:value="formState.roles"
              name="checkboxgroup"
              class="w-full"
            >
              <a-row>
                <a-col :span="8">
                  <a-checkbox value="student">
                    {{ t('users.edit.rule.student') }}
                  </a-checkbox>
                </a-col>
                <a-col :span="8">
                  <a-checkbox value="supporter">
                    <span class="text-primary-500">
                      {{ t('users.edit.rule.support') }}
                    </span>
                  </a-checkbox>
                </a-col>
                <a-col :span="8">
                  <a-checkbox value="admin">
                    <span class="text-rose-500">
                      {{ t('users.edit.rule.admin') }}
                    </span>
                  </a-checkbox>
                </a-col>
              </a-row>
            </a-checkbox-group>
          </a-form-item>

          <a-form-item
            :name="['current_address', 'province']"
            :label="t('users.edit.province')"
          >
            <a-select
              v-model:value="formState.current_address.province"
              @change="changeProvince"
            >
              <a-select-option
                v-for="province in provinces"
                :key="province.code"
                :value="province.code"
              >
                {{ province.name }}
              </a-select-option>
            </a-select>
          </a-form-item>

          <a-form-item
            :name="['current_address', 'district']"
            :label="t('users.edit.district')"
          >
            <a-select
              v-model:value="formState.current_address.district"
              @change="changeDistrict"
            >
              <a-select-option
                v-for="district in districts"
                :key="district.code"
                :value="district.code"
              >
                {{ district.name }}
              </a-select-option>
            </a-select>
          </a-form-item>

          <a-form-item
            :name="['current_address', 'ward']"
            :label="t('users.edit.ward')"
          >
            <a-select v-model:value="formState.current_address.ward">
              <a-select-option
                v-for="ward in wards"
                :key="ward.code"
                :value="ward.code"
              >
                {{ ward.name }}
              </a-select-option>
            </a-select>
          </a-form-item>

          <a-form-item
            :name="['current_address', 'detail']"
            :label="t('users.edit.address_detail')"
          >
            <a-input
              v-model:value="formState.current_address.detail"
              placeholder=""
            />
          </a-form-item>
        </div>
      </div>


      <a-form-item>
        <div class="flex justify-end">
          <a-popconfirm
            :title="t('users.edit.actions.delete.confirm')"
            :ok-text="t('users.edit.actions.delete.ok')"
            :cancel-text="t('users.edit.actions.delete.no')"
            :disabled='loading'
          >
            <a-button type="danger">
              {{ t('users.edit.actions.cancel') }}
            </a-button>
          </a-popconfirm>

          <a-button type="primary" class="ml-auto" ghost :disabled='loading'>
            {{ t('users.edit.actions.detail') }}
          </a-button>

          <a-button
            type="primary"
            html-type="submit"
            class="ml-4"
            :loading='loading'
            @click='updateHandle'
          >
            {{ t('users.edit.actions.update') }}
          </a-button>
        </div>
      </a-form-item>

    </a-form>
  </modal-base>


  <modal-base event='updateUserCopper'></modal-base>


</template>

<script lang="ts" setup>
// @ts-ignore
import {
  getProvinces,
  getDistrictsByProvinceCode,
  getWardsByDistrictCode
  // @ts-ignore
} from '@do-kevin/pc-vn'

import ModalBase from '@components/modal/ModalBase.vue'
import { useLangs } from '@composables/useLangs'
import { computed, reactive, ref } from 'vue'
import { District, Province, Ward } from '@components/users/types'
import { useMutation } from '@vue/apollo-composable'
import { UPDATE_USER_INFO } from '#smileeye/mutations/user.mutation'
import { UpdateUserInfo, UpdateUserInfoVariables } from '#smileeye/mutations/__generated__/UpdateUserInfo'

const { t } = useLangs()

// init State
const initState = {
  __typename: '',
  id: '',
  roles: [],
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

// Dữ liệu địa chỉ
const provinces = ref<Province[]>([])
const districts = computed<District[]>(() => {
  if (!formState.current_address.province) {
    return []
  }
  return getDistrictsByProvinceCode(formState.current_address.province)
})
const wards = computed<Ward[]>(() => {
  if (!formState.current_address.district) {
    return []
  }
  return getWardsByDistrictCode(formState.current_address.district)
})

/**
 * current_address: {province: "93", district: "934", ward: "31405"}
 * district: "934"
 * province: "93"
 * ward: "31405"
 */

const buildAddress = () => {
  if (!provinces.value.length) {
    provinces.value = getProvinces()
  }
}

const changeProvince = () => {
  // reset fromState
  formState.current_address.district = ''
  formState.current_address.ward = ''
}

const changeDistrict = () => {
  formState.current_address.ward = ''
}

const buildForm = (data: any) => {
  buildAddress()
  console.log(data)

  const _form = JSON.parse(JSON.stringify(data))
  if(!_form.current_address) {
    _form.current_address = {}
  }
  Object.assign(formState, _form)
}

// Update
const { mutate: updateAction, loading } = useMutation<UpdateUserInfo, UpdateUserInfoVariables>(UPDATE_USER_INFO)
const updateHandle = () => {
  const _form: Partial<Record<keyof typeof initState, any>> = Object.assign({}, formState)
  delete _form.__typename
  delete _form.created_at
  updateAction({
    input: _form
  })
}



</script>
