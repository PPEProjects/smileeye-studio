import { inject } from 'vue'
import dayjs from 'dayjs'

export const useDayjs = (): dayjs.Dayjs => {
  return inject<dayjs.Dayjs>('dayjs')!
}
