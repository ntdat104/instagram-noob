import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';

// types
import {
  AddFetchedPostsReducer,
  CurrentAction,
  DeletePostReducer,
  FollowUserReducer,
  IncreaseCommentCountsReducer,
  PostSliceState,
  ReactPostReducer,
  UpdateAvatarReducer,
} from '../types/post';

import { FollowType, PostFragment, ReactionType } from '~/types/generated';

const initialState: PostSliceState = {
  posts: [],
  cursor: null,
  selectedPost: null,
  currentAction: null,
};

export const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    addNewPost: (state, action: PayloadAction<PostFragment>) => {
      state.posts.unshift(action.payload);
    },

    addFetchedPosts: (
      state,
      { payload: { cursor, posts } }: PayloadAction<AddFetchedPostsReducer>,
    ) => {
      state.posts.push(...posts);
      state.cursor = cursor;
    },

    updatePost: (state, { payload: updatedPost }: PayloadAction<PostFragment>) => {
      state.posts = state.posts.map((post) => (post._id === updatedPost._id ? updatedPost : post));

      if (state.selectedPost != null) state.selectedPost = updatedPost;
    },

    reactPost: (state, { payload }: PayloadAction<ReactPostReducer>) => {
      const { postId, currentUser, reaction } = payload;

      const handleReactPost = (post: PostFragment) => {
        if (reaction === ReactionType.Like) post.reactions.push(currentUser);
        else
          post.reactions = post.reactions.filter(
            (reactedUser) => reactedUser._id !== currentUser._id,
          );
      };

      if (state.selectedPost) handleReactPost(state.selectedPost);

      state.posts.forEach((post) => {
        if (post._id !== postId) return;

        handleReactPost(post);
      });
    },

    deletePost: (state, { payload }: PayloadAction<DeletePostReducer>) => {
      state.posts = state.posts.filter((post) => post._id !== payload.postId);
    },

    followUserByPost: (
      state,
      { payload: { userId, currentUser, followType } }: PayloadAction<FollowUserReducer>,
    ) => {
      const handleFollowUserByPost = (post: PostFragment) => {
        if (followType === FollowType.Follow) post.user.followers.push(currentUser);
        else
          post.user.followers = post.user.followers.filter(
            (follower) => follower._id !== currentUser._id,
          );
      };

      state.posts.forEach((post) => {
        if (post.user._id === userId) handleFollowUserByPost(post);
      });

      if (state.selectedPost != null) handleFollowUserByPost(state.selectedPost);
    },

    // Selected to implement actions
    setSelectedPost: (state, action: PayloadAction<PostFragment | null>) => {
      state.selectedPost = action.payload;
    },

    setCurrentAction: (state, action: PayloadAction<CurrentAction>) => {
      state.currentAction = action.payload;
    },

    increaseCommentCounts: (
      state,
      { payload: { postId } }: PayloadAction<IncreaseCommentCountsReducer>,
    ) => {
      state.posts.forEach((post) => {
        if (post._id === postId) post.commentCounts += 1;
      });
    },

    decreaseCommentCounts: (
      state,
      { payload: { postId } }: PayloadAction<IncreaseCommentCountsReducer>,
    ) => {
      state.posts.forEach((post) => {
        if (post._id === postId) post.commentCounts -= 1;
      });
    },

    updateAvatar: (
      state,
      { payload: { currentUserId, avatar } }: PayloadAction<UpdateAvatarReducer>,
    ) => {
      state.posts.forEach((post) => {
        if (post.user._id === currentUserId) post.user.avatar = avatar;
      });

      const selectedPost = state.selectedPost;

      if (selectedPost != null && selectedPost.user._id === currentUserId)
        selectedPost.user.avatar = avatar;
    },
  },
  extraReducers: {
    [HYDRATE]: (state, { payload }) => ({
      ...state,
      ...payload.post,
    }),
  },
});

export const postActions = postSlice.actions;

export default postSlice.reducer;
