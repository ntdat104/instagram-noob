import { Mutation, Arg, Ctx, Resolver, ClassType } from 'type-graphql';

// types
import { Context } from '~/db/types/context';
import { FacebookLoginResponse } from '~/types/auth';
import { UserMutationResponse } from '~/db/types/responses/user';

// models
import { User } from '~/db/models';

import { sendTokens } from '~/helpers/token';
import respond from '~/helpers/respond';

const loginFacebook = (Base: ClassType) => {
  @Resolver()
  class LoginFacebook extends Base {
    @Mutation((_returns) => UserMutationResponse)
    loginFacebook(
      @Arg('accessToken') accessToken: string,
      @Arg('userId') userId: string,
      @Ctx() { res }: Context,
    ): Promise<UserMutationResponse> {
      const urlGraphFacebook = `https://graph.facebook.com/v12.0/${userId}/?fields=id,name,email,picture.type(large)&access_token=${accessToken}`;

      return respond(async () => {
        const data = await fetch(urlGraphFacebook)
          .then((res) => res.json())
          .then((data: FacebookLoginResponse) => data);

        let existingUser = await User.findOne({ email: data.email, account: 'facebook' })
          .populate(['followers', 'following'])
          .lean();

        if (existingUser == null) {
          const newUser = await User.create({
            email: data.email,
            username: data.name,
            avatar: data.picture.data.url,
            password: null,
            account: 'facebook',
          })
            .then((res) => res.populate(['followers', 'following']))
            .then((res) => res.toObject());

          existingUser = newUser!;
        }

        sendTokens(res, existingUser._id);

        return {
          code: 200,
          success: true,
          message: 'Logged in successfully',
          user: existingUser,
        };
      });
    }
  }

  return LoginFacebook;
};

export default loginFacebook;
