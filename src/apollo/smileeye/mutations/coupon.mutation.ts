import gql from 'graphql-tag'

export const DELETE_COUPON = gql`
  mutation DeleteCoupon($input: DeleteCouponInput!) {
    delete_coupon(input: $input)
  }
`

export const UPSERT_COUPON = gql`
  mutation UpsertCoupon($input: UpsertCouponInput!) {
    upsert_coupon(input: $input) {
      id
      code
      limit
      expiry_date
      sale_percent
      remaining
      created_at
    }
  }
`
