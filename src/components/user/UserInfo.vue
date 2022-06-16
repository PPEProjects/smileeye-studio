<template>
  <div class='_info bg-white p-5'>

    <div class='flex justify-center items-center'>
      <div class='rounded-full overflow-hidden w-[100px] h-[100px] border-[4px] shadow-lg border-white'>
        <img class='w-full h-full object-cover animate transform hover:scale-110' :src='$cdn(user.avatar)'  alt=''/>
      </div>
    </div>

    <h3 class='font-medium text-center text-[16px] capitalize mt-5'>{{ user.name }}</h3>

  </div>
</template>

<script lang='ts' setup>

import { DetailUser_detail_user } from '#smileeye/queries/__generated__/DetailUser'

defineProps<{
  user: DetailUser_detail_user
}>()

</script>
