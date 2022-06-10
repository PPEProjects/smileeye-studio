import gql from 'graphql-tag'

export const SORT_PAYMENTS = gql`
  query SortPayments($first: Int, $page: Int) {
    sort_payments(first: $first, page: $page) {
      id
      user {
        id
        name
        avatar
        phone_number
        email
        username
      }
      attachments
      created_at
      money
      status
      goal {
        id
        name
      }
      note
    }
  }
`
