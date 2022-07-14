<template>
  <vue-cropper
    id="cropImage"
    :key="src"
    ref="cropperRef"
    output-type="jpg"
    :src="src"
    v-bind="options"
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
import { defineComponent, reactive, ref } from 'vue'
import { VueCropperMethods } from 'vue-cropperjs'
import { v4 as uuidv4 } from 'uuid'
import { message } from 'ant-design-vue'
import { useI18n } from 'vue-i18n'

// Crop options mặc định của image
const _configDefault = {
  autoCropArea: 1,
  cropBoxResizable: false,
  toggleDragModeOnDblclick: false,
  dragMode: 'move',
  viewMode: 1,
  cropBoxMovable: false
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
    const configData = reactive(props.config)

    const { t } = useI18n()
    return {
      src,
      configData,
      t
    }
  },
  computed: {
    cropperRef(): VueCropperMethods {
      return this.$refs.cropperRef as VueCropperMethods
    },

    // Merge config mặc định và config của image
    options() {
      return Object.assign({}, this.configData, _configDefault)
    }
  },

  methods: {
    buildCropper(file: File) {
      // avoid memory leaks
      if (this.src) {
        URL.revokeObjectURL(this.src)
      }
      this.src = URL.createObjectURL(file)
    },

    /**
     * Cắt hình ảnh
     * @param callback
     * @link https://github.com/fengyuanchen/cropperjs
     */
    cropImage(callback: (image: Blob|any) => Promise<void>) {
      this.cropperRef.getCroppedCanvas().toBlob( (data) => {
        callback(data)
      })
    },

    /**
     * Upload hình ành lên bunny
     * Sử dụng server proxy để upload hình ảnh lên bunny
     * @param image
     */
    async uploadCrop(image: Blob) {
      const fileName = `/admin/cropper/${uuidv4()}.jpg`
      try {
        await this.$axios.put( '/bunny' + fileName, image, {
          headers: {
            'Content-Type': 'image/png',
            AccessKey: import.meta.env.VITE_BUNNY_TOKEN
          }
        })
        message.success(this.t('upload.success'))
        return fileName
      } catch (e) {
        message.error(this.t('upload.fail'))
      }
    },

    changeConfig(config: { [key: string]: any }) {
      Object.assign(this.configData, config)
    }
  }
})
</script>
