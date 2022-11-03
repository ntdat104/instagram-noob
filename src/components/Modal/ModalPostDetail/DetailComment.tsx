import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsis } from '@fortawesome/free-solid-svg-icons';
import clsx from 'clsx';

import { CommentFragment } from '~/types/generated';
import { useStoreDispatch } from '~/redux/store';
import { commentActions } from '~/redux/slices/commentSlice';
import { displayLikeCounts } from '~/helpers/format';
import { useComment, useUser } from '~/hooks';
import { calculateElapsedTime } from '~/helpers/time';

import IconHeart from '~/components/Icon/IconHeart';
import Skeleton from '~/components/Skeleton';

import avatar from '~/assets/avatar.png';

interface DetailCommentProps {
  comment: CommentFragment;
  postId: string;
  onShowActionsModal: () => void;
  onVisitProfile: (username: string) => void;
}

const DetailComment = ({
  comment,
  postId,
  onShowActionsModal,
  onVisitProfile,
}: DetailCommentProps) => {
  const { user, caption } = comment;

  const { checkOnline } = useUser();
  const dispatch = useStoreDispatch();

  const handleVisitProfile = () => onVisitProfile(user.username);

  const onSelectOptions = () => {
    dispatch(commentActions.setSelectedComment(comment));
    onShowActionsModal();
  };

  const { isLiked, reactComment } = useComment(comment, postId);

  return (
    <div className='group flex py-2'>
      <Skeleton
        online={checkOnline(user._id)}
        onClick={handleVisitProfile}
        src={user.avatar ?? avatar.src}
        rounded
        className={clsx('w-8 h-8 mr-3', 'cursor-pointer')}
        objectFit='cover'
      />
      <div className='leading-normal'>
        <span
          onClick={handleVisitProfile}
          className={clsx('font-medium mr-1', 'cursor-pointer select-none')}
        >
          {user.username}
        </span>
        <p className='inline'>{caption}</p>
        <div className={clsx('flex items-center gap-x-3 mt-2', 'text-base-gray')}>
          <span>{calculateElapsedTime(comment.createdAt)}</span>
          <button className={clsx('font-medium', 'cursor-pointer')}>
            {displayLikeCounts(comment.reactions, 'like')}
          </button>
          <button className={clsx('font-medium', 'cursor-pointer')}>Reply</button>
          <FontAwesomeIcon
            onClick={onSelectOptions}
            className={clsx('lg:hidden group-hover:block', 'cursor-pointer')}
            icon={faEllipsis}
          />
        </div>
      </div>
      <IconHeart
        onClick={reactComment}
        active={isLiked}
        className={clsx(
          'w-4 flex-shrink-0 ml-auto',
          'cursor-pointer',
          !isLiked && 'hover:opacity-60',
        )}
      />
    </div>
  );
};

export default DetailComment;
