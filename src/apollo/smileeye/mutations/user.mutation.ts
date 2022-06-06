import gql from 'graphql-tag'

export const UPDATE_PASSWORD = gql`
  mutation UpdatePassword($input: UpdatePassword!) {
    updatePassword(input: $input) {
      status
      message
    }
  }
`
