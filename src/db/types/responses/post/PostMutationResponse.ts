import { Field, ObjectType } from 'type-graphql';

// types
import { MutationResponse } from '~/db/types/shared';

// entities
import { Post } from '~/db/entities';

@ObjectType()
export class PostMutationResponse extends MutationResponse {
  @Field((_type) => Post, { nullable: true })
  post?: Post;
}
