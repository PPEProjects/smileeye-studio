/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: DetailUser
// ====================================================

export interface DetailUser_detail_user {
  __typename: "User";
  id: string | null;
  name: string | null;
  current_address: any | null;
  country: string | null;
  gender: string | null;
  date_of_birth: string | null;
  banner: string | null;
  avatar: string | null;
  phone_number: string | null;
}

export interface DetailUser {
  detail_user: DetailUser_detail_user | null;
}

export interface DetailUserVariables {
  id: string;
}
