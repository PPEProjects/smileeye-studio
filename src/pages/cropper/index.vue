<template>
  <teleport-view to="#title"> Crop Image </teleport-view>

  <header
    v-cloak
    class="border-dashed border-2 border-gray-400 py-12 flex flex-col justify-center items-center"
    @dragover.prevent
    @drop.prevent="onDropImage"
  >
    <p class="mb-3 font-semibold text-gray-900 flex flex-wrap justify-center">
      <span>Drag and drop your</span>&nbsp;<span>files anywhere or</span>
    </p>
    <input
      id="hidden-input"
      type="file"
      accept="images/*"
      class="hidden"
      @change="selectImage"
    />
    <label
      for="hidden-input"
      class="mt-2 rounded-sm cursor-pointer px-3 py-1 bg-gray-200 hover:bg-gray-300 focus:shadow-outline focus:outline-none"
    >
      Upload a file
    </label>
  </header>

  <a-modal
    v-model:visible="showModal"
    :width="560"
    title="DI CHUYỂN VÀ CẮT HÌNH CỦA BẠN"
    cancel-text="Huỷ Bỏ"
    ok-text="Cắt Ảnh"
    @ok="cropImage"
  >
    <vue-cropper
      id="cropImage"
      ref="cropperRef"
      class="h-[250px]"
      output-type="jpg"
      :src="cropSrc"
      :auto-crop-area="1"
      :crop-box-resizable="false"
      :toggle-drag-mode-on-dblclick="false"
      :drag-mode="'move'"
      :aspect-ratio="3 / 4"
      :view-mode="1"
      :crop-box-movable="false"
      :min-container-height="200"
      :min-crop-box-width="300"
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
  </a-modal>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const showModal = ref<boolean>(false)
const cropSrc = ref<string>('')
const cropperRef = ref<any>(null)

const buildCropper = (file: File) => {
  cropSrc.value = URL.createObjectURL(file)
  showModal.value = true
}

const onDropImage = (e: DragEvent) => {
  if (!e.dataTransfer?.files?.length) {
    // Không có hình ảnh
    return
  }
  const file = e.dataTransfer?.files?.[0]

  if (!file.type.match('image/')) {
    // chỉ support drop image
    return
  }
  buildCropper(file)
}

const selectImage = (e: any) => {
  if (e.target.files?.length) {
    buildCropper(e.target.files[0])
  }
}

const cropImage = () => {
  cropperRef.value?.getCroppedCanvas().toBlob((data: Blob) => {
    const file = new File([data], 'cropped.png', { type: data.type })

    const blobUrl = URL.createObjectURL(data)

    const $el = document.createElement('a')
    $el.setAttribute('href', blobUrl)
    $el.download = file.name

    $el.dispatchEvent(
      new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
        view: window
      })
    )

    showModal.value = false

    setTimeout(() => {
      URL.revokeObjectURL(blobUrl)
    }, 100)
  })
}
</script>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'CropperPage'
})
</script>
