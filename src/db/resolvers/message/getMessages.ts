import { Arg, ClassType, Ctx, ID, Int, Query, Resolver, UseMiddleware } from 'type-graphql';

// types
import { Context } from '~/db/types/context';
import { PaginatedMessagesResponse } from '~/db/types/responses/message';
import { FilterQuery } from '~/db/types/utils';

// models
import { Message } from '~/db/models';

// entities
import { Message as MessageEntity } from '~/db/entities';

import { verifyAuth } from '~/db/middlewares';
import respond from '~/helpers/respond';
import paginate from '~/helpers/paginate';

const getMessages = (Base: ClassType) => {
  @Resolver()
  class GetMessages extends Base {
    @Query((_returns) => PaginatedMessagesResponse)
    @UseMiddleware(verifyAuth)
    getMessages(
      @Arg('conversationId', (_type) => ID) conversationId: string,
      @Arg('limit', (_type) => Int) limit: number,
      @Arg('cursor', (_type) => String, { nullable: true }) cursor: string | null,
      @Ctx() { req: { userId } }: Context,
    ): Promise<PaginatedMessagesResponse> {
      return respond(async () => {
        const { filterQuery, sort, getNextCursor } = paginate(Message, ['createdAt', -1], cursor, {
          conversationId,
        } as FilterQuery<MessageEntity>);

        const messages = await Message.find(filterQuery)
          .limit(limit)
          .sort([sort])
          .populate({ path: 'user', populate: ['followers', 'following'] })
          .lean();

        await Message.updateMany(
          { conversationId, user: { $not: { $eq: userId } } },
          { $set: { seen: true } },
        );

        const { cursor: nextCursor, hasMore } = await getNextCursor(messages);

        return {
          code: 200,
          success: true,
          messages,
          cursor: nextCursor,
          hasMore,
        };
      });
    }
  }

  return GetMessages;
};

export default getMessages;
