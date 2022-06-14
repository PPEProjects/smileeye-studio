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
        email
        roles
        role_label
        created_at
      }
    }
  }
`
