import { Field, ObjectType } from 'type-graphql';

// types
import { MutationResponse } from '~/db/types/shared';

@ObjectType()
export class ForgotPasswordResponse extends MutationResponse {
  @Field((_type) => String, { nullable: true })
  linkReset?: string;
}
