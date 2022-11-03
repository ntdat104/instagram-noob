import { CommentFragment, ReactionType, UserFragment } from '~/types/generated';

interface CommentPerPost {
  [postId: string]: {
    data: CommentFragment[];
    displayedComments: CommentFragment[];
    cursor: string | null;
    hasMore: boolean;
  };
}

export interface CommentSliceState {
  comments: CommentPerPost;
  selectedComment: CommentFragment | null;
}

export interface AddNewCommentReducer {
  postId: string;
  comment: CommentFragment;
}

export interface AddCommentsReducer {
  postId: string;
  comments: CommentFragment[];
  cursor: string | null;
  hasMore: boolean;
}

export interface ReactCommentReducer {
  currentUser: UserFragment;
  postId: string;
  commentId: string;
  reaction: ReactionType;
}

export interface UpdateAvatarReducer {
  currentUserId: string;
  avatar: string;
}
