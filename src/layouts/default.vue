<template>
  <div :id="String($route.name) || ''" class="bg-primary-50 text-slate-900">
    <div class="flex">
      <input
        id="sidebarInput"
        v-model="isOpen"
        type="checkbox"
        class="hidden"
      />

      <side-bar
        class="w-[280px] sidebar animate"
        :class="{
          'collapse': isOpen
        }"
      />

      <div class="w-full h-screen animate">
        <div
          class="h-[70px] w-full bg-white relative top-0 left-0 right-0 z-10 px-[32px] flex items-center"
        >
          <a
            v-if="!$route.meta.disableBack"
            id="back-button"
            class="text-base hover:text-theme-text text-theme-text flex items-center head-item"
            @click="$router.back()"
          >
            <svg class="fill-current" width="1em" height="1em">
              <use xlink:href="#i-back" />
            </svg>
          </a>

          <!-- Global Title -->
          <div v-if="$route.meta.title" class="ml-3 text-lg mr-auto head-item">
            {{
              /^\D*\.\D*$/.test($route.meta.title)
                ? t($route.meta.title)
                : $route.meta.title
            }}
          </div>
          <div
            v-show="!$route.meta.title"
            id="title"
            class="ml-3 text-lg mr-auto empty:hidden head-item"
          ></div>

          <div id="actions" class="flex items-center empty:hidden ml-auto"></div>
        </div>

        <div id="page-body" class="p-[32px] w-full overflow-y-auto">
          <div id="page-content" class="w-full bg-white p-[32px]">
            <router-view />
          </div>
        </div>
      </div>
    </div>
  </div>

  <update-language-modal />

</template>

<script lang="ts" setup>
import { nextTick, onMounted, ref, watch } from 'vue'

import SideBar from '@components/layout/SideBar.vue'
import { useRoute } from 'vue-router'
import { useSubscription } from '@vue/apollo-composable'
import { message } from 'ant-design-vue'

import { SUB_TOAST } from '#apollo/notify/subscriptions/toast.subscription'

import { useUserStore } from '@store/user'
import { ApolloEnum } from '@plugins/apollo'
import {
  SubToast,
  SubToastVariables
} from '#notify/subscriptions/__generated__/SubToast'
import { useLangs } from '@composables/useLangs'
import { useAnime } from '@composables/useAnime'
import UpdateLanguageModal from '@components/includes/UpdateLanguageModal.vue'

const { t } = useLangs()

const isOpen = ref<boolean>(false)
const anime = useAnime()
watch(isOpen, () => {
  if (!isOpen.value) {
    anime({
      targets: '.sidebar',
      width: [64, 280],
      duration: 1200
    })
  } else {
    anime({
      targets: '.sidebar',
      width: [280, 64],
      duration: 1200
    })
  }
})

const route = useRoute()

const autoSidebar = () => {
  if(route.meta.collapse && !isOpen.value) {
    isOpen.value = true
  }
}

onMounted(() => nextTick(() =>  setTimeout(() => autoSidebar(), 1500)))

watch(route, () => {
  autoSidebar()
  anime({
    /*targets: '#page-content',
    scale: [0.95, 1],
    opacity: [0, 1],
    // translateY: [-50, 0],
    duration: 1500,
    complete: () => autoSidebar()*/
  })
})

// User store
const useUser = useUserStore()

// Subnotify
const { result } = useSubscription<SubToast, SubToastVariables>(
  SUB_TOAST,
  {
    user: String(useUser.user?.id)
  },
  {
    clientId: ApolloEnum.notify
  }
)
watch(
  result,
  (data) => {
    if (data?.subToast) {
      if (data.subToast.error) {
        message.error(data.subToast.message)
      } else {
        message.success(data.subToast.message)
      }
    }
  },
  { deep: true }
)

// clernup khi logout
// useSubscription sẽ tự cleanup khi unmound
</script>

<style>
#page-body {
  height: calc(100vh - 70px);
}
#page-body > div {
  min-height: var(--height-container);
}
#sidebarInput:checked + div > ul .menu-item span {
  display: none;
}
#sidebarInput:checked + div > ul .menu-item > a {
  padding-left: calc(4px + 12px);
}
#sidebarInput:checked + div > .logo {
  opacity: 0;
  transform: scale(0);
}
#sidebarInput:not(:checked) + div > ._show_btn {
  opacity: 0;
  transform: scale(0);
}

#sidebarInput:checked + div ul.sub-nav .menu-item span {
  display: block;
}
</style>
