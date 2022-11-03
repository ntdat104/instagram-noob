import { Arg, ClassType, Ctx, ID, Mutation, Resolver, UseMiddleware } from 'type-graphql';

// types
import { Context } from '~/db/types/context';
import { MessageMutationResponse } from '~/db/types/responses/message';
import { CreateMessageInput } from '~/db/types/inputs';

// models
import { Conversation, Message } from '~/db/models';

import { verifyAuth } from '~/db/middlewares';
import respond from '~/helpers/respond';

const createMessage = (Base: ClassType) => {
  @Resolver()
  class CreateMessage extends Base {
    @Mutation((_returns) => MessageMutationResponse)
    @UseMiddleware(verifyAuth)
    createMessage(
      @Arg('conversationId', (_type) => ID) conversationId: string,
      @Arg('createMessageInput') { text }: CreateMessageInput,
      @Ctx() { req: { userId } }: Context,
    ): Promise<MessageMutationResponse> {
      return respond(async () => {
        const existingConversation = await Conversation.findById(conversationId);

        if (existingConversation == null)
          return {
            code: 404,
            success: false,
            message: 'Conversation not found',
          };

        existingConversation.members.forEach(async (memberId) => {
          if (!existingConversation.creators.includes(memberId))
            await Conversation.updateOne(
              { _id: conversationId },
              { $push: { creators: memberId } },
            );
        });

        const newMessage = await Message.create({
          user: userId,
          conversationId,
          text,
        })
          .then((res) => res.populate({ path: 'user', populate: ['followers', 'following'] }))
          .then((res) => res.toObject());

        return {
          code: 201,
          success: true,
          newMessage,
        };
      });
    }
  }

  return CreateMessage;
};

export default createMessage;
