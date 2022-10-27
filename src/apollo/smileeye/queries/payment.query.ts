import gql from 'graphql-tag'

export const SORT_PAYMENTS = gql`
  query SortPayments($first: Int, $page: Int, $status: String, $search: SearchPayment) {
    sort_payments(first: $first, page: $page, status: $status, search: $search) {
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
    updated_at
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
      updated_at
      bill_upserted_at
    }
  }
`

export const HISTORY_PAYMENT = gql`
  query HistoryPayment($first: Int!, $page: Int!) {
    history_payment(first: $first, page: $page) {
      id
      note
      created_at
      user {
        id
        name
        avatar
      }
      payment {
        id
        status
        goal {
          id
          price
          name
        }
      }
    }
  }
`

export const SUM_PAYMENT_HISTORY = gql`
  query SumHistoryPayment($paymentId: ID) {
    sum_history_payment(payment_id: $paymentId) {
      sum
    }
  }
`

export const HISTORY_BY_DATE = gql`
  query HistoryPaymentsByDate($dateFrom: String!, $dateTo: String!) {
    history_payments_by_date(date_from: $dateFrom, date_to: $dateTo) {
      id
      created_at
      note
      payment {
        id
          user {
            id
              name
              phone_number
          }
      }
      user {
        id
        email
        name
      }
    }
  }
`


export const ADD_PAYMENT = gql`
  mutation Upsert_payment($input: UpsertPaymentInput!) {
    upsert_payment(input: $input) {
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
