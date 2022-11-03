import { Arg, ClassType, Ctx, Int, Query, Resolver, UseMiddleware } from 'type-graphql';

// types
import { Context } from '~/db/types/context';
import { GetSuggestionsResponse } from '~/db/types/responses/user';
import { FilterQuery } from '~/db/types/utils';

// models
import { User } from '~/db/models';

// entities
import { User as UserEntity } from '~/db/entities';

import { verifyAuth } from '~/db/middlewares';
import respond from '~/helpers/respond';

const getSuggestions = (Base: ClassType) => {
  @Resolver()
  class GetSuggestions extends Base {
    @Query((_returns) => GetSuggestionsResponse)
    @UseMiddleware(verifyAuth)
    getSuggestions(
      @Arg('page', (_type) => Int) page: number,
      @Arg('limit', (_type) => Int) limit: number,
      @Ctx() { req: { userId } }: Context,
    ): Promise<GetSuggestionsResponse> {
      return respond(async () => {
        const query = {
          _id: { $not: { $eq: userId } },
          followers: { $nin: userId },
        } as FilterQuery<UserEntity>;

        const total = await User.countDocuments(query);

        const startIndex = (page - 1) * limit;
        const nextPage = page * limit < total ? page + 1 : null;

        const users = await User.find(query)
          .sort({ followers: -1, _id: 1 })
          .skip(startIndex)
          .limit(limit)
          .populate(['followers', 'following'])
          .lean();

        return {
          code: 200,
          success: true,
          users,
          nextPage,
        };
      });
    }
  }

  return GetSuggestions;
};

export default getSuggestions;
