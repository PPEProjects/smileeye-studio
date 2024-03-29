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
        <div class="w-[56px] h-[56px] relative overflow-hidden" @click='partyMenu'>
          <vue-lottie-player
            id="logo-animation"
            name="logo-animation"
            :width="56"
            :height="56"
            path="/json/open-book.json"
            @render="setAnime"
            @mouseenter="hoverLogo"
          />
        </div>
      </h1>
    </a>

    <ul class="mt-20 nav-primary">
      <menu-item
        :active="/^dashboard/.test($route.name)"
        icon="#i-dashboard"
        :label="t('sidebar.dashboard')"
        to="/dashboard"
      />
      <menu-item
        :active="/^(goals)/.test($route.name)"
        icon="#i-workspace"
        :label="t('sidebar.workspace')"
        to="/goals"
      />

      <menu-item
        :active="/^(payment)/.test($route.name)"
        icon="#i-income"
        :label="t('sidebar.payment')"
      >
        <template #default>
          <ul
              class="bg-white absolute w-[280px] right-0 left-full top-0 sub-nav py-3 -ml-3 -mt-3 rounded"
          >
            <menu-item
                :active="/^(payment)\/activity/.test($route.name)"
                icon="#i-income"
                :label="t('sidebar.payment')"
                to="/payment/activity"
            />

            <menu-item
                :active="/^(payment)\/history/.test($route.name)"
                icon="#i-trash-bin"
                label="Lịch Sử"
                to="/payment/history"
            />

          </ul>
        </template>
      </menu-item>

      <menu-item
        :active="/^(users)/.test($route.name)"
        icon="#i-group"
        :label="t('sidebar.members.members')"
        to="/users"
      />

      <menu-item
        :active="/^(coupon|banners|categories)/.test($route.name)"
        label="Tools"
        icon="#i-hammer"
      >
        <template #default>
          <ul
            class="bg-white absolute w-[280px] right-0 left-full top-0 sub-nav py-3 -ml-3 -mt-3 rounded"
          >
            <menu-item
              :active="/^(coupon)/.test($route.name)"
              icon="#i-love-card"
              :label="t('sidebar.coupon')"
              to="/coupon"
            />

            <menu-item
              :active="/^(settings)/.test($route.name)"
              icon="#i-extentions"
              :label="t('sidebar.config')"
              to="/settings"
            />
          </ul>
        </template>
      </menu-item>
    </ul>

    <ul class="mt-auto relative">
      <menu-item
        :active="/^settings/.test($route.name)"
        :label="t('sidebar.settings.settings')"
      >
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
              icon="#i-langs"
              :label="t('sidebar.settings.languages')"
              @click.prevent="$emitter.emit('updateLangsModal')"
            />
            <menu-item
              icon="#i-logout"
              :label="t('sidebar.settings.logout')"
              @click.prevent="logOut()"
            />
          </ul>
        </template>
      </menu-item>

      <menu-item
        :active="/^(notifications)/.test($route.name)"
        :label="t('sidebar.notify')"
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

            <div v-if="countNotify" class="absolute right-0 top-0">
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

        <button class="menu-bottom cursor-pointer" @click="toHome()">
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
import { inject, nextTick, onMounted, ref, watch } from 'vue'
import { VueCookies } from 'vue-cookies'
import { useRouter } from 'vue-router'
import { useUserStore } from '@store/user'
import { message } from 'ant-design-vue'
import { useQuery, useSubscription } from '@vue/apollo-composable'
import { GET_COUNT_UNSREAD } from '#apollo/notify/queries/notifies.query'
import {
  CountUnReadNotify,
  CountUnReadNotifyVariables
} from '#notify/queries/__generated__/CountUnReadNotify'
import {
  SubCountUnRead,
  SubCountUnReadVariables
} from '#notify/subscriptions/__generated__/SubCountUnRead'
import { SUB_COUNT_UNREAD } from '#notify/subscriptions/notify.subscription'
import { ApolloEnum } from '@plugins/apollo'
import { useSmileeye } from '#apollo/client/smileeye'
import { AnimationItem } from 'lottie-web'
import party from 'party-js'
import { useAnime } from '@composables/useAnime'
import { useI18n } from 'vue-i18n'
const { t } = useI18n()

const toHome = () => {
  window.location.href = 'https://v2.smileeye.edu.vn/goals'
}

const router = useRouter()
const cookies = inject<VueCookies>('$cookies')!

const useUser = useUserStore()

const logOut = () => {
  cookies.remove('_token')
  useUser.logout()
  router.replace('/')
  message.success('Tạn biệt bạn trẻ')
}

const anime = useAnime()

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
const countNotify = ref<number>(0)
const { onResult } = useQuery<CountUnReadNotify, CountUnReadNotifyVariables>(
  GET_COUNT_UNSREAD,
  {
    user: String(useUser.user?.id)
  },
  {
    clientId: ApolloEnum.notify
  }
)

onResult((value) => {
  countNotify.value = value.data.countUnReadNotify
})

// Sub countNotify
const { result: obs } = useSubscription<
  SubCountUnRead,
  SubCountUnReadVariables
>(
  SUB_COUNT_UNREAD,
  {
    user: String(useUser.user?.id)
  },
  {
    clientId: ApolloEnum.notify
  }
)

// lắng ghe subsription và gi data
const smileeye = useSmileeye()
watch(
  obs,
  (value) => {
    if (value?.subCountUnRead) {
      smileeye.writeQuery<CountUnReadNotify, CountUnReadNotifyVariables>({
        query: GET_COUNT_UNSREAD,
        variables: {
          user: String(useUser.user?.id)
        },
        data: {
          countUnReadNotify: value?.subCountUnRead?.count
        }
      })
      countNotify.value = value?.subCountUnRead?.count
    }
  },
  { deep: true }
)

const logoAnime = ref<AnimationItem>()
const setAnime = (instance: AnimationItem) => {
  logoAnime.value = instance
}

const hoverLogo = () => {
  if (logoAnime.value) {
    logoAnime.value.loop = true
    logoAnime.value?.play()
    logoAnime.value?.addEventListener('loopComplete', () => {
      logoAnime.value!.loop = false
      logoAnime.value?.pause()
    })
  }
}

const partyMenu = () => {
  const _logo = document.querySelector<HTMLDivElement>('#logo-animation')
  if(_logo) {
    party.confetti(_logo, {
      count: party.variation.range(20, 40)
    })
  }
}
</script>

<style>
div#logo-animation {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) scale(2.5);
}
</style>
