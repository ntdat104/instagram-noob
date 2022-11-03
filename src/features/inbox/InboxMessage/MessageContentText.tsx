import clsx from 'clsx';

import { MessageFragment } from '~/types/generated';

interface MessageContentTextProps {
  message: MessageFragment;
  isMessageOwner: boolean;
  isSeen: boolean;
}

const MessageContentText = ({ isMessageOwner, isSeen, message }: MessageContentTextProps) => {
  return (
    <>
      <div
        className={clsx(
          'text-sm max-w-max w-[55%] break-words py-3 px-[19px] rounded-[22px]',
          isMessageOwner ? ['ml-auto', 'text-white bg-primary'] : 'bg-gray-100',
        )}
      >
        {message.text}
      </div>
      {isSeen && (
        <span className={clsx('text-sm-1 max-w-max ml-auto pr-2', 'text-base-gray')}>Seen</span>
      )}
    </>
  );
};

export default MessageContentText;
