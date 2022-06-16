<template>
  <modal-base
    ref="modal"
    event="updateUserModal"
    :title="t('users.edit.modal.title')"
    :max-width="1000"
    @init="buildForm"
  >
    <a-form :model="formState" layout="vertical" @finish="updateHandle">
      <div class="flex">
        <div class="w-3/5 pr-7">
          <div class="relative">
            <div
              class="w-full h-[133px] rounded overflow-hidden cursor-pointer _upload_overlay block"
              @click="triggerCropper('banner')"
            >
              <img
                :src="$cdn(formState.banner)"
                alt=""
                class="w-full h-full object-cover"
              />
            </div>

            <div
              class="w-[84px] h-[84px] overflow-hidden rounded-full absolute -bottom-7 left-7 border-2 border-white shadow-md cursor-pointer _upload_overlay block"
              @click="triggerCropper('avatar')"
            >
              <img
                class="w-full h-full object-cover"
                :src="$cdn(formState.avatar)"
                alt=""
              />
            </div>
          </div>

          <div class="h-7 flex justify-end items-start">
            <p class="text-xs text-gray-400 relative top-1.5">
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
            <a-input v-model:value="formState.name" />
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
            <a-input v-model:value="formState.email" />
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
            <a-input v-model:value="formState.phone_number" />
          </a-form-item>
        </div>

        <div class="w-2/5">
          <a-form-item
            name="roles"
            :label="t('users.edit.rule.label')"
            class="!mb-[15px]"
          >

            <user-roles-tag :user='formState' />

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
            :disabled="loading"
          >
            <a-button type="danger">
              {{ t('users.edit.actions.cancel') }}
            </a-button>
          </a-popconfirm>

          <a-button
            type="primary"
            class="ml-auto"
            ghost
            :disabled="loading"
            @click="useFile.open()"
          >
            {{ t('users.edit.actions.detail') }}
          </a-button>

          <a-button
            type="primary"
            html-type="submit"
            class="ml-4"
            :loading="loading"
          >
            {{ t('users.edit.actions.update') }}
          </a-button>
        </div>
      </a-form-item>
    </a-form>
  </modal-base>

  <modal-base
    v-model:visible="cropperState.show"
    :event="t('cropper.title')"
    title="CropImage"
  >
    <image-cropper ref="cropperRef" />

    <template #bottom>
      <div class="flex justify-end">
        <a-button
          type="danger"
          class="uppercase"
          :disabled="uploadingImage"
          @click="cropperState.show = false"
        >
          {{ t('cropper.cancel') }}
        </a-button>
        <a-button
          type="primary"
          class="uppercase ml-3"
          :loading="uploadingImage"
          @click="uploadImageHandle"
        >
          {{ t('cropper.upload') }}
        </a-button>
      </div>
    </template>
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
  const _form = JSON.parse(JSON.stringify(data))
  if (!_form.current_address || Array.isArray(_form.current_address)) {
    _form.current_address = {}
  }
  Object.assign(formState, _form)
  buildAddress()
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
      input: _form,
      roleInput: {
        user_id: _form.id,
        role_ids: _form.roles.map((item: { id: any }) => item.id)
      }
    },
    {
      update: () => {
        modal.value?.dispose()
      }
    }
  )
}

// Cropper
const cropperState = reactive<{
  src: string
  current: 'avatar' | 'banner'
  show: boolean
}>({
  src: '',
  current: 'avatar',
  show: false
})
const cropperRef = ref<any>(null)

const useFile = useFileSystemAccess({
  dataType: 'Blob',
  types: [
    {
      description: 'Image File',
      accept: {
        'image/*': ['.png', '.gif', '.jpeg', '.jpg']
      }
    }
  ]
})

const triggerCropper = async (type: 'avatar' | 'banner') => {
  try {
    cropperState.current = type
    await useFile.open()
    if (!useFile.file?.value) {
      return
    }
    cropperRef.value?.changeConfig(
      type === 'avatar'
        ? {
            aspectRatio: 1,
            viewMode: 3,
            minContainerHeight: 300,
            minCropBoxWidth: 300,
            containerStyle: {
              borderRadius: '50%'
            }
          }
        : {
            aspectRatio: 2.3,
            viewMode: 1
          }
    )
    cropperRef.value?.buildCropper(useFile.data.value)
    cropperState.show = true
  } catch (e) {
    // Không chọn file
  }
}

const uploadingImage = ref(false)
const uploadImageHandle = async () => {
  cropperRef.value?.cropImage(async (image: any) => {
    if (!image) {
      return
    }
    uploadingImage.value = true
    formState[cropperState.current] = await cropperRef.value?.uploadCrop(image)
    cropperState.show = false
    uploadingImage.value = false
  })
}
</script>
