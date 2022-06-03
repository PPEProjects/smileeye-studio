<template>
  <div class="flex items-center justify-center flex-col">

    <template v-if="show">
      <vue-lottie-player
          path="https://assets8.lottiefiles.com/packages/lf20_7jnffdxl.json"
          :width="350"
          :height="350"
          :loop="true"
      ></vue-lottie-player>

      <div class="text-gray-500 text-sm">Này anh bạn...có đi nhầm tới đâu rồi không?</div>
    </template>

    <teleport-view to="#title">
      Not Found
    </teleport-view>

  </div>
</template>

<script setup lang="ts">
import {nextTick, onMounted, ref} from "vue";

const show = ref(false)

onMounted(() => setTimeout(() => {
  show.value = true
}, 200))

</script>
