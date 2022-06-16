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
  query ListUser(
    $first: Int!
    $page: Int!
    $phone_number: String
    $email: String
    $name: String
  ) {
    list_user(
      first: $first
      page: $page
      phone_number: $phone_number
      email: $email
      name: $name
    ) {
      data {
        id
        name
        gender
        avatar
        banner
        phone_number
        email
        roles
        current_address
        created_at
      }
      paginatorInfo {
        currentPage
        total
      }
    }
  }
`

export const DETAIL_USER = gql`
  query DetailUser($id: ID!) {
    detail_user(id: $id) {
      id
      name
      email
      current_address
      country
      gender
      date_of_birth
      banner
      avatar
      phone_number
      roles
      created_at
    }
  }
`

export const LIST_ROLES = gql`
  query ListRoles($first: Int!, $page: Int) {
    list_roles(first: $first, page: $page) {
      data {
        id
        name
      }
    }
  }
`
