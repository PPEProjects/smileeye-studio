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
      phone_number
      email
      roles
      role_label
      current_address
    }
  }
`
