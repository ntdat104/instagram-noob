import { Arg, ClassType, Query, Resolver, UseMiddleware } from 'type-graphql';

// types
import { GetProfileResponse } from '~/db/types/responses/user';

// models
import { User, Post } from '~/db/models';

import { verifyAuth } from '~/db/middlewares';
import respond from '~/helpers/respond';

const getProfile = (Base: ClassType) => {
  @Resolver()
  class GetProfile extends Base {
    @Query((_returns) => GetProfileResponse)
    @UseMiddleware(verifyAuth)
    getProfile(@Arg('username') username: string): Promise<GetProfileResponse> {
      return respond(async () => {
        const user = await User.findOne({ username }).populate(['followers', 'following']).lean();

        if (user == null)
          return {
            code: 404,
            success: false,
            message: 'User not found',
          };

        const postCounts = await Post.countDocuments({ user: user._id });

        return {
          code: 200,
          success: true,
          user,
          postCounts,
        };
      });
    }
  }

  return GetProfile;
};

export default getProfile;
