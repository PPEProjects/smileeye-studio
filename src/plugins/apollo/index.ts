import type { App } from 'vue'
import { ApolloClients } from '@vue/apollo-composable'
import apolloClient from './smileeye'
import notifyClient from './notify'

const plugin = {
  install(app: App) {
    app.provide(ApolloClients, {
      default: apolloClient,
      notify: notifyClient
    })
  }
}

export default plugin
