/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: ListStudent
// ====================================================

export interface ListStudent_list_student {
  __typename: "User";
  id: string | null;
  name: string | null;
  avatar: string | null;
  email: string | null;
  phone_number: string | null;
  sum_day_learn: number | null;
  created_at: any;
}

export interface ListStudent {
  list_student: (ListStudent_list_student | null)[] | null;
}

export interface ListStudentVariables {
  goalRootId?: string | null;
}
