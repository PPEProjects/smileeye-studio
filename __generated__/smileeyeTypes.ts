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
  ON_BUY = "ON_BUY",
  PAID_CONFIRMED = "PAID_CONFIRMED",
  SENT_RECEIPT = "SENT_RECEIPT",
  TRIAL = "TRIAL",
}

export interface DeleteCouponInput {
  id: string;
}

export interface DeletePaymentInput {
  id: string;
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

export interface UpsertCouponInput {
  code: string;
  limit?: number | null;
  sale_percent: number;
  goal_root_ids?: (string | null)[] | null;
  expiry_date?: string | null;
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
