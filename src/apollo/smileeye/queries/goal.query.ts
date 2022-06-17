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
