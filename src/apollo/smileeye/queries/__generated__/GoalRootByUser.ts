/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GoalRootByUser
// ====================================================

export interface GoalRootByUser_goal_root_by_user {
  __typename: "GoalRoot";
  id: string | null;
  name: string | null;
  description: string | null;
  image: any | null;
}

export interface GoalRootByUser {
  goal_root_by_user: (GoalRootByUser_goal_root_by_user | null)[] | null;
}

export interface GoalRootByUserVariables {
  userId: string;
}
