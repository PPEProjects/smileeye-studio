<template>
  <Teleport v-if="isMounted" :to="to"><slot></slot></Teleport>
</template>

<script lang="ts" setup>
import {nextTick, onMounted, ref } from "vue";

// eslint-disable-next-line no-undef
const props = defineProps({
  to: {
    type: String,
    required: true
  }
})

const isMounted = ref(false)


const setupView = () => {
  const $el = document.querySelector(props.to)
  if(!$el) {
    console.error('Selector ' + props.to + ' not found!!')
    return
  }
  isMounted.value = true
}

onMounted(() => nextTick(() => setupView()))

</script>
