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
  role_label: string | null;
  current_address: any | null;
  created_at: any;
}

export interface ListUser_list_user {
  __typename: "UserPaginator";
  /**
   * A list of User items.
   */
  data: ListUser_list_user_data[];
}

export interface ListUser {
  list_user: ListUser_list_user | null;
}

export interface ListUserVariables {
  first: number;
  page?: number | null;
}
