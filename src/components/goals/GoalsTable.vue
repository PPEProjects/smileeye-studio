<template>
  <a-table
    :columns="columns"
    :data-source="goals"
    :pagination="{
      total: goals.length,
      showLessItems: true,
      defaultPageSize: 7
    }"
    :loading="loading"
    row-key="id"
  >
    <template #bodyCell="{ column, record }">
      <template v-if="column.key === 'name'">
        <router-link
          v-if="record.sellRequest?.status === 'approved'"
          :to="'/goals/' + record.id"
          class="font-medium ml-2"
        >
          {{ record.name }}
        </router-link>
        <span v-else class="font-medium ml-2">{{ record.name }}</span>
      </template>

      <template v-else-if="column.key === 'owner'">
        <router-link
          :to="{ name: 'users-id', params: { id: record.user?.id } }"
          class="text-gray-700 hover:text-gray-700"
        >
          {{ record.user?.name }}
        </router-link>
      </template>

      <template v-else-if="column.key === 'goal'">
        <span>{{ record.goal?.name || '-' }}</span>
      </template>

      <template v-else-if="column.key === 'price'">
        <span>{{ record.price || '--' }}</span>
      </template>

      <template v-else-if="column.key === 'status'">
        <template v-if="record.sellRequest?.status">
          <a-tag
            v-if="record.sellRequest?.status === 'approved'"
            color="#355cdd"
          >
            {{ t('sellRequest.approved') }}
          </a-tag>
          <a-tag
            v-else-if="record.sellRequest?.status === 'pending'"
            color="#f50"
          >
            {{ t('sellRequest.pending') }}
          </a-tag>
        </template>
        <span v-else>--</span>
      </template>

      <template v-else-if="column.key === 'percent'">
        {{ record.owner_percent || '--' }}
      </template>

      <template v-else-if="column.key === 'createdAt'">
        {{ dayjs(record.sellRequest?.created_at).format('DD/MM/YYYY') }}
      </template>

      <template v-else-if="column.key === 'action'">
        <a-popconfirm
          v-if="record.sellRequest?.status === 'pending'"
          :title="t('actions.accept.title', { name: t('payment.payment') })"
          placement="topLeft"
          :ok-text="t('button.yes')"
          :cancel-text="t('button.no')"
          @confirm="
            $emitter.emit('onUpdateGoalTemplate', quickApproved(record))
          "
        >
          <a-button type="primary" size="small">
            <template #icon>
              <check-outlined />
            </template>
          </a-button>
        </a-popconfirm>

        <a-button
          type="primary"
          size="small"
          class="ml-2"
          @click="$emitter.emit('upsertGoalTemplate', record)"
        >
          <template #icon>
            <edit-outlined />
          </template>
        </a-button>

        <a-popconfirm
          v-if="record.sellRequest?.status"
          :title="t('actions.delete.title', { name: t('sidebar.workspace') })"
          placement="topLeft"
          :ok-text="t('button.yes')"
          :cancel-text="t('button.no')"
          @confirm="
            mutate({
              input: {
                goal_id: record?.id
              }
            })
          "
        >
          <a-button type="danger" size="small" class="ml-2">
            <svg class="fill-current text-white" width="1em" height="1em">
              <use xlink:href="#i-remove" />
            </svg>
          </a-button>
        </a-popconfirm>
      </template>
    </template>
  </a-table>
</template>

<script lang="ts" setup>
import { reactive } from 'vue'

import { EditOutlined, CheckOutlined } from '@ant-design/icons-vue'

import { useDayjs } from '@composables/useDayjs'
import { useI18n } from 'vue-i18n'
import { ListGoalRoot_list_goal_root } from '#smileeye/queries/__generated__/ListGoalRoot'
import { useMutation } from '@vue/apollo-composable'
import {
  DeleteGoalTemplate,
  DeleteGoalTemplateVariables
} from '#smileeye/mutations/__generated__/DeleteGoalTemplate'
import { DELETE_GOAL_TEMPLATE } from '#smileeye/mutations/goal.mutation'

defineProps<{
  goals: ListGoalRoot_list_goal_root[]
}>()

const quickApproved = (goal: ListGoalRoot_list_goal_root) => ({
  input: {
    goal_id: goal.id,
    status: 'approved'
  },
  form: {
    id: goal.id,
    price: goal.price,
    owner_percent: goal.owner_percent,
    is_admin: true
  }
})

const { t } = useI18n()

const dayjs = useDayjs()

// Setup table
const columns = reactive([
  {
    title: t('goal.name'),
    dataIndex: 'name',
    key: 'name'
  },
  {
    title: t('goal.owner'),
    dataIndex: 'user',
    key: 'owner'
  },
  {
    title: t('goal.status'),
    dataIndex: 'sellRequest.status',
    key: 'status',
    align: 'center'
  },
  {
    title: t('goal.price'),
    dataIndex: 'price',
    key: 'price',
    align: 'center'
  },
  {
    title: t('goal.percent'),
    dataIndex: 'percent',
    key: 'percent',
    align: 'center'
  },
  {
    title: t('goal.sellRequest.createdAt'),
    dataIndex: 'createdAt',
    key: 'createdAt',
    align: 'center'
  },
  {
    title: t('table.action.title'),
    key: 'action',
    align: 'right',
    fixed: 'right',
    width: 130
  }
])

const { mutate, loading } = useMutation<
  DeleteGoalTemplate,
  DeleteGoalTemplateVariables
>(DELETE_GOAL_TEMPLATE, {
  update: (proxy, result, options) => {
    proxy.evict({
      id: proxy.identify({
        __typename: 'GoalRoot',
        id: options.variables?.input?.goal_id
      })
    })
  }
})
</script>
