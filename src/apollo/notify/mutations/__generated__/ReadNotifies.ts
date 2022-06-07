/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ReadNotifiesInput } from "./../../../../../__generated__/notifyTypes";

// ====================================================
// GraphQL mutation operation: ReadNotifies
// ====================================================

export interface ReadNotifies_readNotifies {
  __typename: "Notify";
  id: string;
  /**
   * Ngày đọc thông báo
   */
  readAt: number | null;
}

export interface ReadNotifies {
  readNotifies: ReadNotifies_readNotifies[];
}

export interface ReadNotifiesVariables {
  input: ReadNotifiesInput;
}
