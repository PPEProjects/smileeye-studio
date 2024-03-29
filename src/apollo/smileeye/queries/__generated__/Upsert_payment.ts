/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { UpsertPaymentInput } from "./../../../../../__generated__/smileeyeTypes";

// ====================================================
// GraphQL mutation operation: Upsert_payment
// ====================================================

export interface Upsert_payment_upsert_payment_goal {
  __typename: "GoalRoot";
  id: string | null;
  name: string | null;
  price: number | null;
}

export interface Upsert_payment_upsert_payment {
  __typename: "Payment";
  id: string | null;
  add_user_id: string | null;
  goal_id: string | null;
  goal: Upsert_payment_upsert_payment_goal | null;
  status: string | null;
  type: string | null;
  user_info: any | null;
  code_sale: string | null;
  money: number | null;
  note: string | null;
  attachments: any | null;
  created_at: any | null;
}

export interface Upsert_payment {
  upsert_payment: (Upsert_payment_upsert_payment | null)[] | null;
}

export interface Upsert_paymentVariables {
  input: UpsertPaymentInput;
}
