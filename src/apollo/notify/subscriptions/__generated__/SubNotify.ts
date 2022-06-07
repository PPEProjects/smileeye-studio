/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL subscription operation: SubNotify
// ====================================================

export interface SubNotify_subNotify_sender {
  __typename: "User";
  id: string;
  appID: string;
  specialID: string;
  /**
   * Tên thành viên
   */
  name: string;
  avatar: string;
}

export interface SubNotify_subNotify {
  __typename: "Notify";
  id: string;
  /**
   * Người gửi, nếu nil sẽ là system
   */
  sender: SubNotify_subNotify_sender | null;
  /**
   * Nội dung thông báo. Có thể là HTML
   */
  content: string;
  /**
   * Phân nhóm thông báo
   */
  type: string;
  /**
   * Icon thông báo
   */
  icon: string | null;
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
}

export interface SubNotify {
  /**
   * Nhận thông báo
   */
  subNotify: SubNotify_subNotify;
}

export interface SubNotifyVariables {
  user: string;
}
