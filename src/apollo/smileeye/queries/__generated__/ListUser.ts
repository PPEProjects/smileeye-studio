/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: ListUser
// ====================================================

export interface ListUser_list_user_data {
  __typename: "User";
  id: string | null;
  name: string | null;
  gender: string | null;
  avatar: string | null;
  banner: string | null;
  phone_number: string | null;
  email: string | null;
  roles: any | null;
  current_address: any | null;
  created_at: any;
}

export interface ListUser_list_user_paginatorInfo {
  __typename: "PaginatorInfo";
  /**
   * Index of the current page.
   */
  currentPage: number;
  /**
   * Number of total available items.
   */
  total: number;
}

export interface ListUser_list_user {
  __typename: "ListUser";
  data: (ListUser_list_user_data | null)[] | null;
  paginatorInfo: ListUser_list_user_paginatorInfo | null;
}

export interface ListUser {
  list_user: ListUser_list_user | null;
}

export interface ListUserVariables {
  first: number;
  page: number;
  phone_number?: string | null;
  email?: string | null;
  name?: string | null;
}
