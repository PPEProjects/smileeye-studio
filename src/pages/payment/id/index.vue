<template>
  <div>
    <teleport-view
      to="#title"
    >
      <span class="capitalize">{{ t('payment.payment') }}: {{ $route.params.id }}</span>
    </teleport-view>
    <pre>
      {{ history }}
    </pre>

  </div>
</template>

<script lang="ts" setup>
import { useI18n } from 'vue-i18n'
import {defineAsyncComponent, ref} from "vue";
import {onValue, ref as dbRef} from "firebase/database";
import {useFireRTDB} from "@composables/useFirebase";
import {useRoute} from "vue-router";
const TeleportView = defineAsyncComponent(() => import('@components/layout/TeleportView.vue'))

const { t } = useI18n()

const history = ref<any[]>([])

const route = useRoute()
const starCountRef = dbRef(useFireRTDB(), `payment-history/${route.params.id}`)
onValue(starCountRef, (snapshot) => {
  const data = snapshot.val()
  if(data) {
    history.value = data
  }
})
</script>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'PaymentDetail'
})
</script>
