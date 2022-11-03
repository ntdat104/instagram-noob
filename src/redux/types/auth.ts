// types
import { FollowType, UserFragment } from '~/types/generated';

export interface UserWithPostCount extends UserFragment {
  postCounts?: number;
}

export interface AuthSliceState {
  currentUser: UserFragment | null;
  selectedUser: UserWithPostCount | null;
  suggestedUsers: UserFragment[];
}

export interface FollowUserReducer {
  user: UserFragment;
  followType: FollowType;
}
