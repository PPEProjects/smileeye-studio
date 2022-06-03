import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client/core'
import {setContext} from "@apollo/client/link/context";
import {onError} from "@apollo/client/link/error";
import {useUserStore} from "@store/user";

// HTTP connection to the API
const httpLink = createHttpLink({
    // You should use an absolute URL here
    uri: import.meta.env.VITE_SMILE_EYE_GRAPHQL,
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
            console.log(`[GraphQL error]: Message: ${message}, Code: ${extensions.code}`)
        )
    }
    if (networkError) { console.log(`[Network error]: ${networkError}`) }
})

// Cache implementation
const cache = new InMemoryCache()

// Create the apollo client
const apolloClient = new ApolloClient({
    link: errorLink.concat(authLink.concat(httpLink)),
    cache,
})

export default apolloClient
