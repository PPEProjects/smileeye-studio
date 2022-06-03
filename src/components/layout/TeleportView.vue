<template>
  <Teleport :to="to" v-if="isMounted"><slot></slot></Teleport>
</template>

<script lang="ts" setup>
import {nextTick, onMounted, ref} from "vue";

defineProps({
  to: {
    type: String,
    required: true
  }
})

const isMounted = ref(false)

onMounted(() => nextTick(() => isMounted.value = true))

</script>
