import { Mutation, Arg, Ctx, Resolver, ClassType } from 'type-graphql';
import bcrypt from 'bcrypt';

// types
import { Context } from '~/db/types/context';
import { LoginInput } from '~/db/types/inputs';
import { UserMutationResponse } from '~/db/types/responses/user';

// models
import { User } from '~/db/models';

import { sendTokens } from '~/helpers/token';
import respond from '~/helpers/respond';

const login = (Base: ClassType) => {
  @Resolver()
  class Login extends Base {
    @Mutation((_returns) => UserMutationResponse)
    login(
      @Arg('loginInput') loginInput: LoginInput,
      @Ctx() { res }: Context,
    ): Promise<UserMutationResponse> {
      return respond(async () => {
        const { username, password } = loginInput;

        const existingUser = await User.findOne({ username })
          .populate(['followers', 'following'])
          .lean();

        if (existingUser == null)
          return {
            code: 400,
            success: false,
            message: 'User not found',
            errors: [
              {
                field: 'usernameOrPassword',
                message: 'Invalid username or password',
              },
            ],
          };

        const passwordCorrect = bcrypt.compareSync(password, existingUser.password);

        if (!passwordCorrect)
          return {
            code: 400,
            success: false,
            message: 'Wrong password',
            errors: [
              {
                field: 'usernameOrPassword',
                message: 'Invalid username or password',
              },
            ],
          };

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

  return Login;
};

export default login;
