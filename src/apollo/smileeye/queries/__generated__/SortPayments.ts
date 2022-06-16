/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: SortPayments
// ====================================================

export interface SortPayments_sort_payments_goal {
  __typename: "GoalRoot";
  id: string | null;
  name: string | null;
  price: number | null;
}

export interface SortPayments_sort_payments {
  __typename: "Payment";
  id: string | null;
  add_user_id: string | null;
  goal_id: string | null;
  goal: SortPayments_sort_payments_goal | null;
  status: string | null;
  type: string | null;
  user_info: any | null;
  code_sale: string | null;
  money: number | null;
  note: string | null;
  attachments: any | null;
  created_at: any | null;
}

export interface SortPayments {
  sort_payments: (SortPayments_sort_payments | null)[] | null;
}

export interface SortPaymentsVariables {
  first?: number | null;
  page?: number | null;
}
