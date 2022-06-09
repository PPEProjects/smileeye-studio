<template>
  <a-table
    :loading="loading || isDeleting"
    :columns="columns"
    :data-source="coupons"
    :pagination="{ total: 10, showLessItems: true, defaultPageSize: 6 }"
    row-key="name"
  >
    <template #bodyCell="{ column, record }">
      <template v-if="column.key === 'expiryDate'">
        <span>{{ dayjs(record.expiryDate).format('DD-MM-YYYY hh:mm') }}</span>
      </template>

      <template v-if="column.key === 'createdAt'">
        <span>{{ dayjs(record.createdAt).format('DD-MM-YYYY hh:mm') }}</span>
      </template>

      <coupon-action
        v-if="column.key === 'action'"
        @delete="deleteCouponAction({ input: { id: record.id } })"
      />
    </template>
  </a-table>



</template>

<script lang="ts" setup>
import { useMutation, useQuery } from '@vue/apollo-composable'
import {
  SortCoupons,
  SortCoupons_sort_coupons_data,
  SortCouponsVariables
} from '#smileeye/queries/__generated__/SortCoupons'
import { SORT_COUPONS } from '#smileeye/queries/coupon.query'
import { FilterExpiry } from '#schema/smileeyeTypes'
import usePick from '@composables/usePick'
import { useLangs } from '@composables/useLangs'
import { useDayjs } from '@composables/useDayjs'
import CouponAction from '@components/coupon/CouponAction.vue'
import { DELETE_COUPON } from '#smileeye/mutations/coupon.mutation'
import {
  DeleteCoupon,
  DeleteCouponVariables
} from '#smileeye/mutations/__generated__/DeleteCoupon'
import { ref } from 'vue'

const { t } = useLangs()
const dayjs = useDayjs()

// Table setup
const columns = [
  {
    title: t('coupon.table.code'),
    dataIndex: 'code',
    key: 'code'
  },
  {
    title: t('coupon.table.use'),
    dataIndex: 'limit',
    key: 'limit',
    align: 'center'
  },
  {
    title: t('coupon.table.percent'),
    dataIndex: 'sale_percent',
    key: 'percent',
    align: 'center'
  },
  {
    title: t('coupon.table.expiryDate'),
    dataIndex: 'expiry_date',
    key: 'expiryDate',
    align: 'center'
  },
  {
    title: t('coupon.table.createdAt'),
    dataIndex: 'created_at',
    key: 'createdAt',
    align: 'center',
    width: 200
  },
  {
    title: t('coupon.table.actions'),
    key: 'action',
    align: 'right',
    fixed: 'right'
  }
]

const { result, loading } = useQuery<SortCoupons, SortCouponsVariables>(
  SORT_COUPONS,
  {
    first: 10,
    page: 0,
    expiry: FilterExpiry.all
  }
)

const coupons = usePick(result, [], (data) => data.sort_coupons.data)

const { loading: isDeleting, mutate: deleteCouponAction } = useMutation<
  DeleteCoupon,
  DeleteCouponVariables
>(DELETE_COUPON, {
  update: (cache, result1) => {
    console.log(result1)
    return cache
  }
})

// Edit/Add Coupon
const showUpsertModal = ref<boolean>(false)

</script>
