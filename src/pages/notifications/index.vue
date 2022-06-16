<template>
  <div class='flex h-body'>
    <div class='w-1/4 h-full'>

      <div class='relative h-full'>

        <tabs-animation
          class='h-full border-l border-gray-100 z-20'
          active='.tab-item.active'
          auto
          tab='.tab-item a'
        >

          <template #default>

            <li
              v-for='(item, index) in list' :key='index'
              class='tab-item'
              :class='{
                  "active": item.icon === currentTab.icon
              }'
            >
              <a
                class='animate block mr-4'
                :class='[ item.icon === currentTab.icon ? "translate-x-1" : "" ]'
                @click='changeTab(item)'
              >
                <div class='flex items-center py-5 pl-4'>
                  <img class='flex-shrink-0' width='35' height='35' :src='item.icon' alt='' />
                  <div class='ml-3 flex justify-center flex-col'>
                    <h4 class='text-[16px] font-medium mb-0'>{{ item.name }}</h4>
                    <sub class='mt-1 text-gray-400'>{{ item.note }}</sub>
                  </div>
                </div>
              </a>
            </li>

          </template>

        </tabs-animation>

        <span ref='tabLine' class='absolute tab-anime bg-primary-500 w-[3px] top-0 z-20'></span>
        <span ref='tabBackground' class='absolute tab-anime bg-primary-50 w-full _bg top-0 z-10'></span>

      </div>

    </div>
    <div class='w-3/4 h-full border-l border-gray-100 px-4'>
      <ListNotifies />
    </div>
  </div>

  <teleport-view to="#actions">
    <a-button type="danger" size="large" class="uppercase">
      Delete All
    </a-button>
  </teleport-view>

</template>

<script lang='ts' setup>

import { ref } from 'vue'
import ListNotifies from '@components/notifications/ListNotifies.vue'
import TabsAnimation from '@components/includes/TabsAnimation.vue'

interface ITab {
  name: string
  icon: string
  note: string
}

const list = [
  <ITab>{
    name: 'All',
    icon: '/images/notify/megaphone.png',
    note: 'Your notifies'
  },
  {
    name: 'Community',
    icon: '/images/notify/chat.png',
    note: 'From your student and friends'
  },
  {
    name: 'System',
    icon: '/images/notify/bolt.png',
    note: 'Payment, refund or from boss'
  }
]

let currentTab = ref<ITab>(list[0])

const changeTab = (tab: ITab) => {
  currentTab.value = tab
}

</script>

<script lang='ts'>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'NotificationsPage'
})
</script>
