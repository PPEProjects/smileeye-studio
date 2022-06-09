<template>
  <div
      :id="event"
      class="fixed flex h-full items-center justify-center top-0 w-full z-50 transition duration-500 ease-in-out left-0"
      :class="{
      'invisible opacity-0': !_useModal.open.value
    }"
  >
    <a v-if="canCancel" class="absolute top-0 left-0 w-full h-full close-overlay cursor-pointer" title="Close" @click="_useModal.dispose()" />
    <div
        :id="`${event}Body`"
        :ref="(el) => _useModal.body.value = el"
        class="border-primary-600 border-t-4 modal-content relative py-7 w-full bg-white mx-3 sm:mx-0 overflow-hidden relative"
        :style="
        {
          maxWidth: maxWidth + 'px'
        }
      "
    >
      <a v-if="canCancel" class="-translate-x-7 z-10 absolute close-button right-0 text-xl top-0 transform translate-y-5 cursor-pointer" @click="_useModal.dispose()">
        <svg :ref="(el) => _useModal.closeButton.value = el" class="fill-current opacity-0" width="18" height="18">
          <use xlink:href="#i-times" />
        </svg>
      </a>

      <div class="px-7">
        <h4
            v-if="title"
            class="font-semibold text-gray-600 text-xl lg:text-2xl pb-1"
        >
          {{ title }}
        </h4>

        <div
            :id="`${event}Content`"
            class="max-h-screen-80 overflow-y-auto overflow-x-hidden scrollbar-none"
        >
          <slot :show="_useModal.open.value" :data="_useModal.data.value" />
        </div>
      </div>

      <div v-if="$slots['bottom']" class="px-7 relative">
        <div class="w-full h-px bg-gray-200 mt-3.5 mb-3" />

        <slot name="bottom" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">

import {useModal} from '@composables/useModal';

defineProps({
  event: {
    type: String,
    required: true
  },
  title: {
    type: String,
    default: null
  },
  maxWidth: {
    type: Number,
    default: 550
  },
  canCancel: {
    type: Boolean,
    default: true
  }
})

const _useModal = useModal()

defineExpose({
  ..._useModal
})

</script>

<script lang="ts">
export default {
  name: 'ModalBase'
}
</script>
