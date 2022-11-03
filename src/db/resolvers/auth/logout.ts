import { ClassType, Ctx, Mutation, Resolver } from 'type-graphql';

// types
import { Context } from '~/db/types/context';
import { BaseResponse } from '~/db/types/shared';

import { clearAllCookies } from '~/helpers/cookie';

const logout = (Base: ClassType) => {
  @Resolver()
  class Logout extends Base {
    @Mutation((_returns) => BaseResponse)
    logout(@Ctx() { res }: Context): Promise<BaseResponse> {
      clearAllCookies(res);

      return Promise.resolve({
        code: 200,
        success: true,
      });
    }
  }

  return Logout;
};

export default logout;
