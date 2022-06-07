/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

export interface GetNotifiesInput {
  sort: string;
  page: number;
  limit: number;
  user: string;
  unRead?: boolean | null;
}

export interface ReadNotifiesInput {
  ids: string[];
  user: string;
}

//==============================================================
// END Enums and Input Objects
//==============================================================
