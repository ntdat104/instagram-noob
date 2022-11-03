import { Arg, ClassType, Ctx, ID, Mutation, Resolver, UseMiddleware } from 'type-graphql';

// types
import { Context } from '~/db/types/context';
import { BaseResponse } from '~/db/types/shared';

// models
import { Message } from '~/db/models';

import { verifyAuth } from '~/db/middlewares';
import respond from '~/helpers/respond';

const deleteMessage = (Base: ClassType) => {
  @Resolver()
  class DeleteMessage extends Base {
    @Mutation((_returns) => BaseResponse)
    @UseMiddleware(verifyAuth)
    deleteMessage(
      @Arg('messageId', (_type) => ID) messageId: string,
      @Ctx() { req: { userId } }: Context,
    ): Promise<BaseResponse> {
      return respond(async () => {
        const deletedMessage = await Message.findOneAndDelete({ _id: messageId, user: userId });

        if (deletedMessage == null)
          return {
            code: 400,
            success: false,
            message: 'Message not found or user unauthorized',
          };

        return {
          code: 200,
          success: true,
          message: 'Message deleted',
        };
      });
    }
  }

  return DeleteMessage;
};

export default deleteMessage;
