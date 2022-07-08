/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: HistoryPayment
// ====================================================

export interface HistoryPayment_history_payment_user {
  __typename: "User";
  id: string | null;
  name: string | null;
  avatar: string | null;
}

export interface HistoryPayment_history_payment_payment_goal {
  __typename: "GoalRoot";
  id: string | null;
  price: number | null;
  name: string | null;
}

export interface HistoryPayment_history_payment_payment {
  __typename: "Payment";
  id: string | null;
  status: string | null;
  goal: HistoryPayment_history_payment_payment_goal | null;
}

export interface HistoryPayment_history_payment {
  __typename: "HistoryPayment";
  id: string;
  note: string;
  created_at: any;
  user: HistoryPayment_history_payment_user;
  payment: HistoryPayment_history_payment_payment;
}

export interface HistoryPayment {
  history_payment: (HistoryPayment_history_payment | null)[] | null;
}

export interface HistoryPaymentVariables {
  first: number;
  page: number;
}
