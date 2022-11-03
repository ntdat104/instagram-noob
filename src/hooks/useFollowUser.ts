// types
import { Callback, FollowAction } from '~/types/utils';

import { MODAL_TYPES, useModalContext } from '~/contexts/ModalContext';
import { FollowType, useFollowUserMutation, UserFragment } from '~/types/generated';
import { useAuthSelector } from '~/redux/selectors';
import { useStoreDispatch } from '~/redux/store';
import { postActions } from '~/redux/slices/postSlice';
import { authActions } from '~/redux/slices/authSlice';
import { toast } from '~/store/toast';

type FollowUser = (action: FollowAction, actionDone?: Callback) => Promise<void>;

interface UseFollowUserReturn {
  isFollowed: boolean;
  followUserLoading: boolean;
  currentUser: UserFragment;
  followUser: FollowUser;
  showUnfollowModal: () => void;
  handleFollowActions: (actionDone?: Callback) => void;
}

export const useFollowUser = (selectedUser: UserFragment): UseFollowUserReturn => {
  const { showModal } = useModalContext();
  const currentUser = useAuthSelector().currentUser!;

  const [followUserMutate, { loading: followUserLoading }] = useFollowUserMutation();
  const dispatch = useStoreDispatch();

  const isFollowed = selectedUser.followers.some((follower) => follower._id === currentUser._id);

  const followUser: FollowUser = async (action, actionDone) => {
    if (followUserLoading) return;

    const isFollow = action === 'follow';
    const followType = isFollow ? FollowType.Follow : FollowType.Unfollow;

    const response = await followUserMutate({
      variables: {
        followType,
        userId: selectedUser._id,
      },
    });

    if (!response.data?.followUser.success) return;

    if (actionDone != null) actionDone();

    toast({
      messageType: isFollow ? 'followUserSuccess' : 'unfollowUserSuccess',
      status: 'success',
    });

    dispatch(
      authActions.followUser({
        user: selectedUser,
        followType,
      }),
    );

    dispatch(
      postActions.followUserByPost({
        userId: selectedUser._id,
        currentUser: currentUser,
        followType,
      }),
    );
  };

  const showUnfollowModal = () => {
    if (!isFollowed) return;

    showModal(MODAL_TYPES.UNFOLLOW);
    dispatch(authActions.setSelectedUser(selectedUser));
  };

  const handleFollowActions = (actionDone?: Callback) => {
    if (isFollowed) showUnfollowModal();
    else followUser('follow', actionDone);
  };

  return {
    isFollowed,
    followUserLoading,
    currentUser,
    followUser,
    showUnfollowModal,
    handleFollowActions,
  };
};
