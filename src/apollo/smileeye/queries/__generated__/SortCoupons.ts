/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { FilterExpiry } from "./../../../../../__generated__/smileeyeTypes";

// ====================================================
// GraphQL query operation: SortCoupons
// ====================================================

export interface SortCoupons_sort_coupons_data {
  __typename: "Coupon";
  id: string | null;
  code: string | null;
  limit: number | null;
  expiry_date: any | null;
  sale_percent: number | null;
  remaining: number | null;
  created_at: any | null;
}

export interface SortCoupons_sort_coupons_info {
  __typename: "InfoCoupon";
  last_page: number | null;
  expired: number | null;
  availability: number | null;
}

export interface SortCoupons_sort_coupons {
  __typename: "SortCoupon";
  data: (SortCoupons_sort_coupons_data | null)[] | null;
  info: SortCoupons_sort_coupons_info | null;
}

export interface SortCoupons {
  sort_coupons: SortCoupons_sort_coupons | null;
}

export interface SortCouponsVariables {
  first?: number | null;
  page?: number | null;
  expiry?: FilterExpiry | null;
}
