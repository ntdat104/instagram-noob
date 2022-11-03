// types
import { FollowType, PostFragment, ReactionType, UserFragment } from '~/types/generated';

export type CurrentAction = 'create' | 'update' | 'delete' | null;

export interface PostSliceState {
  selectedPost: PostFragment | null;
  posts: PostFragment[];
  cursor: string | null;
  currentAction: CurrentAction;
}

export interface ReactPostReducer {
  currentUser: UserFragment;
  postId: string;
  reaction: ReactionType;
}

export interface DeletePostReducer {
  postId: string;
}

export interface AddFetchedPostsReducer {
  posts: PostFragment[];
  cursor: string | null;
}

export interface IncreaseCommentCountsReducer {
  postId: string;
}

export interface FollowUserReducer {
  userId: string;
  followType: FollowType;
  currentUser: UserFragment;
}

export interface UpdateAvatarReducer {
  currentUserId: string;
  avatar: string;
}
