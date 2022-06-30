/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { UpsertCoachMemberInput } from "./../../../../../__generated__/smileeyeTypes";

// ====================================================
// GraphQL mutation operation: UpsertTeacher
// ====================================================

export interface UpsertTeacher_upsert_coach_member_user {
  __typename: "User";
  id: string | null;
  avatar: string | null;
  name: string | null;
  email: string | null;
  phone_number: string | null;
  created_at: any;
  gender: string | null;
}

export interface UpsertTeacher_upsert_coach_member {
  __typename: "CoachMember";
  id: string | null;
  user: UpsertTeacher_upsert_coach_member_user | null;
}

export interface UpsertTeacher {
  upsert_coach_member: UpsertTeacher_upsert_coach_member | null;
}

export interface UpsertTeacherVariables {
  input: UpsertCoachMemberInput;
}
