import clsx from 'clsx';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { useAuthSelector, useConversationSelector } from '~/redux/selectors';

import IconThreadDetail from '~/components/Icon/IconThreadDetail';
import Skeleton from '~/components/Skeleton';

import avatar from '~/assets/avatar.png';

interface MessageHeaderProps {
  onHideMessages: () => void;
}

const MessageHeader = ({ onHideMessages }: MessageHeaderProps) => {
  const { selectedConversation } = useConversationSelector();
  const { currentUser } = useAuthSelector();

  const members = selectedConversation!.members.filter((member) => member._id !== currentUser!._id);

  return (
    <div className={clsx('flex items-center flex-shrink-0 h-header-h px-4 border-b border-line')}>
      <div className='flex items-center'>
        <Skeleton
          className='mr-2 w-8 h-8'
          objectFit='cover'
          rounded
          src={members[0].avatar ?? avatar.src}
        />
        <span className='font-medium text-sm lg:text-base'>{members[0].username}</span>
      </div>
      <div className='flex items-center gap-x-5 ml-auto'>
        <FontAwesomeIcon
          onClick={onHideMessages}
          icon={faRightFromBracket}
          className={clsx('block md:hidden rotate-180', 'cursor-pointer')}
        />
        <IconThreadDetail className={clsx('cursor-pointer')} />
      </div>
    </div>
  );
};

export default MessageHeader;
