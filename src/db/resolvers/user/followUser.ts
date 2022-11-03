import {
  Arg,
  ClassType,
  Ctx,
  Mutation,
  registerEnumType,
  Resolver,
  UseMiddleware,
} from 'type-graphql';

// types
import { Context } from '~/db/types/context';
import { UserMutationResponse } from '~/db/types/responses/user';

// models
import { User } from '~/db/models';

import { verifyAuth } from '~/db/middlewares';
import respond from '~/helpers/respond';

enum FollowType {
  FOLLOW = 'FOLLOW',
  UNFOLLOW = 'UNFOLLOW',
}

registerEnumType(FollowType, {
  name: 'FollowType',
});

const followUser = (Base: ClassType) => {
  @Resolver()
  class FollowUser extends Base {
    @Mutation((_returns) => UserMutationResponse)
    @UseMiddleware(verifyAuth)
    followUser(
      @Arg('userId') userId: string,
      @Arg('followType') followType: FollowType,
      @Ctx() { req: { userId: currentUserId } }: Context,
    ): Promise<UserMutationResponse> {
      return respond(async () => {
        const existingUser = await User.findById(userId);

        if (existingUser == null)
          return {
            code: 404,
            success: false,
            message: 'User not found',
          };

        const isFollowed = existingUser.followers.includes(currentUserId);

        const handleFollowUser = async (isFollow: boolean) => {
          if (isFollow && isFollowed)
            return {
              code: 400,
              success: false,
              message: 'You already follow this person',
            };

          if (!isFollow && !isFollowed)
            return {
              code: 400,
              success: false,
              message: 'You already unfollow this person',
            };

          const updateOperator = isFollow ? '$push' : '$pull';

          await existingUser.updateOne({
            [updateOperator]: { followers: currentUserId },
          });

          const user = await User.findByIdAndUpdate(
            currentUserId,
            {
              [updateOperator]: { following: existingUser._id },
            },
            { new: true },
          )
            .populate(['followers', 'following'])
            .lean();

          return {
            code: 200,
            success: true,
            message: `${isFollow ? 'Follow' : 'Unfollow'} user successfully`,
            user: user!,
          };
        };

        if (followType === FollowType.FOLLOW) return handleFollowUser(true);

        return handleFollowUser(false);
      });
    }
  }

  return FollowUser;
};

export default followUser;
