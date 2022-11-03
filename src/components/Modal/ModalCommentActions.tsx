import clsx from 'clsx';

import { MODAL_TYPES, useModalContext } from '~/contexts/ModalContext';
import { useAuthSelector, useCommentSelector } from '~/redux/selectors';
import { useDeleteCommentMutation } from '~/types/generated';
import { useStoreDispatch } from '~/redux/store';
import { commentActions } from '~/redux/slices/commentSlice';
import { postActions } from '~/redux/slices/postSlice';

import ModalWrapper from './ModalWrapper';
import CommentActions from '~/helpers/modalActions/comment';

const ModalCommentActions = () => {
  const { hideModal } = useModalContext();
  const { currentUser } = useAuthSelector();
  const selectedComment = useCommentSelector().selectedComment!;

  const [deleteComment, { loading: deleteCommentLoading }] = useDeleteCommentMutation();
  const dispatch = useStoreDispatch();

  const isCommentOwner = selectedComment?.user._id === currentUser?._id;

  const { meActions, publicActions, addCommentAction } = new CommentActions();

  const selectedActions = isCommentOwner ? meActions : publicActions;

  const handleDeleteComment = async () => {
    if (deleteCommentLoading) return;

    const response = await deleteComment({
      variables: {
        commentId: selectedComment._id,
      },
    });

    hideModal(MODAL_TYPES.COMMENT_ACTIONS);

    if (!response.data?.deleteComment.success) return;

    dispatch(commentActions.deleteComment(selectedComment));
    dispatch(postActions.decreaseCommentCounts({ postId: selectedComment.postId }));
  };

  addCommentAction('delete', handleDeleteComment);

  return (
    <ModalWrapper
      canClose={!deleteCommentLoading}
      modalType={MODAL_TYPES.COMMENT_ACTIONS}
      lightOverlay
      hideCloseButton
    >
      <ul
        className={clsx(
          'text-center w-100 mx-auto max-w-full text-sm divide-y-2 border-line',
          'bg-white',
        )}
      >
        {selectedActions.map(({ actionId, title, hasConfirm, action }) => (
          <li
            key={title}
            onClick={action}
            className={clsx(
              'py-4',
              'cursor-pointer',
              hasConfirm && [
                'font-bold',
                deleteCommentLoading && actionId === 'delete'
                  ? 'text-base-red/40'
                  : 'text-base-red',
              ],
            )}
          >
            {title}
          </li>
        ))}
      </ul>
    </ModalWrapper>
  );
};

export default ModalCommentActions;
