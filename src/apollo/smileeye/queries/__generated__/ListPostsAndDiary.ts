/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: ListPostsAndDiary
// ====================================================

export interface ListPostsAndDiary_list_posts_and_diary_JapanesePost {
  __typename: "JapanesePost";
  id: string | null;
  title: string | null;
  more: any | null;
  type: string | null;
  created_at: any;
}

export interface ListPostsAndDiary_list_posts_and_diary_StoryShare_goal {
  __typename: "Goal";
  id: string | null;
  name: string | null;
}

export interface ListPostsAndDiary_list_posts_and_diary_StoryShare {
  __typename: "StoryShare";
  id: string | null;
  content: string | null;
  created_at: any;
  goal: ListPostsAndDiary_list_posts_and_diary_StoryShare_goal | null;
}

export type ListPostsAndDiary_list_posts_and_diary = ListPostsAndDiary_list_posts_and_diary_JapanesePost | ListPostsAndDiary_list_posts_and_diary_StoryShare;

export interface ListPostsAndDiary {
  list_posts_and_diary: (ListPostsAndDiary_list_posts_and_diary | null)[] | null;
}

export interface ListPostsAndDiaryVariables {
  userId?: string | null;
  goalRootId?: string | null;
}
