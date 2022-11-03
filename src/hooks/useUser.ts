import { useRouter } from 'next/router';

// types
import { Callback } from '~/types/utils';

import { ROUTES } from '~/constants';
import { useLogoutMutation, UserFragment } from '~/types/generated';
import { useAuthSelector, useConversationSelector } from '~/redux/selectors';
import { useStoreDispatch } from '~/redux/store';
import { userActions } from '~/redux/slices/userSlice';

type VisitProfile = (username: string, callback?: Callback) => void;

interface UseUserReturn {
  currentUser: UserFragment;
  visitProfile: VisitProfile;
  logout: () => Promise<void>;
  checkOnline: (userId: string) => boolean;
}

export const useUser = (): UseUserReturn => {
  const currentUser = useAuthSelector().currentUser!;
  const { onlineUserIds } = useConversationSelector();

  const [logoutMutate] = useLogoutMutation();
  const router = useRouter();
  const dispatch = useStoreDispatch();

  const visitProfile: VisitProfile = async (username, callback) => {
    await router.push(username);

    if (callback) callback();
  };

  const logout = async () => {
    const response = await logoutMutate();

    if (response.data?.logout.success) {
      dispatch(userActions.setLoggedIn(false));
      router.push(ROUTES.LOGIN);
    }
  };

  const checkOnline = (userId: string) =>
    onlineUserIds.includes(userId) &&
    currentUser._id !== userId &&
    currentUser.following.some((followingUser) => followingUser._id === userId);

  return { currentUser, visitProfile, logout, checkOnline };
};
