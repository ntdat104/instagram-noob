import { Arg, ClassType, Ctx, Mutation, Resolver, UseMiddleware } from 'type-graphql';

// types
import { Context } from '~/db/types/context';
import { CommentMutationResponse } from '~/db/types/responses/comment';

// models
import { Comment } from '~/db/models';

import { verifyAuth } from '~/db/middlewares';
import { isEmptyInput } from '~/helpers/string';
import respond from '~/helpers/respond';

const createComment = (Base: ClassType) => {
  @Resolver()
  class CreateComment extends Base {
    @Mutation((_returns) => CommentMutationResponse)
    @UseMiddleware(verifyAuth)
    createComment(
      @Arg('caption') caption: string,
      @Arg('postId') postId: string,
      @Ctx() { req: { userId } }: Context,
    ): Promise<CommentMutationResponse> {
      if (isEmptyInput(caption))
        return Promise.resolve({
          code: 400,
          success: false,
          message: 'Caption is missing',
        });

      return respond(async () => {
        const newComment = await Comment.create({
          user: userId,
          caption,
          postId,
        }).then((res) => res.populate('user'));

        return {
          code: 201,
          success: true,
          message: 'The comment has been created successfully',
          comment: newComment.toObject(),
        };
      });
    }
  }

  return CreateComment;
};

export default createComment;
