<template>
  <modal-base ref="modal" event="authModal" :max-width="450" title="Sign in" :can-cancel="false">
    <template #default>

      <div style='width: 250px; height: 200px' class='mx-auto'>

        <vue-lottie-player width='250px' height='200px' loop path="https://assets5.lottiefiles.com/packages/lf20_bcjfw1k6.json" />

      </div>

      <div class="text-center">
        <small class="text-xs italic opacity-90 text-gray-400">{{ t('auth.welcome') }}</small>
      </div>
      <form id="authForm" class="max-w-xs mx-auto mt-4">


        <text-field v-model:value="email" placeholder="Email ID">

          <template #prefix>
            <svg width="18" height="18" class="fill-current text-gray-400">
              <use xlink:href="#i-email" />
            </svg>
          </template>

        </text-field>

        <text-field v-model:value="password" placeholder="Password" type="password" class="mt-3">

          <template #prefix>
            <svg width="18" height="18" class="fill-current text-gray-400">
              <use xlink:href="#i-password" />
            </svg>
          </template>

          <template #suffix>
            <a class="block text-xs text-primary-500 ml-3 cursor-pointer flex-shrink-0">Quên Mật Khẩu?</a>
          </template>

        </text-field>

        <div class="text-xs text-center my-1">
          <p class="text-gray-400">Chưa Có Tài Khoản?
            <a class="text-primary-500 cursor-pointer ml-1">Đăng Ký Ngay</a>
          </p>
        </div>


        <button-base
            class="p-2 w-full mt-3"
            type="submit"
            :callback="login"
            :disabled="!isReady"
        >
          Đăng Nhập
        </button-base>

        <div>
          <div class="flex items-center mt-5">
            <span class="w-full h-px bg-gray-200" />
            <span class="flex-shrink-0 text-xs font-medium text-gray-400 mx-3">HOẶC TIẾP TỤC VỚI</span>
            <span class="w-full h-px bg-gray-200" />
          </div>
          <div class="flex items-center justify-center mt-5">
            <button class="scale-95 transform mx-3">
              <img width="25" height="25" src="/images/logo/gg.png" alt="">
            </button>
            <button class="mx-3 transform -translate-y-0.5">
              <img src="/images/logo/apple.png" alt="" class="h-[25px] w-auto object-cover">
            </button>
          </div>
        </div>
      </form>
      <div class="text-xs text-center mt-8 text-gray-400">
        <span class="mr-1">© 2021 Comix</span>
        <i>|</i>
        <span class="mx-1">Terms of Service</span>
        <i>|</i>
        <span class="ml-1">Privacy Policy</span>
      </div>
    </template>
  </modal-base>
</template>

<script setup lang="ts">
import ModalBase from "./ModalBase.vue";
import {onMounted, ref, nextTick, computed, inject} from "vue";
import TextField from "../form/TextField.vue";
import ButtonBase from "../includes/ButtonBase.vue";
import {AxiosInstance} from "axios";
import {VueCookies} from "vue-cookies";
import {useUserStore} from "@store/user";
import {useRouter} from "vue-router"
import { message } from 'ant-design-vue'
import { useI18n } from 'vue-i18n'

const modal = ref<any>(null)

onMounted(() => {
  nextTick(() => {
    modal.value?.init()
  })
})

const { t } = useI18n()


// Form data
const email = ref<string>('')
const password = ref<string>('')

// active button
const isReady = computed(() => email.value && password.value)

// Support login action
const router = useRouter()
const $axios = inject<AxiosInstance>('$axios')!
const cookies = inject<VueCookies>('$cookies')
const useUser = useUserStore()

// Thông báo

/**
 * Lưu token vào cookie
 * Gi token vào store vad redirect đến trang chủ
 */
const login = async () => {
  try {
    const { data } = await $axios.post('/smileeye/ppe-core/auth/login', { email: email.value, password: password.value })
    cookies?.set('_token', data.token)
    useUser.setToken(data.token)
    useUser.setUser(data)
    await router.replace('/dashboard')
    message.success('Đăng nhập thành công')
  } catch (e) {
    message.error('Kiểm tra thông tin của bạn')
  }
}

// eslint-disable-next-line no-undef
defineExpose({
  email,
  password
})

</script>
