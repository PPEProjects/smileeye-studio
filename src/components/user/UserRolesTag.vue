<template>
  <div @click="$emitter.emit('editRuleModal', user)">
    <a-tag
      v-for="(role, index) in user.roles"
      :key="index"
      class="cursor-pointer"
      color="#108ee9"
    >
      {{ role.name }}
    </a-tag>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  user: any
}>()
</script>
