/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

export enum FilterExpiry {
  all = "all",
  availability = "availability",
  expired = "expired",
}

export enum STATUS {
  IN_NEED = "IN_NEED",
  ON_BUY = "ON_BUY",
  PAID_CONFIRMED = "PAID_CONFIRMED",
  TRIAL = "TRIAL",
}

/**
 * Directions for ordering a list of records.
 */
export enum SortOrder {
  ASC = "ASC",
  DESC = "DESC",
}

export interface AssignRoleInput {
  role_ids: string[];
  user_id: string;
}

export interface CreateHistoryPaymentInput {
  user_id: string;
  payment_id: string;
  note: string;
}

export interface DeleteCoachFromGoal {
  user_id?: string | null;
  goal_root_id?: string | null;
}

export interface DeleteCouponInput {
  id: string;
}

export interface DeleteGoalMemberInput {
  user_id?: string | null;
  goal_root_id?: string | null;
}

export interface DeleteGoalRootInput {
  id?: string | null;
  is_admin?: boolean | null;
}

export interface DeleteGoalTemplateInput {
  goal_id: string;
}

export interface DeleteJapanesePostInput {
  id: string;
}

export interface EditGoalRootInput {
  id?: string | null;
  name?: string | null;
  description?: string | null;
  price?: number | null;
  status?: string | null;
  video?: any | null;
  image?: any | null;
  owner_percent?: string | null;
  start_day?: any | null;
  end_day?: any | null;
  trial_blocks?: any | null;
  is_trial?: boolean | null;
  is_admin?: boolean | null;
}

/**
 * Allows ordering a list of records.
 */
export interface OrderByClause {
  column: string;
  order: SortOrder;
}

export interface SearchPayment {
  user_name?: string | null;
  email?: string | null;
  phone_number?: string | null;
  goal_name?: string | null;
}

export interface UpdatePassword {
  old_password: string;
  password: string;
  password_confirmation: string;
}

export interface UpdateUserInput {
  id?: string | null;
  role_label?: string | null;
  email?: string | null;
  permission?: any | null;
  username?: string | null;
  phone_number?: string | null;
  first_name?: string | null;
  name?: string | null;
  address?: string | null;
  current_address?: any | null;
  country?: string | null;
  gender?: string | null;
  date_of_birth?: string | null;
  roles?: any | null;
  is_flag?: boolean | null;
  quotes?: string | null;
  avatar?: string | null;
  banner?: string | null;
}

export interface UpsertCoachMemberInput {
  user_id?: string | null;
  goal_ids?: (string | null)[] | null;
}

export interface UpsertCouponInput {
  code: string;
  limit?: number | null;
  sale_percent: number;
  goal_root_ids?: (string | null)[] | null;
  expiry_date?: string | null;
}

export interface UpsertGoalTemplateInput {
  goal_id?: string | null;
  status?: string | null;
  request?: string | null;
  sell_goal?: string | null;
  message?: string | null;
}

export interface UpsertPaymentInput {
  id?: string | null;
  add_user_id?: string | null;
  goal_id?: (string | null)[] | null;
  status?: STATUS | null;
  user_info?: any | null;
  type?: string | null;
  code_sale?: string | null;
  money?: number | null;
  note?: string | null;
  attachments?: any | null;
}

//==============================================================
// END Enums and Input Objects
//==============================================================
