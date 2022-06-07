<template>
  <div class='flex h-body'>
    <div class='w-1/4 h-full'>

      <div class='relative h-full'>

        <ul id='listTab' class='h-full border-l border-gray-100 relative z-20'>
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
        </ul>

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

import { inject, nextTick, onMounted, ref } from 'vue'
import { AnimeInstance } from '#types/anime'
import ListNotifies from '@components/notifications/ListNotifies.vue'

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

// animate
const anime = inject<AnimeInstance>('anime')!
const tabLine = ref<HTMLDivElement>()

const tabAnimation = () => {
  const $parent = document.querySelector('#listTab')!
  const $active = $parent.querySelector<HTMLDivElement>('.active')
  if(!$active) {
    // Không có tab active ==> ko thể xảy ra
    return
  }
  // height của active
  const height = $active.scrollHeight
  // offset top với container
  const offsetTop = $active.offsetTop

  /**
   * Animation thay đổi:
   * 1. Offset + height của line
   * 2. Offser + height của tab
   * Note: Cả 2 element support animation để có độ cao và offset giống nhau...chỉ khác độ rộng => chỉnh nó bằng css
   */
  anime({
    targets: '.tab-anime',
    height: [tabLine.value?.scrollHeight, height],
    top: [tabLine.value?.offsetTop, offsetTop]
  })
}

const changeTab = (tab: ITab) => {
  currentTab.value = tab
  // khi đổi tab => animation
  nextTick(() => tabAnimation())
}

// first setup
onMounted(() => nextTick(() => tabAnimation()))

</script>

<script lang='ts'>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'NotificationsPage'
})
</script>
