import {
  Arg,
  ClassType,
  Ctx,
  Mutation,
  registerEnumType,
  Resolver,
  UseMiddleware,
} from 'type-graphql';

// types
import { Context } from '~/db/types/context';
import { BaseResponse } from '~/db/types/shared';
import { ReactionType } from '~/db/types/utils';

// models
import { Post } from '~/db/models';

import { verifyAuth } from '~/db/middlewares';
import { reactItem } from '~/db/utils';
import respond from '~/helpers/respond';

registerEnumType(ReactionType, {
  name: 'ReactionType',
});

const reactPost = (Base: ClassType) => {
  @Resolver()
  class ReactPost extends Base {
    @Mutation((_returns) => BaseResponse)
    @UseMiddleware(verifyAuth)
    reactPost(
      @Arg('postId') postId: string,
      @Arg('reaction', (_type) => ReactionType) reaction: ReactionType,
      @Ctx() { req: { userId } }: Context,
    ): Promise<BaseResponse> {
      return respond(() =>
        reactItem({
          model: Post,
          reaction,
          userId,
          itemId: postId,
          modelName: 'Post',
        }),
      );
    }
  }

  return ReactPost;
};

export default reactPost;
