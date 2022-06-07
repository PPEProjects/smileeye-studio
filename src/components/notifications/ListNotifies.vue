<template>
  <div class="h-full overflow-y-auto">
    <ul id="listNotifies">
      <li
        v-for="(notify, index) in notifies"
        :key="index"
        class="border-b border-gray-50 last:border-0"
      >
        <NotifyItem :notify="notify" />
      </li>
    </ul>

    <vue-eternal-loading v-if="[...notifies].length" :load="infinieLoading">
      <template #loading>
        <div class="flex justify-center items-center py-3">
          <a-spin />
        </div>
      </template>

      <template #no-more>
        <div class="text-center py-3 uppercase text-gray-400">No More</div>
      </template>
    </vue-eternal-loading>
  </div>
</template>

<script setup lang="ts">
import { useQuery } from '@vue/apollo-composable'
import { LoadAction } from '@ts-pro/vue-eternal-loading'
import { GET_NOTIFIES } from '#notify/queries/notifies.query'
import {
  GetNotifies,
  GetNotifiesVariables
} from '#notify/queries/__generated__/GetNotifies'
import { ApolloEnum } from '@plugins/apollo'
import usePick from '@composables/usePick'
import NotifyItem from '@components/notifications/NotifyItem.vue'
import { useUserStore } from '@store/user'
import { ref } from 'vue'
import { SUB_NEW_NOTIFY } from '#notify/subscriptions/notify.subscription'
import {
  SubNotify,
  SubNotifyVariables
} from '#notify/subscriptions/__generated__/SubNotify'

const useUser = useUserStore()
const page = ref<number>(0)
const { result, fetchMore, subscribeToMore } = useQuery<GetNotifies, GetNotifiesVariables>(
  GET_NOTIFIES,
  {
    filter: {
      sort: 'createdAt',
      limit: 10,
      page: page.value,
      user: String(useUser.user?.id)
    }
  },
  {
    clientId: ApolloEnum.notify,
    fetchPolicy: 'network-only'
  }
)

const notifies = usePick(result, [], (data) => data.getNotifies)

const infinieLoading = async ({ loaded, noMore }: LoadAction) => {
  fetchMore({
    variables: {
      filter: {
        sort: 'createdAt',
        limit: 10,
        page: page.value + 1,
        user: String(useUser.user?.id)
      }
    },
    updateQuery: (previousQueryResult, { fetchMoreResult }) => {
      if (fetchMoreResult?.getNotifies?.length) {
        page.value++
        loaded()
      } else {
        noMore()
      }
      return {
        getNotifies: [
          ...previousQueryResult.getNotifies,
          ...(fetchMoreResult?.getNotifies || [])
        ]
      }
    }
  })
}

// Subscription
subscribeToMore<SubNotifyVariables, SubNotify>({
  document: SUB_NEW_NOTIFY,
  variables: {
    user: String(useUser.user?.id)
  },
  updateQuery: (previousQueryResult, { subscriptionData }) => {
    return {
      getNotifies: [subscriptionData.data.subNotify, ...previousQueryResult.getNotifies]
    }
  }
})

</script>

<style scoped></style>
