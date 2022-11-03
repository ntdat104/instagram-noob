import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircle } from '@fortawesome/free-solid-svg-icons';
import clsx from 'clsx';

// types
import { ConversationSliceState, ConversationWithOnlineStatus } from '~/redux/types/conversation';

import { useGetMessagesLazyQuery, useReadMessageMutation, UserFragment } from '~/types/generated';
import { useStoreDispatch } from '~/redux/store';
import { conversationActions } from '~/redux/slices/conversationSlice';
import { useSocketContext } from '~/contexts/SocketContext';
import { calculateElapsedTime } from '~/helpers/time';

import Skeleton from '~/components/Skeleton';

import avatar from '~/assets/avatar.png';

interface SidebarConversationProps {
  currentUser: UserFragment | null;
  conversation: ConversationWithOnlineStatus;
  conversationSelector: ConversationSliceState;
  onShowMessages: () => void;
}

const SidebarConversation = ({
  conversation,
  currentUser,
  conversationSelector,
  onShowMessages,
}: SidebarConversationProps) => {
  const { selectedConversation, messages } = conversationSelector;

  const { conversationHandler } = useSocketContext();

  const [getMessages] = useGetMessagesLazyQuery();
  const [readMessage] = useReadMessageMutation();
  const dispatch = useStoreDispatch();

  if (currentUser == null) return null;

  const { _id: conversationId, members, lastMessage } = conversation;

  const receiver = members.filter((member) => member._id !== currentUser._id)[0];

  const readLastMessage = async () => {
    if (lastMessage == null || lastMessage.seen) return;

    const response = await readMessage({
      variables: {
        messageId: lastMessage._id,
      },
    });

    if (response.data?.readMessage.success) conversationHandler.readMessage(conversationId);
  };

  const handleFetchMessages = async () => {
    const response = await getMessages({
      variables: {
        conversationId,
        cursor: null,
        // limit: LIMITS.MESSAGES,
        limit: 100,
      },
    });

    const data = response.data?.getMessages;

    if (data?.success)
      dispatch(
        conversationActions.addFetchedMessages({
          conversationId,
          messages: data.messages!,
          cursor: data.cursor ?? null,
          hasMore: !!data.hasMore,
        }),
      );
  };

  const handleSelectConversation = async () => {
    onShowMessages();

    // Prevent click on same conversation
    if (selectedConversation?._id === conversationId) return;

    conversationHandler.setCurrentRoomId(conversationId);

    dispatch(conversationActions.setSelectedConversation(conversation));

    const hasMessagesCache = messages[conversationId] != null;

    if (!hasMessagesCache) {
      dispatch(conversationActions.addLoading('getMessages'));

      await handleFetchMessages();

      dispatch(conversationActions.removeLoading('getMessages'));
    }

    readLastMessage();
  };

  return (
    <div
      onClick={handleSelectConversation}
      className={clsx(
        'flex items-center px-4 py-2.5',
        selectedConversation?._id === conversation._id && 'bg-gray-100',
      )}
    >
      <Skeleton
        className='mr-3 w-12 h-12'
        objectFit='cover'
        rounded
        online={receiver.isOnline}
        src={receiver.avatar ?? avatar.src}
      />
      <div className='min-w-0 text-sm-1 lg:text-sm'>
        <div
          className={clsx(
            lastMessage != null &&
              !lastMessage.seen &&
              currentUser._id !== lastMessage.user._id &&
              'font-medium',
          )}
        >
          {receiver.username}
        </div>
        {lastMessage && (
          <div className={clsx('flex items-center mt-1')}>
            <span
              className={clsx(
                'truncate',
                lastMessage.seen || currentUser._id === lastMessage.user._id
                  ? 'text-base-gray'
                  : 'font-medium',
              )}
            >
              {lastMessage.text}
            </span>
            <FontAwesomeIcon className='w-0.5 h-0.5 mx-1.5' icon={faCircle} />
            <span className={clsx('flex-shrink-0 text-sm-1', 'text-base-gray')}>
              {calculateElapsedTime(lastMessage.createdAt)}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default SidebarConversation;
