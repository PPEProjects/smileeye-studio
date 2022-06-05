import { ApolloInstance } from '#types/apollo'
import { inject } from 'vue'
import { ApolloClient, NormalizedCache } from '@apollo/client/core'

export const useSmileeye = (): ApolloClient<NormalizedCache> => {
  const apollo = inject<ApolloInstance>('apollo')!
  return apollo.apolloClient
}
