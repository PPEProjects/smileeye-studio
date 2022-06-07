import dayjs from 'dayjs'
import 'dayjs/locale/vi'
import relativeTime from 'dayjs/plugin/relativeTime'

export const useDayjs = () => {
  // @ts-ignore
  dayjs.extend(relativeTime)
  dayjs.locale('vi')
  return dayjs
}
