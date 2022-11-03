import { Field, ObjectType } from 'type-graphql';

// entities
import { User } from '~/db/entities';
import { BaseResponse } from '~/db/types/shared';

@ObjectType()
export class GetSessionResponse extends BaseResponse {
  @Field((_type) => User, { nullable: true })
  user?: User | null;

  @Field((_type) => String, { nullable: true })
  accessToken?: string;
}
