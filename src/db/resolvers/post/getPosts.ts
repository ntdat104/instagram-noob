import {
  Arg,
  ClassType,
  FieldResolver,
  Int,
  Query,
  Resolver,
  Root,
  UseMiddleware,
} from 'type-graphql';

// types
import { PaginatedPostsResponse } from '~/db/types/responses/post';
import { QueryPostsInput } from '~/db/types/inputs';

// models
import { Comment, Post } from '~/db/models';

// entities
import { Post as PostEntity } from '~/db/entities';

import { verifyAuth } from '~/db/middlewares';
import respond from '~/helpers/respond';
import paginate from '~/helpers/paginate';

const getPosts = (Base: ClassType) => {
  @Resolver((_of) => PostEntity)
  class GetPosts extends Base {
    @FieldResolver((_returns) => Int)
    async commentCounts(@Root() post: PostEntity): Promise<number> {
      return await Comment.countDocuments({ postId: post._id });
    }

    @Query((_returns) => PaginatedPostsResponse)
    @UseMiddleware(verifyAuth)
    getPosts(
      @Arg('limit', (_type) => Int) limit: number,
      @Arg('cursor', (_type) => String, { nullable: true }) cursor: string | null,
      @Arg('query', (_type) => QueryPostsInput, { nullable: true }) query?: QueryPostsInput,
    ): Promise<PaginatedPostsResponse> {
      return respond(async () => {
        const { filterQuery, sort, getNextCursor } = paginate(
          Post,
          ['createdAt', -1],
          cursor,
          query != null ? { [query.field]: query.value } : {},
        );

        const posts = await Post.find(filterQuery)
          .limit(limit)
          .sort([sort])
          .populate({ path: 'user', populate: ['followers', 'following'] })
          .populate('reactions')
          .lean();

        const { cursor: nextCursor, hasMore } = await getNextCursor(posts);

        return {
          code: 200,
          success: true,
          message: 'Get posts successfully',
          posts,
          cursor: nextCursor,
          hasMore,
        };
      });
    }
  }

  return GetPosts;
};

export default getPosts;
