import { Mutation, Arg, Ctx, Resolver, ClassType } from 'type-graphql';
import { OAuth2Client } from 'google-auth-library';

// types
import { Context } from '~/db/types/context';
import { UserMutationResponse } from '~/db/types/responses/user';

// models
import { User } from '~/db/models';

import { sendTokens } from '~/helpers/token';
import respond from '~/helpers/respond';

const loginGoogle = (Base: ClassType) => {
  const client = new OAuth2Client();

  @Resolver()
  class LoginGoogle extends Base {
    @Mutation((_returns) => UserMutationResponse)
    loginGoogle(
      @Arg('tokenId') tokenId: string,
      @Arg('clientId') clientId: string,
      @Ctx() { res }: Context,
    ): Promise<UserMutationResponse> {
      return respond(async () => {
        const loginTicket = await client.verifyIdToken({ idToken: tokenId, audience: clientId });

        const payload = loginTicket.getPayload();

        if (payload == null)
          return {
            code: 400,
            success: false,
            message: 'Something went wrong, please try again',
          };

        const { email_verified, name, email, picture } = payload;

        if (!email_verified)
          return {
            code: 401,
            success: false,
            message: 'Your email is invalid, please try another account',
          };

        if (!name || !email)
          return {
            code: 400,
            success: false,
            message: 'Requires your account to have username and email',
          };

        let existingUser = await User.findOne({ email, account: 'google' }).lean();

        if (existingUser == null)
          existingUser = (
            await User.create({
              email,
              username: name,
              avatar: picture ?? null,
              password: null,
              account: 'google',
            })
          ).toObject();

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

  return LoginGoogle;
};

export default loginGoogle;
