import dayjs from 'dayjs'
import 'dayjs/locale/vi'
import relativeTime from 'dayjs/plugin/relativeTime'

dayjs.extend(relativeTime)
//dayjs.locale('vi')

import { App } from 'vue'

const plugin = {
  install(app: App) {
    app.provide('dayjs', dayjs)
  }
}

export default plugin
