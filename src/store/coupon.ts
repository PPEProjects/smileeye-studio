import { defineStore } from 'pinia'
import {
  SortCoupons_sort_coupons_data,
  SortCoupons_sort_coupons_info
} from '#smileeye/queries/__generated__/SortCoupons'
import { FilterExpiry } from '#schema/smileeyeTypes'

interface IPaymentStore {
  _coupons: SortCoupons_sort_coupons_data[]
  _counter: SortCoupons_sort_coupons_info
  _page: number
  _expiry: FilterExpiry
}

export const useCouponStore = defineStore({
  id: 'coupons',

  state: (): IPaymentStore => ({
    _coupons: [],
    _counter: {} as SortCoupons_sort_coupons_info,
    _page: 1,
    _expiry: FilterExpiry.all
  }),

  getters: {
    coupons: (state) => state._coupons,
    counter: (state) => state._counter,
    page: (state) => state._page,
    expiry: (state) => state._expiry
  },

  actions: {
    setCoupons(coupons: SortCoupons_sort_coupons_data[]) {
      this._coupons = coupons
    },

    setCounter(payload: SortCoupons_sort_coupons_info) {
      this._counter = payload
    },

    setPage(payload: number) {
      this._page = payload
    },

    setExpiry(payload: FilterExpiry) {
      this._expiry = payload
    }
  }
})
