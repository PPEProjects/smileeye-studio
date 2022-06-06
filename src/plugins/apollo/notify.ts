import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
  split
} from '@apollo/client/core'
import { setContext } from '@apollo/client/link/context'
import { onError } from '@apollo/client/link/error'
import { getMainDefinition } from '@apollo/client/utilities'
import { GraphQLWsLink } from '@apollo/client/link/subscriptions'
import { createClient } from 'graphql-ws'

const linkBuilder = () => {
  const httpLink = createHttpLink({
    // You should use an absolute URL here
    uri: import.meta.env.VITE_NOTIFY_GRAPHQL
  })

  const authLink = setContext((_, { headers }) => {
    // return the headers to the context so httpLink can read them
    return {
      headers: {
        ...headers,
        authorization: `Bearer ${import.meta.env.VITE_NOTIFY_API_KEY}`
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

  const getApolloLink = () =>
    split(
      ({ query }) => {
        const definition = getMainDefinition(query)
        return (
          definition.kind === 'OperationDefinition' &&
          definition.operation === 'subscription'
        )
      },
      new GraphQLWsLink(
        createClient({
          url: import.meta.env.VITE_NOTIFY_SUBSCRIPTION,
          connectionParams: {
            Authorization: `Bearer ${import.meta.env.VITE_NOTIFY_API_KEY}`
          }
        })
      ),
      errorLink.concat(authLink.concat(httpLink))
    )

  return getApolloLink()
}

const cache = new InMemoryCache()

// Create the apollo client
const apolloClient = new ApolloClient({
  link: linkBuilder(),
  cache
})

export default apolloClient
