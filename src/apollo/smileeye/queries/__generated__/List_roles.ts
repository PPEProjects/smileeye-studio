/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: List_roles
// ====================================================

export interface List_roles_list_roles_data {
  __typename: "RoleAndPermission";
  id: string;
  name: string;
}

export interface List_roles_list_roles {
  __typename: "RoleAndPermissionPaginator";
  /**
   * A list of RoleAndPermission items.
   */
  data: List_roles_list_roles_data[];
}

export interface List_roles {
  list_roles: List_roles_list_roles | null;
}

export interface List_rolesVariables {
  first: number;
  page?: number | null;
}
