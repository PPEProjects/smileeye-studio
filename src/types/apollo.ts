import {ApolloClient, NormalizedCache} from "@apollo/client/core";

export interface ApolloInstance {
    apolloClient: ApolloClient<NormalizedCache>
}
