/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL subscription operation: SubCountUnRead
// ====================================================

export interface SubCountUnRead_subCountUnRead_user {
  __typename: "User";
  id: string;
}

export interface SubCountUnRead_subCountUnRead {
  __typename: "CountUnreadNotify";
  user: SubCountUnRead_subCountUnRead_user;
  count: number;
}

export interface SubCountUnRead {
  /**
   * Số Notify chưa đọc
   */
  subCountUnRead: SubCountUnRead_subCountUnRead;
}

export interface SubCountUnReadVariables {
  user: string;
}
