import type { App } from 'vue'
import { VueEternalLoading } from '@ts-pro/vue-eternal-loading'

const plugin = {
  install(app: App) {
    app.component('VueEternalLoading', VueEternalLoading)
  }
}

export default plugin
