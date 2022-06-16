/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { UpdateUserInput } from "./../../../../../__generated__/smileeyeTypes";

// ====================================================
// GraphQL mutation operation: UpdateUserInfo
// ====================================================

export interface UpdateUserInfo_update_user {
  __typename: "User";
  id: string | null;
  name: string | null;
  gender: string | null;
  avatar: string | null;
  banner: string | null;
  phone_number: string | null;
  roles: any | null;
  email: string | null;
  current_address: any | null;
}

export interface UpdateUserInfo {
  update_user: UpdateUserInfo_update_user | null;
}

export interface UpdateUserInfoVariables {
  input: UpdateUserInput;
}
