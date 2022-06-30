<template>
  <a-table
    :data-source="students"
    :columns="columns"
    :loading="loading || isDeleteting"
  >
    <template #headerCell="{ column }">
      <template v-if="column.key === 'action'">
        <search-header-table
          v-model:value="formSearch"
          :options="searchOptions"
          @change="page = 1"
        />
      </template>
    </template>

    <template #bodyCell="{ column, record }">
      <template v-if="column.key === 'name'">
        <router-link :to="'/users/' + record.id" class="flex items-center">
          <div
            class="rounded-full overflow-hidden mr-3 border-2 border-white shadow-md w-[45px] h-[45px]"
          >
            <img
              :src="$cdn(record.avatar)"
              alt=""
              class="object-cover w-full h-full"
            />
          </div>

          <p class="mb-0 font-medium text-gray-700">{{ record.name }}</p>
        </router-link>
      </template>

      <template v-else-if="column.key === 'createdAt'">
        {{ dayjs(record.created_at).format('DD/MM/YYYY') }}
      </template>

      <template v-else-if="column.key === 'action'">
        <a-popconfirm
          :title="t('actions.delete.title', { name: record.name })"
          placement="topLeft"
          :ok-text="t('button.yes')"
          :cancel-text="t('button.no')"
          @confirm="
            mutate({
              input: {
                goal_root_id: String($route.params.id),
                user_id: String(record.id)
              }
            })
          "
        >
          <a-button
            type="danger"
            class="ml-2"
            size="small"
            @click="$emitter.emit('updateUserModal', record)"
          >
            <template #icon>
              <delete-outlined />
            </template>

            {{ t('button.delete') }}
          </a-button>
        </a-popconfirm>
      </template>
    </template>
  </a-table>
</template>

<script lang='ts' setup>
import { DeleteOutlined } from '@ant-design/icons-vue'
import { useMutation, useQuery } from '@vue/apollo-composable'
import { ListCoachs, ListCoachsVariables } from '#smileeye/queries/__generated__/ListCoachs'
import { LIST_COACHS } from '#smileeye/queries/goal.query'
import { useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { computed, reactive, ref } from 'vue'
import SearchHeaderTable from '@components/includes/SearchHeaderTable.vue'
import { useDayjs } from '@composables/useDayjs'
import { DELETE_STUDENT } from '#smileeye/mutations/goal.mutation'
import { DeleteTeacher, DeleteTeacherVariables } from '#smileeye/mutations/__generated__/DeleteTeacher'

const dayjs = useDayjs()

const { t } = useI18n()
const columns = reactive([
  {
    title: t('user.name'),
    dataIndex: 'name',
    key: 'name',
    ellipsis: true,
    width: 250
  },
  {
    title: t('user.email'),
    dataIndex: 'email',
    key: 'email',
    width: 220
  },
  {
    title: t('user.createdAt'),
    dataIndex: 'created_at',
    align: 'center',
    width: 150,
    key: 'createdAt'
  },
  {
    key: 'action',
    align: 'right',
    fixed: 'right',
    width: 130
  }
])

// Search options
const searchOptions = [
  {
    label: t('user.name'),
    value: 'name'
  },
  {
    label: t('user.phone'),
    value: 'phone_number'
  },
  {
    label: t('user.email'),
    value: 'email'
  }
]

// SearchState
const formSearch = reactive<{
  field: 'name' | 'email' | 'phone_number'
  keyword: ''
}>({
  field: 'name',
  keyword: ''
})

// data resource
const page = ref<number>(1)

const route = useRoute()
const { result, loading } = useQuery<ListCoachs, ListCoachsVariables>(LIST_COACHS, {
  goalRootId: String(route.params.id)
})

const students = computed(() => {
  const _students = result.value?.list_coach_members || []
  if (!formSearch.keyword) {
    return _students
  }

  return _students.filter((student) => {
    return student?.[formSearch.field]
      ?.toLowerCase()
      .includes(formSearch.keyword.toLowerCase())
  })
})

const { mutate, loading: isDeleteting } = useMutation<
  DeleteTeacher,
  DeleteTeacherVariables
  >(DELETE_STUDENT, {
  update: (proxy, result1, options) => {
    proxy.writeQuery<ListCoachs, ListCoachsVariables>({
      query: LIST_COACHS,
      variables: {
        goalRootId: String(route.params.id)
      },
      data: {
        list_coach_members: result.value?.list_coach_members?.filter(
          (student) => student?.id !== options?.variables?.input.user_id
        ) || []
      }
    })
  }
})

</script>

<style scoped>

</style>
