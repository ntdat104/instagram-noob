import { Field, Int, ObjectType } from 'type-graphql';

// types
import { BaseResponse } from '~/db/types/shared';

// entities
import { User } from '~/db/entities';

@ObjectType()
export class GetSuggestionsResponse extends BaseResponse {
  @Field((_type) => [User], { nullable: true })
  users?: User[];

  @Field((_type) => Int, { nullable: true })
  nextPage?: number | null;
}
