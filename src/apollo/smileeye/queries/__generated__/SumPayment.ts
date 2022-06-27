/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: SumPayment
// ====================================================

export interface SumPayment_sum_payment {
  __typename: "SumPayment";
  sum: number | null;
  number_status: number | null;
}

export interface SumPayment {
  sum_payment: SumPayment_sum_payment | null;
}

export interface SumPaymentVariables {
  status?: string | null;
}
