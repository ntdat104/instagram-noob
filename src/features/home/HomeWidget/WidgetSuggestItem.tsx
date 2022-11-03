import clsx from 'clsx';

import { UserFragment } from '~/types/generated';
import { useFollowUser, useUser } from '~/hooks';

import { SpinnerRing } from '~/components/Spinner';
import Skeleton from '~/components/Skeleton';

import avatar from '~/assets/avatar.png';

interface WidgetSuggestItemProps {
  user: UserFragment;
}

const WidgetSuggestItem = ({ user }: WidgetSuggestItemProps) => {
  const { isFollowed, followUserLoading, handleFollowActions } = useFollowUser(user);
  const { visitProfile } = useUser();

  const onVisitProfile = () => visitProfile(user.username);

  return (
    <div key={user._id} className='flex items-center text-sm-1'>
      <Skeleton
        onClick={onVisitProfile}
        className='w-8 h-8 rounded-full mr-3'
        src={avatar.src}
        rounded
        alt='Avatar'
        objectFit='cover'
      />
      <div className='min-w-0'>
        <div
          onClick={onVisitProfile}
          className={clsx('font-medium truncate', 'cursor-pointer', 'hover:underline')}
        >
          {user.username}
        </div>
        <div className={clsx('mt-1 truncate', 'text-base-gray')}>
          {user.followers.length} followers
        </div>
      </div>
      {followUserLoading ? (
        <SpinnerRing className='ml-auto' />
      ) : (
        <button
          onClick={() => handleFollowActions()}
          className={clsx('btn ml-auto', isFollowed ? 'text-base-black' : 'text-primary')}
        >
          {isFollowed ? 'Following' : 'Follow'}
        </button>
      )}
    </div>
  );
};

export default WidgetSuggestItem;
