/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: HistoryPaymentsByDate
// ====================================================

export interface HistoryPaymentsByDate_history_payments_by_date_payment_user {
  __typename: "User";
  id: string | null;
  name: string | null;
  phone_number: string | null;
}

export interface HistoryPaymentsByDate_history_payments_by_date_payment {
  __typename: "Payment";
  id: string | null;
  user: HistoryPaymentsByDate_history_payments_by_date_payment_user | null;
}

export interface HistoryPaymentsByDate_history_payments_by_date_user {
  __typename: "User";
  id: string | null;
  email: string | null;
  name: string | null;
}

export interface HistoryPaymentsByDate_history_payments_by_date {
  __typename: "HistoryPayment";
  id: string;
  created_at: any;
  note: string;
  payment: HistoryPaymentsByDate_history_payments_by_date_payment;
  user: HistoryPaymentsByDate_history_payments_by_date_user;
}

export interface HistoryPaymentsByDate {
  history_payments_by_date: (HistoryPaymentsByDate_history_payments_by_date | null)[] | null;
}

export interface HistoryPaymentsByDateVariables {
  dateFrom: string;
  dateTo: string;
}
