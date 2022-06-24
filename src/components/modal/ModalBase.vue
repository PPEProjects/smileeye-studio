<template>
  <teleport to="body">
    <div
      :id="event"
      class="fixed flex h-full items-center justify-center top-0 w-full z-50 transition duration-500 ease-in-out left-0"
      :class="{
        'invisible opacity-0': !_visible
      }"
      :style='{ zIndex }'
    >
      <a
        v-if="canCancel"
        class="absolute top-0 left-0 w-full h-full close-overlay cursor-pointer bg-[#00000040]"
        title="Close"
        @click="dispose()"
      />
      <div
        :id="`${event}Body`"
        ref="body"
        class="border-primary-600 border-t-4 modal-content relative pt-7 pb-5 w-full bg-white mx-3 sm:mx-0 overflow-hidden relative shadow-lg"
        :style="{
          maxWidth: maxWidth + 'px'
        }"
      >
        <a
          v-if="canCancel"
          class="-translate-x-7 z-10 absolute close-button right-0 text-xl top-0 transform translate-y-5 cursor-pointer text-gray-600 hover:text-gray-600"
          @click="dispose()"
        >
          <svg
            ref="closeButton"
            class="fill-current opacity-0"
            width="18"
            height="18"
          >
            <use xlink:href="#i-times" />
          </svg>
        </a>

        <div class="px-7">
          <h4
            v-if="title"
            class="font-semibold text-gray-600 text-lg lg:text-2xl pb-1"
          >
            {{ title }}
          </h4>

          <div
            :id="`${event}Content`"
            class="max-h-screen-80 overflow-y-auto overflow-x-hidden scrollbar-none __base-content"
            :class="{
              'opacity-0': !_visible
            }"
          >
            <slot :show="_visible" :data="data" />
          </div>
        </div>

        <div v-if="$slots['bottom']" class="px-7 relative">
          <div class="w-full h-px bg-gray-200 mt-3.5 mb-3" />

          <slot name="bottom" />
        </div>
      </div>
    </div>
  </teleport>
</template>

<script setup lang="ts">
import { nextTick, onMounted, onUnmounted, ref, watch } from 'vue'
import { useEmitter } from '@nguyenshort/vue3-mitt'
import { useAnime } from '@composables/useAnime'

type Props = {
  visible?: boolean
  event: string
  title?: string
  maxWidth?: number
  canCancel?: boolean,
  zIndex?: number
}
const props = withDefaults(defineProps<Props>(), {
  visible: false,
  title: '',
  maxWidth: 550,
  canCancel: true,
  zIndex: 1000
})

// ẩn hiện modal
const _visible = ref<boolean>(false)
// lắng nghe props visible => update lại _visible. Vì visible là optional
watch(() => props.visible, () => _visible.value = props.visible)

// Ref DOM
const body = ref<HTMLDivElement>()
const closeButton = ref<SVGElement>()

// Dữ liệu tuỳ chỉnh modal. có thể nhận tự động qua mitter
const data = ref(null)

// Define emit to parent event
const emit = defineEmits<{
  (e: 'update:visible', value: boolean): void,
  (e: 'init', data: any): void
}>()

// Lắng nghe visible để binding 2 chiều và do animation
const anime = useAnime()
watch(_visible, (value) => {
  // Binding 2 chiều
  emit('update:visible', value)
  if (value) {
    anime({
      targets: body.value,
      scale: [0.9, 1],
      opacity: [0, 1],
      duration: 1500
    })

    anime({
      targets: closeButton.value,
      scale: [0, 1],
      opacity: [0, 1],
      delay: 500,
      duration: 1500
    })
  }
})

// Đóng modal
const dispose = () => {
  _visible.value = false
}

// Mở modal
const init = () => {
  emit('init', data.value)
  _visible.value = true
}

// Init value => mở modal để value default là true
onMounted(() => nextTick(() => props.visible && init() ))

// Init, Dispose from mitter
const mitter = useEmitter<{
  [key: string]: string
}>()

// Khi mound component nếu có event => lắng nghe event

onMounted(() => {
  if(props.event) {
    mitter.on(props.event, (_data: any) => {
      data.value = _data
      init()
    })
    mitter.on(props.event + 'Dispose', () => dispose())
  }
})

// Huỷ event khi destroy component để tránh memory leak
onUnmounted(() => {
  if(props.event) {
    mitter.off(props.event)
    mitter.off(props.event + 'Dispose')
  }
})

// Public các method, state trong setup script
defineExpose({
  visible: _visible,
  closeButton,
  body,
  data,
  dispose,
  init
})
</script>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'ModalBase'
})
</script>

<style>
.__base-content > form {
  margin-bottom: -1.25rem;
}
</style>
