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

export const UPDATE_ROLES = gql`
  mutation UpdateRoles($input: AssignRoleInput!) {
    assign_and_remove_role(input: $input) {
      id
      roles
    }
  }
`

export const DELETE_USER = gql`
  mutation Delete_user($deleteUserId: ID!) {
    delete_user(id: $deleteUserId)
  }
`
