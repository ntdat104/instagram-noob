import { Field, ObjectType } from 'type-graphql';

// types
import { MutationResponse } from '~/db/types/shared';

// entities
import { User } from '~/db/entities';

@ObjectType()
export class UserMutationResponse extends MutationResponse {
  @Field((_type) => User, { nullable: true })
  user?: User;
}
