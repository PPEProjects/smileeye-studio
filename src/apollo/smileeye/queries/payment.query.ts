import gql from 'graphql-tag'

export const SORT_PAYMENTS = gql`
  query SortPayments($first: Int, $page: Int, $status: String) {
    sort_payments(first: $first, page: $page, status: $status) {
      id
      add_user_id
      goal_id
      goal {
        id
        name
        price
      }
      status
      type
      user_info
      code_sale
      money
      note
      attachments
      created_at
    }
  }
`

export const SUM_PAYMENT = gql`
  query SumPayment($status: String) {
    sum_payment(status: $status) {
      sum
      number_status
    }
  }
`

export const PAYMENT_BY_ID = gql`
  fragment PaymentByID on Payment {
    id
    status
    goal_id
    add_user_id
  }
`

export const GET_PAYMENT_BY_DAY = gql`
  query SortPaymentsByDate($dateFrom: String!, $dateTo: String!) {
    sort_payments_by_date(date_from: $dateFrom, date_to: $dateTo) {
      id
      add_user_id
      goal_id
      goal {
        id
        name
        price
      }
      status
      type
      user_info
      code_sale
      money
      note
      attachments
      created_at
    }
  }
`
