/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { UpsertGoalTemplateInput, EditGoalRootInput } from "./../../../../../__generated__/smileeyeTypes";

// ====================================================
// GraphQL mutation operation: UpdateGoalDeal
// ====================================================

export interface UpdateGoalDeal_upsert_goal_template_goal_sellRequest {
  __typename: "GoalTemplate";
  id: string | null;
  status: string | null;
}

export interface UpdateGoalDeal_upsert_goal_template_goal {
  __typename: "GoalRoot";
  sellRequest: UpdateGoalDeal_upsert_goal_template_goal_sellRequest | null;
}

export interface UpdateGoalDeal_upsert_goal_template {
  __typename: "GoalTemplate";
  id: string | null;
  goal: UpdateGoalDeal_upsert_goal_template_goal | null;
}

export interface UpdateGoalDeal_upsert_goal_root {
  __typename: "GoalRoot";
  id: string | null;
  price: number | null;
  owner_percent: string | null;
}

export interface UpdateGoalDeal {
  upsert_goal_template: UpdateGoalDeal_upsert_goal_template | null;
  upsert_goal_root: UpdateGoalDeal_upsert_goal_root | null;
}

export interface UpdateGoalDealVariables {
  input: UpsertGoalTemplateInput;
  form: EditGoalRootInput;
}
