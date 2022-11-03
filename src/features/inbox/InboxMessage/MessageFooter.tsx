import { FormEvent, useState } from 'react';

import { nanoid } from 'nanoid';
import clsx from 'clsx';

import { useStoreDispatch } from '~/redux/store';
import { useAutoFocus } from '~/hooks';
import { useCreateMessageMutation } from '~/types/generated';
import { useAuthSelector, useConversationSelector } from '~/redux/selectors';
import { useSocketContext } from '~/contexts/SocketContext';
import { conversationActions } from '~/redux/slices/conversationSlice';
import { getCurrentTime } from '~/helpers/time';
import { isEmptyInput } from '~/helpers/string';

import IconEmoji from '~/components/Icon/IconEmoji';
import IconHeart from '~/components/Icon/IconHeart';
import IconPhoto from '~/components/Icon/IconPhoto';

const MessageFooter = () => {
  const [message, setMessage] = useState<string>('');

  const { conversationHandler } = useSocketContext();
  const { conversations, selectedConversation, loadings } = useConversationSelector();
  const { currentUser } = useAuthSelector();

  const [createMessage] = useCreateMessageMutation();
  const { focusRef } = useAutoFocus([selectedConversation]);
  const dispatch = useStoreDispatch();

  const handleSendMessage = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (isEmptyInput(message) || currentUser == null || loadings.includes('getMessages')) return;

    const conversationId = selectedConversation!._id;

    selectedConversation!.members.forEach((member) => {
      const isInCreators = conversations.some((conversation) =>
        conversation.creators.some((creator) => creator._id === member._id),
      );

      if (member._id === currentUser._id || isInCreators) return;

      dispatch(
        conversationActions.addCreator({
          conversationId,
          creator: member,
        }),
      );

      conversationHandler.sendStrangeConversation({
        receiverId: member._id,
        conversationId,
      });
    });

    const fakeMessage = {
      _id: nanoid(12), // fake id to send to socket before receive real message
      text: message,
      conversationId,
      createdAt: getCurrentTime(),
      seen: false,
    };

    const receiverIds = selectedConversation!.members.map((member) => member._id);

    receiverIds.splice(receiverIds.indexOf(currentUser._id), 1);

    dispatch(
      conversationActions.addFakeMessage({
        ...fakeMessage,
        user: currentUser,
      }),
    );

    setMessage('');

    const response = await createMessage({
      variables: {
        conversationId,
        createMessageInput: {
          text: message,
        },
      },
    });

    const data = response.data?.createMessage;

    if (!data?.success) return;

    dispatch(
      conversationActions.updateRealMessage({
        fakeMessageId: fakeMessage._id,
        message: data.newMessage!,
      }),
    );

    conversationHandler.sendMessage({ ...data.newMessage!, userId: currentUser._id }, receiverIds);
  };

  return (
    <div className={clsx('px-4 mt-auto pb-4')}>
      <form
        onSubmit={handleSendMessage}
        className='flex items-center flex-shrink-0 px-3 rounded-full border-1 border-line'
      >
        <button type='button' className='btn p-2'>
          <IconEmoji />
        </button>
        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          ref={focusRef}
          className={clsx(
            'w-full pl-1 py-3 text-sm',
            'placeholder:text-sm placeholder:text-base-gray',
          )}
          placeholder='Message...'
        />
        <button type='button' className='btn p-2'>
          <IconPhoto />
        </button>
        <button type='button' className='btn p-2'>
          <IconHeart />
        </button>
      </form>
    </div>
  );
};

export default MessageFooter;
