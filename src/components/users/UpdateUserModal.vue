<template>
  <modal-base event='updateUserModal' visible title='Update User' :max-width='640'>

    <a-form layout='vertical'>

      <div class='relative'>

        <div class='w-full h-[200px] rounded overflow-hidden'>
          <img src='https://i.imgur.com/TGrWoue.jpg' alt='' class='w-full h-full object-cover' />
        </div>

        <div class='w-[84px] h-[84px] overflow-hidden rounded-full absolute -bottom-7 left-7 border-2 border-white shadow-md'>
          <img class='w-full h-full object-cover' src='https://i.imgur.com/jfZDmVD.png' alt='' />
        </div>

      </div>

      <div class='h-7'></div>

      <a-form-item name='name' label='Name'>
        <a-input />
      </a-form-item>


      <a-form-item name='email' label='Email'>
        <a-input />
      </a-form-item>

    </a-form>

  </modal-base>
</template>

<script lang='ts' setup>
import ModalBase from '@components/modal/ModalBase.vue'
</script>
