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

const apolloClient = (app: App) => {
  const roundTripLink = new ApolloLink((operation, forward) => {
    app.config.globalProperties.$Progress?.start()
    // Called before operation is sent to server
    operation.setContext({ start: Date.now() })

    return forward(operation).map((data) => {
      if (data.errors) {
        app.config.globalProperties.$Progress?.fail()
      } else {
        app.config.globalProperties.$Progress?.finish()
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
      graphQLErrors.forEach(({ message, extensions }) =>
        console.log(
          `[GraphQL error]: Message: ${message}, Code: ${extensions.code}`
        )
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

export default apolloClient
