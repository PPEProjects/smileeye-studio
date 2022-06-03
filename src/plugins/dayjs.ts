import dayjs from 'dayjs'
import 'dayjs/locale/vi'
import relativeTime from 'dayjs/plugin/relativeTime'
import {App} from "vue";

const plugin = {
    install(app: App) {

        dayjs.extend(relativeTime)
        dayjs.locale('vi')

        app.provide('dayjs', dayjs)
    }
}

export default plugin
