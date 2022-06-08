import { defineStore } from 'pinia'

interface IPaymentStore {
  _columns: number[]
}

export const usePaymentStore = defineStore({
  id: 'payment',

  state: (): IPaymentStore => ({
    _columns: [0]
  }),

  getters: {
    columns: (state) => state._columns
  },

  actions: {
    setColumns(_columns: number[]) {
      this._columns = _columns
    }
  }
})
