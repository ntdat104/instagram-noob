import { useRef, useState } from 'react';

import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import clsx from 'clsx';

import { LIMITS } from '~/constants';
import { BaseUserFragment, useSearchUserLazyQuery } from '~/types/generated';
import { useClickOutside, useDebounce } from '~/hooks';

import { SpinnerRing } from '../Spinner';
import HeaderMiddleLoading from './HeaderMiddleLoading';

import HeaderMiddleSearch from './HeaderMiddleSearch';

const HeaderMiddle = () => {
  const [searchedUsers, setSearchedUsers] = useState<BaseUserFragment[]>([]);
  const [isOpenSearchList, setIsOpenSearchList] = useState<boolean>(false);

  const searchListRef = useRef<HTMLDivElement>(null);

  const [searchUser] = useSearchUserLazyQuery();
  const [debouncing, handleDebounce] = useDebounce();

  const handleSearchUser = async (value: string) => {
    setIsOpenSearchList(true);

    const response = await searchUser({
      variables: {
        query: value,
        limit: LIMITS.SEARCH_USER,
      },
    });

    const data = response.data?.searchUser;

    if (data?.success) setSearchedUsers(data.users!);
  };

  const handleInputChange = handleDebounce(handleSearchUser, () => setSearchedUsers([]));

  useClickOutside(searchListRef, () => {
    setIsOpenSearchList(false);
    setSearchedUsers([]);
  });

  return (
    <div className={clsx('relative', 'hidden md:block ml-auto w-[268px] h-full')}>
      <div className={clsx('flex items-center px-4 py-1 h-full rounded-md', 'bg-gray-100')}>
        <FontAwesomeIcon icon={faMagnifyingGlass} className={clsx('mr-3', 'text-zinc-400')} />
        <input
          onChange={handleInputChange}
          className={clsx(
            'w-full h-full font-medium text-sm',
            'placeholder:font-normal placeholder:text-base-gray',
          )}
          placeholder='Search'
        />
        {debouncing && <SpinnerRing className='ml-2' />}
      </div>

      {isOpenSearchList && (
        <div
          ref={searchListRef}
          className={clsx(
            'abs-center-x top-[calc(100%+10px)]',
            'w-[140%] shadow-[0_1px_5px_1px_rgba(0,0,0,0.0975)] rounded-md py-2 overflow-y-auto',
            'bg-white',
            debouncing || searchedUsers.length === 0 ? 'h-96' : 'max-h-96',
          )}
        >
          {debouncing && searchedUsers.length === 0 ? (
            <HeaderMiddleLoading />
          ) : (
            <HeaderMiddleSearch users={searchedUsers} />
          )}
        </div>
      )}
    </div>
  );
};

export default HeaderMiddle;
