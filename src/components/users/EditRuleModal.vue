<template>
  <modal-base
    ref="modal"
    title="Chỉnh Sửa Phân Quyền"
    event="editRuleModal"
    @init="buildForm"
  >
    <a-form
      :model="formState"
      @finish="
        mutate({ input: { user_id: formState.id, role_ids: formState.roles } })
      "
    >
      <a-form-item
        name="roles"
        :rules="[
          {
            required: true,
            message: t('form.validate.required', {
              field: t('user.role')
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
            <a-col v-for="(role, index) in roles" :key="index" :span="8">
              <a-checkbox :value="role.id">
                <span class="capitalize">{{ role.name }}</span>
              </a-checkbox>
            </a-col>
          </a-row>
        </a-checkbox-group>
      </a-form-item>

      <a-form-item>
        <div class="flex justify-end">
          <a-button type="danger" html-type="submit" :loading="loading">
            {{ t('button.update') }}
          </a-button>
        </div>
      </a-form-item>
    </a-form>
  </modal-base>
</template>

<script lang="ts" setup>
import ModalBase from '@components/modal/ModalBase.vue'
import { useLangs } from '@composables/useLangs'
import { computed, reactive, ref } from 'vue'
import { useMutation, useQuery } from '@vue/apollo-composable'
import {
  ListRoles,
  ListRolesVariables
} from '#smileeye/queries/__generated__/ListRoles'
import { LIST_ROLES } from '#smileeye/queries/user.query'
import { UPDATE_ROLES } from '#smileeye/mutations/user.mutation'
import {
  UpdateRoles,
  UpdateRolesVariables
} from '#smileeye/mutations/__generated__/UpdateRoles'

const { t } = useLangs()

const initState = {
  __typename: '',
  id: '',
  roles: []
}
const formState = reactive<typeof initState>(initState)

// student, admin, supporter, coach
const buildForm = (data: any) => {
  formState.id = data.id
  formState.roles = data.roles.map((role: { id: any }) => role.id)
  formState.__typename = data.__typename
}

// List roles
const { result } = useQuery<ListRoles, ListRolesVariables>(LIST_ROLES, {
  first: 100,
  page: 1
})

const roles = computed(() => result.value?.list_roles?.data || [])

const modal = ref<any>(null)

const { mutate, loading } = useMutation<UpdateRoles, UpdateRolesVariables>(
  UPDATE_ROLES,
  {
    onQueryUpdated: () => {
      modal.value.dispose()
    }
  }
)
</script>
