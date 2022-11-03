import { Field, ObjectType } from 'type-graphql';

// types
import { MutationResponse } from '~/db/types/shared';

// entities
import { Conversation } from '~/db/entities';

@ObjectType()
export class GetConversationByIdResponse extends MutationResponse {
  @Field((_type) => Conversation, { nullable: true })
  conversation?: Conversation;
}
