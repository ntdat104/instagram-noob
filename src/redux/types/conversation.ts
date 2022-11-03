// types
import { UserWithOnlineStatus } from './shared';

import { ConversationFragment, MessageFragment } from '~/types/generated';

export interface ConversationWithOnlineStatus extends ConversationFragment {
  members: UserWithOnlineStatus[];
}

export type Loading = 'getMessages';

export interface ConversationSliceState {
  messages: {
    [conversationId: string]: {
      data: MessageFragment[];
      cursor: string | null;
      hasMore: boolean;
    } | null;
  };
  conversations: ConversationWithOnlineStatus[];
  selectedConversation: ConversationWithOnlineStatus | null;
  cursor: string | null;
  hasMore: boolean;
  onlineUserIds: string[];
  loadings: Loading[];
}

export interface AddFetchedConversationsReducer {
  conversations: ConversationWithOnlineStatus[];
  cursor?: string | null;
  hasMore?: boolean;
}

export interface AddFetchedMessagesReducer {
  conversationId: string;
  messages: MessageFragment[];
  cursor: string | null;
  hasMore: boolean;
}

export interface UpdateRealMessageReducer {
  fakeMessageId: string;
  message: MessageFragment;
}
