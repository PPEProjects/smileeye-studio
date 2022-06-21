/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { AssignRoleInput } from "./../../../../../__generated__/smileeyeTypes";

// ====================================================
// GraphQL mutation operation: AssignRole
// ====================================================

export interface AssignRole_assign_role {
  __typename: "RoleAndPermission";
  id: number;
  name: string;
}

export interface AssignRole {
  assign_role: (AssignRole_assign_role | null)[] | null;
}

export interface AssignRoleVariables {
  input: AssignRoleInput;
}
