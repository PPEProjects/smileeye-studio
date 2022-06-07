import gql from 'graphql-tag'

export const SUB_COUNT_UNREAD = gql`
  subscription SubCountUnRead($user: String!) {
    subCountUnRead(user: $user) {
      user {
        id
      }
      count
    }
  }
`

export const SUB_NEW_NOTIFY = gql`
  subscription SubNotify($user: String!) {
    subNotify(user: $user) {
      id
      sender {
        id
        appID
        specialID
        name
        avatar
      }
      content
      type
      icon
      meta
      createdAt
      readAt
    }
  }
`
