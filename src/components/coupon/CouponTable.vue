<template>
  <a-table
    :loading="loading || isDeleting"
    :columns="columns"
    :data-source="couponStore.coupons"
    :pagination="{
      total: couponStore.counter.availability,
      showLessItems: true,
      defaultPageSize: 7
    }"
    row-key="code"
    @change='changePage'
  >
    <template #bodyCell="{ column, record, index }">

      <template v-if='column.key === "limit"'>
        <a-tag color="#f50">
          {{ record.limit - (record.remaining | record.limit) }}/{{ record.limit }}
        </a-tag>
      </template>

      <template v-else-if="column.key === 'expiryDate'">
        <span v-if='record.expiry_date'>{{
          dayjs(record.expiry_date, 'YYYY-MM-DD hh:mm:ss').format('DD-MM-YYYY')
        }}</span>

        <span v-else>--</span>
      </template>

      <template v-else-if="column.key === 'createdAt'">
        <span>{{
          dayjs(record.created_at, 'YYYY-MM-DD hh:mm:ss').format('DD-MM-YYYY')
        }}</span>
      </template>

      <template v-else-if="column.key === 'action'">
        <a-button
          type="primary"
          size="small"
          @click="emitter.emit('upsertCoupon', record)"
        >
          <template #icon>
            <edit-outlined />
          </template>
        </a-button>

        <a-popconfirm
          :title="t('coupon.actions.destroy.title')"
          placement="topLeft"
          :ok-text="t('coupon.actions.delete.yes')"
          :cancel-text="t('coupon.actions.delete.no')"
          @confirm="deleteHandle(record, index)"
        >
          <a-button type="danger" size="small" class="ml-2">
            <svg class="fill-current text-white" width="1em" height="1em">
              <use xlink:href="#i-remove" />
            </svg>
          </a-button>
        </a-popconfirm>
      </template>
    </template>
  </a-table>
</template>

<script lang="ts" setup>
import { useMutation, useQuery } from '@vue/apollo-composable'
import { EditOutlined } from '@ant-design/icons-vue'
import {
  SortCoupons,
  SortCoupons_sort_coupons_data,
  SortCouponsVariables
} from '#smileeye/queries/__generated__/SortCoupons'
import { SORT_COUPONS } from '#smileeye/queries/coupon.query'
import { FilterExpiry } from '#schema/smileeyeTypes'
import { useLangs } from '@composables/useLangs'
import { useDayjs } from '@composables/useDayjs'
import { DELETE_COUPON } from '#smileeye/mutations/coupon.mutation'
import {
  DeleteCoupon,
  DeleteCouponVariables
} from '#smileeye/mutations/__generated__/DeleteCoupon'
import { useEmitter } from '@composables/useEmitter'
import { IFormCouponUpsert } from '@components/coupon/types'
import { useCouponStore } from '@store/coupon'
import { watch } from 'vue'

const { t } = useLangs()
const dayjs = useDayjs()

// Store
const couponStore = useCouponStore()

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

const { result, loading, refetch } = useQuery<SortCoupons, SortCouponsVariables>(
  SORT_COUPONS,
  {
    first: 7,
    page: couponStore.page,
    expiry: FilterExpiry.all
  }
)
watch(result, (value) => {
  couponStore.setCoupons((value?.sort_coupons?.data as any) || [])
  couponStore.setCounter(value?.sort_coupons?.info as any)
})

const { loading: isDeleting, mutate: deleteCouponAction } = useMutation<
  DeleteCoupon,
  DeleteCouponVariables
>(DELETE_COUPON)

const deleteHandle = async (
  data: SortCoupons_sort_coupons_data,
  index: number
) => {
  await deleteCouponAction(
    { input: { id: String(data.id) } },
    {
      update: (proxy) => {
        const _cache = Object.assign({}, result.value?.sort_coupons)

        proxy.writeQuery<SortCoupons, SortCouponsVariables>({
          query: SORT_COUPONS,
          variables: {
            first: 7,
            page: couponStore.page,
            expiry: FilterExpiry.all
          },
          data: {
            sort_coupons: Object.assign({}, _cache, {
              data: _cache.data?.filter((e, _index) => _index !== index)
            })
          }
        })
      }
    }
  )
}

// Global event
const emitter = useEmitter<{
  upsertCoupon: IFormCouponUpsert | object
}>()

const changePage = ($event: any) => {
  couponStore.setPage($event.current)
  refetch({
    first: 7,
    page: couponStore.page,
    expiry: FilterExpiry.all
  })
}

</script>
