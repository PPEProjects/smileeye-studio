<template>
  <a-dropdown v-model:visible="openSearch" :trigger="['click']">
    <a class="ant-dropdown-link" @click.prevent>
      <search-outlined />
    </a>
    <template #overlay>
      <a-menu>
        <a-menu-item key="1">
          <a-input-group compact>
            <a-select v-model:value="formSearch.field" style="width: 40%">
              <a-select-option
                v-for="option in options"
                :key="option.value"
                :value="option.value"
              >
                {{ option.label }}
              </a-select-option>
            </a-select>
            <a-input
              v-model:value="formSearch.keyword"
              style="width: 60%"
              :placeholder="t('input.keyword')"
              @press-enter="enterSearch"
            >
              <template #prefix>
                <search-outlined />
              </template>
            </a-input>
          </a-input-group>
        </a-menu-item>
        <a-menu-divider />

        <a-menu-item key="2">
          <div class="flex items-center">
            <a-button type="primary" size="small" block @click="emit('search', formSearch)">
              {{ t('button.search') }}
            </a-button>
            <div class="w-1 flex-shrink-0"></div>
            <a-button type="danger" size="small" block @click="cancelSearch">
              {{ t('button.cancel') }}
            </a-button>
          </div>
        </a-menu-item>
      </a-menu>
    </template>
  </a-dropdown>
</template>

<script lang="ts" setup>
import { SearchOutlined } from '@ant-design/icons-vue'
import { reactive, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const props = defineProps<{
  options: {
    label: string
    value: string
  }[]
  value: {
    field: string
    keyword: string
  }
}>()

const emit = defineEmits<{
  (e: 'update:value', value: typeof props.value): void
  (e: 'change', value: typeof props.value): void
  (e: 'search', value: typeof props.value): void
}>()

const formSearch = reactive<typeof props.value>(props.value)

const openSearch = ref<boolean>(false)

watch(formSearch, () => {
  emit('update:value', formSearch)
  emit('change', formSearch)
})

const enterSearch = () => {
  emit('search', formSearch)
  openSearch.value = false
}
const cancelSearch = () => {
  openSearch.value = false
  Object.assign(formSearch, {
    field: props.options[0].value,
    keyword: ''
  })
}
</script>
