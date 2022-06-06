/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { UpdatePassword } from "./../../../../../__generated__/smileeyeTypes";

// ====================================================
// GraphQL mutation operation: UpdateUserPassword
// ====================================================

export interface UpdateUserPassword_updatePassword {
  __typename: "UpdatePasswordResponse";
  status: string;
  message: string | null;
}

export interface UpdateUserPassword {
  updatePassword: UpdateUserPassword_updatePassword;
}

export interface UpdateUserPasswordVariables {
  input: UpdatePassword;
}
