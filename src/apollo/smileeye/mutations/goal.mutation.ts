import gql from "graphql-tag";

export const DELETE_GOAL_ROOT = gql`
    mutation Delete_goal_root($input: DeleteGoalRootInput!) {
        delete_goal_root(input: $input)
    }
`