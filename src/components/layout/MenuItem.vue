<template>
  <li
      class="menu-item relative"
      :class="{
      '_has_children': $slots['default']
    }"
      @mouseenter="showSubMenu = true"
      @mouseleave="showSubMenu = false"
  >
    <a
        class="pl-7 flex items-center text-theme-text hover:text-theme-text animate h-[56px] border-l-4"
        :class="{
          'border-primary-500 bg-primary-50': active,
          'border-transparent hover:bg-primary-50': !active,
          '_parent_menu': $slots['default']
      }"
        @click="to ? $router.push(to) : null"
    >
      <slot name="icon"></slot>
      <svg
          v-if="!$slots['icon']"
          width="24px"
          height="24px"
          fill="currentColor"
      >
        <use
            :xlink:href="icon"
        />
      </svg>
      <span class="text-[18px] ml-4">{{ label }}</span>

      <span v-if="$slots['default']" role="img" class="anticon g_sd_i_sub ml-auto mr-7">
        <svg width="1em" height="1em" fill="currentColor">
          <use xlink:href="#i-ar_s"></use>
        </svg>
      </span>

    </a>

    <transition name="menuX">
      <slot v-if="showSubMenu"></slot>
    </transition>

  </li>
</template>

<script setup lang="ts">

import {ref} from "vue";

defineProps({
      active: {
        type: Boolean,
        default: false
      },
      to: {
        type: String,
        default: ''
      },
      icon: {
        type: String,
        default: null
      },
      label: {
        type: String,
        required: true
      }
    }
)

const showSubMenu = ref<boolean>(false)

</script>
