/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: DetailMe
// ====================================================

export interface DetailMe_detail_me {
  __typename: "User";
  id: string | null;
  name: string | null;
  email: string | null;
  avatar: string | null;
  roles: any | null;
  address: string | null;
}

export interface DetailMe {
  detail_me: DetailMe_detail_me | null;
}
