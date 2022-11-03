import { useConversationSelector } from '~/redux/selectors';

import MessageFooter from './MessageFooter';
import MessageHeader from './MessageHeader';
import MessagePlaceholder from './MessagePlaceholder';
import MessageContent from './MessageContent';

interface InboxMessageProps {
  onHideMessages: () => void;
}

const InboxMessage = ({ onHideMessages }: InboxMessageProps) => {
  const { selectedConversation } = useConversationSelector();

  if (selectedConversation == null) return <MessagePlaceholder />;

  return (
    <>
      <MessageHeader onHideMessages={onHideMessages} />
      <MessageContent />
      <MessageFooter />
    </>
  );
};

export default InboxMessage;
