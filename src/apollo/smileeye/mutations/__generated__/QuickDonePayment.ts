/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { UpsertPaymentInput } from "./../../../../../__generated__/smileeyeTypes";

// ====================================================
// GraphQL mutation operation: QuickDonePayment
// ====================================================

export interface QuickDonePayment_upsert_payment {
  __typename: "Payment";
  id: string | null;
  status: string | null;
}

export interface QuickDonePayment {
  upsert_payment: (QuickDonePayment_upsert_payment | null)[] | null;
}

export interface QuickDonePaymentVariables {
  input: UpsertPaymentInput;
}
