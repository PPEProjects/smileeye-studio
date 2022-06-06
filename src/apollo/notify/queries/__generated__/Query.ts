/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: Query
// ====================================================

export interface Query {
  /**
   * Lấy số lượng thông báo chưa đọc. Đừng cache query này
   */
  countUnReadNotify: number;
}

export interface QueryVariables {
  user: string;
}
