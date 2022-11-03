import { Field, ObjectType } from 'type-graphql';

// types
import { PaginatedResponse } from '~/db/types/shared';

// entities
import { Post } from '~/db/entities';

@ObjectType()
export class PaginatedPostsResponse extends PaginatedResponse {
  @Field((_type) => [Post], { nullable: true })
  posts?: Post[];
}
