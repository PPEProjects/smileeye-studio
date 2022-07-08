/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { CreateHistoryPaymentInput } from "./../../../../../__generated__/smileeyeTypes";

// ====================================================
// GraphQL mutation operation: CreateHistoryPayment
// ====================================================

export interface CreateHistoryPayment_create_history_payment_user {
  __typename: "User";
  id: string | null;
  name: string | null;
  avatar: string | null;
}

export interface CreateHistoryPayment_create_history_payment {
  __typename: "HistoryPayment";
  id: string;
  note: string;
  updated_at: any;
  user: CreateHistoryPayment_create_history_payment_user;
}

export interface CreateHistoryPayment {
  create_history_payment: CreateHistoryPayment_create_history_payment | null;
}

export interface CreateHistoryPaymentVariables {
  input: CreateHistoryPaymentInput;
}
