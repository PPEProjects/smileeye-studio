import { ApolloClient, NormalizedCache } from '@apollo/client/core'
import { useApolloClient } from '@vue/apollo-composable'

export const useNotify = (): ApolloClient<NormalizedCache> => {
  return useApolloClient('notify').client
}
