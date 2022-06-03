<template>
  <draggable-nested :tasks="list"/>
</template>

<script lang="ts" setup>

import {ref} from "vue";
import DraggableNested from "@components/draggable/DraggableNested.vue";

const list = ref([
  {
    name: "task 1",
    tasks: [
      {
        name: "task 2",
        tasks: []
      }
    ]
  },
  {
    name: "task 3",
    tasks: [
      {
        name: "task 4",
        tasks: []
      }
    ]
  },
  {
    name: "task 5",
    tasks: []
  }
])
</script>

<script lang="ts">
import {defineComponent} from "vue";

export default defineComponent({
  name: "DraggablePage"
})
</script>
