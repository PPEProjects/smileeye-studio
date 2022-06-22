/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { AssignRoleInput } from "./../../../../../__generated__/smileeyeTypes";

// ====================================================
// GraphQL mutation operation: UpdateRoles
// ====================================================

export interface UpdateRoles_assign_and_remove_role {
  __typename: "User";
  id: string | null;
  roles: any | null;
}

export interface UpdateRoles {
  assign_and_remove_role: UpdateRoles_assign_and_remove_role | null;
}

export interface UpdateRolesVariables {
  input: AssignRoleInput;
}
