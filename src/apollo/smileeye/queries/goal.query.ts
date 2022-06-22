import gql from 'graphql-tag'

export const GOAL_ROOT_BY_USER = gql`
  query GoalRootByUser($userId: ID!) {
    goal_root_by_user(user_id: $userId) {
      id
      name
      description
      image
    }
  }
`

export const GOAL_TREE = gql`
  query GetGoalTree($goalId: ID) {
    my_tree_goal_v2(goal_id: $goalId)
  }
`

export const LIST_GOAL_ROOT = gql`
  query List_goal_root {
    list_goal_root {
      id
      name
      user_id
      user {
        id
        name
      }
      sellRequest {
        id
      }
      description
      goal_score {
        id
      }
      total_score
      price
      status
      video
      image
      type
      report_type
      owner_percent
      detailed_income
      trial_blocks
      is_trial
      start_day
      created_at
    }
  }
`
