/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: ListGoalRoot
// ====================================================

export interface ListGoalRoot_list_goal_root_user {
  __typename: "User";
  id: string | null;
  name: string | null;
}

export interface ListGoalRoot_list_goal_root_sellRequest {
  __typename: "GoalTemplate";
  id: string | null;
  created_at: any;
}

export interface ListGoalRoot_list_goal_root_goal_score {
  __typename: "GoalScore";
  id: string | null;
}

export interface ListGoalRoot_list_goal_root {
  __typename: "GoalRoot";
  id: string | null;
  name: string | null;
  user_id: string | null;
  user: ListGoalRoot_list_goal_root_user | null;
  sellRequest: ListGoalRoot_list_goal_root_sellRequest | null;
  description: string | null;
  goal_score: ListGoalRoot_list_goal_root_goal_score | null;
  total_score: string | null;
  price: number | null;
  status: string | null;
  video: any | null;
  image: any | null;
  type: string | null;
  report_type: string | null;
  owner_percent: string | null;
  detailed_income: any | null;
  trial_blocks: any | null;
  is_trial: boolean | null;
  start_day: any | null;
  created_at: any;
}

export interface ListGoalRoot {
  list_goal_root: (ListGoalRoot_list_goal_root | null)[] | null;
}
