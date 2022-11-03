import { Arg, ClassType, Ctx, Int, Query, Resolver, UseMiddleware } from 'type-graphql';

// types
import { Context } from '~/db/types/context';
import { PaginatedConversationsResponse } from '~/db/types/responses/conversation';
import { FilterQuery } from '~/db/types/utils';

// models
import { Conversation } from '~/db/models';

// entities
import { Conversation as ConversationEntity } from '~/db/entities';

import { verifyAuth } from '~/db/middlewares';
import respond from '~/helpers/respond';
import paginate from '~/helpers/paginate';

const getConversations = (Base: ClassType) => {
  @Resolver((_of) => ConversationEntity)
  class GetConversations extends Base {
    @Query((_returns) => PaginatedConversationsResponse)
    @UseMiddleware(verifyAuth)
    getConversations(
      @Arg('limit', (_type) => Int) limit: number,
      @Arg('cursor', (_type) => String, { nullable: true }) cursor: string | null,
      @Ctx() { req: { userId } }: Context,
    ): Promise<PaginatedConversationsResponse> {
      return respond(async () => {
        const { filterQuery, sort, getNextCursor } = paginate(
          Conversation,
          ['createdAt', -1],
          cursor,
          {
            creators: { $in: [userId] },
          } as FilterQuery<ConversationEntity>,
        );

        const conversations = await Conversation.find(filterQuery)
          .limit(limit)
          .sort([sort])
          .populate(['creators', 'members'])
          .lean();

        const { cursor: nextCursor, hasMore } = await getNextCursor(conversations);

        return {
          code: 200,
          success: true,
          conversations,
          cursor: nextCursor,
          hasMore,
        };
      });
    }
  }

  return GetConversations;
};

export default getConversations;
