import { Arg, ClassType, Query, Resolver, UseMiddleware } from 'type-graphql';

// types
import { GetConversationByIdResponse } from '~/db/types/responses/conversation';

// models
import { Conversation } from '~/db/models';

// entities
import { Conversation as ConversationEntity } from '~/db/entities';

import { verifyAuth } from '~/db/middlewares';
import respond from '~/helpers/respond';

const getConversationById = (Base: ClassType) => {
  @Resolver((_of) => ConversationEntity)
  class GetConversationById extends Base {
    @Query((_returns) => GetConversationByIdResponse)
    @UseMiddleware(verifyAuth)
    getConversationById(
      @Arg('conversationId') conversationId: string,
    ): Promise<GetConversationByIdResponse> {
      return respond(async () => {
        const conversation = await Conversation.findById(conversationId)
          .populate(['creators', 'members'])
          .lean();

        if (conversation == null)
          return {
            code: 404,
            success: false,
            message: 'Conversation not found',
          };

        return {
          code: 200,
          success: true,
          conversation,
        };
      });
    }
  }

  return GetConversationById;
};

export default getConversationById;
