import gql from 'graphql-tag'

export const UPDATE_PASSWORD = gql`
  mutation UpdateUserPassword($input: UpdatePassword!) {
    updatePassword(input: $input) {
      status
      message
    }
  }
`
