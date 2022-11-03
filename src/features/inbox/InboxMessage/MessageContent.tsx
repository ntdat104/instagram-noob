import { useEffect, useRef } from 'react';

import { useAuthSelector, useConversationSelector } from '~/redux/selectors';

import MessageContentText from './MessageContentText';
import MessageContentLoading from './MessageContentLoading';

const MessageContent = () => {
  const { messages, selectedConversation, loadings } = useConversationSelector();
  const { currentUser } = useAuthSelector();

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current != null) {
      containerRef.current.scrollTo({
        behavior: 'smooth',
        top: containerRef.current.scrollHeight,
      });
    }
  });

  const selectedMessages = messages[selectedConversation!._id]?.data ?? [];

  return (
    <div ref={containerRef} className='flex flex-col py-4 px-5 overflow-y-auto space-y-2'>
      {loadings.includes('getMessages') ? (
        <MessageContentLoading />
      ) : (
        selectedMessages.map((message, index) => (
          <MessageContentText
            key={message._id}
            message={message}
            isMessageOwner={currentUser!._id === message.user._id}
            isSeen={
              message.seen &&
              index === selectedMessages.length - 1 &&
              currentUser!._id === message.user._id
            }
          />
        ))
      )}
    </div>
  );
};

export default MessageContent;
