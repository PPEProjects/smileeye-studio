import gql from 'graphql-tag'

export const DELETE_POST = gql`
  mutation DeletePosts($input: DeleteJapanesePostInput!) {
    delete_japanese_posts(input: $input)
  }
`

export const DELETE_DIARY = gql`
  mutation DeleteShare($id: ID!) {
    delete_story_share(id: $id)
  }
`
