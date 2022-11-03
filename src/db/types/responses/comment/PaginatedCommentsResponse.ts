import { Field, ObjectType } from 'type-graphql';

// types
import { PaginatedResponse } from '~/db/types/shared';

// entities
import { Comment } from '~/db/entities';

@ObjectType()
export class PaginatedCommentsResponse extends PaginatedResponse {
  @Field((_type) => [Comment], { nullable: true })
  comments?: Comment[];
}
