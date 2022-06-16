<template>
  <component :is="tag" ref="$container" class="__tab-animation relative">

    <slot :change='changeTab'></slot>

    <span
      ref="tabLine"
      class="absolute tab-anime bg-primary-500 z-20 left-0"
      :class='[direction === "verical" ? "top-0" : "bottom-0"]'
      :style='style'
    />
    <span
      ref="tabBackground"
      class="absolute tab-anime bg-primary-50 _bg top-0 z-10"
      :class='[direction === "verical" ? "w-full" : "h-full"]'
    />

  </component>
</template>

<script setup lang="ts">
import { computed, inject, nextTick, onMounted, ref, CSSProperties } from 'vue'
import { AnimeInstance } from '#types/anime'
import { useEventListener } from '@vueuse/core'

const props = withDefaults(
  defineProps<{
    tag?: string
    tab?: string
    direction?: 'horizontal' | 'verical'
    throttle?: number
    active: string
    auto?: boolean
  }>(),
  {
    tag: 'ul',
    direction: 'verical',
    throttle: 3,
    tab: undefined,
    auto: false
  }
)

// Validate
if(props.auto && !props.tab) {
  console.warn('[tab] is required when [auto] is true')
}

const style = computed<CSSProperties>(() => ({
  [props.direction === 'verical' ? 'width' : 'height']: props.throttle + 'px'
}))

const anime = inject<AnimeInstance>('anime')!

const $container = ref<HTMLDivElement>()
const tabLine = ref<HTMLDivElement>()

const tabAnimation = () => {
  const $active = $container.value?.querySelector<HTMLDivElement>(props.active)
  if (!$active) {
    // Không có tab active ==> ko thể xảy ra
    return
  }

  if(props.direction === 'verical') {
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
      targets: $container.value?.querySelectorAll('.tab-anime'),
      height: [tabLine.value?.scrollHeight, height],
      top: [tabLine.value?.offsetTop, offsetTop]
    })
  } else {
    // width của active
    const width = $active.scrollWidth
    // offset top với container
    const offsetLeft = $active.offsetLeft

    /**
     * Animation thay đổi:
     * 1. Offset + height của line
     * 2. Offser + height của tab
     * Note: Cả 2 element support animation để có độ cao và offset giống nhau...chỉ khác độ rộng => chỉnh nó bằng css
     */
    anime({
      targets: $container.value?.querySelectorAll('.tab-anime'),
      width: [tabLine.value?.scrollWidth, width],
      left: [tabLine.value?.offsetLeft, offsetLeft]
    })
  }
}

const changeTab = () => {
  nextTick(() => tabAnimation())
}

// first setup
onMounted(() => nextTick(() => {

  // first animation
  tabAnimation()

  // auto animation
  if(props.auto && props.tab) {
    $container.value?.querySelectorAll(props.tab).forEach(($el) => {
      useEventListener($el, 'click', () => changeTab())
    })
  }
}))
</script>


<style>
.__tab-animation > *:not(.tab-anime) {
  position: relative;
  z-index: 30;
}
</style>
