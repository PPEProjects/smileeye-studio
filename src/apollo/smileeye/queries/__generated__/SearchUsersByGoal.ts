/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: SearchUsersByGoal
// ====================================================

export interface SearchUsersByGoal_list_user_data {
  __typename: "User";
  id: string | null;
  name: string | null;
}

export interface SearchUsersByGoal_list_user {
  __typename: "ListUser";
  data: (SearchUsersByGoal_list_user_data | null)[] | null;
}

export interface SearchUsersByGoal {
  list_user: SearchUsersByGoal_list_user | null;
}

export interface SearchUsersByGoalVariables {
  first: number;
  page: number;
  phoneNumber?: string | null;
  email?: string | null;
}
