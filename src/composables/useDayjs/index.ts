import { inject } from 'vue'
import type dayjs from 'dayjs'

type DayjsInstance = typeof dayjs

export const useDayjs = (): DayjsInstance => {
  return inject('dayjs')!
}
