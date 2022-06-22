/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: ListRoles
// ====================================================

export interface ListRoles_list_roles_data {
  __typename: "RoleAndPermission";
  id: number;
  name: string;
}

export interface ListRoles_list_roles {
  __typename: "RoleAndPermissionPaginator";
  /**
   * A list of RoleAndPermission items.
   */
  data: ListRoles_list_roles_data[];
}

export interface ListRoles {
  list_roles: ListRoles_list_roles | null;
}

export interface ListRolesVariables {
  first: number;
  page?: number | null;
}
