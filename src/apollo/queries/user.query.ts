import gql from "graphql-tag";

export const GET_ME = gql`
    query DetailMe {
        detail_me {
            id
            name
            email
            avatar
            roles
        }
    }
`
