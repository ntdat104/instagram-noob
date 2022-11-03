import { Arg, ClassType, Mutation, Resolver } from 'type-graphql';
import { nanoid } from 'nanoid';

// types
import { ForgotPasswordResponse } from '~/db/types/responses/auth';

// models
import { User, Token } from '~/db/models';

import respond from '~/helpers/respond';
import hashData from '~/helpers/hashData';
import sendEmail from '~/helpers/sendEmail';

const forgotPassword = (Base: ClassType) => {
  @Resolver()
  class ForgotPassword extends Base {
    @Mutation((_returns) => ForgotPasswordResponse)
    forgotPassword(
      @Arg('usernameOrEmail') usernameOrEmail: string,
    ): Promise<ForgotPasswordResponse> {
      return respond(async () => {
        const existingUser = await User.findOne({
          $or: [{ email: usernameOrEmail }, { username: usernameOrEmail }],
        });

        if (!existingUser)
          return {
            code: 404,
            success: false,
            message: 'User not found',
            errors: [{ field: 'usernameOrEmail', message: 'No users found' }],
          };

        await Token.deleteMany({ userId: existingUser._id });

        const resetToken = nanoid();
        const hashedResetToken = hashData(resetToken);

        await Token.create({
          userId: existingUser._id,
          token: hashedResetToken,
        });

        const linkReset = await sendEmail(existingUser.email, resetToken, existingUser._id);

        if (typeof linkReset !== 'string') throw new Error('Nodemailer got an error');

        return {
          code: 200,
          success: true,
          linkReset,
        };
      });
    }
  }

  return ForgotPassword;
};

export default forgotPassword;
