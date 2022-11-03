import { Arg, ClassType, Ctx, Mutation, Resolver, UseMiddleware } from 'type-graphql';

// types
import { Context } from '~/db/types/context';
import { ConversationMutationResponse } from '~/db/types/responses/conversation';

// models
import { Conversation } from '~/db/models';

import { verifyAuth } from '~/db/middlewares';
import respond from '~/helpers/respond';

const createConversation = (Base: ClassType) => {
  @Resolver()
  class CreateConversation extends Base {
    @Mutation((_returns) => ConversationMutationResponse)
    @UseMiddleware(verifyAuth)
    createConversation(
      @Arg('receiverId') receiverId: string,
      @Ctx() { req: { userId } }: Context,
    ): Promise<ConversationMutationResponse> {
      return respond(async () => {
        const existingConversation = await Conversation.findOne({
          members: { $all: [userId, receiverId] },
        });

        if (existingConversation != null) {
          if (existingConversation.creators.includes(userId))
            return {
              code: 400,
              success: false,
              message: 'Conversation already exists',
            };

          const updatedConversation = await Conversation.findByIdAndUpdate(
            existingConversation._id,
            {
              $push: { creators: userId },
            },
            { new: true },
          )
            .populate(['creators', 'members'])
            .lean();

          return {
            code: 201,
            success: true,
            conversation: updatedConversation!,
          };
        }

        const conversation = await Conversation.create({
          creators: [userId],
          members: [userId, receiverId],
        })
          .then((res) => res.populate(['creators', 'members']))
          .then((res) => res.toObject());

        return {
          code: 201,
          success: true,
          conversation,
        };
      });
    }
  }

  return CreateConversation;
};

export default createConversation;
