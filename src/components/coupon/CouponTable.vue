<template>
  <a-table
    :loading="loading || isDeleting"
    :columns="columns"
    :data-source="coupons"
    :pagination="{
      total: counter,
      showLessItems: true,
      defaultPageSize: 7
    }"
    row-key="code"
    @change="changePage"
  >
    <template #bodyCell="{ column, record }">
      <template v-if="column.key === 'limit'">
        <a-tag color="#f50">
          {{ record.limit - (record.remaining || record.limit) }}/{{
            record.limit
          }}
        </a-tag>
      </template>

      <template v-else-if="column.key === 'expiryDate'">
        <span v-if="record.expiry_date">{{
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
          placement="topLeft"
          :title="t('actions.delete.title')"
          :ok-text="t('button.yes')"
          :cancel-text="t('button.no')"
          @confirm="deleteCouponAction({ input: { id: String(record.id) } })"
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
import { useDayjs } from '@composables/useDayjs'
import { DELETE_COUPON } from '#smileeye/mutations/coupon.mutation'
import {
  DeleteCoupon,
  DeleteCouponVariables
} from '#smileeye/mutations/__generated__/DeleteCoupon'
import { computed, reactive } from 'vue'
import { useEmitter } from '@nguyenshort/vue3-mitt'
import { useSmileeye } from '#apollo/client/smileeye'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const dayjs = useDayjs()

// Table setup
const columns = [
  {
    title: t('coupon.code'),
    dataIndex: 'code',
    key: 'code'
  },
  {
    title: t('coupon.use'),
    dataIndex: 'limit',
    key: 'limit',
    align: 'center'
  },
  {
    title: t('coupon.percent'),
    dataIndex: 'sale_percent',
    key: 'percent',
    align: 'center'
  },
  {
    title: t('coupon.expiryDate'),
    dataIndex: 'expiry_date',
    key: 'expiryDate',
    align: 'center'
  },
  {
    title: t('coupon.createdAt'),
    dataIndex: 'created_at',
    key: 'createdAt',
    align: 'center',
    width: 200
  },
  {
    title: t('table.action.title'),
    key: 'action',
    align: 'right',
    fixed: 'right'
  }
]

const queryVariable = reactive({
  first: 7,
  page: 0,
  expiry: FilterExpiry.all
})

const { result, loading } = useQuery<SortCoupons, SortCouponsVariables>(
  SORT_COUPONS,
  queryVariable
)

const coupons = computed<SortCoupons_sort_coupons_data[]>(
  () =>
    (result.value?.sort_coupons?.data || []) as SortCoupons_sort_coupons_data[]
)
const counter = computed<number>(
  () => result.value?.sort_coupons?.info?.total || 0
)

const { loading: isDeleting, mutate: deleteCouponAction } = useMutation<
  DeleteCoupon,
  DeleteCouponVariables
>(DELETE_COUPON, {
  update: (proxy, _, options) => {
    proxy.evict({
      id: proxy.identify({
        __typename: 'Coupon',
        id: options?.variables?.input?.id
      })
    })
  }
})

const changePage = ($event: any) => {
  queryVariable.page = $event.current
}

// Global event
const emitter = useEmitter<{
  upsertCoupon: SortCoupons_sort_coupons_data | object
  afterUpsertCoupon: SortCoupons_sort_coupons_data
}>()

const smileeye = useSmileeye()
emitter.on('afterUpsertCoupon', (coupon) => {
  const _index = coupons.value.findIndex((item) => item.id === coupon.id)
  if (_index > -1) {
    // Đã tồn tại. Deep cache cập nhật
    return
  }
  smileeye.cache.writeQuery<SortCoupons, SortCouponsVariables>({
    query: SORT_COUPONS,
    variables: queryVariable,
    data: {
      sort_coupons: {
        __typename: 'SortCoupon',
        info: Object.assign({}, result.value?.sort_coupons?.info, {
          total: counter.value + 1
        }),
        data: [coupon, ...coupons.value]
      }
    }
  })
})
</script>
