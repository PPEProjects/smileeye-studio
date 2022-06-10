<template>
  <div class='pb-2 relative pt-1'>

    <div class='flex items-center'>

      <label v-if='$slots["prefix"]' :for='inputKID' class='block pr-4'>
        <slot name="prefix"></slot>
      </label>

      <input
        :id='inputKID'
        class='focus:outline-none block flex-1 bg-transparent'
        :value='value'
        :placeholder='placeholder'
        :type='type'
        :disabled="disabled"
        @focus='onFocus()'
        @focusout='outFocus()'
        @input="onChangeTextField"
      />

      <slot name='suffix'></slot>

    </div>

    <div v-if='errorMessage' ref='errorField' class='text-xs mt-2 text-red-500 opacity-0'>
      {{ errorMessage }}
    </div>

    <span
      class='block absolute w-full left-0 bottom-0 bg-gray-200 h-0.5 ease-in-out transition duration-300'
      :class='{
        "bg-primary-600": isFocus
      }'
    ></span>
  </div>
</template>

<script lang="ts" setup>
import {inject, nextTick, ref} from "vue";
import {AnimeInstance} from "#types/anime"

const emit = defineEmits<{
  (e: 'update:value', value: string): void
}>()

 const props = withDefaults(defineProps<{
   placeholder?: string,
   value?: string,
   type?: string,
   validate?: () => string,
   disabled?: boolean
 }>(), {
   placeholder: '',
   value: '',
   type: 'text',
   validate: () => '',
   disabled: false
 })

const isFocus = ref<boolean>(false)
const errorMessage = ref<string>('')

const inputKID = ref(String(`input-${Math.random()}`))

const onChangeTextField = (event: any) => {
  emit('update:value', event.target.value)
}

const anime = inject<AnimeInstance>('anime')!
const onFocus = () => {
  isFocus.value = true
}
const outFocus = () => {
  if(props.validate) {
    isFocus.value = false
    const error = props.validate?.()
    if(error) {
      errorMessage.value = error
      nextTick(()=> {
        anime({
          targets: '$refs.errorField',
          translateY: [-25, 0],
          opacity: [0, 1],
          duration: 1200
        })
      })
    } else {
      errorMessage.value = ''
    }
    //this.$emit('validator', !this.errorMessage)
    // this.$emit('finish')
    return errorMessage
  }
}

</script>
