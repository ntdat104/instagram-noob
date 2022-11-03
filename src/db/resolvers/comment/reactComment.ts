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
import { Comment } from '~/db/models';

import { verifyAuth } from '~/db/middlewares';
import { reactItem } from '~/db/utils';
import respond from '~/helpers/respond';

registerEnumType(ReactionType, {
  name: 'ReactionType',
});

const reactComment = (Base: ClassType) => {
  @Resolver()
  class ReactComment extends Base {
    @Mutation((_returns) => BaseResponse)
    @UseMiddleware(verifyAuth)
    reactComment(
      @Arg('commentId') commentId: string,
      @Arg('reaction', (_type) => ReactionType) reaction: ReactionType,
      @Ctx() { req: { userId } }: Context,
    ): Promise<BaseResponse> {
      return respond(() =>
        reactItem({
          model: Comment,
          modelName: 'Comment',
          reaction,
          userId,
          itemId: commentId,
        }),
      );
    }
  }

  return ReactComment;
};

export default reactComment;
