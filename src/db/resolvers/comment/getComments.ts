import { Arg, ClassType, ID, Int, Query, Resolver, UseMiddleware } from 'type-graphql';

// types
import { PaginatedCommentsResponse } from '~/db/types/responses/comment';

// models
import { Comment } from '~/db/models';

// entities
import { Comment as CommentEntity } from '~/db/entities';

import { verifyAuth } from '~/db/middlewares';
import respond from '~/helpers/respond';
import paginate from '~/helpers/paginate';

const getComments = (Base: ClassType) => {
  @Resolver()
  class GetComments extends Base {
    @Query((_returns) => PaginatedCommentsResponse)
    @UseMiddleware(verifyAuth)
    getComments(
      @Arg('postId', (_type) => ID) postId: string,
      @Arg('limit', (_type) => Int) limit: number,
      @Arg('cursor', (_type) => String, { nullable: true }) cursor: string | null,
    ): Promise<PaginatedCommentsResponse> {
      return respond(async () => {
        const { filterQuery, sort, getNextCursor } = paginate(Comment, ['createdAt', -1], cursor, {
          postId,
        } as CommentEntity);

        const comments = await Comment.find(filterQuery)
          .limit(limit)
          .sort([sort])
          .populate('user')
          .populate('reactions')
          .lean();

        const { cursor: nextCursor, hasMore } = await getNextCursor(comments);

        return {
          code: 200,
          success: true,
          message: 'Get comments successfully',
          comments,
          cursor: nextCursor,
          hasMore,
        };
      });
    }
  }

  return GetComments;
};

export default getComments;
