<template>
  <modal-base ref='modal' event="addCoachModal" :title="t('button.addCoach')">
    <a-form layout="vertical">
      <a-spin :spinning="loading">
        <a-form-item label="">
          <a-select v-model:value="searchForm.field">
            <a-select-option value="email">
              {{ t('user.email') }}
            </a-select-option>
            <a-select-option value="phoneNumber">
              {{ t('user.phone') }}
            </a-select-option>
          </a-select>
        </a-form-item>

        <a-form-item :label="t('input.keyword')">
          <a-input
            v-model:value="searchForm.keyword"
            :placeholder="t('input.keyword')"
          />
        </a-form-item>

        <a-form-item :label="t('users.label')">
          <a-select v-model:value="searchForm.userid">
            <a-select-option
              v-for="user in users"
              :key="user.id"
              :value="user.id"
            >
              {{ user.name }}
            </a-select-option>
          </a-select>
        </a-form-item>

        <a-form-item>
          <div class="flex justify-end">
            <a-button
              type="primary"
              :loading="adding"
              :disabled="!searchForm.userid"
              @click="
                mutate({
                  input: {
                    user_id: searchForm.userid,
                    goal_ids: [$route.params.id]
                  }
                })
              "
            >
              {{ t('button.addNew') }}
            </a-button>
          </div>
        </a-form-item>
      </a-spin>
    </a-form>
  </modal-base>
</template>

<script lang="ts" setup>
import { computed, defineAsyncComponent, reactive, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { useMutation, useQuery } from '@vue/apollo-composable'
import { SEARCH_USERS_BY_GOAL } from '#smileeye/queries/user.query'
import {
  SearchUsersByGoal,
  SearchUsersByGoal_list_user_data,
  SearchUsersByGoalVariables
} from '#smileeye/queries/__generated__/SearchUsersByGoal'
import { UPSERT_COACH } from '#smileeye/mutations/goal.mutation'
import {
  UpsertTeacher,
  UpsertTeacherVariables
} from '#smileeye/mutations/__generated__/UpsertTeacher'
import {
  ListCoachs,
  ListCoachs_list_coach_members,
  ListCoachsVariables
} from '#smileeye/queries/__generated__/ListCoachs'
import { LIST_COACHS } from '#smileeye/queries/goal.query'
import { useRoute } from 'vue-router'

const ModalBase = defineAsyncComponent(
  () => import('@components/modal/ModalBase.vue')
)
const modal = ref()

const { t } = useI18n()

const searchForm = reactive({
  keyword: '',
  field: 'email',
  userid: ''
})

const searchQuery = computed(() => ({
  first: 10,
  page: 1,
  [searchForm.field]: `%${searchForm.keyword}%`
}))

const { result, loading } = useQuery<
  SearchUsersByGoal,
  SearchUsersByGoalVariables
>(SEARCH_USERS_BY_GOAL, searchQuery, {
  debounce: 300
})
const users = ref<SearchUsersByGoal_list_user_data[]>([])
watch(result, (newValue) => {
  searchForm.userid = ''
  users.value =
    (newValue?.list_user?.data as SearchUsersByGoal_list_user_data[]) ||
    ([] as SearchUsersByGoal_list_user_data[])
})

const route = useRoute()

const { mutate, loading: adding, onError } = useMutation<
  UpsertTeacher,
  UpsertTeacherVariables
>(UPSERT_COACH, {
  update: (proxy, result) => {

    modal.value?.dispose()

    const cache = proxy.readQuery<ListCoachs, ListCoachsVariables>({
      query: LIST_COACHS,
      variables: {
        goalRootId: String(route.params.id)
      }
    })

    if (cache) {
      proxy.writeQuery({
        query: LIST_COACHS,
        variables: {
          goalRootId: String(route.params.id)
        },
        data: {
          list_coach_members: [
            result.data?.upsert_coach_member
              ?.user as ListCoachs_list_coach_members,
            ...(cache?.list_coach_members || [])
          ]
        }
      })
    }
  }
})

onError(() => {
  searchForm.userid = ''
})

</script>
