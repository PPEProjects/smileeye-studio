/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: ListCoachs
// ====================================================

export interface ListCoachs_list_coach_members {
  __typename: "User";
  id: string | null;
  avatar: string | null;
  name: string | null;
  email: string | null;
  phone_number: string | null;
  created_at: any;
  gender: string | null;
}

export interface ListCoachs {
  list_coach_members: (ListCoachs_list_coach_members | null)[] | null;
}

export interface ListCoachsVariables {
  goalRootId?: string | null;
}
