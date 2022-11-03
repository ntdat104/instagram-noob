import { Field, ObjectType } from 'type-graphql';

// types
import { PaginatedResponse } from '~/db/types/shared';

// entities
import { Message } from '~/db/entities';

@ObjectType()
export class PaginatedMessagesResponse extends PaginatedResponse {
  @Field((_type) => [Message], { nullable: true })
  messages?: Message[];
}
