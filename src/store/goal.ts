import { defineStore } from 'pinia'

interface IGoalStore {
  _columns: number[],
  _headerColumns: any[]
}

export const useGoalStore = defineStore({
  id: 'goal',

  state: (): IGoalStore => ({
    _columns: [0],
    _headerColumns: [
      {
        title: 'Trial',
        dataIndex: 'goal.name',
        key: 'trial'
      },
      {
        title: 'Request date',
        dataIndex: 'goal.request_date',
        key: 'request_date'
      },
      {
        title: 'Status',
        dataIndex: 'status',
        key: 'status'
      },
    ]
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
