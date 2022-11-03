import clsx from 'clsx';

import { PostFragment } from '~/types/generated';
import { usePost } from '~/hooks';

import IconComment from './Icon/IconComment';
import IconHeart from './Icon/IconHeart';
import IconSave from './Icon/IconSave';
import IconShare from './Icon/IconShare';

interface ActionsProps {
  post: PostFragment;
  className?: string;
  onComment?: () => void;
}

const Actions = ({ className, post, onComment }: ActionsProps) => {
  const { isLiked, reactPost } = usePost(post);

  return (
    <div className={clsx('flex-between', className)}>
      <div className={clsx('flex items-center gap-x-3')}>
        <IconHeart
          onClick={reactPost}
          className={clsx('cursor-pointer', !isLiked && 'hover:opacity-60')}
          active={isLiked}
        />
        <IconComment onClick={onComment} className={clsx('cursor-pointer', 'hover:opacity-60')} />
        <IconShare className={clsx('cursor-pointer', 'hover:opacity-60')} />
      </div>
      <IconSave className={clsx('cursor-pointer', 'hover:opacity-60')} />
    </div>
  );
};

export default Actions;
