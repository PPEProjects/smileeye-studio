import gql from 'graphql-tag'

export const READ_NOTIFIES = gql`
  mutation ReadNotifies($input: ReadNotifiesInput!) {
    readNotifies(input: $input) {
      id
      readAt
    }
  }
`
