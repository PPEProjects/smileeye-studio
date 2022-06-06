/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL subscription operation: SubToast
// ====================================================

export interface SubToast_subToast {
  __typename: "Toast";
  /**
   * Nội dung thông báo
   */
  message: string;
  /**
   * Có phải thất bại hay không
   */
  error: boolean;
}

export interface SubToast {
  /**
   * Nhận thông báo nhanh
   */
  subToast: SubToast_subToast;
}

export interface SubToastVariables {
  user: string;
}
