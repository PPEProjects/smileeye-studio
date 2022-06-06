import gql from 'graphql-tag'

export const SUB_TOAST = gql`
  subscription SubToast($user: String!) {
    subToast(user: $user) {
      message
      error
    }
  }
`
