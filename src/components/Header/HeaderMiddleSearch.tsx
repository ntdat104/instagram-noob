import clsx from 'clsx';

import { BaseUserFragment } from '~/types/generated';
import { getNameInMail } from '~/helpers/format';
import { useUser } from '~/hooks';

import Skeleton from '../Skeleton';
import EmptyResult from '../EmptyResult';

import avatar from '~/assets/avatar.png';

interface HeaderMiddleSearchProps {
  users: BaseUserFragment[];
}

const HeaderMiddleSearch = ({ users }: HeaderMiddleSearchProps) => {
  const { visitProfile } = useUser();

  if (users.length === 0) return <EmptyResult />;

  return (
    <ul className='w-full h-full'>
      {users.map((user) => (
        <li
          key={user._id}
          onClick={() => visitProfile(user.username)}
          className={clsx(
            'flex items-center w-full px-4 py-2',
            'cursor-pointer',
            'hover:bg-gray-50',
          )}
        >
          <Skeleton
            src={user.avatar ?? avatar.src}
            className='w-10 h-10 mr-2.5'
            objectFit='cover'
            rounded
          />
          <div className='min-w-0 text-sm-1'>
            <div className='font-medium truncate'>{getNameInMail(user.email)}</div>
            <div className={clsx('mt-0.5 w-full truncate', 'text-base-gray')}>{user.username}</div>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default HeaderMiddleSearch;
