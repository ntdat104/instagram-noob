import clsx from 'clsx';

import { MODAL_TYPES, useModalContext } from '~/contexts/ModalContext';
import { usePostSelector } from '~/redux/selectors';
import { useDeletePostMutation } from '~/types/generated';
import { useStoreDispatch } from '~/redux/store';
import { postActions } from '~/redux/slices/postSlice';
import { useFollowUser } from '~/hooks';
import { authActions } from '~/redux/slices/authSlice';
import { toast } from '~/store/toast';

import PostActions from '~/helpers/modalActions/post';
import ModalWrapper from './ModalWrapper';
import Loading from '../Loading';

const ModalPostActions = () => {
  const { modalTypes, showModal, hideModal } = useModalContext();
  const { selectedPost } = usePostSelector();

  const [deletePost, { loading: deletePostLoading }] = useDeletePostMutation();
  const { isFollowed, followUserLoading, currentUser, followUser } = useFollowUser(
    selectedPost!.user,
  );
  const dispatch = useStoreDispatch();

  const currentUserId = currentUser._id;
  const isPostOwner = currentUserId === selectedPost!.user._id;
  const isShowingModalPostDetail = modalTypes.includes(MODAL_TYPES.POST_DETAIL);
  const isLoading = followUserLoading || deletePostLoading;

  const handleDeletePost = async () => {
    if (!isPostOwner) return;

    const postId = selectedPost!._id;

    const response = await deletePost({
      variables: {
        postId,
      },
    });

    hideModal([MODAL_TYPES.POST_ACTIONS, MODAL_TYPES.POST_DETAIL]);

    if (!response.data?.deletePost.success) return;

    toast({ messageType: 'deletePostSuccess', status: 'success' });

    dispatch(
      postActions.deletePost({
        postId,
      }),
    );

    dispatch(postActions.setSelectedPost(null));
    dispatch(authActions.decreasePostCount());
  };

  const { meActions, publicActions, addPostAction } = new PostActions();

  const selectedActions = isPostOwner ? meActions : publicActions;

  addPostAction('delete', handleDeletePost);

  addPostAction('unfollow', () => followUser('unfollow'));

  addPostAction('follow', () => followUser('follow'));

  addPostAction('cancel', () => hideModal(MODAL_TYPES.POST_ACTIONS));

  addPostAction('edit', () => {
    dispatch(postActions.setCurrentAction('update'));
    showModal(MODAL_TYPES.POST_CREATOR);
  });

  return (
    <ModalWrapper
      canClose={!isLoading}
      hideCloseButton={isShowingModalPostDetail}
      closeHandler={() => {
        if (isLoading || isShowingModalPostDetail) return;

        dispatch(postActions.setSelectedPost(null));
      }}
      modalType={MODAL_TYPES.POST_ACTIONS}
    >
      {deletePostLoading ? (
        <Loading title='Deleting' />
      ) : (
        <ul
          className={clsx(
            'text-center mx-auto w-full md:w-100 text-sm divide-y-2 border-line',
            'bg-white',
          )}
        >
          {selectedActions.map(({ actionId, title, hasConfirm, action }) => {
            if (isFollowed && actionId === 'follow') return null;

            if (!isFollowed && actionId === 'unfollow') return null;

            const isFollowLoading =
              followUserLoading && (actionId === 'follow' || actionId === 'unfollow');

            return (
              <li
                key={actionId}
                onClick={action}
                className={clsx(
                  'flex-center py-4',
                  'transition ease-out',
                  'cursor-pointer select-none',
                  hasConfirm
                    ? ['font-bold', isFollowLoading ? 'text-base-red/40' : 'text-base-red']
                    : [isFollowLoading ? 'text-base-black/40' : 'text-base-black'],
                )}
              >
                {title}
              </li>
            );
          })}
        </ul>
      )}
    </ModalWrapper>
  );
};

export default ModalPostActions;
