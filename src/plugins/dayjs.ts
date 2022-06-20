import dayjs from 'dayjs'
import 'dayjs/locale/vi'
import relativeTime from 'dayjs/plugin/relativeTime'

dayjs.extend(relativeTime)
//dayjs.locale('vi')

import { App } from 'vue'

export const DAYJS_CONSTANT = Symbol.for('dayjs')

const plugin = {
  install(app: App) {
    app.provide(DAYJS_CONSTANT, dayjs)
  }
}

export default plugin
