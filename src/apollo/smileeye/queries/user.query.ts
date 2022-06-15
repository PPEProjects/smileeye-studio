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
    $page: Int
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
        role_label
        current_address
        created_at
      }
      paginatorInfo {
        count
        currentPage
        total
      }
    }
  }
`
