import gql from 'graphql-tag'

export const GET_ME = gql`
  query DetailMe {
    detail_me {
      id
      name
      email
      avatar
      roles
    }
  }
`

export const LIST_USERS = gql`
  query ListUser($first: Int!, $page: Int) {
    list_user(first: $first, page: $page) {
      data {
        id
        name
        gender
        avatar
        banner
        phone_number
        email
        roles
        role_label
        current_address
        created_at
      }
    }
  }
`
