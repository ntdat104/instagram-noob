import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';

// types
import {
  AddCommentsReducer,
  AddNewCommentReducer,
  CommentSliceState,
  ReactCommentReducer,
  UpdateAvatarReducer,
} from '../types/comment';

import { CommentFragment, ReactionType } from '~/types/generated';

const initialState: CommentSliceState = {
  comments: {},
  selectedComment: null,
};

const initComment = (state: CommentSliceState, postId: string) => {
  if (state.comments[postId] == null)
    state.comments[postId] = {
      data: [],
      cursor: null,
      hasMore: true, // Init to true so first request can made when open modal post detail
      displayedComments: [],
    };
};

const commentSlice = createSlice({
  name: 'comment',
  initialState,
  reducers: {
    addNewComment: (
      state,
      { payload: { postId, comment } }: PayloadAction<AddNewCommentReducer>,
    ) => {
      initComment(state, postId);

      state.comments[postId].data.unshift(comment);
    },

    addDisplayedComment: (
      state,
      { payload: { postId, comment } }: PayloadAction<AddNewCommentReducer>,
    ) => {
      initComment(state, postId);

      if (state.comments[postId].data.length > 0) state.comments[postId].data.unshift(comment);

      state.comments[postId].displayedComments.unshift(comment);
    },

    addFetchedComments: (
      state,
      { payload: { postId, comments, cursor, hasMore } }: PayloadAction<AddCommentsReducer>,
    ) => {
      if (state.comments[postId] == null)
        state.comments[postId] = {
          data: [],
          cursor: null,
          hasMore: false,
          displayedComments: [],
        };

      state.comments[postId].data.push(...comments);
      state.comments[postId].cursor = cursor;
      state.comments[postId].hasMore = hasMore;
    },

    deleteComment: (state, { payload }: PayloadAction<CommentFragment>) => {
      const comment = state.comments[payload.postId];

      const filterComments = (comments: CommentFragment[]) =>
        comments.filter((comment) => comment._id !== payload._id);

      comment.data = filterComments(comment.data);
      comment.displayedComments = filterComments(comment.displayedComments);
    },

    reactComment: (
      state,
      { payload: { currentUser, postId, commentId, reaction } }: PayloadAction<ReactCommentReducer>,
    ) => {
      if (state.comments[postId] == null) return;

      const handleReactComment = (comments: CommentFragment[]) => {
        comments.forEach((comment) => {
          if (comment._id !== commentId) return;

          if (reaction === ReactionType.Like) comment.reactions.push(currentUser);
          else
            comment.reactions = comment.reactions.filter(
              (reactedUser) => reactedUser._id !== currentUser._id,
            );
        });
      };

      handleReactComment(state.comments[postId].data);
      handleReactComment(state.comments[postId].displayedComments);
    },

    // Selected to implement actions
    setSelectedComment: (state, action: PayloadAction<CommentFragment | null>) => {
      state.selectedComment = action.payload;
    },

    // In profile page
    updateAvatar: (
      { comments },
      { payload: { currentUserId, avatar } }: PayloadAction<UpdateAvatarReducer>,
    ) => {
      Object.keys(comments).forEach((postId) => {
        comments[postId].data.forEach((comment) => {
          if (comment.user._id === currentUserId) comment.user.avatar = avatar;
        });
      });
    },
  },
  extraReducers: {
    [HYDRATE]: (state, { payload }) => ({
      ...state,
      ...payload.comment,
    }),
  },
});

export const commentActions = commentSlice.actions;

export default commentSlice.reducer;
