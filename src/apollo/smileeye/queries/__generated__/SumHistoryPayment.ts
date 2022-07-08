/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: SumHistoryPayment
// ====================================================

export interface SumHistoryPayment_sum_history_payment {
  __typename: "SumHistoryPayment";
  sum: number;
}

export interface SumHistoryPayment {
  sum_history_payment: SumHistoryPayment_sum_history_payment | null;
}

export interface SumHistoryPaymentVariables {
  paymentId?: string | null;
}
