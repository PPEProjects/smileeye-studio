/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { GetNotifiesInput } from "./../../../../../__generated__/globalTypes";

// ====================================================
// GraphQL query operation: GetNotifies
// ====================================================

export interface GetNotifies_getNotifies_sender {
  __typename: "User";
  id: string;
  appID: string;
  /**
   * Tên thành viên
   */
  name: string;
  avatar: string;
  specialID: string;
}

export interface GetNotifies_getNotifies {
  __typename: "Notify";
  id: string;
  /**
   * Người gửi, nếu nil sẽ là system
   */
  sender: GetNotifies_getNotifies_sender | null;
  /**
   * Nội dung thông báo. Có thể là HTML
   */
  content: string;
  /**
   * Dữ liệu tuỳ chỉnh của thông báo
   */
  meta: any | null;
  /**
   * Ngày thông báo được gửi
   */
  createdAt: number;
  /**
   * Ngày đọc thông báo
   */
  readAt: number | null;
  /**
   * Icon thông báo
   */
  icon: string | null;
  /**
   * Phân nhóm thông báo
   */
  type: string;
}

export interface GetNotifies {
  getNotifies: GetNotifies_getNotifies[];
}

export interface GetNotifiesVariables {
  filter: GetNotifiesInput;
}
