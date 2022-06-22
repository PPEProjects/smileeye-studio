/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: List_goal_root
// ====================================================

export interface List_goal_root_list_goal_root_user {
  __typename: "User";
  id: string | null;
  name: string | null;
}

export interface List_goal_root_list_goal_root_sellRequest {
  __typename: "GoalTemplate";
  id: string | null;
}

export interface List_goal_root_list_goal_root_goal_score {
  __typename: "GoalScore";
  id: string | null;
}

export interface List_goal_root_list_goal_root {
  __typename: "GoalRoot";
  id: string | null;
  name: string | null;
  user_id: string | null;
  user: List_goal_root_list_goal_root_user | null;
  sellRequest: List_goal_root_list_goal_root_sellRequest | null;
  description: string | null;
  goal_score: List_goal_root_list_goal_root_goal_score | null;
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

export interface List_goal_root {
  list_goal_root: (List_goal_root_list_goal_root | null)[] | null;
}
