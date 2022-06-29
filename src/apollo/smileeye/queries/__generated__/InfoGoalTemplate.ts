/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: InfoGoalTemplate
// ====================================================

export interface InfoGoalTemplate_info_goal_template_goal {
  __typename: "GoalRoot";
  id: string | null;
  name: string | null;
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
