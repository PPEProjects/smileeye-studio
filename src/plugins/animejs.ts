import type { App } from 'vue'
import anime from 'animejs'

export const ANIME_CONSTANT = Symbol.for('animejs')

const plugin = {
  install(app: App) {
    app.provide(ANIME_CONSTANT, anime)
  }
}

export default plugin
