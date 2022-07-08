import gql from 'graphql-tag'

export const UPSERT_PAYMENT = gql`
  mutation UpsertPayment($input: UpsertPaymentInput!) {
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

export const QUICK_DONE_PAYMENT = gql`
  mutation QuickDonePayment($input: UpsertPaymentInput!) {
    upsert_payment(input: $input) {
      id
      status
      money
    }
  }
`


export const CREATE_HISTORY_PAYMENT = gql`
  mutation CreateHistoryPayment($input: CreateHistoryPaymentInput!) {
    create_history_payment(input: $input) {
      id
      note
      updated_at
      user {
        id
        name
        avatar
      }
    }
  }
`
