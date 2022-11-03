import { Field, ObjectType } from 'type-graphql';

// types
import { MutationResponse } from '~/db/types/shared';

// entities
import { Message } from '~/db/entities';

@ObjectType()
export class MessageMutationResponse extends MutationResponse {
  @Field((_type) => Message, { nullable: true })
  newMessage?: Message;
}
