<template>
  <draggable
      class="dragArea"
      tag="ul"
      :list="node"
      :group="{ name: 'g1' }"
      item-key="name"
  >
    <template #item="{ element }">
      <li>
        <p>{{ element.name }}</p>
        <slot name='node' :element='element'></slot>
        <draggable-nested v-if='element.children' :node="element.children"/>
      </li>
    </template>
  </draggable>
</template>

<script lang="ts">
import {defineComponent} from "vue"
import draggable from 'vuedraggable'

export default defineComponent({
  name: "DraggableNested",
  components: {
    draggable
  },
  props: {
    node: {
      required: true,
      type: Array
    }
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
