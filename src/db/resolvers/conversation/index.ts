import { Resolver } from 'type-graphql';

// entities
import { Conversation } from '~/db/entities';

import extender from '~/helpers/extender';

// sub resolvers
import createConversation from './createConversation';
import deleteChat from './deleteChat';
import getConversationById from './getConversationById';
import getConversations from './getConversations';
import lastMessage from './lastMessage';

@Resolver((_of) => Conversation)
export default class ConversationResolver extends extender(
  createConversation,
  getConversations,
  deleteChat,
  getConversationById,
  lastMessage,
) {}
