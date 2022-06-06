<template>
  <div
    class="bg-white h-screen flex-shrink-0 relative z-20 py-4 flex flex-col"
    style="
      box-shadow: 2px 0 8px rgb(0 0 0 / 4%), 12px 0 24px rgb(64 64 64 / 4%);
    "
  >
    <label
      class="absolute right-5 top-6 cursor-pointer logo"
      for="sidebarInput"
    >
      <svg width="18px" height="18px" fill="currentColor">
        <use xlink:href="#i-times" />
      </svg>
    </label>

    <label
      class="absolute left-[20px] top-6 cursor-pointer animate _show_btn"
      for="sidebarInput"
    >
      <svg width="24px" height="24px" fill="currentColor">
        <use xlink:href="#i-menu" />
      </svg>
    </label>

    <a
      class="hover:text-theme-text w-[56px] h-[56px] left-8 absolute logo animate"
      href="javascript:void(0)"
    >
      <h1>
        <svg width="56px" height="56px" fill="currentColor">
          <use xlink:href="#i-tagivi" />
        </svg>
      </h1>
    </a>

    <ul class="mt-20 nav-primary">
      <menu-item
        :active="/^dashboard/.test($route.name)"
        icon="#i-dashboard"
        label="Tổng Quan"
        to="/dashboard"
      />
      <menu-item
        :active="/^(stories|story|chapter|publish)/.test($route.name)"
        icon="#i-workspace"
        label="Tác Phẩm"
        to="/stories"
      />

      <menu-item
        :active="/^(draggable)/.test($route.name)"
        icon="#i-trail"
        label="Draggable"
        to="/draggable"
      />

      <menu-item
        :active="/^(cropper|banners|categories)/.test($route.name)"
        label="Tools"
        icon="#i-hammer"
      >
        <template #default>
          <ul
            class="bg-white absolute w-[280px] right-0 left-full top-0 sub-nav py-3 -ml-3 -mt-3 rounded"
          >
            <menu-item
              :active="/^(croper)/.test($route.name)"
              icon="#i-crop"
              label="Crop Image"
              to="/cropper"
            />
            <menu-item
              :active="/^(banners)/.test($route.name)"
              icon="#i-chart"
              label="Analytics"
              to="/banners"
            />
            <menu-item
              :active="/^(categories)/.test($route.name)"
              icon="#i-extentions"
              label="Thể Loại"
              to="/categories"
            />
          </ul>
        </template>
      </menu-item>
    </ul>

    <ul class="mt-auto relative">
      <menu-item :active="/^settings/.test($route.name)" label="Cài Đặt">
        <template #icon>
          <img
            class="w-[24px] h-[24px] rounded-md"
            :src="
              useUser.user?.avatar ||
              'https://user-pic.webnovel.com/userheadimg/4308112429-10/100.jpg?1591111535475'
            "
            alt=""
          />
        </template>

        <template #default>
          <ul
            class="bg-white absolute w-[280px] right-0 left-full top-0 sub-nav py-3 -ml-3 -mt-3 rounded"
          >
            <menu-item
              icon="#i-logout"
              label="Đăng Xuất"
              @click.prevent="logOut()"
            />
          </ul>
        </template>
      </menu-item>

      <menu-item
        :active="/^(notifications)/.test($route.name)"
        label="Thông Báo"
        to="/notifications"
      >
        <template #icon>
          <div class="relative">

            <svg
              width="24px"
              height="24px"
              fill="currentColor"
              class="relative"
            >
              <use xlink:href="#i-chatbubble" />
            </svg>

            <div v-if='countNotify' class='absolute right-0 top-0'>
              <span class="flex h-2 w-2 relative">
                <span
                  class="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"
                ></span>
                <span
                  class="relative inline-flex rounded-full h-2 w-2 bg-red-500"
                ></span>
              </span>
            </div>

          </div>
        </template>
      </menu-item>
    </ul>

    <div class="px-7 -mt-2 horizontal-menu">
      <div class="border-t flex items-center pt-5">
        <button class="menu-bottom" @click="$router.push('/notifications')">
          <svg width="24px" height="24px" fill="currentColor">
            <use xlink:href="#i-flag" />
          </svg>
        </button>

        <button class="mx-auto menu-bottom">
          <svg width="24px" height="24px" fill="currentColor">
            <use xlink:href="#i-discord" />
          </svg>
        </button>

        <button class="menu-bottom" @click="toHome()">
          <svg width="24px" height="24px" fill="currentColor">
            <use xlink:href="#i-home" />
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import MenuItem from '@components/layout/MenuItem.vue'
import { inject, nextTick, onMounted } from 'vue'
import { AnimeInstance } from '#types/anime'
import { VueCookies } from 'vue-cookies'
import { useRouter } from 'vue-router'
import { useUserStore } from '@store/user'
import { message } from 'ant-design-vue'
import { useQuery } from '@vue/apollo-composable'
import {
  CountUnReadNotify,
  CountUnReadNotifyVariables
} from '#apollo/notify/queries/__generated__/CountUnReadNotify'
import { GET_COUNT_UNSREAD } from '#apollo/notify/queries/notifies.query'
import usePick from '@composables/usePick'

const toHome = () => {
  ///
}

const router = useRouter()
const cookies = inject<VueCookies>('$cookies')!

const useUser = useUserStore()

const logOut = () => {
  cookies.remove('_token')
  useUser.logout()
  router.replace('/')
  message.success('Bạn biệt bạn trẻ')
}

const anime = inject<AnimeInstance>('anime')!

const playAnimation = () => {
  anime({
    targets: ['.logo h1', '.menu-item'],
    opacity: [0, 1],
    translateY: [-70, 0],
    duration: 1200,
    delay: function (el, i) {
      return i * 100
    }
  })
  anime({
    targets: ['.head-item', '#actions', '.menu-bottom'],
    opacity: [0, 1],
    translateX: [-50, 0],
    duration: 1200,
    delay: function (el, i) {
      return 700 + i * 100
    }
  })
}

onMounted(() => nextTick(() => playAnimation()))

//Notify
const { result } = useQuery<CountUnReadNotify, CountUnReadNotifyVariables>(
  GET_COUNT_UNSREAD,
  {
    user: String(useUser.user?.id)
  },
  {
    clientId: 'notify'
  }
)
const countNotify = usePick(result, 0, (data) => data.countUnReadNotify)
</script>
