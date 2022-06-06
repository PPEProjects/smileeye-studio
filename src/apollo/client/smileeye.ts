import { ApolloClient, NormalizedCache } from '@apollo/client/core'
import { useApolloClient } from '@vue/apollo-composable'

export const useSmileeye = (): ApolloClient<NormalizedCache> => {
  return useApolloClient('default').client
}
