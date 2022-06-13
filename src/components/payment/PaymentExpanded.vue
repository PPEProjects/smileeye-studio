<template>
  <div>
    <pre>
      {{ JSON.stringify(payment) }}
    </pre>
  </div>
</template>

<script lang='ts' setup>

import { SortPayments_sort_payments } from '#smileeye/queries/__generated__/SortPayments'

interface Props {
  payment: SortPayments_sort_payments
}

defineProps<Props>()

</script>
