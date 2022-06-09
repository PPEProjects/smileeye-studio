/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { UpsertCouponInput } from "./../../../../../__generated__/smileeyeTypes";

// ====================================================
// GraphQL mutation operation: UpsertCoupon
// ====================================================

export interface UpsertCoupon_upsert_coupon {
  __typename: "Coupon";
  id: string | null;
  code: string | null;
  limit: number | null;
  expiry_date: any | null;
  sale_percent: number | null;
  remaining: number | null;
  created_at: any | null;
}

export interface UpsertCoupon {
  upsert_coupon: UpsertCoupon_upsert_coupon | null;
}

export interface UpsertCouponVariables {
  input: UpsertCouponInput;
}
