import type { App } from 'vue'
import anime from 'animejs'

const plugin = {
  install(app: App) {
    app.provide('anime', anime)
  }
}

export default plugin
