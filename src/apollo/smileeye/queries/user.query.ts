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
    $role: String
    $orderBy: [OrderByClause!]
  ) {
    list_user(
      first: $first
      page: $page
      phone_number: $phone_number
      email: $email
      name: $name
      role: $role
      orderBy: $orderBy
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

export const LIST_POST_BY_UER = gql`
  query PostsByGoalRoot($userId: ID, $goalRootId: ID) {
    list_japanese_posts_by_goal_root(
      user_id: $userId
      goal_root_id: $goalRootId
    ) {
      id
      title
      description
      more
      updated_at
      created_at
    }
  }
`

export const SEARCH_USERS_BY_GOAL = gql`
  query SearchUsersByGoal(
    $first: Int!
    $page: Int!
    $phoneNumber: String
    $email: String
  ) {
    list_user(
      first: $first
      page: $page
      phone_number: $phoneNumber
      email: $email
    ) {
      data {
        id
        name
        email
        phone_number
      }
    }
  }
`
