import gql from 'graphql-tag'

export const UPDATE_PASSWORD = gql`
  mutation UpdateUserPassword($input: UpdatePassword!) {
    updatePassword(input: $input) {
      status
      message
    }
  }
`

export const UPDATE_USER_INFO = gql`
  mutation UpdateUserInfo($input: UpdateUserInput!) {
    update_user(input: $input) {
      id
      name
      gender
      avatar
      banner
      phone_number
      roles
      email
      current_address
    }
  }
`
