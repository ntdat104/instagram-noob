import { Resolver } from 'type-graphql';

import extender from '~/helpers/extender';

// sub resolvers
import createMessage from './createMessage';
import deleteMessage from './deleteMessage';
import getMessages from './getMessages';
import readMessage from './readMessage';

@Resolver()
export default class MessageResolver extends extender(
  createMessage,
  getMessages,
  deleteMessage,
  readMessage,
) {}
