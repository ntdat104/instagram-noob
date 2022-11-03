import { Field, ObjectType } from 'type-graphql';

// types
import { PaginatedResponse } from '~/db/types/shared';

// entities
import { Conversation } from '~/db/entities';

@ObjectType()
export class PaginatedConversationsResponse extends PaginatedResponse {
  @Field((_type) => [Conversation], { nullable: true })
  conversations?: Conversation[];
}
