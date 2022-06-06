import gql from 'graphql-tag'

export const GET_NOTIFIES = gql`
  query GetNotifies($filter: GetNotifiesInput!) {
    getNotifies(filter: $filter) {
      id
      sender {
        id
        appID
        name
        avatar
        specialID
      }
      content
      meta
      createdAt
      readAt
      icon
      type
    }
  }
`

export const GET_COUNT_UNSREAD = gql`
  query CountUnReadNotify($user: String!) {
    countUnReadNotify(user: $user)
  }
`
