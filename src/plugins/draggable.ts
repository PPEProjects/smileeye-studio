import draggable from 'vuedraggable'

import type { App } from 'vue'

const plugin = {
    install(app: App) {
        app.component('draggable', draggable)
    }
}

export default plugin
