/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: Ask_delete_user
// ====================================================

export interface Ask_delete_user_ask_delete_user_goals {
  __typename: "GoalRoot";
  id: string | null;
  name: string | null;
}

export interface Ask_delete_user_ask_delete_user {
  __typename: "AskDeleteUser";
  goals: (Ask_delete_user_ask_delete_user_goals | null)[] | null;
}

export interface Ask_delete_user {
  ask_delete_user: Ask_delete_user_ask_delete_user | null;
}

export interface Ask_delete_userVariables {
  id: string;
}
