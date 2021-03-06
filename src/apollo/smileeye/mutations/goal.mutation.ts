import gql from 'graphql-tag'

export const DELETE_GOAL_ROOT = gql`
  mutation Delete_goal_root($input: DeleteGoalRootInput!) {
    delete_goal_root(input: $input)
  }
`

export const UPDATE_GOAL_DEAL = gql`
  mutation UpdateGoalDeal(
    $input: UpsertGoalTemplateInput!
    $form: EditGoalRootInput!
  ) {
    upsert_goal_template(input: $input) {
      id
      goal {
        id
        sellRequest {
          id
          status
        }
      }
    }
    upsert_goal_root(input: $form) {
      id
      price
      owner_percent
    }
  }
`

export const DELETE_GOAL_TEMPLATE = gql`
  mutation DeleteGoalTemplate($input: DeleteGoalTemplateInput!) {
    delete_goal_template(input: $input)
  }
`

export const DELETE_STUDENT = gql`
  mutation DeleteStudent($input: DeleteGoalMemberInput!) {
    delete_member_from_goal(input: $input)
  }
`

export const DELETE_TEACHER = gql`
  mutation DeleteTeacher($input: DeleteCoachFromGoal!) {
    delete_coach_from_goal(input: $input)
  }
`

export const UPSERT_COACH = gql`
  mutation UpsertTeacher($input: UpsertCoachMemberInput!) {
    upsert_coach_member(input: $input) {
      id
      user {
        id
        avatar
        name
        email
        phone_number
        created_at
        gender
      }
    }
  }
`
