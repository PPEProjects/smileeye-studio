/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: SortPaymentsByDate
// ====================================================

export interface SortPaymentsByDate_sort_payments_by_date_goal {
  __typename: "GoalRoot";
  id: string | null;
  name: string | null;
  price: number | null;
}

export interface SortPaymentsByDate_sort_payments_by_date {
  __typename: "Payment";
  id: string | null;
  add_user_id: string | null;
  goal_id: string | null;
  goal: SortPaymentsByDate_sort_payments_by_date_goal | null;
  status: string | null;
  type: string | null;
  user_info: any | null;
  code_sale: string | null;
  money: number | null;
  note: string | null;
  attachments: any | null;
  created_at: any | null;
}

export interface SortPaymentsByDate {
  sort_payments_by_date: (SortPaymentsByDate_sort_payments_by_date | null)[] | null;
}

export interface SortPaymentsByDateVariables {
  dateFrom: string;
  dateTo: string;
}
