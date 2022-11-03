import { Field, ObjectType } from 'type-graphql';

// types
import { MutationResponse } from '~/db/types/shared';

// entities
import { Comment } from '~/db/entities';

@ObjectType()
export class CommentMutationResponse extends MutationResponse {
  @Field((_type) => Comment, { nullable: true })
  comment?: Comment;
}
