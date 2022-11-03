import { Arg, ClassType, Ctx, ID, Mutation, Resolver, UseMiddleware } from 'type-graphql';

// types
import { Context } from '~/db/types/context';
import { BaseResponse } from '~/db/types/shared';

// models
import { Comment } from '~/db/models';

import { verifyAuth } from '~/db/middlewares';
import respond from '~/helpers/respond';

const deleteComment = (Base: ClassType) => {
  @Resolver()
  class DeleteComment extends Base {
    @Mutation((_returns) => BaseResponse)
    @UseMiddleware(verifyAuth)
    deleteComment(
      @Arg('commentId', (_type) => ID) commentId: string,
      @Ctx() { req: { userId } }: Context,
    ): Promise<BaseResponse> {
      return respond(async () => {
        const deletedComment = await Comment.findOneAndDelete({ _id: commentId, user: userId });

        if (deletedComment == null)
          return {
            code: 400,
            success: false,
            message: 'Comment not found',
          };

        return {
          code: 200,
          success: true,
          message: 'Comment deleted',
        };
      });
    }
  }

  return DeleteComment;
};

export default deleteComment;
