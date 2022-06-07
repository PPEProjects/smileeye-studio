<template>
  <div class='h-full overflow-y-auto'>
    <ul id="listNotifies">
      <li
        v-for="(notify, index) in notifies"
        :key="notify.id"
        :data-index="index"
      >
        <NotifyItem :notify='notify' />
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { useQuery } from '@vue/apollo-composable'
import { GET_NOTIFIES } from '#notify/queries/notifies.query'
import {
  GetNotifies,
  GetNotifiesVariables
} from '#notify/queries/__generated__/GetNotifies'
import { ApolloEnum } from '@plugins/apollo'
import usePick from '@composables/usePick'
import NotifyItem from '@components/notifications/NotifyItem.vue'

const { result } = useQuery<GetNotifies, GetNotifiesVariables>(
  GET_NOTIFIES,
  {
    filter: {
      sort: 'createdAt',
      limit: 10,
      page: 0,
      user: '114'
    }
  },
  {
    clientId: ApolloEnum.notify
  }
)

const notifies = usePick(result, [], (data) => data.getNotifies)
</script>

<style scoped></style>
