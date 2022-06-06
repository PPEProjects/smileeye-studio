import type { App } from 'vue'
import { DefaultApolloClient } from '@vue/apollo-composable'
import apolloClient from './smileeye'
import notifyClient from './notify'

const plugin = {
  install(app: App) {
    app.provide('apollo', { DefaultApolloClient, apolloClient, notifyClient })
  }
}

export default plugin
