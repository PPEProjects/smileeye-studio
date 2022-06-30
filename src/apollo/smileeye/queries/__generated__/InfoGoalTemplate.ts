/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: InfoGoalTemplate
// ====================================================

export interface InfoGoalTemplate_info_goal_template_goal_sellRequest {
  __typename: "GoalTemplate";
  id: string | null;
  status: string | null;
}

export interface InfoGoalTemplate_info_goal_template_goal_user {
  __typename: "User";
  id: string | null;
  name: string | null;
  avatar: string | null;
  roles: any | null;
  email: string | null;
  phone_number: string | null;
  current_address: any | null;
}

export interface InfoGoalTemplate_info_goal_template_goal {
  __typename: "GoalRoot";
  id: string | null;
  name: string | null;
  image: any | null;
  description: string | null;
  price: number | null;
  sellRequest: InfoGoalTemplate_info_goal_template_goal_sellRequest | null;
  user: InfoGoalTemplate_info_goal_template_goal_user | null;
}

export interface InfoGoalTemplate_info_goal_template_detail_template {
  __typename: "DetailTemplate";
  trial: number;
  paid_confirmed: number;
  percent_trial: number;
  percent_paid_confirmed: number;
  on_buy: number;
  percent_on_buy: number;
  in_need: number;
  percent_in_need: number;
}

export interface InfoGoalTemplate_info_goal_template {
  __typename: "InfoTemplate";
  id: string;
  goal: InfoGoalTemplate_info_goal_template_goal;
  sum_member: number;
  status: string;
  detail_template: InfoGoalTemplate_info_goal_template_detail_template | null;
}

export interface InfoGoalTemplate {
  info_goal_template: InfoGoalTemplate_info_goal_template | null;
}

export interface InfoGoalTemplateVariables {
  id: string;
}
