import { ClassType, FieldResolver, Resolver, Root } from 'type-graphql';

// entities
import { Message as MessageEntity, Conversation } from '~/db/entities';

// models
import { Message } from '~/db/models';

const lastMessage = (Base: ClassType) => {
  @Resolver((_of) => Conversation)
  class LastMessage extends Base {
    @FieldResolver((_returns) => MessageEntity, { nullable: true })
    async lastMessage(@Root() conversation: Conversation): Promise<MessageEntity | null> {
      return await Message.findOne({ conversationId: conversation._id })
        .sort([['createdAt', -1]])
        .populate({ path: 'user' })
        .lean();
    }
  }

  return LastMessage;
};

export default lastMessage;
