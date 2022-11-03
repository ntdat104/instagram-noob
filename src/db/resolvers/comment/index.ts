import { Resolver } from 'type-graphql';

import extender from '~/helpers/extender';

// sub resolvers
import createComment from './createComment';
import deleteComment from './deleteComment';
import getComments from './getComments';
import reactComment from './reactComment';

@Resolver()
export default class CommentResolver extends extender(
  createComment,
  getComments,
  deleteComment,
  reactComment,
) {}
