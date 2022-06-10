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

export interface DeleteCouponInput {
  id: string;
}

export interface UpdatePassword {
  old_password: string;
  password: string;
  password_confirmation: string;
}

export interface UpsertCouponInput {
  code: string;
  limit?: number | null;
  sale_percent: number;
  expiry_date?: string | null;
}

//==============================================================
// END Enums and Input Objects
//==============================================================
