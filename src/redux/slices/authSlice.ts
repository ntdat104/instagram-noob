import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';

// types
import { AuthSliceState, FollowUserReducer, UserWithPostCount } from '../types/auth';
import { FollowType, UserFragment } from '~/types/generated';

const initialState: AuthSliceState = {
  currentUser: null,
  selectedUser: null,
  suggestedUsers: [],
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCurrentUser: (state, action: PayloadAction<UserFragment>) => {
      state.currentUser = action.payload;
    },

    followUser: (state, { payload: { user, followType } }: PayloadAction<FollowUserReducer>) => {
      const currentUser = state.currentUser;

      if (currentUser == null) return;

      if (followType === FollowType.Follow) currentUser.following.push(user);
      else
        currentUser.following = currentUser.following.filter(
          (followingUser) => followingUser._id !== user._id,
        );

      const handleMeWithFollowers = (user: UserFragment) => {
        if (followType === FollowType.Follow) user.followers.push(currentUser);
        else
          user.followers = user.followers.filter(
            (followedUser) => followedUser._id !== currentUser._id,
          );
      };

      // Handle follow of profile page
      if (state.selectedUser != null) handleMeWithFollowers(state.selectedUser);

      for (const suggestedUser of state.suggestedUsers) {
        if (suggestedUser._id === user._id) {
          handleMeWithFollowers(suggestedUser);

          break;
        }
      }
    },

    addFetchedSuggestedUsers: (state, action: PayloadAction<UserFragment[]>) => {
      state.suggestedUsers.push(...action.payload);
    },

    setSelectedUser: (state, action: PayloadAction<UserWithPostCount>) => {
      state.selectedUser = action.payload;
    },

    setAvatar: (state, { payload }: PayloadAction<{ avatar: string }>) => {
      const { currentUser, selectedUser } = state;

      if (currentUser == null) return;

      currentUser.avatar = payload.avatar;

      if (selectedUser != null && selectedUser._id === currentUser._id)
        selectedUser.avatar = payload.avatar;
    },

    increasePostCount: ({ selectedUser }) => {
      if (selectedUser != null && selectedUser.postCounts != null) selectedUser.postCounts += 1;
    },

    decreasePostCount: ({ selectedUser }) => {
      if (selectedUser != null && selectedUser.postCounts != null) selectedUser.postCounts -= 1;
    },
  },
  extraReducers: {
    [HYDRATE]: (state, { payload }) => ({
      ...state,
      ...payload.auth,
    }),
  },
});

export const authActions = authSlice.actions;

export default authSlice.reducer;
