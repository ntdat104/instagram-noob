import { Arg, ClassType, Ctx, Mutation, Resolver, UseMiddleware } from 'type-graphql';

// types
import { Context } from '~/db/types/context';
import { BaseResponse } from '~/db/types/shared';

// models
import { Post, Comment } from '~/db/models';

import { verifyAuth } from '~/db/middlewares';
import cloudinaryHandler from '~/helpers/cloudinaryHandler';
import respond from '~/helpers/respond';

const deletePost = (Base: ClassType) => {
  @Resolver()
  class DeletePost extends Base {
    @Mutation((_returns) => BaseResponse)
    @UseMiddleware(verifyAuth)
    deletePost(
      @Arg('postId') postId: string,
      @Ctx() { req: { userId } }: Context,
    ): Promise<BaseResponse> {
      return respond(async () => {
        const deletedPost = await Post.findOneAndDelete({ _id: postId, user: userId });

        if (deletedPost == null)
          return {
            code: 404,
            success: false,
            message: 'Post not found',
          };

        const { deletePhoto } = cloudinaryHandler();

        await Comment.deleteMany({ postId });

        if (deletedPost.photo != null) await deletePhoto(deletedPost.photo);

        return {
          code: 200,
          success: true,
          message: 'Post deleted',
        };
      });
    }
  }

  return DeletePost;
};

export default deletePost;
