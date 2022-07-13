<template>
  <a-table
    :columns="userColumns"
    :data-source="users"
    :loading="loading"
    :pagination="{
      total: pageNavi?.total,
      showLessItems: true,
      defaultPageSize: 10
    }"
    @change="page = $event.current"
  >
    <template #headerCell="{ column }">
      <template v-if="column.key === 'action'">
        <search-header-table v-model:value='formSearch' :options="searchOptions" @change='page = 1' />
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

      <template v-else-if="column.key === 'role'">
        <user-roles-tag :user="record" />
      </template>

      <template v-else-if="column.key === 'createdAt'">
        {{ dayjs(record.created_at).format('DD/MM/YYYY') }}
      </template>

      <template v-else-if="column.key === 'action'">
        <a-button
          type="primary"
          class="ml-2"
          @click="$emitter.emit('updateUserModal', record)"
        >
          <template #icon>
            <edit-outlined />
          </template>
          {{ t('button.edit') }}
        </a-button>
      </template>
    </template>
  </a-table>
</template>

<script lang="ts" setup>
import { computed, defineAsyncComponent, reactive, ref } from 'vue'

const SearchHeaderTable = defineAsyncComponent(() => import('@components/includes/SearchHeaderTable.vue'))
const UserRolesTag = defineAsyncComponent(() => import('@components/user/UserRolesTag.vue'))

import { EditOutlined } from '@ant-design/icons-vue'
import { userColumnsBuilder } from '@components/users/config'
import { useDayjs } from '@composables/useDayjs'
import { useQuery } from '@vue/apollo-composable'
import {
  ListUser,
  ListUser_list_user_paginatorInfo,
  ListUserVariables
} from '#smileeye/queries/__generated__/ListUser'
import { LIST_USERS } from '#smileeye/queries/user.query'
import { useRoute } from 'vue-router'
import { SortOrder } from '#schema/smileeyeTypes'
import { useI18n } from 'vue-i18n'

const route = useRoute()

const userColumns = userColumnsBuilder()

const dayjs = useDayjs()
const { t } = useI18n()

/**
 * Các fild sẽ dùng để tìm kiếm
 * Mỗi số field đều phải có key và label
 * @type {Array<{key: string, label: string}>}
 * Sẽ search thoe value của field đó
 */
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

/**
 * @param {ListUserVariables} variables
 */
const formSearch = reactive<{
  field: 'name' | 'email' | 'phone_number'
  keyword: ''
}>({
  field: 'name',
  keyword: ''
})

// data resource
const page = ref<number>(1)

/**
 * Đặt query filter vào một reactive để đảm bảo nó sẽ được gọi đến khi cập nhật
 */
const queryVariables = computed(() => ({
  first: 10,
  [formSearch.field]: formSearch.keyword,
  page: page.value,
  role: (route.query.group as string) || '',
  orderBy: [
    {
      column: 'created_at',
      order: SortOrder.DESC
    }
  ]
}))

// Thực khi gọi query. Nó sẽ tự động gọi lại query khi có thay đổi
const { result, loading } = useQuery<ListUser, ListUserVariables>(
  LIST_USERS,
  queryVariables,
  {
    debounce: 300
  }
)
// Tạo getter users là mảng các user được trả về từ query

const users = computed(() => result.value?.list_user?.data || [])
const pageNavi = computed(
  () =>
    result.value?.list_user?.paginatorInfo ||
    ({} as ListUser_list_user_paginatorInfo)
)
</script>
