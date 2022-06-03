<template>
  <div class='pb-2 pt-1 relative'>

    <div class='flex items-center'>

      <label v-if='$slots["prefix"]' :for='inputKID' class='block mr-4'>
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
        @input="$emit('update:value', $event.target.value)"
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
import {AnimeInstance} from "../../types/anime";

 const { validate, value, placeholder, disabled, type } = defineProps({
  placeholder: {
    type: String,
    default: ''
  },
  value: {
    type: String,
    default: ''
  },
  type: {
    type: String,
    default: 'text'
  },
  validate: {
    type: Function,
    default: () => {}
  },
  disabled: {
    type: Boolean,
    default: false
  }
})

const isFocus = ref<boolean>(false)
const errorMessage = ref<string>('')

const inputKID = ref(String(`input-${Math.random()}`))

const anime = inject<AnimeInstance>('anime')!
const onFocus = () => {
  isFocus.value = true
}
const outFocus = () => {
  if(validate) {
    isFocus.value = false
    const error = validate?.()
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
