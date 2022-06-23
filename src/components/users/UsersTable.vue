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
    @change="changePage"
  >
    <template #headerCell="{ column }">
      <template v-if="column.key === 'action'">
        <a-dropdown v-model:visible="openSearch" :trigger="['click']">
          <a class="ant-dropdown-link" @click.prevent>
            <search-outlined />
          </a>
          <template #overlay>
            <a-menu>
              <a-menu-item key="1">
                <a-input-group compact>
                  <a-select v-model:value="formSearch.field" style="width: 40%">
                    <a-select-option value="email">
                      {{ t('user.email') }}
                    </a-select-option>
                    <a-select-option value="name">
                      {{ t('user.name') }}
                    </a-select-option>
                    <a-select-option value="phone_number">
                      {{ t('user.phone') }}
                    </a-select-option>
                  </a-select>
                  <a-input
                    v-model:value="formSearch.keyword"
                    style="width: 60%"
                    :placeholder="t('input.keyword')"
                    @press-enter="
                      searchUsers();
                      openSearch = false
                    "
                  >
                    <template #prefix>
                      <search-outlined />
                    </template>
                  </a-input>
                </a-input-group>
              </a-menu-item>
              <a-menu-divider />

              <a-menu-item key="2">
                <div class="flex items-center">
                  <a-button
                    type="primary"
                    size="small"
                    block
                    @click="searchUsers"
                  >
                    {{ t('button.search') }}
                  </a-button>
                  <div class="w-1 flex-shrink-0"></div>
                  <a-button
                    type="danger"
                    size="small"
                    block
                    @click="cancelSearch"
                  >
                    {{ t('button.cancel') }}
                  </a-button>
                </div>
              </a-menu-item>
            </a-menu>
          </template>
        </a-dropdown>
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
import { EditOutlined, SearchOutlined } from '@ant-design/icons-vue'
import { userColumnsBuilder } from '@components/users/config'
import { useDayjs } from '@composables/useDayjs'
import { useLangs } from '@composables/useLangs'
import { computed, reactive, ref } from 'vue'
import { useQuery } from '@vue/apollo-composable'
import {
  ListUser,
  ListUser_list_user_paginatorInfo,
  ListUserVariables
} from '#smileeye/queries/__generated__/ListUser'
import { LIST_USERS } from '#smileeye/queries/user.query'
import UserRolesTag from '@components/user/UserRolesTag.vue'
import { useRoute } from 'vue-router'
import { SortOrder } from '#schema/smileeyeTypes'

const route = useRoute()

const userColumns = userColumnsBuilder()

const dayjs = useDayjs()
const { t } = useLangs()

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
const { result, loading, refetch } = useQuery<ListUser, ListUserVariables>(
  LIST_USERS,
  {
    first: 10,
    [formSearch.field]: formSearch.keyword,
    page: page.value,
    role: route.query.group as string || '',
    orderBy: [
      {
        column: 'created_at',
        order: SortOrder.DESC
      }
    ]
  }
)
const users = computed(() => result.value?.list_user?.data || [])
const pageNavi = computed(
  () =>
    result.value?.list_user?.paginatorInfo ||
    ({} as ListUser_list_user_paginatorInfo)
)

const changePage = ($event: any) => {
  page.value = $event.current
  refetch({
    first: 10,
    [formSearch.field]: formSearch.keyword,
    page: page.value,
    role: route.query.group as string || '',
    orderBy: [
      {
        column: 'created_at',
        order: SortOrder.DESC
      }
    ]
  })
}

// Search
const openSearch = ref<boolean>(false)

const searchUsers = () => {
  page.value = 0
  refetch({
    first: 10,
    [formSearch.field]: formSearch.keyword,
    page: page.value,
    role: route.query.group as string || '',
    orderBy: [
      {
        column: 'created_at',
        order: SortOrder.DESC
      }
    ]
  })
}
const cancelSearch = () => {
  formSearch.field = 'name'
  formSearch.keyword = ''
  refetch({
    first: 10,
    [formSearch.field]: formSearch.keyword,
    page: page.value,
    role: route.query.group as string || '',
    orderBy: [
      {
        column: 'created_at',
        order: SortOrder.DESC
      }
    ]
  })
  openSearch.value = false
}
</script>
