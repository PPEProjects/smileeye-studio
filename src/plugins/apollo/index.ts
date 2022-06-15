import type { App } from 'vue'
import { ApolloClients } from '@vue/apollo-composable'
import apolloClient from './smileeye'
import notifyClient from './notify'

enum ApolloEnum {
  smileeye = 'default',
  notify = 'notify'
}

const plugin = {
  install(app: App) {
    app.provide(ApolloClients, {
      default: apolloClient(app),
      notify: notifyClient
    })
  }
}

export default plugin

export { ApolloEnum }
