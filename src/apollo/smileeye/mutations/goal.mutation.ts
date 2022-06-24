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
