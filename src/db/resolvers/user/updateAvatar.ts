import { Arg, ClassType, Ctx, Mutation, Resolver, UseMiddleware } from 'type-graphql';

// types
import { Context } from '~/db/types/context';
import { AvatarMutationResponse } from '~/db/types/responses/user';

// models
import { User } from '~/db/models';

import { verifyAuth } from '~/db/middlewares';
import cloudinaryHandler from '~/helpers/cloudinaryHandler';
import respond from '~/helpers/respond';

const updateAvatar = (Base: ClassType) => {
  @Resolver()
  class UpdateAvatar extends Base {
    @Mutation((_returns) => AvatarMutationResponse)
    @UseMiddleware(verifyAuth)
    updateAvatar(
      @Arg('base64Photo') base64Photo: string,
      @Arg('oldPhotoUrl') oldPhotoUrl: string,
      @Ctx() { req: { userId } }: Context,
    ): Promise<AvatarMutationResponse> {
      if (!base64Photo || !oldPhotoUrl)
        return Promise.resolve({
          code: 400,
          success: false,
          message: 'Avatar is missing',
        });

      const { updatePhoto } = cloudinaryHandler({
        folder: 'avatars',
      });

      return respond(async () => {
        const avatar = await updatePhoto(base64Photo, oldPhotoUrl);

        await User.updateOne({ _id: userId }, { $set: { avatar } });

        return {
          code: 200,
          success: true,
          avatar,
        };
      });
    }
  }

  return UpdateAvatar;
};

export default updateAvatar;
