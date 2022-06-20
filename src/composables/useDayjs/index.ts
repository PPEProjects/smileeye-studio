import { inject } from 'vue'
import type dayjs from 'dayjs'
import { DAYJS_CONSTANT } from '@plugins/dayjs'

type DayjsInstance = typeof dayjs

export const useDayjs = (): DayjsInstance => {
  return inject(DAYJS_CONSTANT)!
}
