<template>
  <div>
    <pre>
      {{ JSON.stringify(payment) }}
    </pre>
  </div>
</template>

<script lang='ts' setup>

import { IPaymentTable } from '@components/payment/types'

interface Props {
  payment: IPaymentTable
}

defineProps<Props>()

</script>
