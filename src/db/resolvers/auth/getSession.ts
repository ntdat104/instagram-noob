import { Resolver, ClassType, Query, UseMiddleware, Ctx } from 'type-graphql';

// types
import { Context } from '~/db/types/context';
import { GetSessionResponse } from '~/db/types/responses/auth';

import { verifyAuth } from '~/db/middlewares';
import { User } from '~/db/models';
import respond from '~/helpers/respond';

const getSession = (Base: ClassType) => {
  @Resolver()
  class GetSession extends Base {
    @Query((_returns) => GetSessionResponse)
    @UseMiddleware(verifyAuth)
    getSession(@Ctx() { req: { userId, accessToken } }: Context): Promise<GetSessionResponse> {
      return respond(async () => {
        const user = await User.findById(userId).populate(['followers', 'following']).lean();

        return {
          code: 200,
          success: true,
          user,
          accessToken,
        };
      });
    }
  }

  return GetSession;
};

export default getSession;
