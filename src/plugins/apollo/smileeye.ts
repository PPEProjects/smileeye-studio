import {
  ApolloClient,
  ApolloLink,
  createHttpLink,
  InMemoryCache
} from '@apollo/client/core'
import { setContext } from '@apollo/client/link/context'
import { onError } from '@apollo/client/link/error'
import { useUserStore } from '@store/user'
import { App } from 'vue'
import { VueLoadingIndicatorInstance } from '@nguyenshort/vue3-loading-indicator'

export default (app: App) => {
  const $loading: VueLoadingIndicatorInstance =
    app.config.globalProperties.$loading

  const roundTripLink = new ApolloLink((operation, forward) => {
    // Called before operation is sent to server
    operation.setContext({ start: Date.now() })
    $loading?.start()

    return forward(operation).map((data) => {
      if (data.errors) {
        $loading?.fail()
      } else {
        $loading?.finish()
      }

      // Called after server responds
      const time = Date.now() - operation.getContext().start
      console.log(
        `Operation: ${operation.operationName} took ${time} to complete`
      )
      return data
    })
  })

  // HTTP connection to the API
  const httpLink = createHttpLink({
    // You should use an absolute URL here
    uri: import.meta.env.VITE_SMILE_EYE_GRAPHQL
  })

  const authLink = setContext((_, { headers }) => {
    const useUser = useUserStore()
    // return the headers to the context so httpLink can read them
    return {
      headers: {
        ...headers,
        authorization: `Bearer ${useUser._token}`
      }
    }
  })

  const errorLink = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors) {
      graphQLErrors.forEach(
        ({ message, extensions }) =>
          console.log(
            `[GraphQL error]: Message: ${message}, Code: ${extensions.code}`
          )
        // Xoá cookie, đăng xuất, login
      )
    }
    if (networkError) {
      console.log(`[Network error]: ${networkError}`)
    }
  })

  return new ApolloClient({
    link: roundTripLink.concat(errorLink.concat(authLink.concat(httpLink))),
    cache: new InMemoryCache(),
    connectToDevTools: true
  })
}
