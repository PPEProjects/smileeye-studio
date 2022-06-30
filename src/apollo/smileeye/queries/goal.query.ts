import gql from 'graphql-tag'

// goal_root_by_user
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

export const GET_POST_BOTH = gql`
  query ListPostsAndDiary($userId: ID, $goalRootId: ID) {
    list_posts_and_diary(user_id: $userId, goal_root_id: $goalRootId) {
      ... on JapanesePost {
        id
        title
        more
        type
        created_at
      }
      ... on StoryShare {
        id
        content
        created_at
        goal {
          id
          name
        }
      }
    }
  }
`

export const LIST_GOAL_ROOT = gql`
  query ListGoalRoot {
    list_goal_root {
      id
      name
      user {
        id
        name
      }
      sellRequest {
        id
        status
        created_at
      }
      price
      owner_percent
      detailed_income
      trial_blocks
      created_at
    }
  }
`

export const GOAL_INFO = gql`
  query InfoGoalTemplate($id: ID!) {
    info_goal_template(goal_root_id: $id) {
      id
      goal {
        id
        name
        image
        description
        price
        sellRequest {
          id
          status
        }
        user {
          id
          name
          avatar
          roles
          email
          phone_number
          current_address
        }
      }
      sum_member
      status
      detail_template {
        trial
        paid_confirmed
        percent_trial
        percent_paid_confirmed
        on_buy
        percent_on_buy
        in_need
        percent_in_need
      }
    }
  }
`

export const LIST_STUDENTS = gql`
  query ListStudent($goalRootId: ID) {
    list_student(goal_root_id: $goalRootId) {
      id
      name
      avatar
      email
      phone_number
      sum_day_learn
      created_at
    }
  }
`

export const LIST_COACHS = gql`
  query ListCoachs($goalRootId: ID) {
    list_coach_members(goal_root_id: $goalRootId) {
      id
      avatar
      name
      email
      phone_number
      created_at
      gender
    }
  }
`
