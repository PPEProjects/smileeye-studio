/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: SortPayments
// ====================================================

export interface SortPayments_sort_payments_user {
  __typename: "User";
  id: string | null;
  name: string | null;
  avatar: string | null;
  phone_number: string | null;
  email: string | null;
  username: string | null;
}

export interface SortPayments_sort_payments_goal {
  __typename: "Goal";
  id: string | null;
  name: string | null;
}

export interface SortPayments_sort_payments {
  __typename: "Payment";
  id: string | null;
  user: SortPayments_sort_payments_user | null;
  attachments: any | null;
  created_at: any | null;
  money: string | null;
  status: string | null;
  goal: SortPayments_sort_payments_goal | null;
  note: string | null;
}

export interface SortPayments {
  sort_payments: (SortPayments_sort_payments | null)[] | null;
}

export interface SortPaymentsVariables {
  first?: number | null;
  page?: number | null;
}
