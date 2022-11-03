import { Arg, ClassType, ID, Mutation, Resolver, UseMiddleware } from 'type-graphql';

// types
import { BaseResponse } from '~/db/types/shared';

// models
import { Message } from '~/db/models';

import { verifyAuth } from '~/db/middlewares';
import respond from '~/helpers/respond';

const readMessage = (Base: ClassType) => {
  @Resolver()
  class ReadMessage extends Base {
    @Mutation((_returns) => BaseResponse)
    @UseMiddleware(verifyAuth)
    readMessage(@Arg('messageId', (_type) => ID) messageId: string): Promise<BaseResponse> {
      return respond(async () => {
        const seenMessage = await Message.findByIdAndUpdate(messageId, { $set: { seen: true } });

        if (seenMessage == null)
          return {
            code: 404,
            success: false,
            message: 'Message not found',
          };

        return {
          code: 200,
          success: true,
        };
      });
    }
  }

  return ReadMessage;
};

export default readMessage;
