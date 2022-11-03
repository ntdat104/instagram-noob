import clsx from 'clsx';

import { UserFragment } from '~/types/generated';
import { useFollowUser, useUser } from '~/hooks';

import { SpinnerRing } from '~/components/Spinner';
import Skeleton from '~/components/Skeleton';

import avatar from '~/assets/avatar.png';

interface PeopleItemProps {
  user: UserFragment;
}

const PeopleItem = ({ user }: PeopleItemProps) => {
  const { visitProfile } = useUser();
  const { isFollowed, followUserLoading, handleFollowActions } = useFollowUser(user);

  const onVisitProfile = () => visitProfile(user.username);

  return (
    <li className='flex items-center'>
      <Skeleton
        objectFit='cover'
        onClick={onVisitProfile}
        className={clsx('w-11 h-11 mr-3', 'cursor-pointer')}
        rounded
        src={user.avatar ?? avatar.src}
        alt='Avatar'
      />
      <div className='min-w-0 mr-3'>
        <div
          onClick={onVisitProfile}
          className={clsx('font-medium truncate', 'cursor-pointer', 'hover:underline')}
        >
          {user.username}
        </div>
        <p className={clsx('mt-1 truncate', 'text-base-gray')}>{user.followers.length} followers</p>
      </div>
      <button
        onClick={() => handleFollowActions()}
        className={clsx(
          'btn flex-shrink-0 font-medium h-8 ml-auto',
          isFollowed ? 'border border-line w-[84px]' : 'w-[64px] btn--primary',
        )}
      >
        {(() => {
          if (followUserLoading)
            return <SpinnerRing className={clsx(isFollowed ? 'text-base-gray' : 'text-white')} />;

          return isFollowed ? 'Following' : 'Follow';
        })()}
      </button>
    </li>
  );
};

export default PeopleItem;
