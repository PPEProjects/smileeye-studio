<template>
  <modal-base event='updateLangsModal' :title='t("sidebar.settings.languages")' :max-width='400'>

    <div class='flex items-center'>
      <div
        v-for='lang in list'
        :key='lang.value'
        class='h-[25px] mr-4 cursor-pointer border-2'
        :class='{
           "border-transparent": locale !== lang.value,
           "border-primary-500": locale === lang.value
        }'
        @click='locale = lang.value'
      >
        <img class='w-full h-full object-cover' :src='lang.img' alt='' />
      </div>
    </div>

    <p class='mt-3 text-gray-400'>
      {{ t("settings.language.guide") }}
    </p>

  </modal-base>
</template>

<script lang='ts' setup>
import ModalBase from '../modal/ModalBase.vue'
import { reactive } from 'vue'
import { useI18n } from 'vue-i18n'

const { t, locale } = useI18n()

const list = reactive([
  {
    value: 'vi',
    img: '/images/vn.png'
  },
  {
    value: 'en',
    img: '/images/usa.png'
  }
])

</script>
