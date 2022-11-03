import { Arg, ClassType, Ctx, Mutation, Resolver, UseMiddleware } from 'type-graphql';

// types
import { Context } from '~/db/types/context';
import { PostMutationResponse } from '~/db/types/responses/post';
import { CreatePostInput } from '~/db/types/inputs';

// models
import { Post } from '~/db/models';

import { verifyAuth } from '~/db/middlewares';
import { isEmptyInput } from '~/helpers/string';
import cloudinaryHandler from '~/helpers/cloudinaryHandler';
import respond from '~/helpers/respond';

const createPost = (Base: ClassType) => {
  @Resolver()
  class CreatePost extends Base {
    @Mutation((_returns) => PostMutationResponse)
    @UseMiddleware(verifyAuth)
    createPost(
      @Arg('createPostInput') { caption, base64Photo }: CreatePostInput,
      @Ctx() { req: { userId } }: Context,
    ): Promise<PostMutationResponse> {
      if (isEmptyInput(caption) && !base64Photo)
        return Promise.resolve({
          code: 400,
          success: false,
          message: 'Field is missing',
        });

      const { uploadPhoto } = cloudinaryHandler({
        folder: 'posts',
      });

      return respond(async () => {
        let photo: string | null = null;

        if (!isEmptyInput(base64Photo)) photo = await uploadPhoto(base64Photo);

        const newPost = await Post.create({
          caption,
          photo,
          user: userId,
        }).then((res) =>
          res.populate([
            { path: 'user', populate: ['followers', 'following'] },
            { path: 'reactions' },
          ]),
        );

        return {
          code: 201,
          success: true,
          message: 'The post has been created successfully',
          post: newPost.toObject(),
        };
      });
    }
  }

  return CreatePost;
};

export default createPost;
