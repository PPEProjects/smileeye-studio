/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { UpdatePassword } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: UpdatePassword
// ====================================================

export interface UpdatePassword_updatePassword {
  __typename: "UpdatePasswordResponse";
  status: string;
  message: string | null;
}

export interface UpdatePassword {
  updatePassword: UpdatePassword_updatePassword;
}

export interface UpdatePasswordVariables {
  input: UpdatePassword;
}
