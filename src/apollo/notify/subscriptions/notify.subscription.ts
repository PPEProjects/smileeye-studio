import gql from 'graphql-tag'

export const SUB_COUNT_UNREAD = gql`
  subscription SubCountUnRead($user: String!) {
    subCountUnRead(user: $user) {
      user {
        id
      }
      count
    }
  }
`
