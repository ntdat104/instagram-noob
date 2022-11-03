import { Field, ObjectType } from 'type-graphql';

// types
import { BaseResponse } from '~/db/types/shared';

@ObjectType()
export class AvatarMutationResponse extends BaseResponse {
  @Field((_type) => String, { nullable: true })
  avatar?: string;
}
