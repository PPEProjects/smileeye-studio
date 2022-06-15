<template>
    <vue-cropper
      id="cropImage"
      ref="cropperRef"
      class="h-[250px]"
      output-type="jpg"
      :src="cropSrc"
      v-bind='options'
    />

    <div class="w-[250px] flex items-center justify-around mx-auto mt-5">
      <button
        class="border w-8 h-8 flex items-center justify-center rounded border-gray-200 text-gray-600"
        @click="$refs.cropperRef.rotate(-90)"
      >
        <svg class="fill-current" width="15" height="15">
          <use xlink:href="#i-rotate-left"></use>
        </svg>
      </button>

      <button
        class="border w-8 h-8 flex items-center justify-center rounded border-gray-200 text-gray-600"
        @click="$refs.cropperRef.relativeZoom(-0.2)"
      >
        <svg class="fill-current" width="19" height="19">
          <use xlink:href="#i-zoom-in"></use>
        </svg>
      </button>

      <button
        class="border w-8 h-8 flex items-center justify-center rounded border-gray-200 text-gray-600"
        @click="$refs.cropperRef.relativeZoom(0.2)"
      >
        <svg class="fill-current" width="19" height="19">
          <use xlink:href="#i-zoom-plus"></use>
        </svg>
      </button>

      <button
        class="border w-8 h-8 flex items-center justify-center rounded border-gray-200 text-gray-600"
        @click="$refs.cropperRef.rotate(90)"
      >
        <svg class="fill-current transform -scale-x-100" width="15" height="15">
          <use xlink:href="#i-rotate-left"></use>
        </svg>
      </button>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { VueCropperMethods } from 'vue-cropperjs'

const _config = {
  autoCropArea: 1,
  cropBoxResizable: false,
  toggleDragModeOnDblclick: false,
  dragMode: 'move',
  aspectRatio: 3/4,
  viewMode: 1,
  cropBoxMovable: false,
  minContainerHeight: 200,
  minCropBoxWidth: 300
}

export default defineComponent({
  name: 'ImageCropper',
  props: {
    config: {
      type: Object,
      default: () => ({})
    },
    cropSrc: {
      type: String,
      default: ''
    }
  },
  setup(props) {
    const src = ref<string>(props.cropSrc)
    return {
      src
    }
  },
  computed: {
    cropperRef(): VueCropperMethods {
      return this.$refs.cropperRef as VueCropperMethods
    },

    options() {
      return Object.assign({}, this.config, _config)
    }
  },
  methods: {
    buildCropper(file: File) {
      // avoid memory leaks
      if(this.src) {
        URL.revokeObjectURL(this.src)
      }
      this.src = URL.createObjectURL(file)
      this.cropperRef.replace(this.src)
    },

    cropImage() {
      this.cropperRef.getCroppedCanvas().toBlob((data) => {
        console.log(data)
      })
    }
  }
})
</script>
