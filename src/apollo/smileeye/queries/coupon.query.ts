import gql from 'graphql-tag'

export const SORT_COUPONS = gql`
  query SortCoupons($first: Int, $page: Int, $expiry: FilterExpiry) {
    sort_coupons(first: $first, page: $page, expiry: $expiry) {
      data {
        id
        code
        limit
        expiry_date
        sale_percent
        remaining
        created_at
      }
      info {
        total
      }
    }
  }
`
