/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: PostsByGoalRoot
// ====================================================

export interface PostsByGoalRoot_list_japanese_posts_by_goal_root {
  __typename: "JapanesePost";
  id: string | null;
  title: string | null;
  description: string | null;
  more: any | null;
  updated_at: any | null;
  created_at: any | null;
}

export interface PostsByGoalRoot {
  list_japanese_posts_by_goal_root: (PostsByGoalRoot_list_japanese_posts_by_goal_root | null)[] | null;
}

export interface PostsByGoalRootVariables {
  userId?: string | null;
  goalRootId?: string | null;
}
