<template>
  <modal-base
    title="Chỉnh Sửa Phân Quyền"
    event="editRuleModal"
    @init="buildForm"
  >
    <a-form :model="formState">
      <a-form-item
        name="roles"
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

      <a-form-item>
        <div class="flex justify-end">
          <a-button type="danger" html-type="submit">
            {{ t('users.edit.rule.button') }}
          </a-button>
        </div>
      </a-form-item>
    </a-form>
  </modal-base>
</template>

<script lang="ts" setup>
import ModalBase from '@components/modal/ModalBase.vue'
import { useLangs } from '@composables/useLangs'
import { computed, reactive } from 'vue'
import { useQuery } from '@vue/apollo-composable'
import {
  ListRoles,
  ListRolesVariables
} from '#smileeye/queries/__generated__/ListRoles'
import { LIST_ROLES } from '#smileeye/queries/user.query'

const { t } = useLangs()

const initState = {
  id: '',
  roles: []
}
const formState = reactive<typeof initState>(initState)

// student, admin, supporter, coach
const buildForm = (data: any) => {
  formState.id = data.id
  formState.roles = data.roles.map((role: { id: any }) => role.id)
}

// List roles
const { result } = useQuery<ListRoles, ListRolesVariables>(LIST_ROLES, {
  first: 100,
  page: 1
})

const roles = computed(() => result.value?.list_roles || [])

</script>
