import { useState } from 'react';

import clsx from 'clsx';

// types
import { ConversationWithOnlineStatus } from '~/redux/types/conversation';

import { LIMITS } from '~/constants';
import { MODAL_TYPES, useModalContext } from '~/contexts/ModalContext';
import {
  useCreateConversationMutation,
  BaseUserFragment,
  useSearchUserLazyQuery,
} from '~/types/generated';
import { useAutoFocus, useDebounce } from '~/hooks';
import { getNameInMail } from '~/helpers/format';
import { useStoreDispatch } from '~/redux/store';
import { useConversationSelector } from '~/redux/selectors';
import { conversationActions } from '~/redux/slices/conversationSlice';

import IconClose from '../Icon/IconClose';
import IconToggle from '../Icon/IconToggle';
import SpinnerLogo from '../Spinner/SpinnerLogo';
import Skeleton from '../Skeleton';
import ModalWrapper from './ModalWrapper';
import SpinnerRing from '../Spinner/SpinnerRing';
import EmptyResult from '../EmptyResult';

import avatar from '~/assets/avatar.png';

const ModalNewMessage = () => {
  const [searchedUsers, setSearchedUsers] = useState<BaseUserFragment[]>([]);
  const [selectedUsers, setSelectedUsers] = useState<BaseUserFragment[]>([]);

  const { hideModal } = useModalContext();
  const { conversations } = useConversationSelector();

  const [debouncing, handleDebounce] = useDebounce();
  const [searchUser] = useSearchUserLazyQuery();
  const [createConversation, { loading: createConversationLoading }] =
    useCreateConversationMutation();
  const dispatch = useStoreDispatch();

  const handleSearchUser = async (value: string) => {
    const response = await searchUser({
      variables: {
        query: value,
        limit: LIMITS.SEARCH_USER,
      },
    });

    const data = response.data?.searchUser;

    if (data?.success)
      setSearchedUsers(() => {
        const memberIds: string[] = [];

        // Filter out users who have not created conversation by me
        conversations.forEach((conversation) =>
          conversation.members.forEach((member) => {
            memberIds.push(member._id);
          }),
        );

        return data.users!.filter((searchedUser) => !memberIds.includes(searchedUser._id));
      });
  };

  const isUserSelected = (user: BaseUserFragment) =>
    selectedUsers.some((selectedUser) => selectedUser._id === user._id);

  const removeSelectedUser = (user: BaseUserFragment) => {
    return selectedUsers.filter((selectedUser) => selectedUser._id !== user._id);
  };

  const handleSelectUser = (user: BaseUserFragment) => {
    setSelectedUsers(() => {
      return isUserSelected(user) ? removeSelectedUser(user) : [...selectedUsers, user];
    });
  };

  const handleCreateConversation = async () => {
    if (!canCreateConversation) return;

    const responses = await Promise.all(
      selectedUsers.map((user) =>
        createConversation({
          variables: {
            receiverId: user._id,
          },
        }),
      ),
    );

    const conversations: ConversationWithOnlineStatus[] = [];

    responses.forEach((response) => {
      const data = response.data?.createConversation;

      if (data?.success) conversations.push(data.conversation!);
    });

    hideModal(MODAL_TYPES.NEW_MESSAGE);
    dispatch(conversationActions.addFetchedConversations({ conversations }));
  };

  const canCreateConversation = selectedUsers.length > 0;

  const handleInputChange = handleDebounce(handleSearchUser, () => setSearchedUsers([]));

  const { focusRef } = useAutoFocus();

  return (
    <ModalWrapper
      modalType={MODAL_TYPES.NEW_MESSAGE}
      className={clsx('flex flex-col w-100 h-[500px] text-sm', 'bg-white')}
    >
      <div className='flex-between flex-shrink-0 px-2 py-2.5'>
        <button onClick={() => hideModal(MODAL_TYPES.NEW_MESSAGE)} className='btn'>
          <IconClose className={clsx('p-1', 'text-base-black')} />
        </button>
        <span>New Message</span>
        <div className='w-8 flex justify-center'>
          {createConversationLoading ? (
            <SpinnerRing />
          ) : (
            <button
              onClick={handleCreateConversation}
              className={clsx(
                'btn font-medium',
                'text-primary',
                !canCreateConversation && 'btn--disabled',
              )}
            >
              Next
            </button>
          )}
        </div>
      </div>

      <div className='flex items-center flex-shrink-0 pl-3 border-y-1 border-line'>
        <label
          className={clsx(
            'mr-5 font-medium h-full',
            canCreateConversation ? 'pt-3.5' : 'flex items-center',
          )}
          htmlFor='search-user'
        >
          To:
        </label>
        <div className='flex flex-col flex-grow max-h-44 overflow-y-auto'>
          {canCreateConversation && (
            <div className='flex flex-wrap gap-3 pt-3'>
              {selectedUsers.map((user) => (
                <div
                  onClick={() => setSelectedUsers(removeSelectedUser(user))}
                  key={user._id}
                  className={clsx(
                    'flex items-center px-2.5 py-2.5 max-w-max rounded-md text-center',
                    'bg-primary/10',
                    'cursor-pointer',
                  )}
                >
                  <button className={clsx('btn font-normal mr-2', 'text-primary')}>
                    {user.username}
                  </button>
                  <IconClose className={clsx('w-3 h-3', 'text-primary')} />
                </div>
              ))}
            </div>
          )}

          <input
            ref={focusRef}
            onChange={handleInputChange}
            id='search-user'
            className={clsx(
              'w-full py-3.5 pr-3 flex-shrink-0',
              'placeholder:text-sm placeholder:text-base-gray',
            )}
            placeholder='Search...'
          />
        </div>
      </div>

      {debouncing ? (
        <div className='flex-center flex-grow w-full'>
          <SpinnerLogo className='w-16 h-16' />
        </div>
      ) : searchedUsers.length === 0 ? (
        <EmptyResult />
      ) : (
        <ul className='py-3 px-4 space-y-4 overflow-y-auto'>
          {searchedUsers.map((user) => (
            <li key={user._id} className='flex items-center'>
              <Skeleton
                objectFit='cover'
                className='w-11 h-11 mr-3'
                rounded
                src={user.avatar ?? avatar.src}
                alt='Avatar'
              />
              <div className='min-w-0 mr-4'>
                <div className={clsx('font-medium truncate')}>{getNameInMail(user.email)}</div>
                <div className={clsx('mt-0.5 truncate', 'text-base-gray')}>{user.username}</div>
              </div>
              <IconToggle
                active={isUserSelected(user)}
                onClick={() => handleSelectUser(user)}
                className={clsx('ml-auto', 'cursor-pointer')}
              />
            </li>
          ))}
        </ul>
      )}
    </ModalWrapper>
  );
};

export default ModalNewMessage;
