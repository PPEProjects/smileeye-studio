<template>
  <div>

    <teleport-view to="#title">
      Dashboard
    </teleport-view>

  </div>
</template>

<script lang="ts">
import {defineComponent} from "vue"

export default defineComponent({
  name: "DashboardPage"
})
</script>
