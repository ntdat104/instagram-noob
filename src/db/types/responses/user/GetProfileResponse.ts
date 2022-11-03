import { Field, Int, ObjectType } from 'type-graphql';

// types
import { BaseResponse } from '~/db/types/shared';

// entities
import { User } from '~/db/entities';

@ObjectType()
export class GetProfileResponse extends BaseResponse {
  @Field((_type) => User, { nullable: true })
  user?: User;

  @Field((_type) => Int, { nullable: true })
  postCounts?: number;
}
