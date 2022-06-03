<template>
  <draggable
      class="dragArea"
      tag="ul"
      :list="tasks"
      :group="{ name: 'g1' }"
      item-key="name"
  >
    <template #item="{ element }">
      <li>
        <p>{{ element.name }}</p>
        <draggable-nested :tasks="element.tasks"/>
      </li>
    </template>
  </draggable>
</template>

<script lang="ts">
import {defineComponent} from "vue"
import draggable from 'vuedraggable'

export default defineComponent({
  name: "DraggableNested",
  props: {
    tasks: {
      required: true,
      type: Array
    }
  },
  components: {
    draggable
  }
})
</script>

<style scoped>
.dragArea {
  min-height: 50px;
  outline: 1px dashed;
  padding-left: 40px;
}
</style>
