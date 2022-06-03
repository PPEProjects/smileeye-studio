import type { App } from 'vue'
import TeleportView from '@components/layout/TeleportView.vue'

const plugin = {
    install(app: App) {
        app.component('TeleportView', TeleportView)
    }
}

export default plugin
