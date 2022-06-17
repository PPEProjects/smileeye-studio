<template>
  <draggable
    ref="el"
    class="goal-node before:z-10"
    :component-data="{
      tag: 'ul',
      type: 'transition-group',
      name: !drag ? 'flip-list' : null
    }"
    :list="node"
    item-key="id"
    v-bind="dragOptions"
    @start="drag = true"
    @end="drag = false"
  >
    <template #item="{ element }">
      <div
        class="relative z-20 goal-node-item"
        :class="{
          __expand: expaned.includes(String(element.id)),
          _has_children: element.children
        }"
        :data-key="element.id"
      >
        <div class="goal-node-content">
          <div class="line-horizontal" />

          <template v-if="element.children?.length">
            <label class="__expand-button block cursor-pointer">
              <input
                :id="'expaned' + element.id"
                v-model="expaned"
                name="expaned"
                type="checkbox"
                class="hidden"
                :value="String(element.id)"
              />
              <arrows-alt-outlined
                v-if="!expaned.includes(String(element.id))"
              />
              <shrink-outlined v-else />
            </label>
          </template>

          <h3 class="text-primary-500 line-clamp-1">{{ element.name }}</h3>
        </div>

        <template
          v-if="element.children && expaned.includes(String(element.id))"
        >
          <goal-node
            :node="element.children"
            :class="{
              _has_children: element.children
            }"
            :data-id="element.id"
          />
        </template>
      </div>
    </template>
  </draggable>
</template>

<script lang="ts">
import { defineComponent, inject, ref } from 'vue'
import draggable from 'vuedraggable'
import { useElementSize } from '@vueuse/core'
import { ArrowsAltOutlined, ShrinkOutlined } from '@ant-design/icons-vue'

export default defineComponent({
  name: 'GoalNode',
  components: {
    draggable,
    ArrowsAltOutlined,
    ShrinkOutlined
  },
  props: {
    node: {
      required: true,
      type: Array
    }
  },
  setup() {
    const el = ref(null)
    const { width, height } = useElementSize(el)
    const expaned = inject<string[]>('expanded')
    const drag = ref<boolean>(false)

    return {
      el,
      width,
      height,
      expaned,
      drag
    }
  },
  computed: {
    dragOptions() {
      return {
        animation: 200,
        group: "description",
        disabled: false
      };
    }
  }
})
</script>

<style scoped>
.goal-node {
  @apply ml-20 relative;
}

.goal-node-content {
  @apply px-4 py-2 bg-primary-50 border-2 border-primary-500 rounded-md mb-4 w-fit shadow shadow-primary-200 h-11 relative;
}

.goal-node:before {
  content: '';
  position: absolute;
  height: calc(100% - 2.75rem);
  width: 2px;
  background: #3b66f4;
  left: -3rem;
  top: 50%;
  transform: translateY(-50%);
}

.line-horizontal {
  position: absolute;
  background: #3b66f4;
  height: 2px;
  width: 3rem;
  left: -3rem;
  top: 50%;
  transform: translateY(-50%);
}
.__goal-tree .sortable-drag:before {
  content: '';
  position: absolute;
  height: calc(100% - 2.75rem);
  width: 2px;
  background: #3b66f4;
  left: 2rem;
  top: 50%;
  transform: translateY(-50%);
}
.__expand-button {
  position: absolute;
  left: calc(-3rem - 0.85rem);
  top: 50%;
  transform: translateY(-50%);
}
.__expand-button {
  @apply bg-primary-50 border-2 text-primary-600 border-primary-500 rounded-full shadow-primary-200 shadow w-6 h-6 text-xs flex justify-center items-center z-20;
}
.goal-node-item > .goal-node-content:before {
  content: '';
  position: absolute;
  height: 100%;
  width: 2px;
  background: #3b66f4;
  left: calc(-3rem - 2px);
  top: -50%;
}
.goal-node._has_children
  > .goal-node-item.__expand._has_children:last-child:after {
  content: '';
  position: absolute;
  height: calc(100% - 2rem);
  width: 2px;
  background: #ffffff;
  left: 2rem;
  top: 50%;
  transform: translate(-5rem, -50%) scaleX(1.5);
}
.goal-node-content:after {
  content: '';
  position: absolute;
  background: #3b66f4;
  left: -3rem;
  top: 50%;
  width: 2px;
  height: 2px;
  transform: translateY(-50%) translateX(-2px);
  border-bottom-left-radius: 50%;
}

.flip-list-move {
  transition: transform 0.5s;
}
.no-move {
  transition: transform 0s;
}
</style>
