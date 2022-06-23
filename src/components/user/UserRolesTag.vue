<template>
  <div v-if='user.roles?.length' @click="$emitter.emit('editRuleModal', user)">
    <a-tag
      v-for="(role, index) in user.roles"
      :key="index"
      class="cursor-pointer"
      color="#108ee9"
    >
      <span class='capitalize'>
        {{ role.name }}
      </span>
    </a-tag>
  </div>

  <div v-else>
    <a-tag
      class="cursor-pointer"
      color="#108ee9"
      @click="$emitter.emit('editRuleModal', user)"
    >
      <plus-outlined />
      <span class='capitalize'>
          {{ t('button.addRole') }}
        </span>
    </a-tag>
  </div>

</template>

<script setup lang="ts">
import { PlusOutlined } from '@ant-design/icons-vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

defineProps<{
  user: any
}>()
</script>
